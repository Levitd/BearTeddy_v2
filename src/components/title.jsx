import React from "react";

const Title = ({ label, addStyleTitle = "", children }) => {
    return (
        <div className={addStyleTitle + " py-2 px-2 mb-4 bg-slate-200 text-blue-700 font-semibold text-center"}>
            {label || children}
        </div>
    )
};

export default Title;
