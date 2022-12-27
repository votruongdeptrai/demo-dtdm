import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from '../../helpers/axios'
import './style.css'

const ResetPassword = () => {

    const [password, setPassword]= useState('')
    const [cf_password, setCf_Password]= useState('')
    const [success, setSuccess]= useState('')
    const {token} = useParams()

    const history = useHistory()

    const handleReset = async () => {
        if (password === '' || cf_password === '') {
            return
        }
        if (cf_password !== password) {
            setSuccess('Confirm is not match!')
        }
        try {
            const res = await axios.post('/auth/reset', {password, user: token}, {
                headers: {Authorization: `Bearer ${token}`}
            })

            return setSuccess(res.data.msg)

        } catch (err) {
            
            console.log(err)
        }
    }

    return (
        <div className="reset_container">
            {success ? <p>{success}</p>: ''}
            <span>Reset Password</span>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter password'/>
            <input onChange={(e) => setCf_Password(e.target.value)} value={cf_password} type="password" placeholder='Enter Confirm Passwword'/>
            {!success ? <button onClick={handleReset}>Change</button> : <button onClick={() => history.push('/')}>Shop Now</button>}
        </div>
    )
}

export default ResetPassword