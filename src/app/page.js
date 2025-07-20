'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Computer from './containers/computer'
import Room from './containers/room'
import { useState } from 'react'
import Desk from './containers/desk'

export default function Home() {
  const [currView, setCurrView] = useState(0)

  const handleView = (view) => {
    console.log('navigate to '+ view)
    setCurrView(view)
  }

  const visible = (view) => {
    if (view == currView) {
      return 'grid'
    } else {
      return 'none'
    }
  }
  return (
    <div className={styles.page}>
      <Image
        src='/room_bg.png'
        alt='Preload Room'
        width={1918}
        height={899}
        style={{ display: 'none' }}
        priority={true}
      />
      <Image
        src='/computer_bg.png'
        alt='Preload Computer'
        width={1918}
        height={899}
        style={{ display: 'none' }}
        priority={true}
      />
      <Image
        src='/desk_bg.png'
        alt='Preload Desk'
        width={1918}
        height={899}
        style={{ display: 'none' }}
        priority={true}
      />
      <Room handleView={handleView} visible={visible(0)} />
      <Computer handleView={handleView} visible={visible(1)} />
            <Desk handleView={handleView} visible={visible(2)} />
    </div>
  )
}
