import React, { useEffect } from 'react'
import { user } from '../api/user'
import { useNavigate } from 'react-router-dom'
import UserInfo from '../components/UserInfo'
import UpdateUser from '../components/UpdateUser'


export default function PrivateHome() {
    const navigate = useNavigate()
    const userCall = async () =>{
        const data = await user()
        console.log(data)
        if (data.status ==  422) {
            console.log("esto funciona")
            navigate('/')
        }
        if (data.status == 401){
             alert('You must have an account!')
             navigate('/')
        }
    }
useEffect(() => {
  userCall()
}, [])



    return (
        <>

            <div className='blurredTop privatePage'>

            </div>
            <div className='body night d-flex justify-content-evenly align-items-center flex-column'>

                <div>
                    <h1 className='newFont'>Welcome to your Home page</h1>
                </div>
                <div className='d-flex align-items-center'>
                    <div>
                    <UserInfo>       
                    </UserInfo>
                    </div>
                    <div className='container m-2'>
                    <UpdateUser/>
                    </div>
                </div>


            </div>

            <div className='blurredBottom privatePage'>

            </div>
        </>
    )
}
