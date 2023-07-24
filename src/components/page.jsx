import React from "react";

const Page = ({ children, widthScreen = "" }) => {
    return (
        <div className="2xl:container mx-auto px-4">
            <div className={widthScreen + " my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md"}>
                {children}
            </div>
        </div>
    )
};

export default Page;
