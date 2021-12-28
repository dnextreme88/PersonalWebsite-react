import { React, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { logout } from "../features/Auth";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.value);

    useEffect(() => {
        axios.post('http://localhost:3001/passport/auth/user/signout', null, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                console.log(response);
                console.log(`LOG: ${response.data.message}`);
                navigate('/', { replace: true });
                dispatch(logout());
            })
            .catch((error) => {
                console.log(error.response.data);
                console.log(error);
            });
    }, [auth.bearerToken, dispatch, navigate]);

    if (auth.bearerToken.length < 1) {
        console.log(`LOG: Cannot log out if you're not logged in! Redirecting...`);
        return <Navigate to='/login' />
    }

    return null;
}

export default Logout;