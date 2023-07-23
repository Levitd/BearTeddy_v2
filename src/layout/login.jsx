import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import { FormattedMessage } from "react-intl";
import MessageP from "../components/common/form/mesageP";
import { ButtonField } from "../components/common/form";
// import { activeLink } from './utils/utils_dom';

// <FormattedMessage id='login_or_register' />

const Login = ({ user }) => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const togleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="max-w-lg my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md">
            {formType === "register"
                ? <>
                    <div className="mb-4 text-neutral-900 text-3xl"><FormattedMessage id='registration' /></div>

                    <RegisterForm user={user} />
                    <div className="flex flex-row gap-1 items-end">
                        <MessageP addStyle="neutral" label="already_registered" />
                        <ButtonField colorButton="btn-link" type="link" label="login" onClick={togleFormType} />
                    </div>
                </>
                : <>
                    <div className="mb-4 text-neutral-900 text-3xl"><FormattedMessage id='login' /></div>
                    <LoginForm user={user} />
                    <div className="flex flex-row gap-1 items-end">
                        <MessageP addStyle="neutral" label="not_registered" />
                        <ButtonField colorButton="btn-link" type="link" label="registration" onClick={togleFormType} />
                    </div>
                </>}
        </div>
    );
};

export default Login;