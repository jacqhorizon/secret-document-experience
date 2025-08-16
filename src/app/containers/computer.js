import Image from 'next/image'
import styles from '../page.module.css'
import Form from 'next/form'
import { useState } from 'react'
import DatabaseStarter from '../components/databaseStarter'
import DbFileList from '../components/dbFileList'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  const [startDatabase, setStartDatabase] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [currView, setCurrView] = useState(0)
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
    if (password == 'yes') {
      setCurrView(1)
    } else {
      setShowError(true)
    }
  }

  const handleBack = () => {
    handleView(0)
    setShowError(false)
  }

  const [currFile, setCurrFile] = useState(0)

  const FILES = [
    {
      path: '/Computer/MonitorScreenFile1_Brazil.png',
      name: 'Operation: Yuzna'
    },
    {
      path: '/Computer/MonitorScreenFile1_Japan.png',
      name: 'Operation: Blue Sable'
    },
    {
      path: '/Computer/MonitorScreenFileEidolonReceving1.png',
      name: 'Eidolon Receving 42J-M1'
    },
    {
      path: '/Computer/MonitorScreenFileEidolonReceving2.png',
      name: 'Eidolon Recieving 81J-M1'
    },
    {
      path: '/Computer/MonitorScreenMemoridum.png',
      name: 'Memorandum X7JJ'
    },
    {
      path: '/Computer/MonitorScreenSurgeryReport1.png',
      name: 'Surgery Report M-521'
    },
    {
      path: '/Computer/MonitorScreenSurgeryReport2.png',
      name: 'Surgery Report 0-717'
    }
  ]

  const FileView = () => {
    return (
      <Image
        className={styles.file_content}
        src={FILES[currFile].path}
        alt='Computer with computer and desk'
        width={3200}
        height={3200}
        priority={true}
      />
    )
  }

  const File2 = () => {
    return <>This is file two</>
  }

  const handleFileSelect = (index) => {
    setCurrFile(index)
    setCurrView(2)
  }

  return (
    <div className={styles.bg_grid} style={{ display: visible }}>
      <div className={styles.back_button} onClick={() => handleBack()}>
        BACK
      </div>
      <div className={styles.computer_screen}>
        <div style={{ display: currView == 0 ? 'block' : 'none' }}>
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
        <DbFileList
          currView={currView}
          FILES={FILES}
          currFile={currFile}
          handleFileSelect={handleFileSelect}
        />
        <DatabaseStarter currView={currView} />

        <div
          className={styles.file_viewer}
          style={{ display: currView == 2 ? 'block' : 'none' }}
        >
          <div className={styles.exit_file}
          onClick={() => setCurrView(1)}></div>
              <FileView />
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
