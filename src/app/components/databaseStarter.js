import styles from '../page.module.css'
const DatabaseStarter = ({currView}) => {
  return (
    <div
      className={styles.database_starter}
      style={{ display: currView == 1 ? 'flex' : 'none' }}
    >
      <p>Starting MS-DOS. . . . .</p>
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
      <p>Press ESC to log off</p>
    </div>
  )
}

export default DatabaseStarter
