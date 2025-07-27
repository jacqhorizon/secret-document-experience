import Image from 'next/image'
import styles from '../page.module.css'

export default function Room(props) {
  const handleView = props.handleView
  const visible = props.visible
  return (
    <div className={styles.bg_grid} style={{display: visible}}>
        <div className={styles.room_computer} 
        onClick={() => handleView(1)}>

        </div>
        <div className={styles.room_desk} onClick={() => handleView(2)}>

        </div>
      <Image
      className={styles.bg}
        src='/GeneralScreen.png'
        alt='Room with computer and desk'
        width={7396}
        height={4160}
        priority={true}
      />
    </div>
  )
}
