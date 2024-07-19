import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import SmallSidebar from "./smallsidebar";
import LivingWillForm from "./LivingWillForm";
import FinancialDocForm from "./FinancialDocForm";
import { FormProvider } from "./FormContext";
import HealthcareForm from "./HealthcareForm";
import "react-datepicker/dist/react-datepicker.css";

function App() {
	const forms = [
		"Living Will",
		"Healthcare Power of Attorney",
		// "Financial Power of Attorney",
	];
	const [activeForm, setActiveForm] = useState(forms[0]);
	const [showSidebar, setShowSidebar] = useState(true);
	const [screenSize, setScreenSize] = useState(getCurrentScreenSize());

	function getCurrentScreenSize() {
		const width = window.innerWidth;
		if (width < 768) {
			return "mobile";
		} else if (width < 992) {
			return "tablet";
		} else {
			return "desktop";
		}
	}

	useEffect(() => {
		const handleResize = () => {
			setScreenSize(getCurrentScreenSize());
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	console.log("screensize ", screenSize);

	const renderForm = () => {
		switch (activeForm) {
			case "Living Will":
				return <LivingWillForm screenSize={screenSize} />;
			case "Healthcare Power of Attorney":
				return <HealthcareForm screenSize={screenSize}/>;
			case "Financial Power of Attorney":
				return <FinancialDocForm />;
			default:
				return null;
		}
	};

	return (
		<FormProvider>
			<div className="flex h-screen w-screen bg-gray-300">
				{screenSize === "desktop" ? (
					<Sidebar
						forms={forms}
						activeForm={activeForm}
						setActiveForm={setActiveForm}
						screenSize={screenSize}
					/>
				) : (
					<SmallSidebar
						forms={forms}
						activeForm={activeForm}
						setActiveForm={setActiveForm}
						screenSize={screenSize}></SmallSidebar>
				)}

				<main className="flex overflow-y-auto m-2">{renderForm()}</main>
				{/* <main className="flex-1 p-8 overflow-y-auto">{renderForm()}</main> */}
			</div>
		</FormProvider>
	);
}

export default App;
