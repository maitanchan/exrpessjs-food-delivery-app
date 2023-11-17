import React from 'react'
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'

const MessageChild = ({message, currentUser}) => {

    const {isLoading , data, error} = useQuery({

        queryKey: [message.userId],
    
        queryFn: () => newRequest.get(`/users/find/${message.userId}`).then((res) => {
    
            return res.data
    
        })
    
})
    
  return (
    <>

    
    {isLoading ? ("Loading") : error ? ("Đã xảy ra lỗi") : <div className={(message.userId === currentUser._id) ? "owner item" :" item"} key={message._id}>

   

        <img
        src={data.img || "/img/noavatar.jpg"}
        alt=""
        />

        <p>
        {message.desc}
        </p>

     </div>}
     </>
     
  )
}

export default MessageChild