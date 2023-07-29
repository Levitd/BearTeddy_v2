import React from "react";
import Page from "../page";
import configFile from "../../config.json";
import { FormattedRelativeTime } from "react-intl";
import { getViewedProduct } from "../../services/localStorage.service";
import { NavLink } from "react-router-dom";

const ViewedList = ({ title }) => {
    const viewed = getViewedProduct();// useSelector(getViewedIdList())[0].products;
    if (viewed) {
        return (
            <Page title={title} widthScreen="flex flex-row flex-wrap gap-5 mb-2">
                {
                    viewed.map((prod) => {
                        // console.log(prod);
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
                                            <FormattedRelativeTime value={(prod.time_viewed - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={(Date.now() - prod.time_viewed) / 1000 > 60 ? 60 : 1} />
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

export default ViewedList;
