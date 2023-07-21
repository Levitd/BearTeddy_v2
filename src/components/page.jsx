import React from "react";

const Page = ({ children }) => {
    return (
        <div className="2xl:container mx-auto px-4">
            {children}
        </div>
    )
};

export default Page;
