import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLoguot = () =>
        dispatch(logOut())
            .unwrap()
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                window.location.reload();
            });
    return handleLoguot;
};

export default useLogout;
