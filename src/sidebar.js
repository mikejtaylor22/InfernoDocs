import React from "react";

const Sidebar = ({ forms, activeForm, setActiveForm }) => (
	<nav className="w-1/6 bg-gray-800 text-white p-2 h-screen">
		<h2 className="text-2xl font-bold mb-8 text-orange-300 underline">Inferno Docs</h2>
		<ul className="space-y-2">
			{forms.map((form) => (
				<li key={form}>
					<button
						className={`w-full text-left p-2 rounded text-sm ${
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

export default Sidebar;
