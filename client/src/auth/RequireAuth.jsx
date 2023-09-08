import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {

    // globals
    const location = useLocation()
    const auth = useSelector((state) => state.auth);

    return (
        auth?.isAuthenticated
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location.pathname }} replace />
    )
}

export default RequireAuth