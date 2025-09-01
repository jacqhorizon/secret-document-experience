import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React, { useState, useEffect, useRef, useCallback, use } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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

  const openDoc = useCallback((index) => {
    setCurrFullScreen(index)
  }, [])

  const closeDoc = (e) => {
    if (e.target.tagName !== 'IMG') {
      setCurrFullScreen(null)
    }
  }

  const [currFullScreen, setCurrFullScreen] = useState(null) //index

  useEffect(() => {
    console.log(currFullScreen)
  }, [currFullScreen])

  let fullScreenStyle = {
    width: 'auto',
    height: '90vh'
    // top: '0px',
    // left: '0px',
    // rotate: '0deg'
  }
  const FullScreenDoc = () => {
    const [zoom, setZoom] = useState(1)
 const [position, setPosition] = useState({ x: 0, y: 0 })
    const handleWheelZoom = (e) => {
      e.preventDefault()
      setZoom((prev) => {
        let next = prev + (e.deltaY < 0 ? 0.1 : -0.1)
        if (next < 1) next = 1
        if (next > 5) next = 5

        // if zooming out back to 1, reset position
        if (next <= 1) {
          setPosition({ x: 0, y: 0 })
        }
        return next
      })
    }

    return (
      <AnimatePresence>
        {currFullScreen !== null && (
          <motion.div
            key={TABLEDOCS[currFullScreen].path}
            className={styles.fullscreen_screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => closeDoc(e)}
          >
            <motion.img
              // key={resetKey}
              src={TABLEDOCS[currFullScreen].path}
              alt='document'
              width={TABLEDOCS[currFullScreen].width}
              height={TABLEDOCS[currFullScreen].height}
              className={styles.document}
              initial={{ scale: 0.9 }}
              animate={{ scale: zoom,x: position.x, y: position.y}}
              drag={zoom > 1} // allow drag only when zoomed
              onDragEnd={(e, info) => {
                // store relative offset, not absolute point
                setPosition({
                  x: info.offset.x + position.x,
                  y: info.offset.y + position.y
                })
              }}
              // dragConstraints={constraints}
              dragMomentum={false} // no fling after release
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onWheel={handleWheelZoom}
              style={{
                ...fullScreenStyle,
                cursor: zoom > 1 ? 'grab' : 'zoom-in'
              }}
              whileDrag={{ cursor: 'grabbing' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
    // } else {
    //   return <></>
    // }
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
