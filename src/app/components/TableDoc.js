
import Image from 'next/image'
import styles from '../page.module.css'
import Draggable from 'react-draggable' // Both at the same time
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'

const TableDoc = React.memo(function TableDoc({ doc, index, openDoc, handleWheelIn}) {
    const nodeRef = React.useRef(null)
    // console.log('rendering Table Doc '+index)
    let style = {
      width: (12 * doc.widthMult).toString() + 'vw',
      top: `calc(40% + ${doc.posY}%)`,
      left: `calc(40% + ${doc.posX}%)`,
      rotate: doc.rotate.toString() + 'deg'
    }
    return (
      <Draggable bounds='parent' nodeRef={nodeRef}>
        <Image
          draggable={false}
          className={styles.document}
          ref={nodeRef}
          src={doc.path ? doc.path : '/document-42.png'}
          alt='document'
          width={doc.width}
          height={doc.height}
          style={{ ...style, height: 'auto' }}
          onDoubleClick={() => openDoc(index)}
          priority
          onWheel={(e) => handleWheelIn(e, index)}
        />
      </Draggable>
      
    )
  })

  export default TableDoc