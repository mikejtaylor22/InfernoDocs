// pdfService.js
import { PDFDocument } from "pdf-lib";

export const generatePDF = async (finalFormData) => {
	try {
		// Load the PDF file from the assets folder
		const response = await fetch("%PUBLIC_URL%/willtemplate.pdf");
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

		const executionCountyField = form.getTextField("At2");
		if (executionCountyField) {
			executionCountyField.setText(finalFormData.executionCounty);
		} else {
			console.warn("executionCounty field not found in the PDF form.");
		}

		const executionDateField = form.getTextField("On2");
		if (executionDateField) {
			executionDateField.setText(finalFormData.executionDate);
		} else {
			console.warn("executionDateField field not found in the PDF form.");
		}

		const executionCountyFieldTwo = form.getTextField("County2");
		if (executionCountyFieldTwo) {
			executionCountyFieldTwo.setText(finalFormData.executionCounty);
		} else {
			console.warn("executionCounty field not found in the PDF form.");
		}

		const executionDateFieldTwo = form.getTextField("Date2");
		if (executionDateFieldTwo) {
			executionDateFieldTwo.setText(finalFormData.executionDate);
		} else {
			console.warn("executionDateField field not found in the PDF form.");
		}

		if (finalFormData.otherContacts) {
			let index = 0;
			for (const con of finalFormData.otherContacts) {
				let numString = "";
				switch (index) {
					case 0:
						numString = "First";
						break;
					case 1:
						numString = "Second";
						break;
					case 2:
						numString = "Third";
						break;
					default:
						break;
				}

				const firstContactNameField = form.getTextField(`${numString}ContactName`);
				firstContactNameField.setText(con.name);
				const firstContactAddressField = form.getTextField(`${numString}ContactAddress`);
				firstContactAddressField.setText(
					`${con.streetAddress} ${con.city} ${con.state} ${con.zip}`
				);
				const firstContactPhoneField = form.getTextField(`${numString}ContactPhone`);
				firstContactPhoneField.setText(con.phoneNumber);
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
