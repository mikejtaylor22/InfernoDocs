import { useState } from "react";
import Sidebar from "./sidebar";
import LivingWillForm from "./LivingWillForm";
import { FormProvider } from "./FormContext";
import HealthcareForm from "./HealthcareForm";
import "react-datepicker/dist/react-datepicker.css";

function App() {
	const forms = ["Living Will", "Healthcare Power of Attorney"];
	const [activeForm, setActiveForm] = useState(forms[0]);
	const [showSidebar, setShowSidebar] = useState(true);

	const renderForm = () => {
		switch (activeForm) {
			case "Living Will":
				return <LivingWillForm />;
			case "Healthcare Power of Attorney":
				return <HealthcareForm />;
			default:
				return null;
		}
	};

	return (
		<FormProvider>
			<div className="flex h-screen bg-gray-200">
				{showSidebar ? (
					<Sidebar forms={forms} activeForm={activeForm} setActiveForm={setActiveForm} />
				) : (
					<></>
				)}
				<main className="flex-1 p-8 overflow-y-auto">{renderForm()}</main>
			</div>
		</FormProvider>
	);
}

export default App;
