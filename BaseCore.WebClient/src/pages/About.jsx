import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css'; // Đảm bảo import đúng đường dẫn file CSS

const About = () => {
  return (
    <div className="about-page">
      {/* ══ HERO SECTION ══ */}
      <section className="about-hero" style={{ backgroundImage: 'url("/images/bg-92.jpg")' }}>
        <div className="about-overlay"></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center text-center">
            <div className="col-md-8 mt-5 pt-5">
              <p className="about-breadcrumbs">
                <Link to="/">Trang chủ <i className="fa fa-chevron-right mx-2" /></Link>
                <span>Về chúng tôi</span>
              </p>
              <h1 className="about-title">Câu Chuyện Của Chúng Tôi</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES (TIỆN ÍCH) ══ */}
      <section className="about-features">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-leaf"></i></div>
                <div className="feature-text">
                  <h3>Tư vấn chuyên sâu 24/7</h3>
                  <p>Đội ngũ chuyên gia luôn sẵn sàng lắng nghe làn da của bạn để mang đến chu trình skincare chuẩn y khoa nhất.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="feature-card color-2">
                <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                <div className="feature-text">
                  <h3>Cam kết chính hãng</h3>
                  <p>Hoàn tiền 200% nếu phát hiện hàng giả, hàng nhái. Mọi sản phẩm đều có đầy đủ tem nhãn và nguồn gốc rõ ràng.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card color-3">
                <div className="feature-icon"><i className="fas fa-truck-box"></i></div>
                <div className="feature-text">
                  <h3>Giao hàng hỏa tốc</h3>
                  <p>Freeship toàn quốc cho đơn từ 500k. Đóng gói cẩn thận, chống sốc 3 lớp, bảo vệ nguyên vẹn sản phẩm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OUR STORY ══ */}
      <section className="about-story-section py-5 my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-5 mb-md-0">
              <div className="story-img-wrapper">
                <div className="story-img" style={{ backgroundImage: 'url(/images/sp2.jpg)' }}></div>
                <div className="story-exp-badge">
                  <strong>10</strong>
                  <span>Năm<br/>Đồng Hành</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-md-5">
              <div className="story-content">
                <span className="subheading">Sứ mệnh của chúng tôi</span>
                <h2 className="mb-4">Đánh Thức Vẻ Đẹp<br/>Tự Nhiên Nơi Bạn</h2>
                <p>Khởi nguồn từ tình yêu với cái đẹp và sự thấu hiểu làn da Châu Á, chúng tôi mang đến một không gian làm đẹp toàn diện. Nơi hội tụ những thương hiệu mỹ phẩm thuần chay, lành tính và cao cấp nhất từ Hàn Quốc, Nhật Bản, Pháp và Mỹ.</p>
                <p>Mỗi làn da đều là một phiên bản độc bản. Chúng tôi không chỉ bán mỹ phẩm, chúng tôi trao gửi sự tự tin, giúp bạn yêu thương và chăm sóc bản thân mình đúng cách mỗi ngày. Vì bạn xứng đáng với những điều tinh túy nhất!</p>
                
                <div className="signature mt-4">
                  <h4 className="font-weight-bold" style={{ color: '#278a72' }}>Thanh Vân</h4>
                  <p className="text-muted small">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES SHOWCASE ══ */}
      <section className="about-categories bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="font-weight-bold" style={{ color: '#1a5c4c' }}>Tinh Hoa Làm Đẹp</h2>
            <p className="text-muted">Bộ sưu tập đa dạng đáp ứng mọi nhu cầu chăm sóc cá nhân</p>
          </div>
          <div className="row">
            {[
              { title: 'Skincare', img: 'kind_1.jpg' },
              { title: 'Makeup', img: 'kind-2.jpg' },
              { title: 'Bodycare', img: 'kind-3.jpg' },
              { title: 'Haircare', img: 'kind-4.jpg' },
              { title: 'Perfume', img: 'kind-5.jpg' },
              { title: 'Phụ kiện', img: 'kind-6.jpg' }
            ].map((cat, idx) => (
              <div key={idx} className="col-lg-2 col-md-4 col-6 mb-4">
                <div className="cat-box">
                  <div className="cat-img" style={{ backgroundImage: `url(/images/${cat.img})` }}></div>
                  <h3 className="cat-title">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="about-testimony py-5" style={{ backgroundImage: 'url(/images/bg_4.jpg)' }}>
        <div className="testimony-overlay"></div>
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center text-white">
              <span className="subheading text-warning">Khách hàng nói gì về chúng tôi</span>
              <h2 className="mb-3 text-white font-weight-bold">Đánh Giá Thực Tế</h2>
            </div>
          </div>
          <div className="row">
            {[
              { name: 'Ngọc Lan', pos: 'Beauty Blogger', text: 'Sản phẩm ở đây đóng gói cực kỳ sang trọng, seal niêm phong đầy đủ. Mình dùng serum B5 thấy phục hồi da rất nhanh, sẽ tiếp tục ủng hộ.' },
              { name: 'Hoàng Yến', pos: 'Nhân viên văn phòng', text: 'Chăm sóc khách hàng siêu có tâm! Mình được tư vấn cả một chu trình trị mụn ẩn chi tiết, sau 2 tháng da đã láng mịn hẳn ra.' },
              { name: 'Mai Phương', pos: 'Sinh viên', text: 'Mỹ phẩm xịn, giá luôn có nhiều ưu đãi tốt cho sinh viên. Đặc biệt giao hàng cực kỳ nhanh, đặt hôm trước hôm sau đã nhận được.' }
            ].map((t, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="testimony-card">
                  <div className="quote-icon"><i className="fa fa-quote-left"></i></div>
                  <p className="testimony-text">{t.text}</p>
                  <div className="d-flex align-items-center mt-4">
                    <div className="user-avatar" style={{ backgroundImage: `url(/images/person_${idx + 1}.jpg)` }}></div>
                    <div className="user-info pl-3">
                      <h5 className="mb-0 text-white font-weight-bold">{t.name}</h5>
                      <span className="small" style={{ color: '#8fd1c0' }}>{t.pos}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COUNTERS ══ */}
      <section className="about-counters py-5">
        <div className="container">
          <div className="row text-center">
            {[
              { count: '50,000+', label: 'Khách hàng tin dùng' },
              { count: '10', label: 'Năm kinh nghiệm' },
              { count: '200+', label: 'Thương hiệu đối tác' },
              { count: '100%', label: 'Cam kết chính hãng' }
            ].map((c, idx) => (
              <div key={idx} className="col-md-3 col-6 mb-4 mb-md-0">
                <div className="counter-box">
                  <strong className="counter-number">{c.count}</strong>
                  <span className="counter-label">{c.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;