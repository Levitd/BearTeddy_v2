import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUserById } from "../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";
import localStorageService from "../services/localStorage.service";
import { loadShopByIdUser } from "../store/shops";
import { getProductIsLoading, loadProducts } from "../store/products";
// import { loadProducts } from "../store/products";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUsersLoadingStatus());
    const isLoadingProducts = useSelector(getProductIsLoading());
    if (!isLoadingProducts) dispatch(loadProducts());
    useEffect(() => {
        if (isLoggedIn) {
            const userId = localStorageService.getUserId();
            dispatch(loadUserById(userId));
            dispatch(loadShopByIdUser(userId));

        }
    }, [isLoggedIn, dispatch]);
    if (userStatusLoading) return "Loading...";

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};

export default AppLoader;
