import React from "react";
import "./GigCard.scss";
import DiscountIcon from '@mui/icons-material/Discount';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const GigCard = ({ item }) => {

  const { isLoading, error, data, refetch } = useQuery({

    queryKey: [item.userId],

    queryFn: () => newRequest.get(`/users/find/${item.userId}`).then((res) => {

      return res.data

    })
    
  })
  console.log(item)
  
  return (

    <Link to={`/gig/${item._id}`} className="link">

      <div className="gigCard">
      <div style={{ position: 'relative' }}>
         <img src={item.cover} alt="" />
         <span style={{ position: 'absolute', top: '160px', left: "5px", zIndex: 1 , padding:"10px 10px",backgroundColor:"rgb(254, 70, 70)", color:"#fff", display:"flex", columnGap:"7px", borderRadius:"5px"}}><ThumbUpIcon style={{ fontSize:"16px" }} /> <p style={{ fontWeight:"500",fontSize:'13px', color:"#fff" }}>Yêu thích</p></span>

         <span style={{ position: 'absolute', top: 0, left:0, zIndex: 1 , padding:"8px 8px",backgroundColor:"rgb(9, 130, 49)", color:"#fff", display:"flex", columnGap:"7px", borderRadius:"50px",border:"2px solid #fff"}}></span>
      </div>


        <div className="info">


          {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") : <div className="user">

            <img src={data?.img || "/img/noavatar.jpg"} alt="" />

            <span>{data?.desc?.substring(0, 25)}...</span>

          </div>
          }

          <h5>{item?.shortDesc?.substring(0, 40)}...</h5>
          {!isNaN(Math.round(item?.totalStars / item?.starNumber)) && 

            <div className="stars">

                {Array(Math.round(item.totalStars / item.starNumber)).fill().map((item, i) => (

                  <img src="/img/star.png" alt="" key={i} />

                ))}

              <span>{Math.round(item?.totalStars / item?.starNumber)}/5</span>

            </div>
            
          }

        </div>

        <hr />

        <div className="detail">

         <DiscountIcon style={{ color:"#ad1e1e" }} />
         <p style={{ fontWeight:"600",color:"#2588b6", fontSize:"14px", marginRight:"80px" }}>
         Giảm hết {item.deliveryTime}% 
         </p>
          <div className="price">

            <span>Giá bán</span>

            <h2>

               {item.price}.000 <sup>đ</sup>
              

            </h2>

          </div>

        </div>

      </div>

    </Link>

  )
}

export default GigCard;
