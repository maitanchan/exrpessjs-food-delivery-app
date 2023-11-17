import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import {useQuery} from '@tanstack/react-query'
import newRequest from "../../utils/newRequest.js";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const navigate = useNavigate()

  const {isLoading, data, error} = useQuery({

    queryKey: ["orders"],

    queryFn: () => newRequest.get(`/orders`).then((res) => {

      return res.data

    })

  })

  console.log(data)

  const handleContact = async (order) => {

    const sellerId = order.sellerId
    const buyerId = order.buyerId

    const id = sellerId + buyerId

    try {

      const res = await newRequest.get(`/conversations/single/${id}`)
      
      navigate(`/message/${res.data.id}`)
      
    } catch (err) {

     if(err.response.status === 404){

      const res = await newRequest.post(`/conversations/`, {to: currentUser.seller ? buyerId : sellerId})

      navigate(`/message/${res.data.id}`)

     }
      
    }

  }

  return (

    <div className="orders">

      {isLoading ? ("Loading...") : error ? ("Đã xảy ra lỗi") : <div className="container">

        <div className="title">
          <h1>Quản lý đơn hàng</h1>
        </div>

        <table>

        
      {data?.length === 0 
      ? 
      ( <> <br /> <br /> <br /> <br /><h2 style={{ display:"flex", justifyContent:'center', position:'relative',bottom:"50px"}}>Oops, bạn chưa có đơn hàng nào !!!</h2></>) 
      :

      ( data.map((order) => (
            <>
              <tr>

                  <th>Hình ảnh</th>
                  <th>Tên thực đơn</th>
                  <th>Giá</th>
                  <th>Tình trạng đơn hàng</th>
                  <th>Liên hệ</th>
 
              </tr>
            <tr key={order._id}>
              
              <td>
                <img className="image" src={order.img} alt="" />
              </td>
              <td>{order.title}</td>
              <td>{order.price}.000 <sup>đ</sup></td>
              <td style={{ gap:"20px" }}>

             

                {order.isCompleted ? <>   
                {/* <LocalShippingIcon style={{ position:"relative", top:"5px", color:"#f23557"}} />  */}
                <img style={{ position:"relative", top:"5px"}}   className="message" src="./img/delivery.png" alt="" />
                 <p style={{ position:"relative",bottom:"30px" }}>Đơn hàng đang chuẩn bị giao...</p></> : 0}

              </td>
              <td>
                {/* <img
                  className="message"
                  src="./img/message.png"
                  alt=""
                  onClick={() => handleContact(order)}
                /> */}

                <MessageIcon onClick={() => handleContact(order)} style={{ cursor:"pointer", color:"#2772db" }}  />
              </td>
            </tr>
            </>
          )) )

        }


        </table>

      </div>
       }
    </div>

  )
}

export default Orders;
