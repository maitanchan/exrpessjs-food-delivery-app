import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import {useNavigate} from 'react-router-dom'

const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined)

  const [files, setFiles] = useState([])

  const [uploading, setUploading] = useState(false)

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

  const navigate = useNavigate()

  const handleChange = (e) => {

  dispatch({

    type: "CHANGE_INPUT",

    payload: {

      name: e.target.name,
      value: e.target.value

    }

  })

 }

 const handleFeature = (e) => {

  e.preventDefault()

  dispatch({

    type: "ADD_FEATURE",

    payload: e.target[0].value

  })

  e.target[0].value = ""

 }

 const handleUpload = async () => {

  setUploading(true)

  try {

   const cover = await upload(singleFile)

   const images = await Promise.all([...files].map(async (file) => {

      const url = await upload(file)
      
      return url

    }

  ))

  setUploading(false)

  dispatch({

    type:"ADD_IMG",

    payload: {

      cover,
      images

    }

  })
    
  } catch (err) {

    console.log(err)
    
  }

 }

 const queryClient = useQueryClient()

 const mutation = useMutation({

  mutationFn: (gig) => {

    return newRequest.post("/gigs", gig)

  },

  onSuccess: () => {

    queryClient.invalidateQueries(["myGigs"])

  }

})

 const handleSubmit  = (e) => {

   e.preventDefault()

   mutation.mutate(state)

   navigate("/mygigs")

 }


  return (

    <div className="add">

      <div className="container">

        <h1 style={{ fontWeight:"600", color:"#000" }}>Thêm danh mục món ăn</h1>

        <div className="sections">

          <div className="info">

            <label htmlFor="">Tên món ăn</label>

            <input
              type="text"
              name="title"
              placeholder="Tên món ăn..."
              onChange={handleChange}
            />

            <label htmlFor="">Thể loại</label>

            <select name="cat" id="cat" onChange={handleChange}>
              <option>Thể loại</option>
              <option value="Food">Đồ ăn</option>
              <option value="Drink">Đồ uống</option>
              <option value="Healthy">Đồ chay</option>
              <option value="Cake">Bánh kem</option>
              <option value="Chicken">Món gà</option>
              <option value="Sushi">Sushi</option>
              <option value="Noodle">Mì phở</option>
              <option value="Rice">Cơm</option>
            </select>

            <div className="images">

              <div className="imagesInputs">

                  <label htmlFor="">Thumnail</label>

                  <input type="file" onChange={(e) => setSingleFile(e.target.files[0])}/>

                  <label htmlFor="">Hình ảnh chi tiết</label>

                  <input type="file" multiple  onChange={(e) => setFiles(e.target.files)} />

               </div>

               <button onClick={handleUpload}>{uploading ? "Đang tải..." : "Tải lên"}</button>

            </div>

            <label htmlFor="">Mô tả thực đơn</label>

            <textarea 
                name="desc" 
                id="" 
                placeholder="Mô tả thực đơn..."
                cols="0" 
                rows="16"
                onChange={handleChange}
            >
           </textarea>

            <button onClick={handleSubmit}>Tạo</button>

          </div>

          <div className="details">

            <label htmlFor="">Dịch vụ khác</label>

            <input type="text"  name="shortTitle" placeholder="Dịch vụ khác..."  onChange={handleChange}/>

            <label htmlFor="">Mô tả dịch vụ</label>

            <textarea 
                name="shortDesc" 
                id="" 
                placeholder="Mô tả dịch vụ..." 
                cols="30" 
                rows="10"
                onChange={handleChange}
                >
            </textarea>

            <label htmlFor="">Khuyến mãi</label>

            <input type="number"   placeholder="Khuyến mãi..."   name="deliveryTime" onChange={handleChange}/>

            <label htmlFor="">Số lượng combo</label>

            <input type="number"   placeholder="Số lượng combo..."  name="revisionNumber" onChange={handleChange} />

            <label htmlFor="">Ưu đãi</label>

            <form action="" className="add"   onSubmit={handleFeature}>

              <input type="text" placeholder="Ưu đãi..."  />

              <button type="submit">Thêm</button>
              
            </form>

            <div className="addedFeatures">
              {state?.features?.map(feature => (

                  <div className="item" key={feature}>
                    <button onClick={() => dispatch({type:"REMOVE_FEATURES", payload: feature})} >{feature} <span>X</span></button>
                  </div>

              ))}
            </div>

            <label htmlFor="">Giá</label>

            <input type="number" name="price" placeholder="Giá..." onChange={handleChange}/>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Add;
