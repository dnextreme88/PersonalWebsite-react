import { React, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from './Login.module.css'
import { login } from '../features/Auth'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [bearerToken, setBearerToken] = useState('')
    const [tokenValidity, setTokenValidity] = useState('')
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    function handleOnSubmit(event) {
        event.preventDefault()

        axios.post('http://localhost:3001/passport/auth/user/signin', {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        })
            .then((response) => {
                // Set the states
                setBearerToken(response.data.data.token)
                setTokenValidity(response.data.data.tokenValidity)
                setUserId(response.data.data.user.id)
                setUsername(response.data.data.user.username)
                setEmail(response.data.data.user.email)

                navigate('/profile', { replace: true })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        dispatch(
            login({
                bearerToken: bearerToken,
                tokenValidity: tokenValidity,
                userId: userId,
                username: username,
                email: email,
            })
        )
    }, [bearerToken, tokenValidity, userId, username, email, dispatch])

    return (
        <div>
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <div className={classes.control}>
                    <label htmlFor='title'>Email</label>
                    <input type='text' id='email' ref={emailInputRef} required />
                </div>

                <div className={classes.control}>
                    <label htmlFor='title'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef} required />
                </div>

                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login