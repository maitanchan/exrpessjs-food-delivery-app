import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest.js";

function Navbar() {

  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()

  const isActive = () => {

    window.scrollY > 0 ? setActive(true) : setActive(false)

  }

  useEffect(() => {

    window.addEventListener("scroll", isActive)

    return () => {

      window.removeEventListener("scroll", isActive)

    }

  }, [])

  const navigate = useNavigate()

  //Get user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleLogout = async (e) => {

    e.preventDefault()

    try {

      await newRequest.post("/auth/logout")

      localStorage.setItem("currentUser", null)

      navigate("/")
      
    } catch (err) {

      throw err
      
    }

  }

  return (

    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
 
      <div className="container">
     
        <div className="logo">

          <Link className="link" to="/">
            <span className="text">food</span>
          <span className="dot">Eats.</span>
          </Link>
        </div>

        <div className="links">

          <span>Trang chủ</span>

          <span>Hỗ trợ trực tuyến</span>


          <span>FAQ</span>

          <span>Liên hệ</span>
          <span>Về chúng tôi</span>

          {!currentUser?.isSeller && <span>Người bán</span>}

          {currentUser ? 
          (
            <div className="user" onClick={()=>setOpen(!open)}>

              <img
                src={currentUser?.img || "/img/noavatar.jpg"}
                alt=""
              />

              <span>{currentUser?.username}</span>
              
              {open && <div className="options">
                
                {currentUser.isSeller && (
                  <>

                    <Link className="link" to="/mygigs">
                      Món ăn của tôi
                    </Link>

                    <Link className="link" to="/add">
                      Thêm món ăn
                    </Link>

                  </>
                )}

                <Link className="link" to="/orders">
                  Đơn hàng
                </Link>

                <Link className="link" to="/messages">
                  Tin nhắn
                </Link>

                <Link className="link" onClick={handleLogout}>
                  Đăng xuất
                </Link>

              </div>}
            </div>
          ) 
          : 
          (
            <>

              <Link to="/login" className="link"><button>Đăng nhập</button></Link>
              <Link className="link" to="/register">
                <button>Đăng ký</button>
              </Link>

            </>
          )}

        </div>

      </div>

      {(active || pathname !== "/") && (
        <>

          <hr />

          <div className="menu">

            <Link className="link menuLink" to="/">
            Đặt Đồ
            </Link>

            <Link className="link menuLink" to="/">
            Món ăn & Thực đơn

            </Link>

            <Link className="link menuLink" to="/">
            Tin tức & Khuyến Mãi
            </Link>

            <Link className="link menuLink" to="/">
            Kinh doanh
            </Link>

            <Link className="link menuLink" to="/">
            Tài Khoản Của Tôi
            </Link>

            <Link className="link menuLink" to="/">
           Dịch vụ
            </Link>

            <Link className="link menuLink" to="/">
            Thanh Toán
            </Link>

            <Link className="link menuLink" to="/">
            Đánh Giá & Phản Hồi
            </Link>

          </div>

          <hr />

        </>

      )}

    </div>

  )

}

export default Navbar;
