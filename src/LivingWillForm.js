import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import OtherContactsForm from "./OtherContactsForm";
import { FormContext } from "./FormContext";
import { generatePDF } from "./pdfService";

const LivingWillForm = () => {
	const { formData, setFormData } = useContext(FormContext);
	const [isFormValid, setIsFormValid] = useState(false);
	const [openOtherContact, setOpenOtherContact] = useState(false);

	const addNewContact = (newContact) => {
		setFormData((prevState) => ({
			...prevState,
			otherContacts: [...prevState.otherContacts, newContact],
		}));
		setOpenOtherContact(false);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleBirthdayChange = (date) => {
		setFormData({
			...formData,
			birthday: formatDate(new Date(date).toDateString()),
		});
	};

	const handleExecutionDateChange = (date) => {
		setFormData({
			...formData,
			executionDate: formatDate(new Date(date).toDateString()),
		});
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	const handleSetOpenNewContactForm = () => {
		setOpenOtherContact(!openOtherContact);
	};

	useEffect(() => {
		const validateForm = () => {
			if (openOtherContact) return false;
			return (
				formData.firstName.length > 0 &&
				formData.lastName.length > 0 &&
				formData.birthday !== null
			);
		};

		setIsFormValid(validateForm());
	}, [formData, openOtherContact]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid) {
			generatePDF(formData);
		}
	};

	return (
		<div className="p-4 bg-white shadow-md rounded-lg">
			<div className="grid grid-cols-5 w-full mb-1 min-h-16">
				<div></div>
				<div></div>
				<div className="col-span-2">
					<h4 className="text-2xl font-semibold pt-2">Living Will</h4>
				</div>
				<div></div>
				<div></div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="mt-2 pt-4">
					<p className="text-lg font-semibold mb-2">Client Information</p>
				</div>
				<div className="grid grid-cols-4 gap-4 pt-4 border-gray-200">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={formData.firstName}
						onChange={handleChange}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
					/>
					<input
						type="text"
						name="middleName"
						placeholder="Middle Name"
						value={formData.middleName}
						onChange={handleChange}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={formData.lastName}
						onChange={handleChange}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
					/>
					<div className="relative">
						<DatePicker
							selected={formData.birthday}
							onChange={handleBirthdayChange}
							placeholderText="Birthday"
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						/>
					</div>
					<input
						type="text"
						name="executionCounty"
						placeholder="County"
						value={formData.executionCounty}
						onChange={handleChange}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
					/>
					<div className="relative">
						<DatePicker
							selected={formData.executionDate}
							onChange={handleExecutionDateChange}
							placeholderText="Execution Date"
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						/>
					</div>
				</div>

				<div>
					<button
						onClick={handleSetOpenNewContactForm}
						className="p-2 bg-green-400 mt-8 rounded-md text-white text-xs">
						{openOtherContact ? "Remove" : "Add"} Contact
					</button>
				</div>

				{openOtherContact && (
					<div>
						<OtherContactsForm addNewContact={addNewContact} />
					</div>
				)}

				{formData.otherContacts.length ? (
					<div className="bg-white shadow-md rounded-lg p-6">
						<ul className="divide-y divide-gray-200">
							{formData.otherContacts.map((contact, index) => (
								<li key={index} className="py-4">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
												{contact.name.charAt(0)}
											</div>
										</div>
										<div className="ml-4">
											<div className="text-lg font-medium text-gray-900">
												{contact.name}
											</div>
											<div className="text-gray-500">{contact.relationship}</div>
											<div className="mt-2 text-sm text-gray-300">
												{contact.streetAddress} {contact.city} {", "}
												{contact.state}
											</div>
											<div className="text-sm text-gray-300">{contact.phoneNumber}</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<></>
				)}

				<div className="mt-6">
					<button
						type="submit"
						disabled={!isFormValid}
						className={`px-4 py-2 mt-12 text-white rounded-md ${
							isFormValid
								? "bg-blue-500 hover:bg-blue-300"
								: "bg-gray-400 cursor-not-allowed"
						}`}>
						Generate Document
					</button>
				</div>
			</form>
		</div>
	);
};

export default LivingWillForm;
