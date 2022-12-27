import React, { useState } from 'react'
import axios from '../../helpers/axios'
import './style.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')

    const handleForgot = async () => {
        if (email === '') {
            return 
        }
        try {
            const res = await axios.post('/auth/forgot', {email})
            return setSuccess(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="forgot_pass_container">
            <div className="forgot_message">
                <span>{success ? success : ''}</span>
            </div>
            <div className="forgot_pass_header">
                <span>Forgot Password</span>
            </div>
            <div className="forgot_pass_content">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Enter your email' />
            </div>
            <button onClick={handleForgot}>CONTINUE</button>
        </div>
    )
}

export default ForgotPassword