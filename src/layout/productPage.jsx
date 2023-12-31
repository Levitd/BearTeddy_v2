import React, { useEffect, useState } from "react";
import Page from "../components/page";
import { useDispatch, useSelector } from "react-redux";
import configFile from "../config.json";
import { FormattedMessage } from "react-intl";
import { getCurrentUserId, getIsLoggedIn } from "../store/users";
import ViewedList from "../components/ui/viewedList";
import { getActiveProductIsLoading, getProductActive, getProductActiveDataLoaded, loadActiveProducts } from "../store/activeProduct";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { updateViewedProducts } from "../store/viewed";
// import { loadAutorProducts } from "../store/autorProducts";
import MoreFromAutordList from "../components/ui/moreFromAutor";
import SpinnerLader from "../components/SpinnerLoader";
import AboutAutor from "../components/ui/aboutAutor";
import Comments from "../components/ui/comments";
import { PencilSquareIcon } from '@heroicons/react/24/solid';

const ProductPage = () => {
    const dispatch = useDispatch();
    const param = useParams();

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

    // if (!loadedDataAP) return "Loading..."
    const addStyle = "xl:col-span-2 w-full";
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            {!loadedDataAP && (
                <SpinnerLader />
            )}
            {loadedDataAP && (

                <Page title={activeProduct.name} noTranslate={true} widthScreen="flex flex-row flex-wrap gap-5 mb-20 lg:mb-2">
                    <div className="grid grid-row gap-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
                        <div>
                            {isLoggedIn && currentUser === activeProduct.user_id &&
                                <div className="relative">
                                    <NavLink to={"/myshop/products/" + activeProduct._id + "/edit"}>
                                        <PencilSquareIcon className="h-12 w-12 text-slate-600 hover:text-slate-900 p-2 absolute cursor-pointer hover:scale-150 transition-transform duration-300 left-3 top-3" />
                                    </NavLink>
                                </div>
                            }
                            {activeProduct.image && activeProduct.image.length > 0 &&
                                <img className="inline-block w-32 sm:w-56 md:w-64 rounded-md h-auto border-2 shadow-inner" src={`${configFile.imgPreviewPathFirebaseStorige}${activeProduct.image[0].name}?alt=media&token=${activeProduct.image[0].token}`} alt="" key={`activeProductImage_${activeProduct.image[0].name}`} />
                            }
                            {/* <img
                                src={configFile.imgPreviewPathFirebaseStorige + activeProduct.img[0]}
                                className='inline-block w-32 sm:w-56 md:w-64 rounded-md h-auto border-2 shadow-inner'
                                alt={`Prodict${activeProduct.name}`}
                            /> */}
                        </div>
                        <div className="rounded-md h-auto border-2 shadow-inner bg-white text-blue-900  text-sm lg:text-base font-normal p-2 md:col-span-2 xl:col-span-3">
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
                        <AboutAutor title={"autor"} addStyle={"md:col-span-3 " + addStyle} />
                        <Comments title={"comments"} addStyle={"md:col-span-3 " + addStyle} />
                        <MoreFromAutordList title={"more_from_autor"} addStyle={"md:col-span-3 " + addStyle} />
                        <ViewedList title={"recently_viewed"} addStyle={"md:col-span-3 " + addStyle} />
                    </div>
                </Page>
            )}
        </>
    );
}

export default ProductPage;
