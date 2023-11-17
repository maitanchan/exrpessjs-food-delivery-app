import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <h2 style={{ marginLeft:"630px", position:"relative", top:"50px" }}>Danh mục thực đơn </h2>

      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      
      <div className="features">
        <div className="container">
          <div className="item">
            <h1 style={{ color:"white" , marginTop:"35px"}}>
            foodeats.vn - Hợp tác nhân viên giao nhận - foodEats. driver
            </h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Đơn hàng của bạn sẽ được bảo quản như thế nào?
            </div>
            <p>
            ShopeeFood sẽ bảo quản đơn của bạn bằng túi & thùng để chống nắng mưa, giữ nhiệt... trên đường đi một cách tốt nhất.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Ứng dụng foodEats Partner
            </div>
            <p>
            Ứng dụng foodEats Partner là ứng dụng quản lý đơn hàng cho các nhà hàng đối tác của dịch vụ đặt món tận nơi
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Trả tiền khi bạn hài lòng
            </div>
            <p>
            Thanh toán của bạn không được phát hành cho đến khi bạn nhận được đơn hàng
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
           
              Hỗ trợ 24/24
            </div>
            <p>
                  Nhóm hỗ trợ 24/24 của chúng tôi luôn sẵn sàng trợ giúp mọi lúc, mọi nơi.
            </p>
            <br />
          </div>
          <div className="item">
            <video src="../../../public/img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1 style={{ color:"#000" }}>Khám phá thị trường</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Graphics & Design</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Digital Marketing</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Writing & Translation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Video & Animation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music & Audio</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Programming & Tech</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Data</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
          <h1 style={{ marginTop:"35px" }}>
              foodEats <i>business.</i>
            </h1>

            <h1>
            Giải pháp được xây dựng cho doanh nghiệp
            </h1>

            <p>
            Nâng cấp lên trải nghiệm chọn lọc với nhiều công cụ và lợi ích, dành riêng cho doanh nghiệp
            </p>
            
            <div className="title">

              <img src="./img/check.png" alt="" />

              Kết nối với các dịch giả tự do có kinh nghiệm kinh doanh đã có kinh nghiệm

            </div>
<br />
            <div className="title">

              <img src="./img/check.png" alt="" />

              Được kết hợp với tài năng hoàn hảo bởi người quản lý thành công của khách hàng
            </div>
<br />
            <div className="title">

              <img src="./img/check.png" alt="" />

              Quản lý làm việc theo nhóm và tăng năng suất với một không gian làm việc mạnh mẽ

            </div>

            <button>Khám phá</button>
            <br />
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <h2 style={{ marginLeft:"650px", position:"relative", top:"50px" }}>Tin tức nổi bật</h2>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
