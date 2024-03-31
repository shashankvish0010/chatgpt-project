import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User'

const Login: React.FC = () => {
    const userauth = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=> {         
        if(userauth?.login == true){
            navigate('/')
        }
     },[userauth?.login])
    
    return (
        <div className='bg-slate-900 h-[100vh] w-[100vw] flex flex-col gap-5 justify-center items-center'>
            { userauth?.message ?
                <span className='shadow p-1 font-medium bg-purple-600 text-white'>{userauth.message}</span>
                : null
            }
            <div className='bg-slate-800 w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow-md rounded-md'>
                <h1 className='text-2xl font-semibold text-white'>Log In</h1>
                <span className='w-[100%] h-[0.2rem] bg-purple-600 rounded'></span>
                <form method='POST' className='flex flex-col justify-around items-center gap-3'>
                    <span className='flex flex-col gap-1'>
                        <p className='text-sm text-white'>Email</p>
                        <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="text" name='email' value={userauth?.user?.email} onChange={userauth?.handleChange} />
                    </span>
                    <span className='flex flex-col gap-1'>
                        <p className='text-sm text-white'>Password</p>
                        <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="password" name='password' value={userauth?.user?.password} onChange={userauth?.handleChange} />
                    </span>
                </form>
                <span className='w-[100%] flex items-center justify-evenly'>
                    <p className='font-mediumv text-white'>Create a new account</p>
                    <span onClick={()=>navigate('/register')} className='text-blue-400 cursor-pointer hover:font-medium'>Regsiter</span>
                </span>
                <button onClick={()=>{userauth?.dispatch({type: "LOGIN"})}} className='bg-purple-600 p-2 font-medium text-white rounded'>Log In</button>
            </div>
        </div>
    )
}

export default Login