import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Danh mục</h2>
            <span>Đặt Đồ</span>
            <span>Món ăn & Thực đơn</span>
            <span>Tin tức & Khuyến Mãi</span>
            <span>Đánh Giá & Phản Hồi</span>
            <span>Kinh doanh</span>
          </div>
          <div className="item">
            <h2>Về chúng tôi</h2>
            <span>Báo chí & Tin tức</span>
            <span>Quan hệ đối tác</span>
            <span>Chính sách bảo mật</span>
          </div>
          <div className="item">
            <h2>Hỗ trợ</h2>
            <span>Trợ giúp & Hỗ trợ</span>
            <span>Tin cậy & An toàn</span>
          </div>
          <div className="item">
            <h2>Cộng đồng</h2>
            <span>Câu chuyện khách hàng</span>
            <span>Trung tâm cộng đồng</span>
            <span>Diễn đàn</span>
            <span>Sự kiện</span>
          </div>
          <div className="item">
            <h2>Về foodEats</h2>
            <span>Giới thiệu</span>
            <span>foodEats Uni</span>
            <span>foodEats Blog</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>foodEats</h2>
            <span>© foodEats International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
