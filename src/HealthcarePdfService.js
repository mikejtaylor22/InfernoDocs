// pdfService.js
import { PDFDocument } from "pdf-lib";

export const generateHealthcarePDF = async (finalFormData) => {
	try {
		// Load the PDF file from the assets folder
		const response = await fetch("/healthcaretemplate.pdf");
		const pdfFile = await response.arrayBuffer();

		// Create a new PDF document from the loaded file
		const pdfDoc = await PDFDocument.load(pdfFile);

		// Check if the PDF has an existing form
		let form;
		if (pdfDoc.getForm) {
			form = pdfDoc.getForm();
		} else {
			console.log("Failed to get form");
		}

		// Map the finalFormData values to the corresponding PDF fields
		const nameField = form.getTextField("Name");
		if (nameField) {
			nameField.setText(
				`${finalFormData.firstName}${
					finalFormData.middleName ? " " + finalFormData.middleName : ""
				} ${finalFormData.lastName}`
			);
		} else {
			console.warn("Name field not found in the PDF form.");
		}

		const birthField = form.getTextField("Birth");
		if (birthField) {
			const formattedDate = finalFormData.birthday;
			birthField.setText(formattedDate);
		} else {
			console.warn("Birth field not found in the PDF form.");
		}

		const executionCountyField = form.getTextField("At1");
		if (executionCountyField) {
			executionCountyField.setText(finalFormData.executionCounty);
		} else {
			console.warn("executionCounty field not found in the PDF form.");
		}

		const executionDateField = form.getTextField("On1");
		if (executionDateField) {
			executionDateField.setText(finalFormData.executionDate);
		} else {
			console.warn("executionDateField field not found in the PDF form.");
		}

		const executionCountyFieldTwo = form.getTextField("County1");
		if (executionCountyFieldTwo) {
			executionCountyFieldTwo.setText(finalFormData.executionCounty);
		} else {
			console.warn("executionCounty field not found in the PDF form.");
		}

		const executionDateFieldTwo = form.getTextField("Date1");
		if (executionDateFieldTwo) {
			executionDateFieldTwo.setText(finalFormData.executionDate);
		} else {
			console.warn("executionDateField field not found in the PDF form.");
		}

		const principalField = form.getTextField("Principal1");
		if (principalField) {
			principalField.setText(
				`${finalFormData.firstName}${
					finalFormData.middleName ? " " + finalFormData.middleName : ""
				} ${finalFormData.lastName}`
			);
		} else {
			console.warn("Name field not found in the PDF form.");
		}

		if (finalFormData.agents) {
			let index = 0;
			for (const agent of finalFormData.agents) {
				let numString = "";
				switch (index) {
					case 0:
						numString = "";
						break;
					case 1:
						numString = "Alt1";
						break;
					case 2:
						numString = "Alt2";
						break;
					default:
						break;
				}

				const firstContactNameField = form.getTextField(`AgentName${numString}`);
				firstContactNameField.setText(agent.name);
				const firstContactAddressField = form.getTextField(`AgentAddress${numString}`);
				firstContactAddressField.setText(
					`${agent.streetAddress} ${agent.city} ${agent.state} ${agent.zip}`
				);
				const firstContactPhoneField = form.getTextField(`AgentPhone${numString}`);
				firstContactPhoneField.setText(agent.phoneNumber);
				index++;
			}
		}

		if (finalFormData.guardians) {
			let index = 0;
			for (const guardian of finalFormData.guardians) {
				let numString = "";
				let addLetter = "";
				switch (index) {
					case 0:
						numString = "";
						break;
					case 1:
						numString = "Alt";
						addLetter = "t";
						break;
					default:
						break;
				}

				const firstContactNameField = form.getTextField(
					`Gdn${addLetter}Name${numString}`
				);
				firstContactNameField.setText(guardian.name);
				const firstContactAddressField = form.getTextField(`GdnAddress${numString}`);
				firstContactAddressField.setText(
					`${guardian.streetAddress} ${guardian.city} ${guardian.state} ${guardian.zip}`
				);
				const firstContactPhoneField = form.getTextField(`GdnPhone${numString}`);
				firstContactPhoneField.setText(guardian.phoneNumber);
				index++;
			}
		}

		if (finalFormData.estateGuardians) {
			let index = 0;
			for (const guardian of finalFormData.estateGuardians) {
				let numString = "";
				let addLetter = "";
				switch (index) {
					case 0:
						numString = "";
						break;
					case 1:
						numString = "Alt";
						addLetter = "t";
						break;
					default:
						break;
				}

				const firstContactNameField = form.getTextField(
					`Gdn${addLetter}NameEstate${numString}`
				);
				firstContactNameField.setText(guardian.name);
				const firstContactAddressField = form.getTextField(
					`GdnAddressEstate${numString}`
				);
				firstContactAddressField.setText(
					`${guardian.streetAddress} ${guardian.city} ${guardian.state} ${guardian.zip}`
				);
				const firstContactPhoneField = form.getTextField(`GdnPhoneEstate${numString}`);
				firstContactPhoneField.setText(guardian.phoneNumber);
				index++;
			}
		}

		// Serialize the PDF document to bytes
		const pdfBytes = await pdfDoc.save();

		// Create a Blob from the PDF bytes
		const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

		// Generate a download link or open the PDF in a new tab/window
		const downloadLink = URL.createObjectURL(pdfBlob);
		window.open(downloadLink);
	} catch (error) {
		console.error("Error generating PDF:", error);
	}
};
