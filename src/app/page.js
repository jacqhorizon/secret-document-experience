'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Computer from './containers/computer'
import Room from './containers/room'
import { useState } from 'react'
import Desk from './containers/desk'
import Transition from './containers/transition'

export default function Home() {
  const [currView, setCurrView] = useState(0)
  // const [showTrans, setShowTrans] = useState(0)

  const handleView = (view) => {
    console.log('navigate to ' + view)
    // setShowTrans(1)
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
      <div className={styles.wrapper}>
        {/* <Transition showTrans={showTrans} setShowTrans={setShowTrans} /> */}
        <Room handleView={handleView} visible={visible(0)} />
        <Computer handleView={handleView} visible={visible(1)} />
        <Desk handleView={handleView} visible={visible(2)} />
      </div>
    </div>
  )
}
