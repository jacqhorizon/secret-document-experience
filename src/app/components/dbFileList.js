import styles from '../page.module.css'
import glitchStyle from '../glitch.module.css'
import { useEffect, useState } from 'react'

const DbFileList = ({
  currView,
  files,
  currFile,
  handleModalClose,
  handleFileClick,
  handleFileDouble,
  showEndFile,
  setShowEndFile
}) => {
  const [glitchStart, setGlitchStart] = useState(false)
  useEffect(() => {
    if (currView == 2 && !showEndFile) {
      const glitchTimer = setTimeout(() => {
        setGlitchStart(true)
        console.log('start glitch')
        // after glitch shows briefly, reveal file and turn glitch off
        const endTimer = setTimeout(() => {
          setShowEndFile(true)
          setGlitchStart(false)
          console.log('glitch end')
        }, 500) // glitch lasts 0.5s

        return () => clearTimeout(endTimer)
      }, 2000)

      return () => clearTimeout(glitchTimer)
    }
  }, [currView])

  const glitchCondition = () => {
    if (glitchStart) {
      return `${glitchStyle.glitch} ${glitchStyle.layers}`
    } else {
      return ''
    }
  }

  const ListItem = ({file, i}) => {
    return (
      <ul
        key={file.name}
        onClick={() => handleFileClick(i)}
        onDoubleClick={() => handleFileDouble(i)}
        className={
          `${currFile == i ? styles.selected_file : styles.list_item} ${glitchCondition()}`
        }
      >
        <span>{file.name}</span>
      </ul>
    )
  }
  return (
    <div
      className={`${styles.file_modal}`}
      style={{ display: currView == 2 ? 'block' : 'none' }}
    >
      <div className={`${styles.file_list_head} `}>
        <p data-text='File' className={glitchCondition()}>
          <span>D:/05T/Files/Data</span>
        </p>
        <p onClick={() => handleModalClose()}>X</p>
      </div>
      <div className={styles.file_list}>
        {files.map((file, i) => {
          return (
            <ListItem key={file.name} file={file} i={i} />
          )
        })}
        {/* <ListItem file={{name: 'End'}} i={20} /> */}
      </div>
      <div className={styles.file_list_end}>
        <p>Use ↑ ↓ to select a file</p>
        <p>Press ENTER to view a file</p>
      </div>
    </div>
  )
}

export default DbFileList
