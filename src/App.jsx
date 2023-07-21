import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// Language
import { IntlProvider } from "react-intl";
import { LOCALES } from "../src/i18n/locales";
import { messages } from "../src/i18n/messages";
//Message
import { ToastContainer } from "react-toastify";
//pages
import MainPage from "./layout/mainPage";
import AutorsPage from "./layout/autorsPage";
import NavBar from "./components/NavBar/NavBar";

// const MainPage = () => {
//     return (
//         <Page>
//             <Title>MainPage</Title>
//         </Page>
//     );
// };

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
    return (
        <>
            <IntlProvider messages={messages[currentLocale]}
                locale={currentLocale} defaultLocale={LOCALES.ENGLISH}
            >
                <BrowserRouter>
                    <NavBar handleChange={handleChangeLang} />
                    <Routes>
                        <Route path="/" element={<MainPage locale={currentLocale} />} />
                        <Route path="/autors" element={<AutorsPage />} />
                        {/* <Route path="users" >
                    <Route index element={<UserList />} />
                    <Route path=":userId/profile" element={<UserPage />} />
                    <Route path=":userId" element={<Navigate to="profile" />} />
                    <Route path=":userId/profile/edit" element={<UserPageEdit />} />
                    <Route path="*" element={<Navigate to="profile" />} />
                </Route> */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </IntlProvider>
            <ToastContainer />
        </>
    );
}

export default App;
