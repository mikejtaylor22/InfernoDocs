import React, { useState } from "react";

const OtherContactsForm = ({ addNewContact }) => {
	const [newContact, setNewContact] = useState({
		name: "",
		relationship: "",
		streetAddress: "",
		city: "",
		state: "",
		zip: "",
		county: "",
		phoneNumber: "",
	});

	const handleOtherPersonChange = (e) => {
		setNewContact({ ...newContact, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		addNewContact(newContact);
	};

	return (
		<div className="p-4 bg-gray-100 shadow-md rounded-lg">
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4">Agent</h3>
				<div className="grid grid-cols-4 gap-2">
					<div>
						<label className="block mb-1 text-xs">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.name}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>

					<div>
						<label htmlFor="relationship" className="block mb-1 text-xs ml-4">
							Relationship
						</label>
						<input
							type="text"
							id="relationship"
							name="relationship"
							className="w-full px-2 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.relationship}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="mt-4 w-1/2">
					<label htmlFor="streetAddress" className="block mb-1 text-xs">
						Street Address
					</label>
					<input
						type="text"
						id="streetAddress"
						name="streetAddress"
						className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						value={newContact.streetAddress}
						onChange={handleOtherPersonChange}
						required
					/>
				</div>
				<div className="grid grid-cols-4 gap-2 mt-4">
					<div>
						<label htmlFor="city" className="block mb-1 text-xs px-1">
							City
						</label>
						<input
							type="text"
							id="city"
							name="city"
							className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.city}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="state" className="block mb-1 text-xs ml-4 pl-1">
							State
						</label>
						<input
							type="text"
							id="state"
							name="state"
							className="w-full px-2 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.state}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-2 mt-4">
					<div>
						<label htmlFor="zip" className="block mb-1 text-xs pl-1">
							ZIP
						</label>
						<input
							type="text"
							id="zip"
							name="zip"
							className="w-full py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.zip}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="phoneNumber" className="block mb-1 text-xs pl-1 ml-4">
							Phone Number
						</label>
						<input
							type="tel"
							name="phoneNumber"
							id="phoneNumber"
							className="w-full px-1 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newContact.phoneNumber}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="mt-2">
					<label htmlFor="county" className="block mb-1 text-xs">
						County
					</label>
					<input
						type="text"
						id="county"
						name="county"
						className="w-1/4 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						value={newContact.county}
						onChange={handleOtherPersonChange}
						required
					/>
				</div>
			</div>
			<div className="mt-8">
				<button
					type="button"
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					onClick={handleSubmit}>
					Save Person
				</button>
			</div>
		</div>
	);
};

export default OtherContactsForm;
