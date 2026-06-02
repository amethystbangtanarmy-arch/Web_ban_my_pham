import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ftco-footer">
      <div className="container">
        <div className="row mb-5">

          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2 logo">
                <Link to="/">Cửa hàng <span>mỹ phẩm</span></Link>
              </h2>
              <p>Mỹ phẩm chính hãng, chất lượng cao</p>
  <div className="header-socials">
                              {[
                                  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook'  },
                                  { icon: 'fab fa-instagram',  href: '#', label: 'Instagram' },
                                  { icon: 'fab fa-tiktok',     href: '#', label: 'TikTok'    },
                                  { icon: 'fab fa-youtube',    href: '#', label: 'YouTube'   },
                              ].map(s => (
                                  <a
                                      key={s.label}
                                      href={s.href}
                                      className="header-social-btn"
                                      title={s.label}
                                      aria-label={s.label}
                                  >
                                      <i className={s.icon}></i>
                                  </a>
                              ))}
                          </div>
{/* 
              <ul className="ftco-footer-social list-unstyled mt-2">
                <li><a href="#"><span className="fa fa-twitter"></span></a></li>
                <li><a href="#"><span className="fa fa-facebook"></span></a></li>
                <li><a href="#"><span className="fa fa-instagram"></span></a></li>
              </ul> */}
            </div>
          </div>

          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Tài khoản của tôi</h2>
              <ul className="list-unstyled">
                <li><Link to="/account"><span className="fa fa-chevron-right mr-2"></span>Tài khoản của tôi</Link></li>
                <li><Link to="/register"><span className="fa fa-chevron-right mr-2"></span>Đăng ký</Link></li>
                <li><Link to="/login"><span className="fa fa-chevron-right mr-2"></span>Đăng nhập</Link></li>
                <li><Link to="/orders"><span className="fa fa-chevron-right mr-2"></span>Đơn hàng của tôi</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Thông tin</h2>
              <ul className="list-unstyled">
                <li><Link to="/about"><span className="fa fa-chevron-right mr-2"></span>Về chúng tôi</Link></li>
                <li><Link to="/catalog"><span className="fa fa-chevron-right mr-2"></span>Danh mục</Link></li>
                <li><Link to="/contact"><span className="fa fa-chevron-right mr-2"></span>Liên hệ</Link></li>
                <li><Link to="/terms"><span className="fa fa-chevron-right mr-2"></span>Điều khoản & Điều kiện</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Liên kết nhanh</h2>
              <ul className="list-unstyled">
                <li><Link to="#"><span className="fa fa-chevron-right mr-2"></span>Người dùng mới</Link></li>
                <li><Link to="#"><span className="fa fa-chevron-right mr-2"></span>Trung tâm trợ giúp</Link></li>
                <li><Link to="#"><span className="fa fa-chevron-right mr-2"></span>Báo cáo spam</Link></li>
                <li><Link to="#"><span className="fa fa-chevron-right mr-2"></span>FAQ's</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-12 col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Bạn có câu hỏi nào không?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon fa fa-map marker"></span>
                    <span className="text">236 Hoàng Quốc Việt. Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội</span>
                  </li>
                  <li>
                    <a href="tel:+23923929210">
                      <span className="icon fa fa-phone"></span>
                      <span className="text">+2 392 3929 210</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@yourdomain.com">
                      <span className="icon fa fa-paper-plane pr-4"></span>
                      <span className="text">info@yourdomain.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="container-fluid px-0 py-5 bg-black">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <p className="mb-0" style={{ color: 'rgba(255,255,255,.5)' }}>
                {currentYear} All rights reserved | This template is made with{' '}
                <i className="fa fa-heart color-danger"></i> by{' '}
                <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                  Colorlib.com
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;