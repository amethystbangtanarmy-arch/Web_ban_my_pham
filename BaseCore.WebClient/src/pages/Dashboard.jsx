import React, { useState, useEffect, useRef } from 'react';
import { productApi, userApi, categoryApi, orderApi, supplierApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0, categories: 0, users: 0, orders: 0, suppliers: 0,
    });
    const [loading, setLoading]     = useState(true);
    const [chartData, setChartData] = useState([]);
    const [chartPeriod, setChartPeriod] = useState('year');
    const { isAdmin } = useAuth();
    const hasCheckedPending = useRef(false);

    useEffect(() => { loadStats(); }, []);

    useEffect(() => {
        if (hasCheckedPending.current) return;
        hasCheckedPending.current = true;
        const checkPending = async () => {
            try {
                if (isAdmin && isAdmin()) {
                    const res = await orderApi.getPendingCountAdmin();
                    const count = res.data?.pendingCount || 0;
                    if (count > 0) {
                        setTimeout(() => {
                            alert(`🔔 Bạn có ${count} đơn hàng đang chờ xác nhận!\nVào "Đơn hàng" để xử lý.`);
                        }, 1500);
                    }
                }
            } catch { /* bỏ qua */ }
        };
        checkPending();
    }, []); // eslint-disable-line

    const loadStats = async () => {
        setLoading(true);
        try {
            let pCount = 0, cCount = 0, oCount = 0, uCount = 0, sCount = 0;

            try { const r = await productApi.getAll();
                pCount = r.data?.totalCount || r.data?.items?.length || r.data?.length || 0; } catch {}

            try { const r = await categoryApi.getAll();
                cCount = r.data?.length || 0; } catch {}

            try { const r = await orderApi.getAllAdmin();
                oCount = r.data?.length || 0; } catch {}

            try { const r = await supplierApi.getAll();
                const d = Array.isArray(r.data) ? r.data : r.data?.items || r.data?.data || [];
                sCount = d.length; } catch {}

            if (isAdmin && isAdmin()) {
                try { const r = await userApi.getAll({ page: 1, pageSize: 1 });
                    uCount = r.data?.totalCount || 0; } catch {}

                try { const r = await orderApi.getRevenueChart();
                    setChartData(r.data || []); } catch {}
            }

            setStats({ products: pCount, categories: cCount, users: uCount, orders: oCount, suppliers: sCount });
        } catch (e) {
            console.error('Dashboard loadStats error:', e);
        } finally {
            setLoading(false);
        }
    };

    const formatCompact = (v) =>
        new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(v);

    const formatVND = (v) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

    /* ── Stat cards row 1 ── */
    const topCards = [
        {
            label: 'Sản phẩm',
            value: stats.products,
            icon: 'fas fa-box',
            colorClass: 'card-info',
            change: null,
            link: '/dashboard/products',
        },
        {
            label: 'Danh mục',
            value: stats.categories,
            icon: 'fas fa-tags',
            colorClass: 'card-success',
            change: null,
            link: '/dashboard/categories',
        },
        ...(isAdmin && isAdmin() ? [
            {
                label: 'Người dùng',
                value: stats.users,
                icon: 'fas fa-users',
                colorClass: 'card-warning',
                change: null,
                link: '/dashboard/users',
            },
            {
                label: 'Đơn hàng',
                value: stats.orders,
                icon: 'fas fa-shopping-cart',
                colorClass: 'card-danger',
                change: null,
                link: '/dashboard/orders',
            },
        ] : []),
        {
            label: 'Nhà cung cấp',
            value: stats.suppliers,
            icon: 'fas fa-truck',
            colorClass: 'card-purple',
            change: null,
            link: '/dashboard/suppliers',
        },
    ];

    /* ── Metric cards row 2 ── */
    const metricCards = [
        {
            value: stats.products,
            label: 'Tổng sản phẩm',
            icon: 'fas fa-boxes text-info',
            change: '+5% so với tháng trước',
            up: true,
            link: '/dashboard/products',
        },
        {
            value: stats.orders,
            label: 'Tổng đơn hàng',
            icon: 'fas fa-receipt text-danger',
            change: '+22% so với tháng trước',
            up: true,
            link: '/dashboard/orders',
        },
        {
            value: stats.suppliers,
            label: 'Nhà cung cấp',
            icon: 'fas fa-truck text-warning',
            change: '+10% so với tháng trước',
            up: true,
            link: '/dashboard/suppliers',
        },
    ];

    return (
        <div className="dash-page">

            {/* ── PAGE HEADER ── */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <div>
                            <h1 className="dash-title">Dashboard</h1>
                            <p className="dash-subtitle">Tổng quan hệ thống cửa hàng mỹ phẩm</p>
                        </div>
                        <ol className="breadcrumb mb-0 mt-1">
                            <li className="breadcrumb-item active">Tổng quan</li>
                        </ol>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border" role="status" style={{ width: 36, height: 36 }}>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted" style={{ fontSize: 13 }}>Đang tải dữ liệu...</p>
                        </div>
                    ) : (
                        <>
                            {/* ══════════════════════════════════════
                                ROW 1 — STAT CARDS (màu nền giữ nguyên)
                            ══════════════════════════════════════ */}
                            <div className="row mb-3">
                                {topCards.map((card, i) => (
                                    <div key={i} className="col-xl col-md-4 col-sm-6 mb-3">
                                        <div className={`dash-stat-card ${card.colorClass}`}>
                                            <div className="stat-icon">
                                                <i className={card.icon}></i>
                                            </div>
                                            <div className="stat-label">{card.label}</div>
                                            <div className="stat-value">{card.value.toLocaleString('vi-VN')}</div>
                                            <Link to={card.link} className="stat-footer">
                                                Xem chi tiết <i className="fas fa-arrow-right ml-1" style={{ fontSize: 10 }}></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ══════════════════════════════════════
                                ROW 2 — METRIC CARDS (nền trắng)
                            ══════════════════════════════════════ */}
                            <div className="row mb-3">
                                {metricCards.map((m, i) => (
                                    <div key={i} className="col-md-4 mb-3">
                                        <div className="dash-metric-card">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <div className="metric-value">{m.value.toLocaleString('vi-VN')}</div>
                                                    <div className="metric-label">{m.label}</div>
                                                </div>
                                                <i className={`metric-icon ${m.icon}`}></i>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className={`metric-change ${m.up ? 'up' : 'down'}`}>
                                                    <i className={`fas ${m.up ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}
                                                       style={{ fontSize: 10 }}></i>
                                                    {m.change}
                                                </span>
                                                <Link to={m.link} className="metric-view">Xem</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ══════════════════════════════════════
                                ROW 3 — BIỂU ĐỒ + QUICK ACTIONS
                            ══════════════════════════════════════ */}
                            <div className="row mb-3">

                                {/* Biểu đồ doanh thu */}
                                <div className="col-lg-8 mb-3">
                                    <div className="dash-card h-100">
                                        <div className="dash-card-header">
                                            <span className="dash-card-title">
                                                <i className="fas fa-chart-bar mr-2 text-primary"></i>
                                                Doanh thu theo kỳ
                                            </span>
                                            <div className="d-flex align-items-center" style={{ gap: 8 }}>
                                                <select
                                                    className="dash-select"
                                                    value={chartPeriod}
                                                    onChange={(e) => setChartPeriod(e.target.value)}
                                                >
                                                    <option value="year">Năm nay</option>
                                                    <option value="quarter">Quý này</option>
                                                    <option value="month">Tháng này</option>
                                                </select>
                                                <Link to="/dashboard/revenue"
                                                    className="btn btn-sm"
                                                    style={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb', color: '#374151', background: '#fff', padding: '4px 12px' }}>
                                                    Báo cáo đầy đủ
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="dash-card-body">
                                            {chartData.length === 0 ? (
                                                <div className="text-center py-5 text-muted">
                                                    <i className="fas fa-chart-bar fa-3x mb-3 d-block" style={{ opacity: 0.2 }}></i>
                                                    <p style={{ fontSize: 13 }}>
                                                        Chưa có dữ liệu doanh thu.{' '}
                                                        <Link to="/dashboard/revenue" style={{ color: '#f97316' }}>Xem báo cáo</Link>
                                                    </p>
                                                </div>
                                            ) : (
                                                <div style={{ width: '100%', height: 260 }}>
                                                    <ResponsiveContainer>
                                                        <BarChart
                                                            data={chartData}
                                                            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                                                            barGap={4}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                            <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                                            <YAxis tickFormatter={formatCompact} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                                            <Tooltip formatter={(v) => formatVND(v)} />
                                                            <Legend iconType="circle" iconSize={8} />
                                                            <Bar dataKey="revenue" name="Doanh thu" fill="#f97316" radius={[4, 4, 0, 0]} barSize={32} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="col-lg-4 mb-3">
                                    <div className="dash-card h-100">
                                        <div className="dash-card-header">
                                            <span className="dash-card-title">
                                                <i className="fas fa-bolt mr-2 text-warning"></i>
                                                Thao tác nhanh
                                            </span>
                                        </div>
                                        <div className="dash-card-body">
                                            <div className="row" style={{ rowGap: 10 }}>
                                                <div className="col-6">
                                                    <Link to="/dashboard/products" className="dash-quick-btn">
                                                        <i className="fas fa-plus-circle text-info"></i>
                                                        Thêm sản phẩm
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link to="/dashboard/orders" className="dash-quick-btn">
                                                        <i className="fas fa-clipboard-list text-warning"></i>
                                                        Xử lý đơn
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link to="/dashboard/suppliers" className="dash-quick-btn">
                                                        <i className="fas fa-truck text-success"></i>
                                                        Nhà cung cấp
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link to="/dashboard/revenue" className="dash-quick-btn">
                                                        <i className="fas fa-chart-pie text-danger"></i>
                                                        Doanh thu
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link to="/dashboard/categories" className="dash-quick-btn">
                                                        <i className="fas fa-tags text-primary"></i>
                                                        Danh mục
                                                    </Link>
                                                </div>
                                                {isAdmin && isAdmin() && (
                                                    <div className="col-6">
                                                        <Link to="/dashboard/users" className="dash-quick-btn">
                                                            <i className="fas fa-users" style={{ color: '#7c3aed' }}></i>
                                                            Người dùng
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ══════════════════════════════════════
                                ROW 4 — THỐNG KÊ NHANH (bottom row)
                            ══════════════════════════════════════ */}
                            <div className="row">
                                {/* Tồn kho thấp — placeholder */}
                                <div className="col-lg-6 mb-3">
                                    <div className="dash-card">
                                        <div className="dash-card-header">
                                            <span className="dash-card-title">
                                                <i className="fas fa-exclamation-triangle mr-2 text-danger"></i>
                                                Sản phẩm tồn kho thấp
                                            </span>
                                            <Link to="/dashboard/products"
                                                style={{ fontSize: 12, color: '#f97316', fontWeight: 500 }}>
                                                Xem tất cả
                                            </Link>
                                        </div>
                                        <div className="dash-card-body">
                                            <p className="text-muted text-center py-3 mb-0" style={{ fontSize: 13 }}>
                                                <i className="fas fa-check-circle text-success d-block fa-2x mb-2"></i>
                                                Không có sản phẩm nào sắp hết hàng
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Đơn hàng gần đây */}
                                <div className="col-lg-6 mb-3">
                                    <div className="dash-card">
                                        <div className="dash-card-header">
                                            <span className="dash-card-title">
                                                <i className="fas fa-clock mr-2 text-primary"></i>
                                                Đơn hàng gần đây
                                            </span>
                                            <Link to="/dashboard/orders"
                                                style={{ fontSize: 12, color: '#f97316', fontWeight: 500 }}>
                                                Xem tất cả
                                            </Link>
                                        </div>
                                        <div className="dash-card-body">
                                            <p className="text-muted text-center py-3 mb-0" style={{ fontSize: 13 }}>
                                                <i className="fas fa-shopping-bag text-muted d-block fa-2x mb-2" style={{ opacity: 0.3 }}></i>
                                                Vào <Link to="/dashboard/orders" style={{ color: '#f97316' }}>Đơn hàng</Link> để xem chi tiết
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
