import Form from 'next/form'
import { useState } from 'react'
import styles from '../page.module.css'

const PasswordInput = ({ setCurrView }) => {
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
    if (password == 'Alpha Zero') {
      setCurrView(1)
    } else {
      setShowError(true)
    }
  }
  return (
    <>
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
    </>
  )
}
export default PasswordInput
