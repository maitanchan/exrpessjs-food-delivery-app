import React, { useState } from 'react'
import './Reviews.scss'
import Review from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

const Reviews = ({gigId}) => {

  const queryClient = useQueryClient()

  const {isLoading, data, error} = useQuery({

    queryKey: ["reviews"],

    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => {

      return res.data

    })

  })

  // console.log(data)

  const mutation = useMutation({

    mutationFn: (review) => {

      return newRequest.post("/reviews", review)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["reviews"])

    }

  })

  const handleSubmit = (e) => {

    e.preventDefault()

    const star = e.target[0].value

    const desc = e.target[1].value

    mutation.mutate({gigId, desc, star})
      
    
  }

  return (

    <div className="reviews">

        <h2>Nhận xét</h2>

        {isLoading ? ("Loading...") : error ? ("Đã xảy ra lỗi") : data.map((review) => (

            <Review key={review._id} review={review} />

        )) }

        <div className="add">

          <form onSubmit={handleSubmit} className='addForm'>

          <select >
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
          <input type="text" placeholder='Viết nhận xét của bạn'  style={{ border: "2px solid #2a9b5b",outlineStyle:"none"}} />

            

            <button type='submit'>Nhận xét</button>

          </form>

        </div>

     </div>

  )

}

export default Reviews