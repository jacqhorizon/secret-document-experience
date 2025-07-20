import Image from 'next/image'
import styles from '../page.module.css'
import Form from 'next/form'
import { useState } from 'react'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  const [accessGranted, setAccessGranted] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = (formData) => {
    const password = formData.get('Password')
    if (password == 'correct') {
      setAccessGranted(true)
    } else {
      setShowError(true)
    }
  }

  const handleBack = () => {
    handleView(0)
    setShowError(false)
  }

  const [currFile, setCurrFile] = useState(0)

  const File1 = () => {
    return <>This is file one</>
  }

  const File2 = () => {
    return <>This is file two</>
  }

  const handleFileSelect = (index) => {
    setCurrFile(index)
  }
  const FILES = [
    { name: 'file_1.txt', content: <File1 /> },
    { name: 'file_2.txt', content: <File2 /> }
  ]

  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div onClick={() => handleBack()}> back</div>
      <div className={styles.computer_screen}>
        <div style={{ display: accessGranted ? 'none' : 'block' }}>
          <Form action={handleSubmit}>
            <input name='Password' type='text' />
            <button type='submit'>Submit</button>
          </Form>
          <div>{showError ? 'Wrong password.' : ''}</div>
        </div>
        <div
          className={styles.file_viewer}
          style={{ display: accessGranted ? 'grid' : 'none' }}
        >
          <div className={`${styles.file_column} ${styles.left}`}>
            {FILES.map((file, i) => {
              return (
                <ul key={file.names} onClick={() => handleFileSelect(i)}>
                  {file.name}
                </ul>
              )
            })}
          </div>
          <div
          className={`${styles.file_column} ${styles.right}`}
          >{FILES[currFile].content}</div>
        </div>
      </div>
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
