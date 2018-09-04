import React from 'react'

const Notification = ({ message, noticeType }) => {
  let name
  if (message === null) {
    return null
  } else {
    if (noticeType === 'ERROR') {
      name = "error"
    } else {
      name = "notice"
    }
  }

  return (
    <div className={name}>
      {message}
    </div>
  )
}

export default Notification
