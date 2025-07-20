import Image from 'next/image'
import styles from '../page.module.css'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  return (
    <div className={styles.computer} style={{display: visible}}>
      <div onClick={() => handleView(0)}> back</div>
      <Image
        className={styles.bg}
        src='/computer_bg.png'
        alt='Computer with computer and desk'
        width={1918}
        height={899}
        priority={true}
      />
    </div>
  )
}
