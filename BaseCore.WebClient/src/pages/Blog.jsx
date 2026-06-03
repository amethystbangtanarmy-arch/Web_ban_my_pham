import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

/* ══════════════════════════════════════════
   DỮ LIỆU MẪU — thay bằng API thật sau này
══════════════════════════════════════════ */
const CATEGORIES = [
    { id: 'all',        label: 'Tất cả' },
    { id: 'kien-thuc',  label: 'Kiến thức về mỹ phẩm' },
    { id: 'giao-thuong',label: 'Mỹ phẩm & Làm đẹp' },
    { id: 'review',     label: 'Đánh giá sản phẩm' },
    { id: 'tin-tuc',    label: 'Tin tức' },
];

const POSTS = [
    {
        id: 1,
        slug: 'bi-quyet-chon-my-pham-cho-nguoi-moi',
        category: 'kien-thuc',
        categoryLabel: 'Kiến thức về mỹ phẩm',
        title: 'Bí quyết chọn mỹ phẩm cho người mới bắt đầu',
        excerpt: 'Bạn mới tiếp cận thế giới mỹ phẩm và chưa biết bắt đầu từ đâu? Bài viết này sẽ giúp bạn hiểu các loại mỹ phẩm cơ bản, cách đọc nhãn chai và chọn được các loại mỹ phẩm phù hợp với tình trạng da của  mình.',
        image: '/images/image_1.jpg',
        date: '05 tháng 5, 2025',
        author: 'Nhà Giang',
        featured: true,
    },
    {
        id: 2,
        slug: 'whisky-don-malt-vs-blended',
        category: 'kien-thuc',
        categoryLabel: 'Kiến thức về mỹ phẩm',
        title: 'Thuần chay vs hóa học — Khác nhau ở điểm nào?',
        excerpt: 'Hai dòng loại mỹ phẩm nổi tiếng thế giới với hương vị hoàn toàn khác biệt. Cùng tìm hiểu quy trình sản xuất và cách thưởng thức đúng chuẩn.',
        image: '/images/image_2.jpg',
        date: '28 tháng 4, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
    {
        id: 3,
        slug: 'ket-hop-ruou-vang-voi-do-an',
        category: 'giao-thuong',
        categoryLabel: 'mỹ phẩm & Ẩm thực',
        title: '5 nguyên tắc vàng kết hợp mỹ phẩm vang với món ăn',
        excerpt: 'Vang đỏ với thịt đỏ, vang trắng với hải sản — nghe có vẻ đơn giản nhưng thực tế còn nhiều điều thú vị hơn bạn nghĩ.',
        image: '/images/image_3.jpg',
        date: '19 tháng 4, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
    {
        id: 4,
        slug: 'review-johnnie-walker-black-label',
        category: 'review',
        categoryLabel: 'Đánh giá sản phẩm',
        title: 'Review Johnnie Walker Black Label: Huyền thoại 12 năm tuổi',
        excerpt: 'Được ủ tối thiểu 12 năm trong thùng sồi, Black Label là chai whisky bán chạy nhất thế giới. Liệu nó có xứng đáng với danh tiếng đó?',
        image: '/images/image_4.jpg',
        date: '10 tháng 4, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
    {
        id: 5,
        slug: 'bao-quan-ruou-vang-tai-nha',
        category: 'kien-thuc',
        categoryLabel: 'Kiến thức về mỹ phẩm',
        title: 'Cách bảo quản mỹ phẩm vang tại nhà đúng chuẩn',
        excerpt: 'Nhiệt độ, ánh sáng, độ ẩm — tất cả đều ảnh hưởng đến chất lượng mỹ phẩm. Hướng dẫn chi tiết giúp bạn giữ chai vang ngon đến từng giọt cuối.',
        image: '/images/image_5.jpg',
        date: '02 tháng 4, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
    {
        id: 6,
        slug: 'ruou-cognac-huong-vi-phap',
        category: 'kien-thuc',
        categoryLabel: 'Kiến thức về mỹ phẩm',
        title: 'Cognac — Tinh hoa mỹ phẩm mạnh đến từ nước Pháp',
        excerpt: 'Từ vùng Charente nước Pháp, Cognac mang trong mình quy trình chưng cất đặc biệt và hương vị đặc trưng không lẫn với bất kỳ loại mỹ phẩm nào khác.',
        image: '/images/image_6.jpg',
        date: '25 tháng 3, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
    {
        id: 7,
        slug: 'top-ruou-qua-tang-tet-2025',
        category: 'tin-tuc',
        categoryLabel: 'Tin tức',
        title: 'Top 10 chai mỹ phẩm làm quà tặng dịp Tết 2025',
        excerpt: 'Chọn quà Tết cho đối tác, sếp hay người thân? Danh sách các chai mỹ phẩm cao cấp được ưa chuộng nhất mùa Tết năm nay.',
        image: '/images/image_1.jpg',
        date: '15 tháng 1, 2025',
        author: 'Nhà Giang',
        featured: false,
    },
];

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
const Blog = () => {
    const [activeTab, setActiveTab]   = useState('all');
    const [visibleCount, setVisible]  = useState(6);
    const [loading]                   = useState(false);

    /* Lọc theo danh mục */
    const filtered = activeTab === 'all'
        ? POSTS
        : POSTS.filter(p => p.category === activeTab);

    const featuredPost = filtered[0] || null;
    const gridPosts    = filtered.slice(1, visibleCount + 1);
    const hasMore      = filtered.length > visibleCount + 1;

    const formatDate = (str) => str;

    return (
        <div className="blog-page">

            {/* ── HERO BANNER ── */}
            <div
                className="blog-hero"
                style={{ backgroundImage: 'url("/images/bg-92.jpg")' }}
            >
                <div className="blog-hero-content">
                    <div className="breadcrumb-bar">
                        <Link to="/">Trang chủ</Link>
                        <i className="fa fa-chevron-right" style={{ fontSize: 10 }}></i>
                        <span>Blog</span>
                    </div>
                    <h1>Góc Kiến Thức</h1>
                </div>
            </div>

            {/* ── TAB DANH MỤC ── */}
            <div className="blog-tabs-wrap">
                <div className="blog-tabs">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`blog-tab ${activeTab === cat.id ? 'active' : ''}`}
                            onClick={() => { setActiveTab(cat.id); setVisible(6); }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── NỘI DUNG CHÍNH ── */}
            <div className="blog-body">

                {loading ? (
                    <div className="blog-loading">
                        <div className="blog-spinner"></div>
                        <span>Đang tải bài viết...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="blog-empty">
                        <i className="fa fa-newspaper-o"></i>
                        <p>Chưa có bài viết nào trong danh mục này.</p>
                    </div>
                ) : (
                    <>
                        {/* BÀI VIẾT NỔI BẬT */}
                        {featuredPost && (
                            <>
                                <h2 className="blog-section-title">Bài viết nổi bật</h2>
                                <Link
                                    to={`/blog/${featuredPost.slug}`}
                                    className="blog-featured"
                                >
                                    {/* Ảnh trái */}
                                    <div
                                        className="blog-featured-img"
                                        style={{ backgroundImage: `url("${featuredPost.image}")` }}
                                    >
                                        <span className="blog-featured-badge">Nổi bật</span>
                                    </div>

                                    {/* Text phải */}
                                    <div className="blog-featured-text">
                                        <div className="blog-featured-cat">
                                            {featuredPost.categoryLabel}
                                        </div>
                                        <h2 className="blog-featured-title">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="blog-featured-excerpt">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="blog-featured-meta">
                                            <span>
                                                <i className="fa fa-calendar mr-1"></i>
                                                {featuredPost.date}
                                            </span>
                                            <span>
                                                <i className="fa fa-user mr-1"></i>
                                                {featuredPost.author}
                                            </span>
                                        </div>
                                        <span className="blog-read-more">
                                            Đọc bài viết
                                            <i className="fa fa-arrow-right"></i>
                                        </span>
                                    </div>
                                </Link>
                            </>
                        )}

                        {/* GRID BÀI VIẾT */}
                        {gridPosts.length > 0 && (
                            <>
                                <h2 className="blog-section-title">Bài viết mới nhất</h2>
                                <div className="blog-grid">
                                    {gridPosts.map(post => (
                                        <Link
                                            key={post.id}
                                            to={`/blog/${post.slug}`}
                                            className="blog-card"
                                        >
                                            {/* Ảnh */}
                                            <div className="blog-card-img-wrap">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    onError={(e) => {
                                                        e.target.src = `https://placehold.co/600x380/f5f0eb/8B1A1A?text=🍷`;
                                                    }}
                                                />
                                                <span className="blog-card-cat">
                                                    {post.categoryLabel}
                                                </span>
                                            </div>

                                            {/* Text */}
                                            <div className="blog-card-body">
                                                <h3 className="blog-card-title">{post.title}</h3>
                                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                                <div className="blog-card-footer">
                                                    <span className="blog-card-date">
                                                        <i className="fa fa-calendar"></i>
                                                        {post.date}
                                                    </span>
                                                    <span className="blog-card-link">
                                                        Đọc tiếp
                                                        <i className="fa fa-arrow-right"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* NÚT XEM THÊM */}
                        {hasMore && (
                            <div className="blog-load-more">
                                <button
                                    className="blog-btn-more"
                                    onClick={() => setVisible(v => v + 6)}
                                >
                                    <i className="fa fa-refresh"></i>
                                    Xem thêm bài viết
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
