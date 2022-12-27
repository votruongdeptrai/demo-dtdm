import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Box, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material'
import { login } from '../../actions'
import Layout from '../../components/Layout'
import { useHistory } from 'react-router-dom'

const LoginPage = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const history = useHistory()

    const { location } = props;
    const { state } = location;

    useEffect(() => {
        if (auth.error === 'User does not exist.') {
            setErrorEmail(auth.error)
        } else {
            setErrorPassword(auth.error)
        }
    }, [auth.error])

    const handleSubmit = () => {
        dispatch(login({
            email, password
        }))
    }

    useEffect(() => {
        if (auth.authenticate) {
            if (state && state.from) {
                history.replace(state.from);
            }
            else {
                history.replace('/');
            }
        }
    })


    return (
        <div className="login_page_form">
            <div style={{ position: 'absolute', top: 10, right: 340, color: '#2874f0', fontSize: 14, fontWeight: 500 }} className="signup_button">Sign up</div>
            <div className="login_page_container">
                <div className="login_page_image">
                    <span>Login</span>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <div className="login_page_content">
                    <div className="input_email">
                        <FormControl style={{ width: '100%' }} error={errorEmail} variant="standard">
                            <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="email">Enter email</InputLabel>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="email"
                            />
                            <FormHelperText id="email">{errorEmail ? errorEmail : ''}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="input_password">
                        <FormControl style={{ width: '100%' }} error={errorPassword} variant="standard">
                            <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="password">Enter password</InputLabel>
                            <Input
                                id="password"
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                aria-describedby="password"
                            />
                            <FormHelperText id="password">{errorPassword ? errorPassword : ''}</FormHelperText>
                        </FormControl>
                        <span>Forgot?</span>
                    </div>

                    <div className="login_page_policy">
                        <span>By continuing, you agree to PV's <span>Terms of Use</span> and <span>Privacy Policy.</span></span>
                    </div>
                    <div onClick={handleSubmit} className="login_page_btn">
                        <span>Login</span>
                    </div>
                    <div className="login_page_or">
                        <span>OR</span>
                    </div>
                    <div className="login_page_OTP">
                        <span>Request OTP</span>
                    </div>

                    <div className="login_page_social">
                        <div className="login_page_social_item login_google">
                            <i class="fa-brands fa-google"></i>
                        </div>
                        <div className="login_social_item login_facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                        </div>
                        <div className="login_social_item login_twitter">
                            <i class="fa-brands fa-twitter"></i>
                        </div>
                        <div className="login_social_item login_instagram">
                            <i class="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage