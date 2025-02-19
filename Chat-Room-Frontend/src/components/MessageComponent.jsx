import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const MessageComponent = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state.user.socketConnection)

  console.log("params9999999", params);
  

  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)
    }
  },[])
  return (
    <div>
      MessageComponent
    </div>
  )
}

export default MessageComponent
