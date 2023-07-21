import React from "react";
// import { useSelector } from "react-redux";

// import { isLoggedInSelector } from "../../store/authSlice";
import StyledNavLink from "../StyledNavLink";
import NavBarDropdown from "./NavBarDropdown";
import NavBarWrapper from "./NavBarWrapper";
import NavBarLinkList from "./NavBarLinkList";
import NavBarLogo from "./NavBarLogo";
import NavBarSelectLang from "./NavBarSelectLang";
import { FormattedMessage } from "react-intl";
import { Bars3Icon } from '@heroicons/react/24/solid'
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const NavBar = ({ handleChange }) => {
    const isLoggedIn = false;// useSelector(isLoggedInSelector());
    const handleClickBurgerMenu = ({ target }) => {
        if (target && (target.nodeName === "A" || target.nodeName === "IMG" || target.nodeName === "svg" || target.nodeName === "SPAN" || target.nodeName === "path")) {
            const burgerMenu = document.querySelector(".burger_menu");
            setTimeout(() => {
                burgerMenu.classList.toggle('hidden');
            }, burgerMenu.classList.contains("burger_menu_show") ? 180 : 0);
            burgerMenu.classList.toggle('burger_menu_show');
            burgerMenu.classList.toggle('burger_menu_hidden');
            // burgerMenu.classList.toggle('flex');
            if (burgerMenu.classList.contains("burger_menu_show")) {
                burgerMenu.addEventListener("click", handleClickBurgerMenu);
            } else {
                burgerMenu.removeEventListener("click", handleClickBurgerMenu);
            }
        }
    }
    return (
        <>
            <BurgerMenu handleClose={handleClickBurgerMenu} />
            <NavBarWrapper>
                <NavBarLogo
                    link='/'
                    src='/assets/img/rr-logo.svg'
                    label='BearTeddy.fun'
                />
                <NavBarSelectLang handleChange={handleChange} />
                <NavBarLinkList>
                    <StyledNavLink to='/autors' show="hidden lg:block"><FormattedMessage id='autors' /></StyledNavLink>
                    <button onClick={handleClickBurgerMenu} className="lg:hidden"><Bars3Icon className="h-6 w-6 text-blue-500" /></button>

                    {isLoggedIn ? (
                        <>
                            <StyledNavLink to='/'>Something</StyledNavLink>
                            <StyledNavLink to='/posts' end>Posts</StyledNavLink>
                            <NavBarDropdown />
                        </>
                    ) : (
                        <StyledNavLink to='/auth/login' styleType='button' show="hidden lg:block">
                            <FormattedMessage id='login' />
                        </StyledNavLink>
                    )}
                </NavBarLinkList>
            </NavBarWrapper>
        </>
    );
};

export default NavBar;
