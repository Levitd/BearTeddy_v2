import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// Language
import { IntlProvider } from "react-intl";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
//Message
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//pages
import MainPage from "./layout/mainPage";
import AutorsPage from "./layout/autorsPage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./layout/login";

import withRedux from "./hoc/withRedux";
import AppLoader from "./hoc/appLoader";
import PersonalArea from "./components/ui/personalArea";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";
import withRouter from "./hoc/withRouter";



function App() {
    function getInitialLocale() {
        const savedLocale = JSON.parse(localStorage.getItem('locale'));
        return savedLocale || LOCALES.ENGLISH;
    }
    const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
    const handleChangeLang = ({ target }) => {
        const value = target.dataset.value;
        if (value) setCurrentLocale(value);
        if (value) localStorage.setItem('locale', JSON.stringify(value));
    };
    const isLoggedIn = useSelector(getIsLoggedIn());
    const location = useLocation();
    return (
        <>
            <AppLoader>
                <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
                    <NavBar handleChange={handleChangeLang} />
                    <Routes>
                        <Route path="/" element={<MainPage locale={currentLocale} />} />
                        <Route path="/autors" element={<AutorsPage />} />
                        <Route path="auth/login" element={<Login />} />
                        <Route path="personalArea" element={isLoggedIn ? <PersonalArea /> : <Navigate to="/auth/login" state={{ referrer: location }} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </IntlProvider>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
