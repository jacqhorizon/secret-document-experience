import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import TableDoc from '../components/TableDoc'

export default function Desk(props) {
  const handleView = props.handleView
  const visible = props.visible

  const TABLEDOCS = [
    {
      path: '/Table/IncidentReport3.png',
      width: 1080,
      height: 1360,
      posX: -20,
      posY: 5,
      widthMult: 1,
      rotate: 2.3
    },
    {
      path: '/Table/MegaRailAttack.png',
      width: 1080,
      height: 1360,
      posX: 5,
      posY: -30,
      widthMult: 1,
      rotate: -4.1
    },
    {
      path: '/Table/MicroFilmDoc_01.png',
      width: 5100,
      height: 4096,
      posX: -10,
      posY: -12,
      widthMult: 1,
      rotate: 1.7
    },
    {
      path: '/Table/MicroFilmDoc_02.png',
      width: 5100,
      height: 4096,
      posX: 15,
      posY: -10,
      widthMult: 1,
      rotate: -3.6
    },
    {
      path: '/Table/MinistryReport.png',
      width: 1080,
      height: 1360,
      posX: 3,
      posY: -8,
      widthMult: 1,
      rotate: 0.5
    },
    {
      path: '/Table/ResearcherProfile.png',
      width: 1080,
      height: 1360,
      posX: 5,
      posY: 25,
      widthMult: 0.9,
      rotate: 4.8
    },
    {
      path: '/Table/SeveredWanted.png',
      width: 1080,
      height: 1360,
      posX: 20,
      posY: 20,
      widthMult: 1,
      rotate: -2.2
    },
    {
      path: '/Table/USDNewspaper.png',
      width: 1080,
      height: 1360,
      posX: 1,
      posY: 1,
      widthMult: 1.5,
      rotate: 3.1
    }
  ]

  const handleWheel = (e) => {
    // Detect scroll direction
    // Negative wheelDelta means scrolling down/out, positive means scrolling up/in
    const scrollingIn = e.nativeEvent.wheelDelta > 0
    const scrollingOut = e.nativeEvent.wheelDelta < 0

    if (scrollingIn && !isZoomed) {
      setIsZoomed(true)
    } else if (scrollingOut && isZoomed) {
      setIsZoomed(false)
    }
  }

  const [isZoomed, setIsZoomed] = useState(false)

  const openDoc = useCallback((index) => {
    setCurrFullScreen(index)
  }, [])

  const closeDoc = (e) => {
    if (e.target.tagName !== 'IMG') {
      setCurrFullScreen(null)
    }
  }
  
  const [currFullScreen, setCurrFullScreen] = useState(null) //index
    let fullScreenStyle = {
    width: 'auto',
    height: '90vh'
    // top: '0px',
    // left: '0px',
    // rotate: '0deg'
  }
  const FullScreenDoc = () => {
    if (currFullScreen) {
      let doc = TABLEDOCS[currFullScreen]
      return (
        <div className={styles.fullscreen_screen} onClick={(e) => closeDoc(e)}>
          <Image
            className={styles.document}
            // ref={nodeRef}
            src={doc.path ? doc.path : '/document-42.png'}
            alt='document'
            width={doc.width}
            height={doc.height}
            style={{ ...fullScreenStyle}}
            // onWheel={handleWheel}
          />
        </div>
      )
    } else {
      return <></>
    }
  }
  // Use Motion
  const constraintsRef = useRef(null)
  // function TableDoc({ doc }) {
  //   const nodeRef = React.useRef(null)
  //   console.log(doc.posX)
  //   let style = {
  //     width: (12 * doc.widthMult).toString() + 'vw',
  //     top: `calc(40% + ${doc.posY}%)`,
  //     left: `calc(40% + ${doc.posX}%)`,
  //     rotate: doc.rotate.toString() + 'deg'
  //   }
  //   return (
  //     <motion.div
  //     ref={nodeRef}
  //       drag
  //       dragConstraints={constraintsRef}
  //       dragTransition={{
  //         // bounceStiffness: 10,
  //         // bounceDamping: 100
  //         // max: 10
  //         power: 0.01,
  //         timeConstant: 500
  //       }}
  //     >
  //       <Image
  //         draggable={false}
  //         className={styles.document}
  //         ref={nodeRef}
  //         src={doc.path ? doc.path : '/document-42.png'}
  //         alt='document'
  //         width={doc.width}
  //         height={doc.height}
  //         style={{ ...style, height: 'auto' }}
  //         onWheel={(e) => console.log(doc.path, e.nativeEvent.wheelDelta)}
  //       />
  //     </motion.div>
  //   )
  // }

  // const parentRef = React.useRef(null)
  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div className={styles.back_button} onClick={() => handleView(0)}>
        BACK
      </div>
      <FullScreenDoc />
      <div className={styles.desk_surface} ref={constraintsRef}>
        {TABLEDOCS.map((doc, index) => {
          return (
            <React.Fragment key={doc.path}>
              <TableDoc doc={doc} index={index} openDoc={openDoc} />
            </React.Fragment>
          )
        })}
        {/* <Test
          defaultPos={{ x: 40, y: 0 }}
          defaultPosition
          file_path={'/Table/MicroFilmDoc_01.png'}
        />
        <Test
          defaultPos={{ x: 0, y: 50 }}
          file_path={'/Table/MicroFilmDoc_02.png'}
        /> */}
        {/* <Test
          defaultPos={{ x: 20, y: 0 }}
          file_path={'/Table/MicroFilmDoc_01.png'}
        />
        <Test
          defaultPos={{ x: 0, y: 100 }}
          file_path={'/Table/MicroFilmDoc_01.png'}
        /> */}
      </div>
      <Image
        className={styles.bg}
        src='/LightboxScreen.png'
        alt='Desk view'
        width={1918}
        height={899}
        priority={true}
      />
    </div>
  )
}
