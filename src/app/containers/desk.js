import Image from 'next/image'
import styles from '../page.module.css'

export default function Desk(props) {
  const handleView = props.handleView
  const visible = props.visible
  return (
    <div className={styles.bg_grid} style={{display: visible}}>
      <div onClick={() => handleView(0)}> back</div>
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
