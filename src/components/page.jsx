import React from "react";
import Title from "./title";
import { FormattedMessage } from "react-intl";

const Page = ({ children, widthScreen = "", title, noTranslate = false }) => {
    return (
        <div className="2xl:container mx-auto px-1 lg:px-4">
            <div className={"my-2 px-2 p-2 lg:my-5 lg:px-5 lg:p-5 mx-auto bg-state-300 rounded border-2 shadow-md"}>
                {title &&
                    <Title>{noTranslate ? title : <FormattedMessage id={title} />}</Title>
                }
                <div className={widthScreen}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Page;
