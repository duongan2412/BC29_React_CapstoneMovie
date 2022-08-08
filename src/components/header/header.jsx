import { Button } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { USER_INFO_KEY } from '../../constants/common';
import { setUserInfoAction } from '../../store/actions/user.action';
import Navbar from '../navbar/navbar'
import "./index.scss"

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userReducer)
    const handleLogOut = () => {
        localStorage.removeItem(USER_INFO_KEY);
        dispatch(setUserInfoAction(null));
        navigate("/");
    }
    return (
        <div className="header__content container">
            <div className="header__top d-flex align-items-center justify-content-between">
                <div className="logo pt-2">
                    <NavLink to="/"><img src={process.env.PUBLIC_URL + '/images/Disney_cinema_logo.png'} width={100} height={50} alt="..." /></NavLink>
                </div>
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
            <div className="header__bottom d-flex justify-content-center">
                <Navbar />
            </div>
        </div>
    )
}

