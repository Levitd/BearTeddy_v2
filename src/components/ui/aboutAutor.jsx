import React, { useEffect, useState } from "react";
import Page from "../page";
import configFile from "../../config.json";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAutorOfProduct } from "../../store/activeProduct";
import SpinnerLader from "../SpinnerLoader";
import { getAutorActive, loadActiveAutor } from "../../store/activeAutor";
import Title from "../title";
import StyledNavLink from "../StyledNavLink";

const AboutAutor = ({ title, addStyle }) => {
    const dispatch = useDispatch();
    const autorOfProduct = useSelector(getAutorOfProduct());
    useEffect(() => {
        if (autorOfProduct) {
            dispatch(loadActiveAutor(autorOfProduct));
        }
    }, [autorOfProduct, dispatch]);

    const autor = useSelector(getAutorActive());
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (autor) setLoad(true);
    }, [load, autor]);

    console.log(autor);
    // if (!products) return "Loading...";
    return (
        <>
            {!autor && <SpinnerLader />}
            {autor &&
                <Page title={title} addStyle={addStyle} widthScreen={" flex flex-row flex-wrap gap-5 mb-2"} pageMargin="">
                    <div key={"v_" + autor._id} className="h-32 sm:h-36 mx-auto">
                        <div className="flex flex-row">
                            <NavLink to={"/profile/" + autor._id}>
                                <img
                                    src={configFile.imgProfilePath + autor.profile}
                                    className='inline-block h-32 sm:h-36 rounded-t-md w-auto border-2 shadow-inner'
                                    alt={`Prodict${autor.name}`}
                                />
                            </NavLink>
                            <div className="px-2 bg-slate-100  rounded-b-md border-2 shadow-inner">
                                <Title>
                                    {autor.flName}
                                </Title>
                                <div className="flex flex-row flex-nowrap">
                                    <img
                                        src={configFile.imgProfilePath + `icons8-telegram.svg`}
                                        className='inline-block h-4 sm:h-6 rounded-t-md w-auto border-2 shadow-inner'
                                        alt={`Telegramm`}
                                    />
                                    <StyledNavLink to={autor.telegram} target="_blanck">Telegramm</StyledNavLink>
                                </div>
                                {/* <div className="line-clamp-1 text-sm lg:text-base font-normal text-sky-800 text-center">{autor.telegram}</div> */}
                                {/* <div className="text-xs lg:text-sm font-light text-gray-600 ">
                                    {
                                        ((prod.create - Date.now()) / 1000 > -2678400) &&
                                        <FormattedRelativeTime value={(prod.create - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={60} />
                                    }
                                    {
                                        ((prod.create - Date.now()) / 1000 < -2678400) &&
                                        <FormattedDate value={prod.create} year="numeric" month="long" day="2-digit" />
                                    }
                                </div> */}
                            </div>

                        </div>
                    </div>
                </Page>
            }</>
    );
}

export default AboutAutor;
