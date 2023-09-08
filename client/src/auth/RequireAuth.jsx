import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loginUrl } from "../configs/constants";

const RequireAuth = () => {

    // globals
    const location = useLocation()
    const auth = useSelector((state) => state.auth);

    return (
        auth?.isAuthenticated
            ? <Outlet />
            : <Navigate to={loginUrl} state={{ from: location.pathname }} replace />
    )
}

export default RequireAuth