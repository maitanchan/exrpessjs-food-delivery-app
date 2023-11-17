import React from 'react'
import './Review.scss'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import {format} from 'timeago.js'
import moment from 'moment'
import 'moment/locale/vi'; // Import Vietnamese locale for moment


const Review = ({review}) => {

   const {isLoading , data, error} = useQuery({

    queryKey: [review.userId],

    queryFn: () => newRequest.get(`/users/find/${review.userId}`).then((res) => {

        return res.data

    })

   })


  return (
<>
    {isLoading ? ("Loading") : error ? ("Đã có lỗi xảy ra") : <div className="review">

        <div className="user">

        <img
            className="pp"
            src={data.img || "/img/noavatar.jpg"} 
            alt=""
        />

        <div className="info">

            <span>{data.username}</span>

            <div className="country">

            <span>{data.country}</span>

            </div>

        </div>

        </div>

        <div className="stars">

        {Array(review.star).fill().map((item, i) => (

         <img src="/img/star.png" key={i} alt="" />
       
        ))}
        

      
          <span>{review.star}/5 </span>    <p style={{position:"relative", bottom:"3px" }}>|  {moment(review.createdAt).locale('vi').format('LLL')}</p>
  

        </div>

        <p>
         {review.desc}

        </p>

       
        <div className="helpful">

        <span>Có ích không ?</span>

        <img src="/img/like.png" alt="" />

        <span>Có</span>

        <img src="/img/dislike.png" alt="" />

        <span>Không</span>

        </div>

    </div>}
    </>
  )
}

export default Review