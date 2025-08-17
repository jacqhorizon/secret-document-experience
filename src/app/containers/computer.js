import Image from 'next/image'
import styles from '../page.module.css'

import { useState, useEffect } from 'react'
import DatabaseStarter from '../components/databaseStarter'
import DbFileList from '../components/dbFileList'
import PasswordInput from '../components/passwordInput'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  const [startDatabase, setStartDatabase] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [currView, setCurrView] = useState(0)

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

  useEffect(() => {
    const handleEscapeBack = (e) => {
      if (e.key === 'Escape') {
        setCurrView((prev) => (prev % 2) * 2)
      }
    }
    window.addEventListener('keydown', handleEscapeBack)

    return () => window.removeEventListener('keydown', handleEscapeBack)
  }, [])

  useEffect(() => {
    if (currView != 2) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setCurrFile((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'ArrowDown') {
        setCurrFile((prev) => Math.min(prev + 1, FILES.length - 1))
      }
      if (e.key === 'Enter') {
        setCurrView(3)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currView])

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
        {currView == 0 ? (
          <div style={{ display: currView == 0 ? 'block' : 'none' }}>
            <PasswordInput setCurrView={setCurrView} />
          </div>
        ) : (
          <>
            <DbFileList
              currView={currView}
              FILES={FILES}
              currFile={currFile}
              handleFileSelect={handleFileSelect}
            />
            <DatabaseStarter currView={currView} setCurrView={setCurrView} />
          </>
        )}
        <div
          className={styles.file_viewer}
          style={{ display: currView == 3 ? 'flex' : 'none' }}
        >
          {/* <div
            className={styles.exit_file}
            onClick={() => setCurrView(1)}
          ></div> */}
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
