import styles from '../page.module.css'
import { useState, useEffect } from 'react'
const DatabaseStarter = ({ currView, setCurrView,setAccessGranted }) => {
  const START_TEXT = [
    { text: 'Starting SD-DOS. . . . .', speed: 1 },
    { text: '', speed: 0 }, // <br />
    { text: 'Current date is TUE  4-07-1994', speed: 1 },
    { text: 'Command v.1.17', speed: 1 },
    { text: '', speed: 0 },
    {
      text: 'This system the the property of the United Soviet Dawn.',
      speed: 1
    },
    { text: 'Unauthorized access is prohibited.', speed: 1 },
    { text: '', speed: 0 },
    { text: 'USD Internal File System Directory', speed: 1 },
    { text: '', speed: 0 },
    { text: 'Clearance Code. . . . . . Red Zero', speed: 1 },
    { text: 'Designation. . . . . . Top Secret', speed: 1 },
    { text: '', speed: 0 },
    { text: 'File Database open to user_', speed: 1 },
    { text: '', speed: 0 },
    { text: 'Press ESC to log off', speed: 1 }
  ]
  const [lines, setLines] = useState([]) // completed lines
  const [currentLine, setCurrentLine] = useState('') // line being typed
  const [lineIndex, setLineIndex] = useState(0) // which line
  const [charIndex, setCharIndex] = useState(0) // which character
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 100) // 1s delay

    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    if (!started) return // wait until pause is done

    if (lineIndex >= START_TEXT.length) {
      setAccessGranted(true)
      setCurrView(2)
    } // finished all lines
    else {
      const line = START_TEXT[lineIndex].text
      const speed = 5 * (START_TEXT[lineIndex].speed || 1) // ms per char

      if (charIndex < line.length) {
        // keep typing characters
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + line[charIndex])
          setCharIndex((prev) => prev + 1)
        }, speed)
        return () => clearTimeout(timeout)
      } else {
        // finished current line
        const timeout = setTimeout(() => {
          setLines((prev) => [...prev, line])
          setCurrentLine('')
          setCharIndex(0)
          setLineIndex((prev) => prev + 1)
        }, 150) // pause before next line
        return () => clearTimeout(timeout)
      }
    }
  }, [charIndex, lineIndex, started])

  return (
    <div
      className={styles.database_starter}
      style={{ display: currView == 1 || currView == 2 ? 'flex' : 'none' }}
    >
      {lines.map((line, idx) =>
        line === '' ? <br key={idx} /> : <p key={idx}>{line}</p>
      )}
      {/* currently typing line */}
      {currentLine && (
        <p>
          {currentLine}
          <span className='animate-pulse'>_</span>
        </p>
      )}
      {/* {!isTyping && (
        <p>
          {lines[lines.length - 1]}
          <span className='animate-pulse'>_</span>
        </p>
      )} */}
      {/* <p>Starting MS-DOS. . . . .</p>
      <br />
      <p>Current date is TUE &nbsp; 4-07-1994</p>
      <p>Command v.1.17</p>
      <br />
      <p>This system the the property of the United Soviet Dawn.</p>
      <p>Unauthorized access is prohibited.</p>
      <br />
      <p>USD Internal File System Directory</p>
      <br />
      <p>Clearance Code. . . . . . Red Zero</p>
      <p>Designation. . . . . . Top Secret</p>
      <br />
      <p>File Database open to user_</p>
      <br />
      <p>Press ESC to log off</p> */}
    </div>
  )
}

export default DatabaseStarter
