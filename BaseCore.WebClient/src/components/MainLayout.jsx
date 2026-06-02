import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/MainLayout.css';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard' ? 'active' : '';
        return location.pathname.includes(path) ? 'active' : '';
    };

    /* Lấy chữ cái đầu tên để làm avatar */
    const avatarLetter = (user?.name || user?.email || 'A')[0].toUpperCase();

    /* Danh sách menu */
    const navItems = [
        { to: '/dashboard',           icon: 'fas fa-tachometer-alt', label: 'Dashboard',        exact: true },
        { to: '/dashboard/products',  icon: 'fas fa-box',            label: 'Sản phẩm'                       },
        { to: '/dashboard/orders',    icon: 'fas fa-shopping-cart',  label: 'Đơn hàng'                       },
        { to: '/dashboard/categories',icon: 'fas fa-tags',           label: 'Danh mục'                       },
        { to: '/dashboard/vouchers',  icon: 'fas fa-ticket-alt',     label: 'Mã giảm giá',  color:'#f59e0b' },
        { to: '/dashboard/suppliers', icon: 'fas fa-truck',          label: 'Nhà cung cấp'                   },
        { to: '/dashboard/revenue',   icon: 'fas fa-chart-line',     label: 'Doanh thu',     color:'#4ade80' },
    ];

    return (
        <div className="wrapper">

            {/* ════════════════════════════════════
                TOP NAVBAR
            ════════════════════════════════════ */}
            <nav
                className="main-header navbar navbar-expand navbar-white navbar-light"
                style={{ marginLeft: 250 }}
            >
                {/* Trái — toggle + link trang bán hàng */}
                <ul className="navbar-nav">
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/" className="navbar-store-link nav-link">
                            <i className="fas fa-store" style={{ color: '#8B1A1A' }}></i>
                            Xem trang bán hàng
                        </Link>
                    </li>
                </ul>

                {/* Phải — tên admin + nút thoát */}
                <ul className="navbar-nav ml-auto align-items-center pr-2" style={{ gap: 12 }}>
                    <li className="nav-item">
                        <div className="navbar-admin-name">
                            <div className="navbar-admin-avatar">{avatarLetter}</div>
                            <div>
                                <div style={{ lineHeight: 1.2 }}>{user?.name || user?.email || 'Admin'}</div>
                                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 400 }}>
                                    {isAdmin && isAdmin() ? 'Administrator' : 'Staff'}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="navbar-logout-btn btn btn-sm">
                            <i className="fas fa-sign-out-alt"></i> Thoát
                        </button>
                    </li>
                </ul>
            </nav>

            {/* ════════════════════════════════════
                SIDEBAR
            ════════════════════════════════════ */}
            <aside
                className="main-sidebar sidebar-dark-primary elevation-4"
                style={{ position: 'fixed', top: 0, bottom: 0, width: 250, zIndex: 1038, overflowY: 'auto' }}
            >
                {/* Logo / Brand */}
                <Link to="/dashboard" className="sidebar-brand">
                    <div className="fa fa-spa mr-3"></div>
                    <div className="sidebar-brand-text">
                        Mỹ phẩm Admin
                        <span>Management System</span>
                    </div>
                </Link>

                <div className="sidebar">
                    {/* User Panel */}
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">{avatarLetter}</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">
                                {user?.name || user?.email || 'Admin'}
                            </div>
                            <div className="sidebar-user-role">
                                <span className="dot"></span>
                                {isAdmin && isAdmin() ? 'Administrator' : 'Staff'}
                            </div>
                        </div>
                    </div>

                    <nav className="mt-1">
                        <ul className="nav nav-pills nav-sidebar flex-column" role="menu">

                            {/* MENU chính */}
                            <span className="sidebar-section-label">Menu chính</span>

                            {navItems.map((item) => (
                                <li key={item.to} className="nav-item">
                                    <Link
                                        to={item.to}
                                        className={`nav-link ${item.exact
                                            ? location.pathname === item.to ? 'active' : ''
                                            : isActive(item.to)
                                        }`}
                                    >
                                        <i
                                            className={`nav-icon ${item.icon}`}
                                            style={item.color ? { color: item.color } : {}}
                                        ></i>
                                        <p>{item.label}</p>
                                    </Link>
                                </li>
                            ))}

                            {/* Users — chỉ admin */}
                            {isAdmin && isAdmin() && (
                                <li className="nav-item">
                                    <Link
                                        to="/dashboard/users"
                                        className={`nav-link ${isActive('/dashboard/users')}`}
                                    >
                                        <i className="nav-icon fas fa-users"></i>
                                        <p>Người dùng</p>
                                    </Link>
                                </li>
                            )}

                            {/* TÀI KHOẢN */}
                            <span className="sidebar-section-label" style={{ marginTop: 8 }}>Tài khoản</span>

                            <li className="nav-item">
                                <a
                                    className="sidebar-logout-link nav-link"
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleLogout(); }}
                                >
                                    <i className="nav-icon fas fa-sign-out-alt"></i>
                                    <p style={{ color: 'inherit' }}>Đăng xuất</p>
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </aside>

            {/* ════════════════════════════════════
                CONTENT WRAPPER
            ════════════════════════════════════ */}
            <div
                className="content-wrapper"
                style={{ marginLeft: 250, minHeight: '100vh', backgroundColor: '#f4f6f9' }}
            >
                <Outlet />
            </div>

            {/* ════════════════════════════════════
                FOOTER
            ════════════════════════════════════ */}
            <footer className="main-footer" style={{ marginLeft: 250 }}>
                <strong>
                    Copyright &copy; {new Date().getFullYear()}{' '}
                    <Link to="/">Rượu Store Admin</Link>.
                </strong>
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
            </footer>

        </div>
    );
};

export default MainLayout;
