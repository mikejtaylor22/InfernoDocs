import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

export const generateFinancialDoc = async (formData) => {
	console.log("formData ", formData);
	// const finalFormData = {
	// 	isSpringingDurable: formData.isSpringingDurable ? "SPRINGING" : "",
	// 	fullName:
	// 		formData.firstName + formData.middleName
	// 			? " " + formData.middleName
	// 			: "" + formData.lastName,
	// 	clientCounty: formData.clientCounty,
	// 	agents: [],
	// 	relationship: formData.relationship ? formData.relationship : "",
	// 	relationshipMy: formData.relationship.length > 0 ? "my" : "",
	// };
	const getAgentCount = (agentsLength) => {
		switch (agentsLength) {
			case 0:
				return "";
			case 1:
				return "";
			case 2:
				return "either";
			case 3:
				return "any";
			default:
				return "";
		}
	};

	const agentCountTwo = (agentsLength) => {
		if (agentsLength < 2) return "";
		if (agentsLength === 2) return "other may continue to serve as sole Attorney-in-Fact";
		if (agentsLength === 3) return "others may continue to serve as Co Attorneys-in-Fact";
	};

	const getAttorneyInFactOrCoAttorney = (agentsLength) => {
		if (agentsLength === 1) return "Attorney-in-Fact";
		else if (agentsLength > 1) return "Co Attorneys-in-Fact";
	};

	const finalFormData = {
		isSpringingTop: formData.isSpringingDurable ? "SPRINGING" : "DURABLE",
		isSpringingBodyOne: formData.isSpringingDurable
			? " only when I am considered to be unable to manage my affairs "
			: "",
		fullName: "MICHAEL JOSEPH TAYLOR",
		clientCounty: "Franklin",
		agents: ["Jack Skeletor", "Jane Doe", "Willy Nelson"],
		agentOneName: "JACK SKELETOR",
		agentOneState: "Ohio",
		agentTwoName: "JANE DOE",
		agentThreeName: "WILLY NELSON",
		agentOneCounty: "Franklin",
		relationship: "Uncle",
		relationshipMy: "my",
		// relationship: formData.relationship ? formData.relationship : "",
		// relationshipMy: formData.relationship.length > 0 ? "my" : "",
		agentCountSentenceOne: "In the event that " + getAgentCount(3),
		agentCountSentenceTwo: agentCountTwo(3),
		inFactOrCo: "Attorney-in-Fact",
	};

	console.log("finalFormData ", finalFormData);

	try {
		// Fetch the template .docx file
		const response = await fetch("/InfernoDocs/NewFinancialPoa_test1.docx");

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const templateArrayBuffer = await response.arrayBuffer();

		const zip = new PizZip(templateArrayBuffer);

		// Custom parser to find and replace {variableName} placeholders
		function customParser(tag) {
			// Remove { and } from the tag
			tag = tag.replace(/^{|}$/g, "");
			// Convert the tag to camelCase if it's in snake_case
			tag = tag.replace(/_([a-z])/g, function (g) {
				return g[1].toUpperCase();
			});
			return {
				get: function (scope) {
					if (tag in scope) {
						return scope[tag];
					}
					// If the exact tag is not found, try to find a case-insensitive match
					const lowercaseTag = tag.toLowerCase();
					for (let key in scope) {
						if (key.toLowerCase() === lowercaseTag) {
							return scope[key];
						}
					}
					return `{${tag}}`; // Return original placeholder if not found
				},
			};
		}

		const doc = new Docxtemplater(zip, {
			paragraphLoop: true,
			linebreaks: true,
			delimiters: {
				start: "{",
				end: "}",
			},
			parser: customParser,
		});

		// // Load the docx file as a binary
		// const zip = new PizZip(templateArrayBuffer);

		// // Custom parser to find and replace <<variableName>> placeholders
		// function customParser(tag) {
		// 	// Remove << and >> from the tag
		// 	tag = tag.replace(/^<<|>>$/g, "");
		// 	// Convert the tag to camelCase if it's in snake_case
		// 	tag = tag.replace(/_([a-z])/g, function (g) {
		// 		return g[1].toUpperCase();
		// 	});
		// 	return {
		// 		get: function (scope) {
		// 			if (tag in scope) {
		// 				return scope[tag];
		// 			}
		// 			// If the exact tag is not found, try to find a case-insensitive match
		// 			const lowercaseTag = tag.toLowerCase();
		// 			for (let key in scope) {
		// 				if (key.toLowerCase() === lowercaseTag) {
		// 					return scope[key];
		// 				}
		// 			}
		// 			return `<<${tag}>>`; // Return original placeholder if not found
		// 		},
		// 	};
		// }

		// const doc = new Docxtemplater(zip, {
		// 	paragraphLoop: true,
		// 	linebreaks: true,
		// 	delimiters: {
		// 		start: "<<",
		// 		end: ">>",
		// 	},
		// 	parser: customParser,
		// });

		// Render the document (replace all occurrences of <<placeholder>> with actual data)
		doc.render(finalFormData);

		// Generate the document
		const out = doc.getZip().generate({
			type: "blob",
			mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		});

		// Save the file
		saveAs(out, "FinancialPOADocument.docx");
	} catch (error) {
		console.error("Error generating DOCX:", error);
		alert("Error generating document. See console for details.");
	}
};
