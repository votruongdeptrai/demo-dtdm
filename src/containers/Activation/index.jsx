import React, { useEffect, useState } from 'react'
import './style.css'
import { useParams } from 'react-router-dom'
import axios from '../../helpers/axios'

const Activation = () => {
    const { activation_token } = useParams()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('auth/activation', {activation_token})
                    setSuccess(res.data.msg)

                } catch (err) {
                    setError('Activation email has expried!')
                }
            }
            activationEmail()
        }
    },[activation_token])

    const renderError = () => (
        <div className="activation_error">
            <div className="error_name">
                {error}
            </div>
            <div className="error_icon">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
        </div>
    )

    const renderSuccess = () => (
        <div className="activation_success">
            <div className="success_name">
                {success}
            </div>
            <div className="success_icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>
        </div>
    )
  return (
    <div className='activation_email'>
        {success ? renderSuccess() : renderError()}
    </div>
  )
}

export default Activation