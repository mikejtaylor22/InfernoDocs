import React from "react";

const SmallSidebar = ({ forms, activeForm, setActiveForm, screenSize }) => {
	return (
		<nav className="bg-gray-800 text-white h-screen w-1/3">
			<h2 className="text-md font-bold mb-6 pt-2 px-2 text-orange-300 underline">
				Inferno Docs
			</h2>
			<ul className="space-y-2">
				{forms.map((form) => (
					<li key={form}>
						<button
							className={`w-full text-left p-2 rounded text-xs ${
								activeForm === form ? "bg-blue-600" : "hover:bg-gray-700"
							}`}
							onClick={() => setActiveForm(form)}>
							{form}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SmallSidebar;
