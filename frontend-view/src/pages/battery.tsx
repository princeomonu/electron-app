import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import BatteryGauge from 'react-battery-gauge'
import Link from 'next/link'
import batteryLevel from 'battery-level'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [batteryPercent, setBatteryPercent] = useState(0)

   useEffect(()=>{
    (window as any).app.getBatteryPercent((e:any,percent:number)=>{
            // console.log('percent',percent)
            setBatteryPercent(percent)
    }).then((level:number)=>{
        setBatteryPercent(level)
    })
  },[])

  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1 className='font-bold text-3xl'>BATTERY LEVEL</h1>
        <BatteryGauge value={batteryPercent}  className='mt-5'/>
        <div className='mt-5'>
          <Link href="/">send notification</Link>
        </div>
      </div>
    </main>
  )
}
