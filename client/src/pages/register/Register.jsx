import React, { useState } from "react"
import "./Register.scss"
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import upload from "../../utils/upload.js";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({

    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: ""

  })

  const [file, setFile] = useState(null)

  const handleChange = (e) => {

    setUser((prev) => {

     return {

       ...prev,
       [e.target.name]: e.target.value }
    
    })

  }

  const handleSeller = (e) => {

    setUser((prev) => {

     return {

       ...prev,
       isSeller: e.target.checked }
    
    })

  }

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {

   e.preventDefault()

   const url = await upload(file)

   try {

     await newRequest.post("/auth/register", {

      ...user,
      img: url,

    })

     alert("Đăng ký tài khoản thành công")

    navigate("/login")

    
   } catch (err) {

      setError(err.response.data.message)
    
   }

  }

  return (

   <>

   

    <div className="register">

      <form onSubmit={handleSubmit}>

        <div className="left">

          <h1>Đăng ký tài khoản</h1>

          <label htmlFor="">Tài khoản</label>
          <input
            name="username"
            type="text"
            placeholder="Tên tài khoản"
            onChange={handleChange}
          />

          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <label htmlFor="">Mật khẩu</label>
          <input 
             name="password" 
             type="password" 
             placeholder="Mật khẩu"
             onChange={handleChange} />

          <label htmlFor="">Ảnh đại diện</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="">Quốc tịch</label>
          <input
            name="country"
            type="text"
            placeholder="Quốc tịch"
            onChange={handleChange}
          />

          <br />

          <p style={{ color:"red" }}>{error && error}</p>
          
          <br />

          <button type="submit">Đăng ký</button>

        </div>

        <div className="right" style={{ marginBottom:"135px" }}>

          <h1>Tôi muốn trở thành người bán</h1>

          <div className="toggle">

            <label htmlFor="">Xác nhận tài khoản người bán</label>

            <label className="switch">

              <input type="checkbox" onChange={handleSeller} />

              <span className="slider round"></span>

            </label>

          </div>

          <label htmlFor="">Số điện thoại</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            style={{position:"relative" }}
          />

          <label htmlFor="">Mô tả</label>
          <textarea
            placeholder="Mô tả về bản thân"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          
        </div>

      </form>

    </div>

    
  </>

  )

}

export default Register