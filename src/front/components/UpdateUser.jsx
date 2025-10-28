import { useState } from 'react'
import { updateEmail } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';


export default function UpdateUser() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()

    const updateSuccess = async (e) => {
        e.preventDefault()
        const body = {
            "email": email
        }
        e.preventDefault();

        const data = await updateEmail(body)
        if (data.status == 400) {
            alert('That email is already in use!')
        }
        if (data.status == 200){
            alert('email updated!')
            navigate('/')
        }
    }



    const recoverEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    return (
        <>
            <div class="dropdown">
                <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    <i className="fa-solid fa-pencil ">  Change email direction</i>
                </button>
                <form class="dropdown-menu p-4 form-register" onSubmit={updateSuccess}>
                    <div class="mb-3 ">
                            <label htmlFor="email" className='form-label'><h4>Email</h4></label>
                            <input type="email" placeholder= 'myemail@gmail.com' id='email' className='form-control' onChange={recoverEmail} />
                    </div>
                    <button type='submit' className='btn btn-success mt-1'>Submit</button>
                </form>
            </div>
        </>
    )
}
