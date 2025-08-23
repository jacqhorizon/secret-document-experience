import Image from 'next/image'
import styles from '../page.module.css'

import { useState, useEffect } from 'react'
import DatabaseStarter from '../components/databaseStarter'
import DbFileList from '../components/dbFileList'
import PasswordInput from '../components/passwordInput'

export default function Computer(props) {
  const handleView = props.handleView
  const visible = props.visible
  const [accessGranted, setAccessGranted] = useState(false)
  const [currView, setCurrView] = useState(0)

  const handleBack = () => {
    handleView(0)
    setShowError(false)
  }

  const [currFile, setCurrFile] = useState(0)
  const [showEndFile, setShowEndFile] = useState(false)

  const INIT_FILES = [
    {
      path: '/Computer.Files/MonitorScreenFile1_Brazil2.png',
      name: 'Operation: Yuzna'
    },
    {
      path: '/Computer.Files/MonitorScreenFile1_Japan2.png',
      name: 'Operation: Blue Sable'
    },
    {
      path: '/Computer.Files/MonitorScreenFileEidolonReceving1_V2.png',
      name: 'Eidolon Receving 42J-M1'
    },
    {
      path: '/Computer.Files/MonitorScreenFileEidolonReceving2_V2.png',
      name: 'Eidolon Recieving 81J-M1'
    },
    {
      path: '/Computer.Files/MonitorScreenMemoridum_V2.png',
      name: 'Memorandum X7JJ'
    },
    {
      path: '/Computer.Files/MonitorScreenSurgeryReport1_V2.png',
      name: 'Surgery Report M-521'
    },
    {
      path: '/Computer.Files/MonitorScreenSurgeryReport2_V2.png',
      name: 'Surgery Report 0-717'
    }
  ]
  const [files, setFiles] = useState(INIT_FILES)
  const end = {
    path: '/Computer.Files/MonitorScreenSurgeryReport2_V2.png',
    name: 'end'
  }
  useEffect(() => {
    // Log out - reset everything
    if (currView == 0 && showEndFile) {
      setFiles(INIT_FILES)
      setShowEndFile(false)
      setCurrFile(0)
    }
  }, [currView])

  useEffect(() => {
    if (showEndFile && files.length < 8) {
      setFiles((prev) => [...prev, end])
    }
  }, [showEndFile])
  const FileView = () => {
    return (
      <Image
        className={styles.file_content}
        src={files[currFile].path}
        alt='Computer with computer and desk'
        width={1024}
        height={768}
        priority={true}
      />
    )
  }

  const File2 = () => {
    return <>This is file two</>
  }
  useEffect(() => {
    if (currView == 0) {
      setAccessGranted(false)
    }
  }, [currView])

  useEffect(() => {
    const handleEscapeBack = (e) => {
      if (e.key === 'Escape') {
        setCurrView((prev) => {
          if (prev == 3) {
            return 2
          } else {
            return 0
          }
        })
      }
    }
    window.addEventListener('keydown', handleEscapeBack)

    return () => window.removeEventListener('keydown', handleEscapeBack)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currView === 1 && accessGranted) {
        if (e.key === 'Enter') {
          setCurrView(2)
        }
      } else if (currView === 2) {
        console.log(currFile)
        if (e.key === 'ArrowUp') {
          setCurrFile((prev) => Math.max(prev - 1, 0))
        }
        if (e.key === 'ArrowDown') {
          setCurrFile((prev) => Math.min(prev + 1, files.length - 1))
        }
        if (e.key === 'Enter') {
          console.log(currFile)
          handleFileDouble()
        }
      }
      // else: ignore all keys when not in view 1 or 2
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currView, files.length, currFile])

  const handleModalClose = () => {
    setCurrView(1)
  }
  const handleFileClick = (index) => {
    // if (index == 20) {
    // } else {
    setCurrFile(index)
    // }
  }
  const handleFileDouble = (index) => {
    if (currFile == files.length - 1 && showEndFile) {
      setCurrView(4)
    } else {
      // setCurrFile(index)
      setCurrView(3)
    }
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
              files={files}
              currFile={currFile}
              handleModalClose={handleModalClose}
              handleFileClick={handleFileClick}
              handleFileDouble={handleFileDouble}
              showEndFile={showEndFile}
              setShowEndFile={setShowEndFile}
            />
            <DatabaseStarter
              currView={currView}
              setCurrView={setCurrView}
              setAccessGranted={setAccessGranted}
            />
          </>
        )}
        <div
          className={styles.file_viewer}
          style={{ display: currView == 3 ? 'flex' : 'none' }}
        >
          <div
            className={styles.exit_file}
            onClick={() => setCurrView(2)}
          ></div>
          <FileView />
        </div>
        <div
          className={styles.file_viewer}
          style={{ display: currView == 4 ? 'flex' : 'none' }}
        >
          End
        </div>
              <video
        // class='bg_video'
        autoplay
        muted
        loop
        playsinline
        style={{ display: currView == 4 ? 'flex' : 'none' }}
      >
        <source src='public/ExperienceEnd.mp4' type='video/mp4' />
      </video>
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
