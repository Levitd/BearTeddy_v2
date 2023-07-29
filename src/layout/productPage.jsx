import React, { useEffect, useState } from "react";
import Page from "../components/page";
import { useDispatch, useSelector } from "react-redux";
import configFile from "../config.json";
import { FormattedMessage } from "react-intl";
import { getCurrentUserId } from "../store/users";
import ViewedList from "../components/ui/viewedList";
import { getActiveProductIsLoading, getAutorOfProduct, getProductActive, getProductActiveDataLoaded, loadActiveProducts } from "../store/activeProduct";
import { useLocation, useParams } from "react-router-dom";
import { updateViewedProducts } from "../store/viewed";
// import { loadAutorProducts } from "../store/autorProducts";
import MoreFromAutordList from "../components/ui/moreFromAutor";

const ProductPage = () => {
    const dispatch = useDispatch();
    const param = useParams();

    //TODO запрос товар этого автора
    const currentUser = useSelector(getCurrentUserId());

    const location = useLocation();
    const path = location.pathname;

    // Active Product Loading
    const loadingAP = useSelector(getActiveProductIsLoading());
    const [isLoadingAP, setIsLoadingAP] = useState(loadingAP);

    const APLoadData = useSelector(getProductActiveDataLoaded());
    const [loadedDataAP, setloadedDataAP] = useState(APLoadData);

    let idActiveProduct = param._id;

    useEffect(() => {
        if (!isLoadingAP) {
            dispatch(loadActiveProducts(idActiveProduct));
        }
        setIsLoadingAP(loadingAP);
        setloadedDataAP(APLoadData);

    }, [loadingAP, path, dispatch, APLoadData, idActiveProduct])
    const activeProduct = useSelector(getProductActive());

    // Viewed
    useEffect(() => {
        dispatch(updateViewedProducts(activeProduct, currentUser, idActiveProduct));
    }, [activeProduct, dispatch, currentUser, idActiveProduct]);

    if (!loadedDataAP) return "Loading..."

    return (
        <Page title={activeProduct.name} noTranslate={true} widthScreen="flex flex-row flex-wrap gap-5 mb-20 lg:mb-2">
            <div className="flex flex-row flex-wrap gap-5">
                <img
                    src={configFile.imgPreviewPath + activeProduct.img}
                    className='inline-block w-32 sm:w-56 md:w-64 rounded-md h-auto border-2 shadow-inner'
                    alt={`Prodict${activeProduct.name}`}
                />
                <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 max-w-md">
                    <p>{activeProduct.about}</p>
                    <div className="py-2 flex flex-row text-blue-700">
                        <FormattedMessage id={"shipping"} />:
                        <p className="pl-2">{activeProduct.shipping} USD</p>
                    </div>
                    <div className="py-2 flex flex-row">
                        <FormattedMessage id={"order_info"} />:
                        <p className="pl-2">{activeProduct.orderInfo}</p>
                    </div>
                    <div className="py-2 flex flex-row">
                        <FormattedMessage id={"ret_ref_policy"} />:
                        <p className="pl-2">{activeProduct.rrpolicy}</p>
                    </div>
                    <div className="py-2 flex flex-row">
                        <FormattedMessage id={"payment_options"} />:
                        <p className="pl-2">{activeProduct.payment_options}</p>
                    </div>
                    <img
                        src={configFile.imgPath + "order-now-orange.webp"}
                        className='inline-block w-20 sm:w-22 md:w-24'
                        alt={`Click to order`}
                    />
                </div>
                <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 max-w-md min-w-[30%]">
                    About autor
                </div>
                <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 max-w-md min-w-[30%]">
                    Comments
                </div>
                <div className="w-full grid grid-flow-row lg:grid-flow-col gap-5 auto-rows-fr">
                    {/* <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 lg:w-[100%]"> */}
                    <MoreFromAutordList title={"more_from_autor"} />
                    {/* </div>
                    <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 lg:w-[100%]"> */}
                    <ViewedList title={"recently_viewed"} />
                    {/* </div> */}
                </div>
            </div>
        </Page>
    );
}

export default ProductPage;
