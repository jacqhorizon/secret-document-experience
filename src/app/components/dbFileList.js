import styles from '../page.module.css'

const DbFileList = ({ currView, FILES, currFile, handleFileSelect }) => {
  return (
    <div className={styles.file_modal}
    style={{display: currView == 1 ? 'block' : 'none'}}>
<div className={styles.file_list_head}> 
    <p>D:/05T/Files/Data</p>
    <p>X</p>
</div>
<div className={styles.file_list}>
      {FILES.map((file, i) => {
        return (
          <ul
            key={file.name}
            onClick={() => handleFileSelect(i)}
            className={currFile == i ? styles.selected_file : styles.list_item}
          >
            {file.name}
          </ul>
        )
      })}
</div>

    </div>
  )
}

export default DbFileList
