import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const avatarLetter = (user?.name || user?.email || 'U')[0].toUpperCase();
    const displayName  = user?.name || user?.email || 'Tài khoản';

    return (
        <div className="header-wrap">
            <div className="container">
                <div className="row align-items-center">

                    {/* ── Thông tin liên hệ ── */}
                    <div className="col-md-6 d-flex align-items-center header-contact">
                        <a href="tel:+0012345678">
                            <i className="fas fa-phone"></i> +00 1234 567
                        </a>
                        <a href="mailto:info@ruounhagiang.vn">
                            <i className="fas fa-envelope"></i> info@myphamthuanchay.vn
                        </a>
                    </div>

                    {/* ── Mạng xã hội + Tài khoản ── */}
                    <div className="col-md-6 d-flex justify-content-md-end align-items-center">

                        {/* Social */}
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

                        <div className="header-divider mx-2"></div>

                        {/* Tài khoản */}
                        <div className="header-account">
                            {isAuthenticated ? (
                                <>
                                    <div className="header-user">
                                        <div className="header-avatar">{avatarLetter}</div>
                                        <span className="header-username" title={displayName}>
                                            {displayName}
                                        </span>
                                    </div>
                                    <button
                                        className="header-logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <i className="fas fa-sign-out-alt mr-1" style={{ fontSize: 10 }}></i>
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="header-auth-link register">
                                        Đăng ký
                                    </Link>
                                    <Link to="/login" className="header-auth-link">
                                        <i className="fas fa-user mr-1" style={{ fontSize: 10 }}></i>
                                        Đăng nhập
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
