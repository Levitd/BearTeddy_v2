import React from "react";
import StyledBurgerLink from "./StyledBurgerLink";
import NavBarLogo from "../NavBar/NavBarLogo";
import { XMarkIcon } from '@heroicons/react/24/solid'
// x-mark
const BurgerMenu = ({ label = "burger_menu" }) => {

    return (
        <div className={`${label} burger_menu_hidden w-80 h-full z-50 fixed right-0 top-0 bg-black/95 flex flex-col hidden`}>
            <div className="flex flex-row flex-nowrap place-content-between">
                <NavBarLogo
                    link='/'
                    src='/assets/img/rr-logo.svg'
                    label='BearTeddy.fun'
                />
                <button >
                    <XMarkIcon className="h-10 w-10 pt-1 text-blue-500" />
                </button>
            </div>
            <hr className="my-2" />
            <StyledBurgerLink to='/autors'>Autors</StyledBurgerLink>
            <StyledBurgerLink to='/login'>Login</StyledBurgerLink>
        </div>
    )
};

export default BurgerMenu;

// class Example extends React.Component {
//     showSettings(event) {
//         event.preventDefault();
//     }

//     render() {
//         // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
//         return (
//             <Menu>
//                 <a id="home" className="menu-item" href="/">Home</a>
//                 <a id="about" className="menu-item" href="/about">About</a>
//                 <a id="contact" className="menu-item" href="/contact">Contact</a>
//                 <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
//             </Menu>
//         );
//     }
// }
