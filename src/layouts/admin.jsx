import {
    DesktopOutlined, FieldTimeOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { USER_INFO_KEY } from 'constants/common';
// import { USER_INFO_KEY } from 'constants/common';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUserInfoAction } from 'store/actions/user.action';
const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userReducer);
    const handleLogOut = () => {
        localStorage.removeItem(USER_INFO_KEY);
        dispatch(setUserInfoAction(null));
        navigate("/");
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo text-center my-2">
                    <img onClick={() => navigate('/')} src={process.env.PUBLIC_URL + '/images/Disney_cinema_logo.png'} width={100} height={43} alt="..." />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    items={
                        [
                            {
                                key: '1',
                                label: 'User',
                                icon: <UserOutlined />,
                                onClick: () => navigate('/admin/user-management')
                            },
                            {
                                key: '2',
                                label: 'Movie',
                                icon: <DesktopOutlined />,
                                onClick: () => navigate('/admin/movie-management')
                            },
                            {
                                key: '3',
                                label: 'Show Times',
                                icon: <FieldTimeOutlined />,
                                onClick: () => navigate('/admin/showtime-management')
                            }

                        ]
                    } />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}>
                    <div className='text-white text-right mr-5'>
                        {
                            !userState.userInfo ? (
                                <div>
                                    <i className="far fa-user" />
                                    <span onClick={() => navigate('/login')} className='loginTitle'>Login/ Sign Up</span>
                                </div>
                            ) : (
                                <div>
                                    <span>Hello {userState.userInfo.hoTen}</span>
                                    <Button type="link" onClick={handleLogOut}>Log out</Button>
                                </div>
                            )
                        }
                    </div>
                </Header>


                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet ></Outlet>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©2022 Ltd. All rights reserved.
                </Footer>
            </Layout>
        </Layout>
    );
};

