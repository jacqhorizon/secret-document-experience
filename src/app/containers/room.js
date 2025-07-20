import Image from 'next/image'
import styles from '../page.module.css'

export default function Room(props) {
  const handleView = props.handleView
  const visible = props.visible
  return (
    <div className={styles.room} style={{display: visible}}>
        <div className={styles.room_computer} onClick={() => handleView(1)}>

        </div>
        <div className={styles.room_desk} onClick={() => handleView(2)}>

        </div>
      <Image
      className={styles.bg}
        src='/room_bg.png'
        alt='Room with computer and desk'
        width={1918}
        height={899}
        priority={true}
      />
    </div>
  )
}
