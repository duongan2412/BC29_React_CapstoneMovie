import React from 'react'

export default function Login() {
    return (
        <div className="login">
            <i className="far fa-user" />
            <a href="/" className="font-weight-light text-decoration-none login__text" data-toggle="modal" data-target="#loginModal">Login / Sign up</a>
            {/* The Modal */}
            <div className="modal fade" id="loginModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header border-bottom-0">
                            <img src={process.env.PUBLIC_URL + '/images/Disney_cinema_logo.png'} className="mx-auto" width={100} height={50} alt="..." />
                        </div>
                        {/* Modal body */}
                        <div className="modal-body pb-2">
                            <div className="form-group">
                                <label>User name</label>
                                <input type="text" name="username" className="form-control" aria-describedby="helpId" />
                                {/* <p className="userNameError mt-1 mb-0" ></p> */}
                                <label className="pt-2">Password</label>
                                <input type="text" name="password" className="form-control" aria-describedby="helpId" />
                                {/* <p className="passwordError mt-1 mb-0"></p> */}
                                <button type="button" className="btn btn-success w-50 mt-3 text-center">LOGIN</button>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer border-top-0 pt-0">
                            <span>Don't have an account?</span>
                            <button type="button" className="btn btn-outline-success">SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
