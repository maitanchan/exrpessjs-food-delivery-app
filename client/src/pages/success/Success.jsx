import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Success = () => {

  const {search} = useLocation()

  const navigate = useNavigate()

  const params = new URLSearchParams(search)

  const payment_intent = params.get("payment_intent")

  useEffect(() => {

    const makeRequest = async () => {

     try {

      await newRequest.put("/orders", {payment_intent})

      setTimeout(() => {

        navigate("/orders")

      }, 5000)

     
      
     } catch (err) {

      console.log(err)
      
     }

    }

    makeRequest()

  },[])

  return (
    <div style={{ backgroundColor: '#0c5c26', color: '#fff', padding: '20px', borderRadius: '4px', textAlign: 'center'}}>
  <i style={{ fontSize: '48px', marginBottom: '10px' }} className="fas fa-check-circle"></i>
  <h3 style={{ margin: '0', fontSize: '24px' }}>Thanh toán thành công ! Cảm ơn bạn đã mua dịch vụ </h3>
  <p style={{ margin: '10px 0 0', fontSize: '18px' }}>Bạn đang được chuyển hướng đến trang đặt hàng. xin vui lòng không đóng trang</p>
</div>


    
  )

}

export default Success