import React from 'react'
import './style.css' 
import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div className='loading_process'>
        <CircularProgress />
    </div>
  )
}

export default Loading