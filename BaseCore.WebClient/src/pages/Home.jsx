import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { useCart } from '../contexts/CartContext';
import '../styles/Home.css';

/* ══ DỮ LIỆU BANNER ══ */
const BANNERS = [
    { bg: '/images/bg_9.jpg',  tag: '', title: '', desc: '' },
    { bg: '/images/bg_91.jpg',  tag: '', title: '', desc: '' },
    { bg: '/images/bg-92.jpg', tag: '', title: '', desc: '' },
    { bg: '/images/bg_6.jpg',  tag: '', title: '', desc: '' },
    { bg: '/images/bg_7.jpg',  tag: '', title: '', desc: '' },
    { bg: '/images/bg_8.jpg',  tag: '', title: '', desc: '' },
    { bg: '/images/bg_12.jpg', tag: '', title: '', desc: '' },
    { bg: '/images/bg_10.jpg', tag: '', title: '', desc: '' },
];

/* ══ DỮ LIỆU DANH MỤC (MỸ PHẨM) ══ */
const CATEGORIES = [
    { label: 'Chăm sóc da mặt', img: '/images/kind-1.jpg', link: '/products?search=Skincare' },
    { label: 'Trang điểm',       img: '/images/kind-2.jpg', link: '/products?search=Makeup' },
    { label: 'Chăm sóc cơ thể',  img: '/images/kind-3.jpg', link: '/products?search=Bodycare' },
    { label: 'Nước hoa',         img: '/images/kind-4.jpg', link: '/products?search=Perfume' },
    { label: 'Chăm sóc tóc',     img: '/images/kind-5.jpg', link: '/products?search=Hair' },
    { label: 'Phụ kiện làm đẹp', img: '/images/kind-6.jpg', link: '/products?search=Accessories' },
];

/* ══ COMPONENT BANNER SLIDER ══ */
const BannerSlider = () => {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const goTo = useCallback((idx) => {
        setCurrent((idx + BANNERS.length) % BANNERS.length);
    }, []);

    useEffect(() => {
        timerRef.current = setInterval(() => goTo(current + 1), 5000);
        return () => clearInterval(timerRef.current);
    }, [current, goTo]);

    return (
        <div className="home-banner-slider">
            <div
                className="home-banner-track"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {BANNERS.map((b, i) => (
                    <div
                        key={i}
                        className="home-banner-slide"
                        style={{ backgroundImage: `url("${b.bg}")` }}
                    >
                        <div className="home-banner-content">
                            <span className="banner-tag" style={{ color: '#278a72' }}>{b.tag}</span>
                            <h2>{b.title.split('\n').map((t, j) => (
                                <React.Fragment key={j}>{t}{j === 0 && <br />}</React.Fragment>
                            ))}</h2>
                            <p>{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button className="home-banner-arrow prev" onClick={() => goTo(current - 1)}>
                <i className="fa fa-chevron-left"></i>
            </button>
            <button className="home-banner-arrow next" onClick={() => goTo(current + 1)}>
                <i className="fa fa-chevron-right"></i>
            </button>

            {/* Dots */}
            <div className="home-banner-dots">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        className={`home-banner-dot ${i === current ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>
        </div>
    );
};

/* ══ COMPONENT PRODUCT SLIDER ══ */
const ProductSlider = ({ products, title, subtitle, onAddToCart }) => {
    const [idx, setIdx] = useState(0);
    const visibleCount = 4;
    const maxIdx = Math.max(0, products.length - visibleCount);
    const cardW = 100 / visibleCount;

    return (
        <div>
            <div className="home-section-head">
                <div>
                    <span className="sub" style={{ color: '#278a72' }}>{subtitle}</span>
                    <h2>{title}</h2>
                </div>
                <div className="d-flex align-items-center" style={{ gap: 16 }}>
                    <Link to="/products" className="home-view-all" style={{ color: '#278a72' }}>
                        Xem tất cả <i className="fa fa-arrow-right"></i>
                    </Link>
                    <div className="home-prod-nav">
                        <button
                            className="home-prod-nav-btn"
                            onClick={() => setIdx(i => Math.max(0, i - 1))}
                            disabled={idx === 0}
                        ><i className="fa fa-chevron-left"></i></button>
                        <button
                            className="home-prod-nav-btn"
                            onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}
                            disabled={idx >= maxIdx}
                        ><i className="fa fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>

            <div className="home-prod-slider-wrap">
                <div
                    className="home-prod-track"
                    style={{ transform: `translateX(calc(-${idx * (cardW + (20 / products.length * visibleCount))}% - ${idx * 20 / visibleCount}px))` }}
                >
                    {products.map((p) => (
                        <div key={p.id} className="home-prod-card">
                            <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="home-prod-img-wrap">
                                    <img
                                        src={p.imageUrl || '/images/prod-1.jpg'}
                                        alt={p.name}
                                        onError={(e) => { e.target.src = '/images/prod-1.jpg'; }}
                                    />
                                    {p.stock <= 5 && p.stock > 0 && (
                                        <span className="home-prod-badge badge-hot">Sắp hết</span>
                                    )}
                                    {p.isNew && <span className="home-prod-badge badge-new" style={{ backgroundColor: '#278a72' }}>Mới</span>}
                                    {p.isSale && <span className="home-prod-badge badge-sale">Sale</span>}
                                </div>
                                <div className="home-prod-body text-center">
                                    <div className="home-prod-cat text-muted">{p.category?.name || 'Mỹ phẩm'}</div>
                                    <div className="home-prod-name font-weight-bold mt-1 text-truncate">{p.name}</div>
                                    <div className="home-prod-price mt-2" style={{ color: '#278a72', fontWeight: 'bold' }}>
                                        {p.price?.toLocaleString('vi-VN')} đ
                                        {p.comparePrice > p.price && (
                                            <span className="home-prod-price-old text-muted ml-2" style={{ textDecoration: 'line-through', fontSize: '0.9em' }}>
                                                {p.comparePrice?.toLocaleString('vi-VN')} đ
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div style={{ padding: '0 16px 16px' }}>
                                <button
                                    className="home-prod-add w-100 font-weight-bold"
                                    style={{ backgroundColor: '#e9f5f2', color: '#278a72', border: '1px solid #c2e2d9', borderRadius: '8px' }}
                                    onClick={() => onAddToCart(p)}
                                >
                                    <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ══ COMPONENT CATEGORY SLIDER ══ */
const CategorySlider = () => {
    const [idx, setIdx] = useState(0);
    const visible = 6;
    const max = Math.max(0, CATEGORIES.length - visible);

    return (
        <div>
            <div className="home-section-head">
                <div>
                    <span className="sub" style={{ color: '#278a72' }}>Danh mục nổi bật</span>
                    <h2>Khám Phá Theo Loại</h2>
                </div>
                <div className="home-prod-nav">
                    <button className="home-prod-nav-btn" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <button className="home-prod-nav-btn" onClick={() => setIdx(i => Math.min(max, i + 1))} disabled={idx >= max}>
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div className="home-cat-slider-wrap">
                <div className="home-cat-track" style={{ transform: `translateX(-${idx * (100 / visible + 16 / visible)}%)` }}>
                    {CATEGORIES.map((cat, i) => (
                        <Link key={i} to={cat.link} className="home-cat-item">
                            <div className="home-cat-circle" style={{ border: '2px solid #e9f5f2' }}>
                                <img src={cat.img} alt={cat.label}
                                    onError={(e) => { e.target.src = '/images/prod-1.jpg'; }} />
                            </div>
                            <span className="home-cat-label font-weight-bold mt-2 text-dark">{cat.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ══ COMPONENT CHÍNH ══ */
const Home = () => {
    const [searchTerm, setSearchTerm]     = useState('');
    const [suggestions, setSuggestions]   = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [products, setProducts]         = useState([]);
    const [bestsellers, setBestsellers]   = useState([]);
    const [loadingProd, setLoadingProd]   = useState(true);
    const navigate  = useNavigate();
    const { addToCart } = useCart?.() || {};

    /* Load sản phẩm từ API */
    useEffect(() => {
        const load = async () => {
            try {
                const res = await productApi.search({ page: 1, pageSize: 12 });
                const items = res.data?.items || res.data || [];
                setProducts(items.slice(0, 12));
                setBestsellers([...items].sort(() => Math.random() - 0.5).slice(0, 8));
            } catch { /* dùng mảng rỗng */ }
            finally { setLoadingProd(false); }
        };
        load();
    }, []);

    /* Debounce search */
    useEffect(() => {
        if (!searchTerm.trim()) { setSuggestions([]); setShowDropdown(false); return; }
        const t = setTimeout(async () => {
            try {
                const res = await productApi.search({ keyword: searchTerm.trim(), page: 1, pageSize: 5 });
                const items = res.data?.items || [];
                setSuggestions(items);
                setShowDropdown(items.length > 0);
            } catch { setShowDropdown(false); }
        }, 500);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleAddToCart = (product) => {
        if (addToCart) addToCart(product, 1); 
        else alert('Đã thêm vào giỏ hàng!');
    };

    /* Placeholder chuẩn Mỹ Phẩm khi chưa load được SP từ API */
    const placeholderProducts = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: ['Sữa rửa mặt Cetaphil', 'Kem chống nắng La Roche-Posay', 'Son MAC Ruby Woo', 'Kem dưỡng ẩm Neutrogena', 'Nước tẩy trang Bioderma', 'Phấn nước IOPE', 'Serum B5 Obagi', 'Toner Hoa cúc Kiehl’s'][i],
        price: [350000, 480000, 550000, 420000, 450000, 480000, 850000, 950000][i],
        imageUrl: `/images/prod-${(i % 8) + 1}.jpg`,
        category: { name: ['Skincare', 'Skincare', 'Makeup', 'Skincare', 'Skincare', 'Makeup', 'Skincare', 'Skincare'][i] },
    }));

    const displayProducts    = loadingProd || products.length === 0 ? placeholderProducts : products;
    const displayBestsellers = loadingProd || bestsellers.length === 0 ? placeholderProducts.slice(0, 8).reverse() : bestsellers;

    return (
        <>
            {/* ══════════════════════════════
                1. BANNER SLIDER TỰ ĐỘNG
            ══════════════════════════════ */}
            <BannerSlider />

            {/* ══════════════════════════════
                2. THANH TÌM KIẾM
            ══════════════════════════════ */}
            <div style={{ background: '#e9f5f2', padding: '28px 0', borderBottom: '1px solid #c2e2d9' }}>
                <div className="container">
                    <form onSubmit={handleSearch} className="d-flex justify-content-center">
                        <div className="input-group shadow-sm position-relative" style={{ maxWidth: 560 }}>
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Bạn đang tìm kiếm sản phẩm làm đẹp nào?..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                                style={{ height: 50, borderRadius: '30px 0 0 30px', paddingLeft: 22, fontSize: 14 }}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary px-4 font-weight-bold" type="submit"
                                    style={{ borderRadius: '0 30px 30px 0', height: 50, background: '#278a72', border: 'none' }}>
                                    <i className="fa fa-search mr-2"></i> Tìm kiếm
                                </button>
                            </div>
                            {showDropdown && suggestions.length > 0 && (
                                <ul className="list-group position-absolute w-100 text-left shadow-lg"
                                    style={{ top: '100%', left: 0, zIndex: 9999, marginTop: 5, borderRadius: 12, backgroundColor: '#fff', maxHeight: 280, overflowY: 'auto' }}>
                                    {suggestions.map(item => (
                                        <li key={item.id} className="list-group-item list-group-item-action border-0 border-bottom"
                                            onClick={() => navigate(`/product/${item.id}`)} style={{ cursor: 'pointer' }}>
                                            <div className="d-flex align-items-center">
                                                <img src={item.imageUrl || '/images/prod-1.jpg'} alt={item.name}
                                                    style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 6, marginRight: 12 }} />
                                                <div>
                                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                                                    <small style={{ color: '#278a72', fontWeight: 700 }}>{item.price?.toLocaleString('vi-VN')} đ</small>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <li className="list-group-item text-center bg-light" style={{ cursor: 'pointer', fontSize: 13, color: '#278a72' }} onClick={handleSearch}>
                                        Xem tất cả kết quả cho "{searchTerm}"...
                                    </li>
                                </ul>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* ══════════════════════════════
                3. TIỆN ÍCH
            ══════════════════════════════ */}
           <section className="ftco-intro" style={{ backgroundColor: '#fdfbfb', padding: '60px 0' }}>
                <div className="container">
                    <div className="row">
                        {/* Khối 1 */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div 
                                className="d-flex align-items-center p-4 h-100" 
                                style={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1px solid #e9f5f2',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1.05)'; 
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(39, 138, 114, 0.15)'; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1)'; 
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; 
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center mr-4" style={{ width: '65px', height: '65px', borderRadius: '50%', backgroundColor: '#e9f5f2', color: '#278a72', flexShrink: 0 }}>
                                    <i className="fa fa-headphones" style={{ fontSize: '28px' }}></i>
                                </div>
                                <div>
                                    <h3 style={{ color: '#1a5c4c', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Tư vấn tận tâm</h3>
                                    <p className="mb-0 text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>Đội ngũ chuyên gia luôn sẵn sàng giúp bạn tìm ra chu trình skincare chuẩn nhất.</p>
                                </div>
                            </div>
                        </div>

                        {/* Khối 2 */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div 
                                className="d-flex align-items-center p-4 h-100" 
                                style={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1px solid #e9f5f2',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1.05)'; 
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(39, 138, 114, 0.15)'; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1)'; 
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; 
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center mr-4" style={{ width: '65px', height: '65px', borderRadius: '50%', backgroundColor: '#e9f5f2', color: '#278a72', flexShrink: 0 }}>
                                    <i className="fa fa-certificate" style={{ fontSize: '28px' }}></i>
                                </div>
                                <div>
                                    <h3 style={{ color: '#1a5c4c', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Cam kết chính hãng</h3>
                                    <p className="mb-0 text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>Hoàn tiền 200% nếu phát hiện hàng giả, hàng nhái, kém chất lượng.</p>
                                </div>
                            </div>
                        </div>

                        {/* Khối 3 */}
                        <div className="col-md-4">
                            <div 
                                className="d-flex align-items-center p-4 h-100" 
                                style={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1px solid #e9f5f2',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1.05)'; 
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(39, 138, 114, 0.15)'; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.transform = 'scale(1)'; 
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)'; 
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center mr-4" style={{ width: '65px', height: '65px', borderRadius: '50%', backgroundColor: '#e9f5f2', color: '#278a72', flexShrink: 0 }}>
                                    <i className="fa fa-truck" style={{ fontSize: '28px' }}></i>
                                </div>
                                <div>
                                    <h3 style={{ color: '#1a5c4c', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Freeship toàn quốc</h3>
                                    <p className="mb-0 text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>Miễn phí giao hàng hỏa tốc cho mọi đơn hàng từ 500.000 đ.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                4. DANH MỤC SLIDER
            ══════════════════════════════ */}
            <section className="ftco-section" style={{ paddingBottom: 40, backgroundColor: '#fdfbfb' }}>
                <div className="container">
                    <CategorySlider />
                </div>
            </section>

            {/* ══════════════════════════════
                5. SẢN PHẨM MỚI — SLIDER
            ══════════════════════════════ */}
            <section className="ftco-section" style={{ paddingTop: 40, paddingBottom: 40, background: '#fff' }}>
                <div className="container">
                    <ProductSlider
                        products={displayProducts}
                        title="Sản Phẩm Mới Lên Kệ"
                        subtitle="Cập nhật xu hướng"
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </section>

            {/* ══════════════════════════════
                6. GIỚI THIỆU
            ══════════════════════════════ */}
            <section className="home-about-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <div className="home-about-img" style={{ backgroundImage: 'url(/images/home.jpg)' }}></div>
                        </div>
                        <div className="col-md-6 home-about-content">
                            <span className="sub">Tôn vinh vẻ đẹp của bạn</span>
                            <h2>Đánh Thức Vẻ Đẹp Tự Nhiên</h2>
                            <p>Chúng tôi tự hào mang đến những dòng mỹ phẩm cao cấp được tuyển chọn khắt khe từ các cường quốc làm đẹp hàng đầu như Hàn Quốc, Nhật Bản, Pháp và Mỹ.</p>
                            <p>Mỗi làn da đều có một câu chuyện riêng và xứng đáng được chăm sóc bởi những sản phẩm an toàn, lành tính nhất. Sứ mệnh của chúng tôi là đồng hành cùng bạn trên hành trình yêu thương bản thân.</p>
                            <div className="home-about-stat">
                                <div className="home-about-number">10</div>
                                <span>Năm đồng hành<br />cùng phái đẹp Việt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ══════════════════════════════
                7. BÁN CHẠY — SLIDER
            ══════════════════════════════ */}
            <section className="ftco-section" style={{ paddingTop: 60, paddingBottom: 40, backgroundColor: '#fdfbfb' }}>
                <div className="container">
                    <ProductSlider
                        products={displayBestsellers}
                        title="Top Bán Chạy Nhất"
                        subtitle="Sản phẩm quốc dân"
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </section>

            {/* ══ ĐÁNH GIÁ (TESTIMONIAL) ══ */}
            <section className="home-testimonial-section" style={{ backgroundImage: 'url(/images/bg_4.jpg)' }}>
                <div className="home-testimonial-overlay" />
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 text-center">
                            <span className="sub" style={{ color: '#c9a84c' }}>Đánh giá thực tế</span>
                            <h2 className="mb-3 text-white font-weight-bold">Khách Hàng Nói Gì</h2>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            { name: 'Phi Hùng', pos: 'Beauty Blogger', text: 'Chất lượng sản phẩm ở đây thực sự vượt ngoài mong đợi. Đóng gói cực kỳ cẩn thận, check mã vạch chuẩn auth 100%. Rất yên tâm khi mua sắm!' },
                            { name: 'Quang Trần', pos: 'NV Văn phòng', text: 'Da mình nhạy cảm nhưng nhờ tư vấn viên gợi ý lọ serum B5 mà giờ da khỏe lên trông thấy. Giao hàng hỏa tốc trong 2h siêu tiện lợi.' },
                            { name: 'Minh Quân', pos: 'Sinh viên', text: 'Canh đợt Flash sale mua được son MAC Ruby Woo giá hời. Đã kiểm tra chất son mềm mịn, lên màu chuẩn. Sẽ ủng hộ shop dài dài.' },
                        ].map((t, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <div className="home-testimonial-card">
                                    <div className="home-testimonial-quote"><i className="fa fa-quote-left"></i></div>
                                    <p className="home-testimonial-text">{t.text}</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <div className="home-testimonial-avatar" style={{ backgroundImage: `url(images/person_${(i % 3) + 1}.jpg)` }} />
                                        <div className="ml-3">
                                            <h4 className="home-testimonial-name">{t.name}</h4>
                                            <span className="home-testimonial-pos">{t.pos}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
           {/* ══ BLOG ══ */}
            <section className="home-section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 text-center">
                            <span className="sub">Beauty Blog</span>
                            <h2 className="font-weight-bold" style={{ color: 'var(--primary-dk)' }}>Bí Quyết Làm Đẹp</h2>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            { img: '/images/image_1.jpg', title: 'Quy trình Skincare chuẩn y khoa cho người mới', date: '07 tháng 5, 2026' },
                            { img: '/images/image_2.jpg', title: 'Phân biệt AHA, BHA, PHA và cách sử dụng', date: '28 tháng 4, 2026' },
                            { img: '/images/image_3.jpg', title: 'Top 5 kem chống nắng kiềm dầu mùa hè', date: '19 tháng 4, 2026' },
                            { img: '/images/image_4.jpg', title: 'Đánh nền mỏng nhẹ, căng bóng chuẩn Hàn', date: '02 tháng 4, 2026' },
                        ].map((b, i) => (
                            <div key={i} className="col-lg-6 mb-4">
                                <div className="home-blog-card d-flex h-100">
                                    <Link to="/blog" className="home-blog-img" style={{ backgroundImage: `url("${b.img}")` }} />
                                    <div className="home-blog-body">
                                        <div className="home-blog-date"><i className="fa fa-calendar mr-2"></i> {b.date}</div>
                                        <h3 className="home-blog-title"><Link to="/blog">{b.title}</Link></h3>
                                        <div><Link to="/blog" className="home-blog-link">Đọc thêm <i className="fa fa-long-arrow-right ml-1"></i></Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;