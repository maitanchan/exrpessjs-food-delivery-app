import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useLocation } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Gigs() {
  

  const [sort, setSort] = useState("sales")

  const [open, setOpen] = useState(false)

  const minRef = useRef()
  const maxRef = useRef()

  const {search} = useLocation()

  const { isLoading, error, data, refetch } = useQuery({

    queryKey: ['gigs'],

    queryFn: () => newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {

      return res.data

    })
    
  })


  useEffect(() => {

    refetch()
    
  },[sort])

  const reSort = (type) => {

    setSort(type)
    setOpen(false)

  }

  const apply = ()=>{

    refetch()

  }


  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const category = searchParams.get('cat');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


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
      <GigCard key={gig._id} item={gig} />
    ));
  };

  return (

    <div className="gigs">

      <div className="container">

        <span className="breadcrumbs">foodEats | {category} </span>

        <h1 style={{ textTransform:"uppercase" }}>{category}</h1>


        <div className="menu">

          <div className="left">

            <span>Giá</span>

            <input ref={minRef} type="number" placeholder="min" />

            <input ref={maxRef} type="number" placeholder="max" />

            <button onClick={apply}>Lọc</button>

          </div>

          <div className="right">

            <span className="sortBy">Sắp xếp theo</span>

            <span className="sortType">
              {sort === "deliveryTime" ? "Phổ biến" : "Mới nhất"}
            </span>

            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

          {open && 

             (
              <div className="rightMenu">

                {sort === "deliveryTime" ? 

                ( <span onClick={() => reSort("createdAt")}>Mới nhất</span> ) 
                : 
                ( <span onClick={() => reSort("deliveryTime")}>Bán chạy</span> )
                
                }

                <span onClick={() => reSort("deliveryTime")}>Phổ biến</span>
                  
              </div>
             )

           }

          </div>

        </div>

        <div className="cards">

          {/* {isLoading ? (<><span class="loader"></span> <br /><br /> <br /> </>) : error ? ("Đã có lỗi xảy ra") : data?.map((gig) => (

            <GigCard key={gig._id} item={gig} />

          ))} */}

          {renderData()}

          <div  style={{ marginLeft:"600px"}}>
               {renderPagination()}
          </div>

        </div>

      </div>

    </div>

  );
}

export default Gigs;
