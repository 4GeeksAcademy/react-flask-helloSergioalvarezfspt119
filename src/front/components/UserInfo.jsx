import React, { useEffect, useState } from 'react'
import { user } from '../api/user'

export default function UserInfo() {
  const [email, setEmail] = useState("")
  const getUserInfo = async () => {
    const response = await user()
    setEmail(response.data.email)

  }

  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className='container m-1 p-4 form-register'>
      <div>

        <h1>
          Email:
        </h1>
      </div>
      <div>

        <h4>
          {email}
        </h4>
      </div>
      <div>


      </div>

    </div>
  )
}