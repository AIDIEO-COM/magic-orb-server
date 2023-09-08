import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { profileLog, userLoggedIn, userLoggedOut } from '../redux-rtk/features/auth/authSlice';

export default function useAuthCheck() {

    // global and states
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // get data from cookie
        const accessToken = Cookies.get('accessToken');
        const _id = Cookies.get('_id');

        if (accessToken && _id) {
            const headers = { Authorization: `Bearer ${accessToken}` };

            // getting logged user data
            fetch(`${import.meta.env.VITE_BACKEND_URL}user/profile`, { headers })
                .then(response => response.json())
                .then(data => {

                    setAuthChecked(true);

                    // storing data from cookies
                    dispatch(
                        userLoggedIn({
                            accessToken: accessToken,
                            isAuthenticated: true,
                            _id: _id,
                            user: data.data
                        })
                    );
                })
                .catch(error => {
                    console.error(error)
                    dispatch(userLoggedOut())
                    setAuthChecked(false);
                });
        } else {
            setAuthChecked(true);
        }

    }, [dispatch, setAuthChecked]);

    return authChecked;
}