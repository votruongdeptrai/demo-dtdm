import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Box, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material'
import { googlelogin, login, loginWithFb } from '../../actions'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { useHistory } from 'react-router-dom'

const Login = ({ open, handleClose }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const auth = useSelector(state => state.auth)
    const history = useHistory()

    const dispatch = useDispatch()
    const style = {
        backgroundColor: '#fff',
        margin: 'auto',
        outline: 'none'
    }

    useEffect(() => {
        if (auth.error === 'User does not exist.') {
            setErrorEmail(auth.error)
        } else {
            setErrorPassword(auth.error)
        }
        if (!auth.error) {
            handleClose()
        }
    }, [auth.error])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({
            email, password
        }))
    }

    const handleCloseForm = () => {
        handleClose()
        setErrorEmail(false)
        setErrorPassword(false)
    }

    const responseGoogle = async (response) => {
        try {
            // const res = await axios.post('auth/google_login', {tokenId: response.tokenId})
            dispatch(googlelogin({ tokenId: response.tokenId }))
            handleClose()
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            dispatch(loginWithFb({accessToken, userID}))
            handleClose()
        } catch (error) {
            console.log(error.response.data.msg)
        }
      }


    return (

        <Modal
            style={{ display: 'flex', alignItem: 'center', margin: 'auto' }}
            open={open}
            onClose={handleCloseForm}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <div className="login_form">
                    <span onClick={handleCloseForm}><i class="fa-solid fa-xmark"></i></span>
                    <div className="login_container">
                        <div className="login_image">
                            <span>Login</span>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="login_content">
                            <div className="input_email">
                                <FormControl style={{ width: '100%' }} error={errorEmail} variant="standard">
                                    <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="email">Enter email</InputLabel>
                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-describedby="email"
                                    />
                                    <FormHelperText id="email">{errorEmail ? auth.error : ''}</FormHelperText>
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
                                    <FormHelperText id="password">{errorPassword ? auth.error : ''}</FormHelperText>
                                </FormControl>
                                <span onClick={() => history.push('/forgot_password')}>Forgot?</span>
                            </div>

                            <div className="login_policy">
                                <span>By continuing, you agree to PV's <span>Terms of Use</span> and <span>Privacy Policy.</span></span>
                            </div>
                            <div onClick={handleSubmit} className="login_btn">
                                <span>Login</span>
                            </div>
                            <div className="login_or">
                                <span>OR</span>
                            </div>
                            <div className="login_OTP">
                                <span>Request OTP</span>
                            </div>

                            <div className="login_social">
                                <GoogleLogin
                                    clientId="893481802522-vce9sb0li7mn5o18utprkm85tboqm1ra.apps.googleusercontent.com"
                                    buttonText="Login with google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <FacebookLogin
                                    appId="1147597782754537"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    // onClick={componentClicked}
                                    callback={responseFacebook} 
                                    icon="fa-facebook"
                                    cssClass="my-facebook-button-class"
                                />
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default Login