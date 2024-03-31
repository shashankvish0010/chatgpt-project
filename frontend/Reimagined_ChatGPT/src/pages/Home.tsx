import React, { useContext, useState } from 'react'
import HeroSection from '../components/HeroSection'
import Header from '../components/Header'
import { UserContext } from '../context/User'
import Sidenav from '../components/Sidenav'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ChatContext } from '../context/Chats'

interface ChatType {
  question: string;
}
const Home: React.FC = () => {
  const usercontext = useContext(UserContext);
  const chatcontext = useContext(ChatContext);
  const [chatArray, setchatArray] = useState<any>();
  const [activePrompt, setActivePrompt] = useState<boolean>(false);
  const [chat, setChat] = useState<ChatType>({
    question: ''
  })
  const [prompt, setPrompt] = useState<any>({
    prompt_name: '',
    promptq: ''
  })
  const [chatquery, setChatquery] = useState<any>({
    query: ''
  })
  const [message, setMessage] = useState<string>();

  const handleAddPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const { prompt_name, promptq } = prompt;
    console.log(prompt_name, promptq);

    try {
      const response = await fetch('/save/prompt/' + usercontext?.curruser?._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt_name, promptq
        })
      })
      if (response) {
        const data = await response.json();
        if (data.success == true) {
          setMessage(data.message);
          setActivePrompt(false)
        } else {
          setActivePrompt(false)
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChat(prevChat => ({
      ...prevChat,
      [name]: value
    }));
  }

  const handlepromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt((prevPrompt: any) => ({
      ...prevPrompt,
      prompt_name: e.target.value,
      promptq: chat.question
    }));
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const { query } = chatquery
    try {
      const response = await fetch('/chat/search/' + usercontext?.curruser?._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      })
      if (response) {
        const data = await response.json();
        if (data.success == true) {
          setchatArray(data.searchArray);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { question } = chat
    chatcontext?.id ? null : chatcontext?.createChatId();
    try {
      const response = await fetch('/chat/ai/' + usercontext?.curruser?._id + '/' + chatcontext?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question
        })
      })
      if (response) {
        const data = await response.json();
        if (data.success == true) {
          setchatArray(data.chatarray[0].chatarray);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='relative bg-slate-900 h-screen w-screen flex flex-col items-center justify-center'>
      {
        message && activePrompt == false?
          <span className='absolute shadow p-1 mb-auto font-medium bg-purple-600 text-white'>{message}</span>
          : null
      }
      {
        usercontext?.login == true ?
          (
            <div className='h-screen w-screen flex md:flex-row items-center'>
              <Sidenav />
              <div className='h-screen w-screen md:w-[70vw] p-3 flex flex-col gap-5 items-center'>
                <div className='h-max p-3 w-screen md:w-[70vw] flex flex-row items-center justify-evenly'>
                  <div className='bg-slate-700 px-3 h-max w-[80vw] md:w-[40vw] rounded-full text-base flex flex-row items-center justify-between'>
                    <input className='bg-slate-700 w-[80vw] md:w-[40vw] placeholder:text-gray-400 placeholder:font-semibold focus-visible:outline-none text-white p-3 rounded-full' type="text" placeholder='Search Your Chat' 
                    name='query' value={chatquery.query} onChange={(e)=>setChatquery({ query: e.target.value })}/>
                    <Icon onClick={handleSearch} className='cursor-pointer' icon="majesticons:search-line" height='1.5rem' color='white' />
                  </div>
                  <Icon className='lg:h-max md:h-max h-[4vh] cursor-pointer' height={'3rem'} color='white' icon="solar:logout-outline" onClick={() => { usercontext.dispatch({ type: "LOGOUT" }) }} />
                </div>
                <div className='md:h-[60vh] h-[80vh] w-screen md:w-[70vw] flex flex-col items-center gap-5 overflow-y-scroll overflow-x-hidden'>
                  {
                    chatArray?.length > 0 ?
                      chatArray?.map((data: any) =>
                        <div className='h-max w-[80vw] md:w-[70vw] flex flex-col gap-5 p-3 items-center text-white'>
                          <span className='h-max w-[80vw] md:w-[60vw] text-base font-medium'>
                            <p className='w-[80vw] md:w-[60vw]'>
                              {data.question}
                            </p>
                          </span>
                          <span className='h-max w-[80vw] md:w-[60vw] text-base'>
                            <p className='w-[80vw] md:w-[60vw]'>
                              {data.response}
                            </p>
                          </span>
                          <span className='w-[90%] h-[.05rem] rounded-md bg-white'></span>
                        </div>
                      )
                      :
                      <span className='h-[60vh] flex justify-center items-center w-screen md:w-[70vw] text-white text-3xl font-semibold p-2 text-center'>
                        <p>
                          Start your conversation with your Ai companion.
                        </p>
                      </span>
                  }
                </div>
                <div className='mt-auto mb-5 p-3 w-screen md:w-[70vw] flex flex-row items-center justify-around'>
                  <Icon onClick={() => { setActivePrompt(!activePrompt) }} className='cursor-pointer' icon="icon-park-solid:add" height='2rem' color='yellow' />
                  <div className='bg-slate-700 px-3 h-max w-[60vw] md:w-[50vw] rounded-full text-base flex flex-row items-center justify-between'>
                    <input className='bg-slate-700 placeholder:text-gray-400 w-[80vw] md:w-[50vw] placeholder:font-semibold focus-visible:outline-none text-white p-3 rounded-full' type="text" placeholder='Messages to ChatGPT'
                      name='question' value={chat?.question} onChange={handleChange} />
                  </div>
                  <Icon onClick={handleSubmit} className='cursor-pointer' icon="ic:baseline-send" height='2rem' color='lightgreen' />
                </div>
              </div>
            </div>
          )
          :
          (<><Header /><HeroSection /></>
          )
      }
      {activePrompt == true ?
        <div className='absolute bg-slate-800 w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow-md rounded-md'>
          <h1 className='text-2xl font-semibold text-white'>Save Prompt</h1>
          <span className='w-[100%] h-[0.2rem] bg-purple-600 rounded'></span>
          <form method='POST' className='flex flex-col justify-around items-center gap-3'>
            <span className='flex flex-col gap-1'>
              <p className='text-sm text-white'>Prompt Name</p>
              <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="text" name='prompt_name' value={prompt?.prompt_name} onChange={handlepromptChange} />
            </span>
            <span className='flex flex-col gap-1'>
              <p className='text-sm text-white'>Prompt</p>
              <input className='px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded' type="text" name='promptq' value={chat.question} />
            </span>
          </form>
          <span className='w-[100%] flex items-center justify-evenly'></span>
          <button onClick={handleAddPrompt} className='bg-purple-600 p-2 font-medium text-white rounded'>Save</button>
        </div> : null
      }
    </div >
  )
}

export default Home