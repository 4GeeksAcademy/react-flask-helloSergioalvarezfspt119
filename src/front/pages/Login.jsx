import React from 'react'


import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'


export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {store, dispatch} = useGlobalReducer()

    const loginSuccess = async (e) => {
        const body = {
            "email": email, "password": password}
        e.preventDefault();

            const data = await login(body)
            if(data.status == 400){
                alert('User or Password Incorrect')
                console.log("esto es data", data)
            }
            if(data.status == 200){
                dispatch({type: 'userOnline'})
                navigate('/privateHome')
            }

    }
    
    

    const recoverEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    const recoverPassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }


  return (
    <>
        <div className='blurredTop login'>

        </div>
    <div className='body evening d-flex justify-content-evenly align-items-center flex-column'>

        <div>
            <h1 className='newFont'>Log in!</h1>
        </div>

        <form onSubmit={loginSuccess} className='container m-1 p-4 form-register'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="text" placeholder='example@gmail.com' id='email' className='form-control' onChange={recoverEmail} />

            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" placeholder='ultra-secret-password' id='password' className='form-control' onChange={recoverPassword} />

            <button type='submit' className='btn btn-success mt-1'>Submit</button>
        </form>
    </div>
        <div className='blurredBottom login'>

        </div>
    </>
  )
}