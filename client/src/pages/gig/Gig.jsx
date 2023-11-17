import React, { useEffect, useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import LabelIcon from '@mui/icons-material/Label';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DiscountIcon from '@mui/icons-material/Discount';

function Gig() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {id} = useParams()

  const gigId = useLocation().pathname.split("/")[2]

  const {isLoading, data, error, refetch} = useQuery({

    queryKey:["gig"],

    queryFn: () => newRequest.get(`/gigs/single/${gigId}`).then((res) => {

      return res.data

    })

  })

  // console.log(data);

  const userId  = data?.userId

  const {isLoading: isLoadingUser, data: dataUser, error: errorUser} = useQuery({

    queryKey:["user"],

    queryFn: () => newRequest.get(`/users/find/${userId}`).then((res) => {

      return res.data
      
    }),

    enabled: !! userId,

  })

  const [reviews, setReviews] = useState([])

  useEffect(() => {

    const fetchReview = async () => {

      try {

        const res = await newRequest.get(`/reviews/${gigId}`)

        setReviews(res.data)
        
      } catch (err) {

         console.log(err)
        
      }

    }

    fetchReview()

  },[gigId])

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const originalPrice = data?.price

  const discountPercentage = data?.deliveryTime

  const discountedPrice = Math.round(originalPrice * (1 + discountPercentage / 50))

  return (

    <div className="gig">

      {isLoading ? (<>Loading...</>): error ? ("Đã có lỗi xảy ra") : (<div className="container">

        <div className="left">

          <span className="breadcrumbs">foodEats  » {data?.cat} » {data?.shortDesc} </span>
          
          <div style={{ position: 'relative' , bottom:"12px"}}>

            <span style={{ position: 'absolute', top: '0px', left: "0px", zIndex: 1 , padding:"3px 12px",backgroundColor:"rgb(254, 70, 70)", color:"#fff", display:"flex", columnGap:"7px", borderRadius:"3px"}}><ThumbUpIcon style={{ fontSize:"13px", position:"relative", top:"5px" }} /> <p style={{ fontWeight:"500",fontSize:'11px', color:"#fff" }}>Yêu thích</p></span>

      </div>
          <h1>{dataUser?.desc}</h1>
          <h5 style={{ fontWeight:"400" }}>{data?.shortDesc}</h5>

         {isLoadingUser ? ("Loading...") : errorUser ? ("Đã có lỗi xảy ra") : (
         
          <div className="user">

            <img
              className="pp"
              src={dataUser?.img}
              alt=""
            />

            <span>{dataUser.username}</span>
            
            {!isNaN(Math.round(data?.totalStars / data?.starNumber)) && 
            <div className="stars">

                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

                  <img src="/img/star.png" alt="" key={i} />

                ))}

              <span>{Math.round(data?.totalStars / data?.starNumber)}/5</span>
               <p style={{ padding:"1px 10px",backgroundColor:"rgb(254, 70, 70)", backgroundColor:"#ffc108", color:"#fff", borderRadius:"5px", fontSize:"13px" }}>{reviews.length} </p> <h5 style={{ fontWeight:"400" }}>đánh giá trên foodEats</h5>
            </div>
            }

          </div>)
        }

          <Slider slidesToShow={1} arrowsScroll={1} className="slider">

            {data.images.map((img) => (

                <img
                  src={img}
                  alt=""
                  key={img}
                />
            
            ))}
           
          </Slider>

          <p>
           {data.desc}
          </p>
          
          {isLoadingUser ? ("Loading...") : errorUser ? ("Đã có lỗi xảy ra") : (
          <div className="seller">

            <h2>Về quán ăn</h2>

            <div className="user">

              <img
                src={dataUser?.img}
                alt=""
              />

              <div className="info">

                <span>{dataUser?.username}</span>

                {!isNaN(Math.round(data?.totalStars / data?.starNumber)) && 
                <div className="stars">

                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                  <img src="/img/star.png" alt="" key={i} />
                ))}
               
               <span>{Math.round(data?.totalStars / data?.starNumber)}/5</span>

               </div>
            }

                <button>Liên hệ</button>

              </div>

            </div>

            <div className="box">

              <div className="items">

                <div className="item">

                  <span className="title">From</span>

                  <span className="desc">{dataUser.country}</span>

                </div>

                <div className="item">

                  <span className="title">Phone</span>

                  <span className="desc">{dataUser.phone}</span>

                </div>

                <div className="item">

                  <span className="title">Email</span>

                  <span className="desc">{dataUser.email}</span>

                </div>

              </div>

              <hr />
              
              <p style={{ display:"flex", columnGap:"8px" }}>
               {dataUser.desc} |
              <p>{data.shortDesc}</p>            
              </p>

            </div>

          </div>)}

          <Reviews gigId={gigId}/>

        </div>

        <div className="right">

          <div className="price">

            <h2 style={{fontWeight:"600"  }}>{data.title}</h2>

         <div style={{ display:"flex", columnGap: "20px" }}>
            <h3 style={{ marginTop:"10px", color:"#2778cf", fontWeight:"600" }}> <del>{discountedPrice}.000</del> <sup>đ</sup></h3>
            <h3 style={{ marginTop:"10px", color:"#2778cf", fontWeight:"600" }}>➭{data.price}.000 <sup>đ</sup></h3>
         </div>

            <div className="quantity-input">
              
              <button className="decrement-button" style={{ backgroundColor:"#2a9b5b", padding:"5px 10px", borderRadius:"5px" }}  onClick={handleDecrement}>-</button>
              <input
                type="number"
                className="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <button className="increment-button" style={{ backgroundColor:"#2a9b5b" , padding:"5px 10px", borderRadius:"5px"}} onClick={handleIncrement}>+</button>

            <ShoppingCartIcon style={{ color:"#2a9b5b",fontSize:"35px", marginLeft:"250px"  }}/>
          </div>
          </div>

          <p>
           {data.shortTitle}
          </p>

          <div className="details">

            <div className="item">

            <DiscountIcon style={{ color:"#ad1e1e" }} />

              <span>{data.deliveryTime}% Giảm giá</span>

            </div>

            <div className="item">

              <img src="/img/recycle.png" alt="" />

              <span>{data.revisionNumber} Combo</span>

            </div>

          </div>

          <div className="features">

            

            {data.features.map(feature => (
 
            <div className="item" key={feature} style={{ marginTop:"20px" }}>

              <LabelIcon style={{ color:"#2a9b5b" }}/>

              <span style={{fontSize:"0.8em" , fontWeight:"350" }}>{feature}</span>

            </div>
            ))}
          
          </div>
      
          <Link to={`/pay/${id}`}  >

             <button style={{ marginLeft:"130px" }}>Đặt hàng</button>

          </Link>

        </div>

      </div>
)}

    </div>

  )

}

export default Gig;
