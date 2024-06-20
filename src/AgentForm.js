import React, { useState } from "react";

const AgentForm = ({ addNewAgent, type }) => {
	const [newAgent, setNewAgent] = useState({
		name: "",
		relationship: "",
		streetAddress: "",
		city: "",
		state: "",
		zip: "",
		county: "",
		phoneNumber: "",
	});

	const [formTitle, setFormTitle] = useState(() => {
		if (type === "agents") {
			return "Agent";
		} else if (type === "guardians") {
			return "Guardian";
		} else if (type === "estateGuardians") {
			return "Estate Guardian";
		} else {
			return "Person";
		}
	});

	const handleSetFormTitle = () => {
		switch (type) {
			case "agents":
				setFormTitle("Agent");
				break;
			case "guardians":
				setFormTitle("Guardian");
				break;
			case "estateGuardians":
				setFormTitle("Estate Guardian");
				break;
			default:
				break;
		}
	};

	const handleOtherPersonChange = (e) => {
		setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		addNewAgent(newAgent, type);
	};

	return (
		<div className="p-4 bg-gray-100 shadow-md rounded-lg">
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4">{formTitle}</h3>
				<div className="grid grid-cols-4 gap-2">
					<div>
						<label className="block mb-1 text-xs px-1">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newAgent.name}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>

					<div>
						<label htmlFor="relationship" className="block mb-1 text-xs ml-4 px-1">
							Relationship
						</label>
						<input
							type="text"
							id="relationship"
							name="relationship"
							className="w-full px-2 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newAgent.relationship}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="mt-4">
					<label htmlFor="streetAddress" className="block mb-1 text-xs px-1">
						Street Address
					</label>
					<input
						type="text"
						id="streetAddress"
						name="streetAddress"
						className="w-1/2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						value={newAgent.streetAddress}
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
							value={newAgent.city}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="state" className="block mb-1 text-xs px-1 ml-4">
							State
						</label>
						<input
							type="text"
							id="state"
							name="state"
							className="w-full px-2 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newAgent.state}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-2 mt-4">
					<div>
						<label htmlFor="zip" className="block mb-1 text-xs px-1">
							ZIP
						</label>
						<input
							type="text"
							id="zip"
							name="zip"
							className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newAgent.zip}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="phoneNumber" className="block mb-1 text-xs px-5">
							Phone Number
						</label>
						<input
							type="tel"
							name="phoneNumber"
							id="phoneNumber"
							className="w-full px-2 ml-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
							value={newAgent.phoneNumber}
							onChange={handleOtherPersonChange}
							required
						/>
					</div>
				</div>
				<div className="mt-2">
					<label htmlFor="county" className="block mb-1 text-xs px-1 h-1/4">
						County
					</label>
					<input
						type="text"
						id="county"
						name="county"
						className="w-1/4 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
						value={newAgent.county}
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
					Save
				</button>
			</div>
		</div>
	);
};

export default AgentForm;
