import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {

  const [input, setInput] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {

   navigate(`/gigs?search=${input}`)

  }

  return (
    
    <div className="featured">

      <div className="container">

        <div className="left" style={{ marginLeft:"740px" }}>

          <h1>
          Các món ăn tuyệt vời, hoàn hảo cho bữa ăn của bạn !!! 🍌🍌🍌🍌🍌
          </h1>

          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Bạn muốn ăn gì  ...' onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Tìm kiếm</button>
          </div>

          <div className="popular">
            <span>Phổ biến:</span>
            <button>Đồ ăn</button>
            <button>Đồ uống</button>
            <button>Đồ chay</button>
            <button>Tráng miệng</button>
            <button>Bánh kem</button>
            <button>Homemade</button>
          </div>
          
          <div className="popular">
            <button>Vỉa hè</button>
            <button>Món gà</button>
            <button>Món lẩu</button>
            <button>Sushi</button>
            <button>Mì phở</button>
            <button>Cơm hộp</button>
          </div>

        </div>

    

      </div>

    </div>

  );
}

export default Featured;
