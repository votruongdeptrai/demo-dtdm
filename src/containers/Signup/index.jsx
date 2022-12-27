import React, { useEffect, useState, memo } from 'react'
import './style.css'
import { Modal, Box, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/auth.action'

const Signup = ({ open, handleClose }) => {
    const [openModal, setOpenModal] = useState(false)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [cf_password, setCfPassword] = useState('')
    const dispatch = useDispatch()
    const style = {
        backgroundColor: '#fff',
        margin: 'auto',
        outline: 'none'
    }

    const styleModal = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#388e3c',
        padding: '30px',
        margin: 'auto',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 500
    }

    const auth = useSelector(state => state.auth)
    const { message } = auth


    const handleSignup = () => {
        const newUser = { firstName, lastName, email, password, cf_password }
        dispatch(register(newUser))
        handleClose()
    }
    useEffect(() => {
        if (message) {
            setOpenModal(true)
        }

    }, [message])

    const modalSuccess = () => (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            style={{display: 'flex', margin: 'auto'}}
        >
            <Box sx={{ ...styleModal, width: 500, }}>
                <span style={{display: 'inline-block', width: '100%', marginBottom: 30}} id="parent-modal-title">{message ? message : ''}</span>
                <div style={{textAlign: 'center'}}><i style={{fontSize: 30}} class="fa-solid fa-circle-check"></i></div>
            </Box>
        </Modal>
    )


    return (

        <>
            {openModal ? modalSuccess() : ''}
            <Modal
                style={{ display: 'flex', alignItem: 'center', margin: 'auto' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div className="login_form">
                        <span onClick={handleClose}><i class="fa-solid fa-xmark"></i></span>
                        <div className="login_container">
                            <div className="login_image">
                                <span>Looks like you're new here!</span>
                                <p>Sign up with your mobile number to get started</p>
                            </div>
                            <div className="signup_content">
                                <div className="input_email">
                                    <FormControl style={{ width: '100%' }} error={false} variant="standard">
                                        <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="firstName">Enter first name</InputLabel>
                                        <Input
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            aria-describedby="firstName"
                                        />
                                        {/* <FormHelperText id="firstName">Error</FormHelperText> */}
                                    </FormControl>
                                </div>
                                <div className="input_email">
                                    <FormControl style={{ width: '100%' }} error={false} variant="standard">
                                        <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="lastName">Enter last name</InputLabel>
                                        <Input
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            aria-describedby="lastName"
                                        />
                                        {/* <FormHelperText id="lastName">Error</FormHelperText> */}
                                    </FormControl>
                                </div>
                                <div className="input_email">
                                    <FormControl style={{ width: '100%' }} error={false} variant="standard">
                                        <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="email">Enter email</InputLabel>
                                        <Input
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-describedby="email"
                                        />
                                        {/* <FormHelperText id="email">Error</FormHelperText> */}
                                    </FormControl>
                                </div>
                                <div className="input_password">
                                    <FormControl style={{ width: '100%' }} error={false} variant="standard">
                                        <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="password">Enter password</InputLabel>
                                        <Input
                                            id="password"
                                            value={password}
                                            type='password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-describedby="password"
                                        />
                                        {/* <FormHelperText id="password">Error</FormHelperText> */}
                                    </FormControl>
                                </div>
                                <div className="input_confirm_password">
                                    <FormControl style={{ width: '100%' }} error={false} variant="standard">
                                        <InputLabel style={{ color: '#878787', zIndex: 2 }} htmlFor="confirm_password">Enter confirm password</InputLabel>
                                        <Input
                                            id="confirm_password"
                                            value={cf_password}
                                            type='password'
                                            onChange={(e) => setCfPassword(e.target.value)}
                                            aria-describedby="confirm_password"
                                        />
                                        {/* <FormHelperText id="password">Error</FormHelperText> */}
                                    </FormControl>
                                </div>

                                <div className="signup_policy">
                                    <span>By continuing, you agree to PV's <span>Terms of Use</span> and <span>Privacy Policy.</span></span>
                                </div>
                                <div onClick={handleSignup} className="signup_btn">
                                    <span>CONTINUE</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Signup