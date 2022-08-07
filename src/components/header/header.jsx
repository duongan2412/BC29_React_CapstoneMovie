import React from 'react'
import { NavLink } from 'react-router-dom'
import Login from '../../pages/login/login'
import Navbar from '../navbar/navbar'
import "./index.scss"

export default function Header() {
    return (
        <div className="header__content container">
            <div className="header__top d-flex align-items-center justify-content-between">
                <div className="logo pt-2">
                    <NavLink to="/"><img src={process.env.PUBLIC_URL + '/images/Disney_cinema_logo.png'} width={100} height={50} alt="..." /></NavLink>
                </div>
                <Login />
            </div>
            <div className="header__bottom d-flex justify-content-center">
                <Navbar />
            </div>
        </div>
    )
}
