import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import newRequest from "../../utils/newRequest.js";
import { format } from 'timeago.js'

const Messages = () => {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {isLoading, error, data} = useQuery({

    queryKey:["conversations"],
    queryFn: () => newRequest.get("/conversations").then((res) => {

      return res.data
      
    })

  })

  console.log(data)

  const queryClient = useQueryClient()

  const mutation = useMutation({

    mutationFn: (id) => {

      return newRequest.put(`/conversations/${id}`)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["conversations"])

    }

  })

  const handleRead = (id) => {

   mutation.mutate(id)

  }

  return (

    <div className="messages">

      {isLoading ? ("Loading...")  : error ? ("Đã xảy ra lỗi") : <div className="container">

        <div className="title">
          <h1>Cuộc trò chuyện</h1>
        </div>

        <table>



          {data.length === 0 
                  ? (
                    <> <br /> <br /> <br /> <br /><h2 style={{ display:"flex", justifyContent:'center', position:'relative',bottom:"50px"}}>Oops, bạn chưa có cuộc trò chuyện nào !!!</h2></>
        ) : (data.map(item => (
          <>
          
          <tr>
            <th>{currentUser.isSeller ? "Người mua" : "Người bán"}</th>
            <th>Tin nhắn gần nhất</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
          <tr className={((currentUser.isSeller && !item.readBySeller) || (!currentUser.isSeller && !item.readByBuyer))  && "active"} key={item.id}>

            <td>{currentUser.isSeller ? item.buyerId : item.sellerId}</td>

            <td>

              <Link to={`/message/${item.id}`} className="link">
                {item?.lastMessage?.substring(0, 100)}...
              </Link>
              
            </td>

            <td>{format(item.createdAt)}</td>

    
            <td>
            {

            ((currentUser.isSeller && !item.readBySeller) || (!currentUser.isSeller && !item.readByBuyer)) 

             && 

            (<button onClick={() => handleRead(item.id)}>Đánh dấu đã đọc</button>)

            }
              
            </td>

          </tr>
          </>
          )))}
          
        </table>

      </div>
}

    </div>

  );
};

export default Messages;
