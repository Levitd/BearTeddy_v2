import React, { useEffect, useState } from "react";
import Page from "../page";
import configFile from "../../config.json";
import { FormattedDate, FormattedRelativeTime } from "react-intl";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAutorsProductList, loadAutorProducts } from "../../store/autorProducts";
import { getAutorOfProduct } from "../../store/activeProduct";

const MoreFromAutordList = ({ title }) => {
    const dispatch = useDispatch();
    const autorOfProduct = useSelector(getAutorOfProduct());
    useEffect(() => {
        if (autorOfProduct) {
            dispatch(loadAutorProducts(autorOfProduct));
        }
    }, [autorOfProduct, dispatch]);

    const products = useSelector(getAutorsProductList());
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (products) setLoad(true);
    }, [load, products]);

    if (!products) return "Loading...";
    if (products) {
        return (
            <Page title={title} widthScreen="flex flex-row flex-wrap gap-5 mb-2">
                {
                    products.map((prod) => {
                        return (
                            <div key={"v_" + prod._id} className="w-32 sm:w-36 md:w-40 mx-auto">
                                <div className="flex flex-col">
                                    <NavLink to={"/myshop/products/" + prod._id}>
                                        <img
                                            src={configFile.imgPreviewPath + prod.img}
                                            className='inline-block w-32 sm:w-36 md:w-40 rounded-t-md h-auto border-2 shadow-inner'
                                            alt={`Prodict${prod.name}`}
                                        />
                                    </NavLink>
                                    <div className="px-2 bg-slate-100  rounded-b-md border-2 shadow-inner">
                                        <div className="line-clamp-1 text-sm lg:text-base font-normal text-sky-800 text-center">{prod.name}</div>
                                        <div className="text-xs lg:text-sm font-light text-gray-600 ">
                                            {
                                                ((prod.create - Date.now()) / 1000 > -2678400) &&
                                                <FormattedRelativeTime value={(prod.create - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={60} />
                                            }
                                            {
                                                ((prod.create - Date.now()) / 1000 < -2678400) &&
                                                <FormattedDate value={prod.create} year="numeric" month="long" day="2-digit" />
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

            </Page>
        );
    }
}

export default MoreFromAutordList;
