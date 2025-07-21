import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React from 'react'

export default function Desk(props) {
  const handleView = props.handleView
  const visible = props.visible

  function Test({offset}) {
    const nodeRef = React.useRef(null)
    const {x,y} = offset
    return (
      <Draggable 
    //   defaultPosition={{x: 400, y: 100}}
      nodeRef={nodeRef}>
        <Image
          draggable={false}
          className={styles.document}
          ref={nodeRef}
          src='/document-42.png'
          alt='document'
          width={150}
          height={150}
          style={{left: offset.x, top: offset.y}}
        />
      </Draggable>
    )
  }
  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div 
      className={styles.back_button}
      onClick={() => handleView(0)}>BACK</div>
  
      <div className={styles.desk_surface} >
            <Test offset={{x: 500, y: 200}} />
            <Test offset={{x: 400, y: 300}} />
            <Test offset={{x: 800, y: 350}} />
            <Test offset={{x: 500, y: 400}} />
      </div>
      <Image
        className={styles.bg}
        src='/desk_bg.png'
        alt='Desk view'
        width={1918}
        height={899}
        priority={true}
      />
    </div>
  )
}
