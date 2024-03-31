import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
interface userType {
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmpass: string | undefined
}
const Register: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<userType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: ""
  })

  const [message, setMessage] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { firstname, lastname, email, password, confirmpass } = user
    try {
      const response = await fetch('/user/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname, lastname, email, password, confirmpass
        })
      })
      if (response) {
        const data = await response.json();
        console.log(data);
        if (data.success == true) {
          navigate('/login')
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='bg-slate-900 h-[100vh] w-[100vw] flex flex-col gap-5 justify-center items-center'>
      {message ?
        <span className='shadow p-1 font-medium bg-purple-600 text-white'>{message}</span>
        : null
      }
      <div className='bg-slate-800 w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow rounded-md'>
        <h1 className='text-2xl font-semibold text-white'>Register</h1>
        <span className='w-[100%] h-[0.2rem] bg-purple-600 rounded'></span>
        <form method='POST' className='flex flex-col justify-around items-center gap-3'>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-white'>Firstname</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='firstname' value={user?.firstname} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-white'>Lasname</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='lastname' value={user?.lastname} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-white'>Email</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="text" name='email' value={user?.email} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-white'>Password</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='password' value={user?.password} onChange={handleChange} />
          </span>
          <span className='flex flex-col gap-1'>
            <p className='text-sm text-white'>Confirm Password</p>
            <input className='px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded' type="password" name='confirmpass' value={user?.confirmpass} onChange={handleChange} />
          </span>
        </form>
        <span className='w-[100%] flex items-center justify-evenly'>
          <p className='font-medium text-white'>Already have an account?</p>
          <span onClick={() => navigate('/login')} className='text-blue-400 cursor-pointer hover:font-medium'>Login</span>
        </span>
        <button onClick={handleSubmit} className='bg-purple-600 p-2 font-medium text-white rounded'>Register</button>
      </div>
    </div>
  )
}

export default Register