import React from 'react'
import { NavLink } from 'react-router-dom'
import "./index.scss"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/' >HOME</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/all-movies">MOVIES</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/all-cinemas">CINEMAS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/all-promotions">PROMOTIONS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/all-new">NEWS &amp; ACTIVITIES</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/privacy-policy">PRIVACY POLICY</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
