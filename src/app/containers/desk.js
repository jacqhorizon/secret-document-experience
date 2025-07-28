import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React, { useEffect } from 'react'

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
      widthMult: 1
    },
    {
      path: '/Table/MegaRailAttack.png',
      width: 1080,
      height: 1360,
      posX: 5,
      posY: -30,
      widthMult: 1
    },
    {
      path: '/Table/MicroFilmDoc_01.png',
      width: 5100,
      height: 4096,
      posX: -10,
      posY: -12,
      widthMult: 1
    },
    {
      path: '/Table/MicroFilmDoc_02.png',
      width: 5100,
      height: 4096,
      posX: 15,
      posY: -10,
      widthMult: 1
    },
    {
      path: '/Table/MinistryReport.png',
      width: 1080,
      height: 1360,
      posX: 3,
      posY: -8,
      widthMult: 1
    },
    {
      path: '/Table/ResearcherProfile.png',
      width: 1080,
      height: 1360,
      posX: 5,
      posY: 25,
      widthMult: 0.9
    },
    {
      path: '/Table/SeveredWanted.png',
      width: 1080,
      height: 1360,
      posX: 20,
      posY: 20,
      widthMult: 1
    },
    {
      path: '/Table/USDNewspaper.png',
      width: 1080,
      height: 1360,
      posX: 1,
      posY: 1,
      widthMult: 1.5
    }
  ]

const handleWheel = (delta) => {
  if (delta > 0) {

  }
}

  function TableDoc({ doc }) {
    const nodeRef = React.useRef(null)
    console.log(doc.posX)
    let style = {
      width: (12 * doc.widthMult).toString() + 'vw',
      top: `calc(40% + ${doc.posY}%)`,
      left: `calc(40% + ${doc.posX}%)`
    }
    return (
      <Draggable
        bounds='parent'
        nodeRef={nodeRef}
      >
        <Image
          draggable={false}
          className={styles.document}
          ref={nodeRef}
          src={doc.path ? doc.path : '/document-42.png'}
          alt='document'
          width={doc.width}
          height={doc.height}
          style={{ ...style, height: 'auto' }}
          onWheel={(e) => console.log(doc.path, e.nativeEvent.wheelDelta)}
        />
      </Draggable>
    )
  }

  // const parentRef = React.useRef(null)
  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div className={styles.back_button} onClick={() => handleView(0)}>
        BACK
      </div>
      <div className={styles.desk_surface}>
        {TABLEDOCS.map((doc) => {
          return (
            <React.Fragment key={doc.path}>
              <TableDoc doc={doc} />
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
