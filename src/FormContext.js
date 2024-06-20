import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		birthday: null,
		otherContacts: [],
		executionDate: null,
		executionCounty: "",
		agents: [],
		guardians: [],
		estateGuardians: [],
	});

	return (
		<FormContext.Provider value={{ formData, setFormData }}>
			{children}
		</FormContext.Provider>
	);
};
