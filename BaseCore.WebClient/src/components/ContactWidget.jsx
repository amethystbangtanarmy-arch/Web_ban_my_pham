import React, { useState } from 'react';
import '../styles/ContactWidget.css';
import { useLocation } from 'react-router-dom';

const ContactWidget = () => {
    const location = useLocation();
     const [isOpen, setIsOpen] = useState(false); 

    const toggleMenu = () => setIsOpen(!isOpen);
    // 🟢 Ẩn widget nếu đang ở trang Admin (path bắt đầu bằng /dashboard)
    if (location.pathname.startsWith('/dashboard')) {
        return null;
    }
    return (
        <div className="contact-widget-container">
            {/* Các nút mạng xã hội ẩn/hiện */}
            <div className={`contact-buttons ${isOpen ? 'show' : ''}`}>
                
                {/* Nút Messenger */}
                <a href="https://m.me/your_facebook_page" target="_blank" rel="noreferrer" className="contact-btn messenger" title="Chat Facebook">
                    <i className="fab fa-facebook-messenger"></i>
                </a>

                {/* Nút Zalo */}
                <a href="https://zalo.me/0123456789" target="_blank" rel="noreferrer" className="contact-btn zalo" title="Chat Zalo">
                    <span className="zalo-text">Zalo</span>
                </a>

                {/* Nút Gọi Điện Hotline */}
                <a href="tel:0123456789" className="contact-btn phone" title="Gọi Hotline">
                    <i className="fas fa-phone-alt"></i>
                </a>
                
            </div>

            {/* Nút Bấm Chính (Main Toggle Button) */}
            <div className="main-contact-btn-wrap" onClick={toggleMenu}>
                <div className="pulse-ring"></div>
                <button className={`main-contact-btn ${isOpen ? 'active' : ''}`}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
                </button>
            </div>
        </div>
    );
};

export default ContactWidget;