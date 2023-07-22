import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUserById } from "../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";
import localStorageService from "../services/localStorage.service";
// import { loadQualitiesList } from "../../../store/qualities";
// import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        // dispatch(loadQualitiesList());
        // dispatch(loadProfessionsList());
        if (isLoggedIn) {
            const userId = localStorageService.getUserId(); // dispatch(getCurrentUserId());
            dispatch(loadUserById(userId));
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