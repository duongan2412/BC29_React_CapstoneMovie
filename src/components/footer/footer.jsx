import React from 'react'
import "./index.scss"

export default function Footer() {
    return (
        <footer id="footer" className="bgLight">
            <div className="footer__content">
                <div className="footer_mid mt-5 px-5">
                    <div className="row">
                        <div className="col-md-2 col-sm-6 -col-12 footer__midItems">
                            <h4>QUICK LINKS</h4>
                            <ul className="footer_midItemsContent">
                                <li>
                                    <a href="./index.html">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#movies">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Movies
                                    </a>
                                </li>
                                <li>
                                    <a href="#cinemas">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Cinemas
                                    </a>
                                </li>
                                <li>
                                    <a href="#event">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Event
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 -col-12 footer__midItems">
                            <h4>HELP &amp; SUPPORT</h4>
                            <ul className="footer_midItemsContent">
                                <li>
                                    <a href="#chart">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Live Chart
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Faq
                                    </a>
                                </li>
                                <li>
                                    <a href="#support">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a href="#services">
                                        <i className="fas fa-angle-double-right mr-1" />
                                        Terms of Services
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 -col-12 footer__midItems">
                            <h4>CONTACT</h4>
                            <ul className="footer_midItemsContent">
                                <li>
                                    <a href="#contact">
                                        <i className="fas fa-envelope mr-1" />
                                        info@example.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#phone">
                                        <i className="fas fa-phone-alt mr-1" />
                                        +123-456-789-999
                                    </a>
                                </li>
                                <li>
                                    <a href="#address">
                                        <i className="fas fa-map-marker-alt mr-1" />
                                        ThaiLand, 905 RiverSide, 90000
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-6 -col-12 footer__midItems">
                            <h4>ABOUT</h4>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.</p>
                            <div className="midItems_socials">
                                <a href="#fb"><i className="fab fa-facebook-f" /></a>
                                <a href="#li"><i className="fab fa-linkedin" /></a>
                                <a href="#tw"><i className="fab fa-twitter" /></a>
                                <a href="#gg"><i className="fab fa-google" /></a>
                                <a href="#git"><i className="fab fa-github" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bot">
                <p>©2022 Ltd. All rights reserved. No part of this website may be reproduced in any form without our written permission.</p>
            </div>
        </footer>

    )
}
