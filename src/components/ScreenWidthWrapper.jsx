import React from "react";
const ScreenWidthWrapper = ({ children }) => {
	return (
		<div className="relative max-w-7xl px-0 sm:px-4 md:px-8 w-full mx-auto">
			{children}
		</div>
	);
};

export default ScreenWidthWrapper;
