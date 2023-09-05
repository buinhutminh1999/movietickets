import React, { memo } from "react";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-white text-muted py-4">
      <div className="container">
        <div className="row">

          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-film me-3 text-secondary" />
              VÉ XEM PHIM
            </h6>
            <p><a href="#!" className="text-reset mb-2 d-block">Lịch chiếu mới</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Khuyến mãi</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Rạp chiếu phim</a></p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Thông tin</h6>
            <p><a href="#!" className="text-reset mb-2 d-block">Giới thiệu</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Điều khoản sử dụng</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Chính sách bảo mật</a></p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Hỗ trợ</h6>
            <p><a href="#!" className="text-reset mb-2 d-block">FAQs</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Hướng dẫn mua vé</a></p>
            <p><a href="#!" className="text-reset mb-2 d-block">Liên hệ</a></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto">
            <h6 className="text-uppercase fw-bold mb-4">Liên lạc</h6>
            <p><i className="fas fa-home me-3 text-secondary" /> 123 Đường Phim, TP.HCM</p>
            <p><i className="fas fa-envelope me-3 text-secondary" /> support@xemphim.com</p>
            <p><i className="fas fa-phone me-3 text-secondary" /> (028) 1234 5678</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
