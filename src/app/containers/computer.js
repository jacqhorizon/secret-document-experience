import Image from 'next/image'
import styles from '../page.module.css'
import Form from 'next/form'
import { useState } from 'react'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  const [accessGranted, setAccessGranted] = useState(false)
  const [showError, setShowError] = useState(false)
  const [password, setPassword] = useState('')

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setShowError(false)
  }
  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    // const password = formData.get('Password')
    const password = e.target[0].value
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
    return (
      <Image
        className={styles.file_content}
        src='/Table/SeveredWanted.png'
        alt='Computer with computer and desk'
        width={320}
        height={400}
        priority={true}
      />
    )
  }

  const File2 = () => {
    return <>This is file two</>
  }

  const handleFileSelect = (index) => {
    setCurrFile(index)
  }
  const FILES = [
    { name: '#Eidolon Acquisition...', content: <File1 /> },
    { name: 'file_2.txt', content: <File2 /> }
  ]

  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div className={styles.back_button} onClick={() => handleBack()}>
        BACK
      </div>
      <div className={styles.computer_screen}>
        <div style={{ display: accessGranted ? 'none' : 'block' }}>
          <Form action='' onSubmit={(e) => handleSubmit(e)}>
            <input
              className={`${styles.password} ${styles.password_input}`}
              name='Password'
              type='text'
              spellCheck='false'
              value={password}
              onChange={(e) => handlePassword(e)}
            />
            <button
              className={`${styles.password} ${styles.password_submit}`}
              type='submit'
            >
              &gt;&gt;
            </button>
          </Form>
          <div className={styles.error_message}>
            {showError ? 'Wrong password.' : ' '}
          </div>
        </div>
        <div
          className={styles.file_viewer}
          style={{ display: accessGranted ? 'block' : 'none' }}
        >
          <div className={styles.database_head}>DATABASE</div>
          <div className={styles.file_viewer_view}>
            <div className={`${styles.file_column} ${styles.left}`}>
              <div className={styles.file_list}>
                <div className={styles.file_list_title}>FILE LIST</div>
                {FILES.map((file, i) => {
                  return (
                    <ul
                      key={file.name}
                      onClick={() => handleFileSelect(i)}
                      className={currFile == i ? styles.selected_file : ''}
                    >
                      {file.name}
                    </ul>
                  )
                })}
              </div>
              <div className={styles.left_text}>
                <p>CLEARANCE CODE...Red Zero</p>
                <p>DESIGNATION...TOP SECRET</p>
                <p>DESTRUCTION STATUS...Pending</p>
              </div>
            </div>
            <div className={`${styles.file_column} ${styles.right}`}>
              {FILES[currFile].content}
            </div>
          </div>
        </div>
      </div>
      <Image
        className={styles.bg}
        src='/ComputerScreen.png'
        alt='Computer with computer and desk'
        width={7396}
        height={4160}
        priority={true}
      />
    </div>
  )
}
