import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useState} from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [msg, setMsg] = useState("")

  function send() {
    
    (window as any).app.sendNotification(msg)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1 className='font-bold text-3xl'>SEND NOTIFICATION</h1>
        <div className='mt-5'>
          <input className='text-black' value={msg} type="text" onChange={e=>setMsg(e.target.value)} />
        </div>
        <div className='mt-5'>
          <button onClick={send} className='bg-white px-3 text-gray-500 font-semibold'>SEND</button>
        </div>

        <div className='mt-5'>
          <Link href="/battery">see battery level</Link>
        </div>
      </div>
    </main>
  )
}
