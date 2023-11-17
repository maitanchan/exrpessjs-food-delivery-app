import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { getCurrentUser } from "../../utils/getCurrentUser.js";
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import newRequest from "../../utils/newRequest";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function MyGigs() {
  const currentUser = getCurrentUser()

  const {isLoading , error, data} = useQuery({

  queryKey: ['myGigs'],

  queryFn: () => newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {

    return res.data

  })

})


  const queryClient = useQueryClient()

  const mutation = useMutation({

    mutationFn: (id) => {

      return newRequest.delete(`/gigs/${id}`)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["myGigs"])

    }

  })

  const handleDelete = (id) => {

    mutation.mutate(id)

  }

  
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  
  const targetColors = ["#2a9b5b", "#2a9b5b", "#2a9b5b", "#2a9b5b", "#2a9b5b", "#2a9b5b", "#2a9b5b", "#2a9b5b"];

  const targetColorsText = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
       <>
       <button
          key={i}
          onClick={() => handleClick(i)}
          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            border: "2px solid #2a9b5b",
            backgroundColor: currentPage === i ? targetColors[i - 1] : "#ffff",
            color: currentPage === i ? targetColorsText[i - 1] : "#000",
            marginRight:"3px"
          }}
        >
          {i}
        </button>
       </>
      );
    }

    return pageButtons;
  };


  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data?.slice(startIndex, endIndex);

    return currentData?.map((gig) => (
      <tr key={gig._id}>

      <td >

        <img
          className="image"
          src={gig.cover}
          alt=""
        />

      </td>

      <td>{gig.title}</td>

      <td>{gig.cat}</td>
      <td>{gig?.shortTitle?.substring(0,30)}...</td>

      <td>{gig.price}.000 <sup>đ</sup></td>

      <td>{gig.deliveryTime}%</td>

      <td>

        <DeleteSweepIcon  onClick={() => handleDelete(gig._id)} style={{ cursor:"pointer" }}/> 
       
       <Link to={`/edit/${gig._id}`} style={{ textDecoration:"none", color:"#000", marginLeft:"10px"}}> <EditIcon/></Link>

      </td>

    </tr>
    ));
  };

  return (
    <div className="myGigs">

      {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") : <div className="container">

        <div className="title">
          <h1>Quản lý món ăn của tôi</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Thêm món ăn</button>
            </Link>
          )}
        </div>

        <table>

          <tr>
            <th>Thumnail</th>
            <th>Tên món ăn</th>
            <th>Danh mục</th>
            <th>Dịch vụ khác</th>
            <th>Giá</th>
            <th>Giảm giá</th>
            <th>Hành động</th>
          </tr>

          {/* {data?.slice(0,4).map((gig) => (

          <tr key={gig._id}>

            <td >

              <img
                className="image"
                src={gig.cover}
                alt=""
              />
  
            </td>

            <td>{gig.title}</td>

            <td>{gig.cat}</td>
            <td>{gig?.shortTitle?.substring(0,50)}...</td>

            <td>{gig.price}.000 <sup>đ</sup></td>

            <td>{gig.deliveryTime}%</td>

            <td>

              <DeleteSweepIcon  onClick={() => handleDelete(gig._id)} style={{ cursor:"pointer" }}/> 
             
             <Link to={`/edit/${gig._id}`} style={{ textDecoration:"none", color:"#000", marginLeft:"10px"}}> <EditIcon/></Link>

            </td>

          </tr>
           ))} */}

          {renderData()}

         

        </table>
        <div  style={{ marginLeft:"600px", marginTop:"30px"}}>
              {renderPagination()}
          </div>
      </div>
       }
    </div>
  );
}

export default MyGigs;
