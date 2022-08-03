import { BackTop } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: 'gray',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

export default function HomeLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <BackTop>
                <div style={style}><i className="fas fa-arrow-up"></i></div>
            </BackTop>
        </>
    )
}
