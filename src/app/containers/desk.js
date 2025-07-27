import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React from 'react'

export default function Desk(props) {
  const handleView = props.handleView
  const visible = props.visible

  const TABLEDOCS = [
    { path: '/Table/IncidentReport3.png', width: 1080, height: 1360 },
    { path: '/Table/MegaRailAttack.png', width: 1080, height: 1360 },
    { path: '/Table/MicroFilmDoc_01.png', width: 5100, height: 4096 },
    { path: '/Table/MicroFilmDoc_02.png', width: 5100, height: 4096 },
    { path: '/Table/MinistryReport.png', width: 1080, height: 1360 },
    { path: '/Table/ResearcherProfile.png', width: 1080, height: 1360 },
    { path: '/Table/SeveredWanted.png', width: 1080, height: 1360 },
    { path: '/Table/USDNewspaper.png', width: 1080, height: 1360 }
  ]

  function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  function TableDoc({ doc }) {
    const nodeRef = React.useRef(null)
    let posX = 400 + getRandomIntInclusive(-150,180)
    let posY = 100 + getRandomIntInclusive(-70,80)
    return (
      <Draggable
        defaultPosition={{ x: posX, y: posY }}
        bounds='parent'
        // offsetParent={parentRef}
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
          style={{width: '150px', height: 'auto'}}
          // style={{ left: defaultPos.x, top: defaultPos.y }}
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
