import React from 'react'
import './Auth.scss'

import SocialImg from "../../img/socialmedia.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, logIn } from "../../actions/AuthAction.js"

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    console.log(loading)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isError, setIsError] = useState({
        state: false,
        msg: ""
    });

    // const handleError = () => {
    //     setIsError({ ...isError, state: !isError.state })
    // }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const validateForm = (data) => {
        for (let key in data) {
            if (key.value === "") {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {

            validateForm(data) && data.password === data.confirmPassword ?
                dispatch(signUp(data))
                : setIsError({ ...isError, state: true, msg: "Confirm password not same" });
        }
        else {
            data.email && data.password ?
                dispatch(logIn(data)) :
                setIsError({ ...isError, state: true, msg: "Please enter email or password!" });
        }

    }

    return (
        <div className='Auth'>
            {/* Left side */}
            <div className='auth-img'>
                <div className="webName">
                    <h1>NVT Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>

                <img src={SocialImg} alt="" />

            </div>
            {/* Right side */}
            <div className="auth-right">
                <form className='formAuth' onSubmit={handleSubmit}>
                    <h3>{isSignUp ? 'Sign up' : 'Sign In'}</h3>

                    {
                        isSignUp &&
                        <div>
                            <input type='text'
                                placeholder='First Name'
                                className='infoInput'
                                name="firstName"
                                onChange={handleChange} />

                            <input type='text'
                                placeholder='Last Name'
                                className='infoInput'
                                name="lastName"
                                onChange={handleChange} />
                        </div>
                    }


                    <div>
                        <input type='text'
                            placeholder='Email'
                            className='infoInput'
                            name="email"
                            onChange={handleChange} />
                    </div>

                    <div>
                        <input type='password'
                            placeholder='Password'
                            className='infoInput'
                            name="password"
                            onChange={handleChange} />
                        {
                            isSignUp &&
                            <input type='password'
                                placeholder='Confirm Password'
                                className='infoInput'
                                name="confirmPassword"
                                onChange={handleChange} />
                        }

                    </div>
                    {
                        isError.state &&
                        <span className='err-message'>*{isError.msg}</span>
                    }


                    <div>
                        {
                            isSignUp ?
                                <span>
                                    Already have an account.&nbsp;
                                    <span style={{ color: "orange", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}
                                        onClick={() => setIsSignUp((prev) => !prev)}
                                    >Login!</span>
                                </span>
                                :
                                <span>
                                    Don't have an account.&nbsp;
                                    <span style={{ color: "orange", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}
                                        onClick={() => setIsSignUp((prev) => !prev)}
                                    >Sign up!</span>
                                </span>

                        }
                        <button className='btn btn-SignUp' type='Submit' disabled={loading}>
                            {loading ? "Loading..." : isSignUp ? "Sign up" : "Log in"}
                        </button>
                    </div>


                </form>
            </div >

        </div >
    )
}


export default Auth
