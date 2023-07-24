import React, { useEffect, useState } from "react";
import Page from "../page";
import { useSelector } from "react-redux";
import { getProductList, getProductLoading, loadProducts } from "../../store/products";
import configFile from "../../config.json";

const ProductList = () => {
    const products = useSelector(getProductList());
    if (products) {
        return (
            <Page widthScreen="flex flex-row flex-wrap gap-5 mb-20 lg:mb-2">
                {
                    products.map((prod) => {
                        // console.log(prod);
                        return (
                            <div key={prod._id} className="w-32 sm:w-56 md:w-64 mx-auto">
                                <div className="flex flex-col">
                                    <img
                                        src={configFile.imgPreviewPath + prod.img}
                                        className='inline-block w-32 sm:w-56 md:w-64 rounded-md h-auto'
                                        alt={`Prodict${prod.name}`}
                                    />
                                    <div className="block text-sm lg:text-base font-medium text-sky-800 text-center">{prod.name}</div>
                                    <div className="block text-xs lg:text-sm font-medium text-pink-950 text-center">{"by TeddyRus"}</div>
                                    <div className="block text-xs lg:text-sm font-medium text-slate-500 text-center">{prod.country}</div>
                                    <div className="block text-sm lg:text-base font-medium text-slate-700 text-center">{prod.price} USD</div>
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
