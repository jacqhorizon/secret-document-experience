import styles from '../page.module.css'

const DbFileList = ({ currView, FILES, currFile, handleModalClose, handleFileClick, handleFileDouble }) => {
  return (
    <div
      className={styles.file_modal}
      style={{ display: currView == 2 ? 'block' : 'none' }}
    >
      <div className={styles.file_list_head}>
        <p>D:/05T/Files/Data</p>
        <p
        onClick={() => handleModalClose()}
        >X</p>
      </div>
      <div className={styles.file_list}>
        {FILES.map((file, i) => {
          return (
            <ul
              key={file.name}
              onClick={() => handleFileClick(i)}
              onDoubleClick={() => handleFileDouble(i)}
              className={
                currFile == i ? styles.selected_file : styles.list_item
              }
            >
              {file.name}
            </ul>
          )
        })}
      </div>
       <div className={styles.file_list_end}>
        <p>Use ↑ ↓ to select a file</p>
        <p>Press ENTER to view a file</p>
      </div>
    </div>
  )
}

export default DbFileList
