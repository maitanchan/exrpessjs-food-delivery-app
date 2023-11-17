import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import MessageChild from "./MessageChild";

const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {id} = useParams()

  const queryClient = useQueryClient()

  const {isLoading, error, data} = useQuery({

    queryKey:["messages"],

    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => {

      return res.data
      
    })

  })

  const mutation = useMutation({

    mutationFn: (message) => {

      return newRequest.post(`/messages/`, message)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["messages"])

    }

  })

  const handleSubmit = (e) => {

    e.preventDefault()

   mutation.mutate({

    conversationId: id,
    desc: e.target[0].value,

   })

   e.target[0].value = ""

  }


  return (

    <div className="message">
     {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") :

     (
      <div className="container">

        <span className="breadcrumbs">

          <Link to="/messages">Trò chuyện với Shipper</Link>

        </span>

        
         <div className="messages">

          {data.map((message) => (

           <MessageChild message={message} currentUser={currentUser} key={message._id}/>

           ))}

        </div>

        <hr />

        <form className="write" onSubmit={handleSubmit}>

          <textarea type="text" placeholder="Viết cái gì đó đi..." />

          <button type="submit">Gửi</button>

        </form>

      </div>

   )

}

    </div>
  );
};

export default Message;
