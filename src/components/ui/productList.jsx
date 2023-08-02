import React from "react";
import Page from "../page";
import { useSelector } from "react-redux";
import { getProductList } from "../../store/products";
import configFile from "../../config.json";
// import { displayDate } from "../../utils/displayDate";
import { FormattedDate, FormattedRelativeTime } from "react-intl";
import { HeartIcon } from '@heroicons/react/24/solid';
import { NavLink } from "react-router-dom";

const ProductList = ({ title }) => {
    const products = useSelector(getProductList());
    if (products) {
        return (
            <Page title={title} widthScreen="flex flex-row flex-wrap gap-5 mt-2 mb-20 lg:mb-2">
                {
                    products.map((prod) => {
                        // console.log(prod);
                        return (
                            <div key={prod._id} className="w-32 sm:w-56 md:w-64 mx-auto">
                                <div className="flex flex-col">
                                    <NavLink to={"/myshop/products/" + prod._id}>
                                        <img
                                            src={configFile.imgPreviewPath + prod.img[0]}
                                            className='inline-block w-32 sm:w-56 md:w-64 rounded-t-md h-auto border-2 shadow-inner'
                                            alt={`Prodict${prod.name}`}
                                        />
                                    </NavLink>
                                    <div className="px-2 bg-slate-100  rounded-b-md border-2 shadow-inner">

                                        <NavLink to={"/myshop/products/" + prod._id}>
                                            <p className="line-clamp-1 text-sm lg:text-base font-normal text-sky-800 text-center hover:scale-125 transition-transform duration-300">{prod.name}</p>
                                        </NavLink>
                                        <div className="block text-xs lg:text-sm font-medium text-pink-950 text-center">{"by TeddyRus"}</div>
                                        <div className="block text-xs lg:text-sm font-light text-slate-500 text-center">{prod.country}</div>
                                        <div className="block text-sm lg:text-base font-medium text-slate-700 text-center">{prod.price} USD</div>
                                        <div className="flex flex-row flex-nowrap justify-between content-center">
                                            <div className=" text-xs lg:text-sm font-mono font-light text-slate-400 text-left">
                                                {
                                                    ((prod.create - Date.now()) / 1000 > -2678400) &&
                                                    <FormattedRelativeTime value={(prod.create - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={60} />
                                                }
                                                {
                                                    ((prod.create - Date.now()) / 1000 < -2678400) &&
                                                    <FormattedDate value={prod.create} year="numeric" month="long" day="2-digit" />
                                                }
                                            </div>
                                            <div className="flex flex-row flex-nowrap">
                                                <HeartIcon className="h-6 w-6 text-red-300 hover:text-red-800 pb-2" />
                                                {/*TODO add like counter   */}
                                                <div className=" text-xs lg:text-sm font-mono font-light text-slate-400 text-left">{"76"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Page>
        );
    }
}

export default ProductList;