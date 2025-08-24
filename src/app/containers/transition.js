import Image from 'next/image'
import styles from '../page.module.css'

export default function Transition(props) {
  const showTrans = props.showTrans
  const setShowTrans = props.setShowTrans
  const transVis = () => {
    if (showTrans == 1) {
        return 'grid'
    } else {
        return 'none'
    }
  }
  return (
    <div className={styles.bg_grid} style={{ display:  transVis()}}>
      <video
        className={styles.bg_video}
        autoPlay
        // controls
        muted
        // loop
        // playsinline
        // style={{ display: currView == 4 ? 'flex' : 'none' }}
        onEnded={() => setShowTrans(0)} // when video finishes
      >
        <source src='/ExperienceEnd.mp4' type='video/mp4' />
      </video>
    </div>
  )
}
