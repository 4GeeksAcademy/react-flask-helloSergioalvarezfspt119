import React from 'react'
import { register } from '../api/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const registerSuccess = async (e) => {
        e.preventDefault();

        const body = { "email": email, "password": password }

        const { data, status } = await register(body)

        if (status == 400) {
            return alert('User already registered!')
        }
        if (status == 200) {
            alert('User register successfully')
            return navigate('/login')
        }
        setPassword('')
        setEmail('')
    }

    const recoverEmail = (e) => {
        setEmail(e.target.value)
    }
    const recoverPassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        <>
            <div className='blurredTop'>

            </div>

            <div className='body sunrise d-flex justify-content-evenly align-items-center flex-column'>
                <div>
                    <h1 className='newFont'>Register!</h1>
                </div>

                <form onSubmit={registerSuccess} className='container m-1 p-4 form-register'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="text" placeholder='example@gmail.com' id='email' className='form-control' onChange={recoverEmail} />

                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" placeholder='ultra-secret-password' id='password' className='form-control' onChange={recoverPassword} />

                    <button type='submit' className='btn btn-success mt-1'>Submit</button>
                </form>
            </div>
            <div className='blurredBottom'>

            </div>
        </>
    )
}
