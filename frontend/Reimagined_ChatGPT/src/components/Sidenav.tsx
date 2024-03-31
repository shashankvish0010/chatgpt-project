import React, {useContext} from 'react'
import logo from '../assets/1681039084chatgpt-icon.webp'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ChatContext } from '../context/Chats'
const Sidenav: React.FC = () => {
    const chatcontext = useContext(ChatContext)
  return (
    <div className='hidden h-screen w-screen md:flex items-center justify-between'>
    <div className='bg-slate-800 h-screen w-[25vw] flex flex-col gap-5 p-3'>
      <div className='h-max w-max p-3 flex items-center gap-5'>
        <img className='md:block hidden' src={logo} alt="chatGPTLogo" width='70px' />
        <p className='text-2xl text-white font-semibold'>Chat GPT</p>
      </div>
      <span className='w-[100%] h-[.155rem] rounded-md bg-white'></span>
      <div className='h-max w-[100%] text-white flex flex-col gap-5 p-3'>
        <span onClick={()=> chatcontext?.createChatId()} className='flex items-center gap-3'>
        <Icon icon="ri:add-line" color='white' height='3rem'/>
        <p className='text-xl font-medium'>New Chat</p>
        </span>
        <span className='flex items-center gap-3'>
        <Icon icon="material-symbols-light:bookmark" color='white' height='3rem'/>
        <p className='text-xl font-medium'>Saved Prompts</p>
        </span>
      </div>
    </div>
    <div>
    </div>
  </div>
  )
}

export default Sidenav