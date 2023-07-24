import React from "react";

const Title = ({ label, children }) => {
    return (
        <div className="py-2 px-4 mb-4 bg-white text-blue-700 font-semibold rounded-lg shadow-md text-center">
            {label || children}
        </div>
    )
};

export default Title;
