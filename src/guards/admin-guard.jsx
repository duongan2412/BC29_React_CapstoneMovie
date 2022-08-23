import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { notification } from "antd"
import { MaLoaiNguoiDung } from '../enums/common';

export default function AdminGuard() {
    const useState = useSelector((state) => state.userReducer);
    const navigate = useNavigate()

    useEffect(() => {
        if (!useState.userInfo) {
            navigate("/login")
        }
        if (useState.userInfo && useState.userInfo.maLoaiNguoiDung !== MaLoaiNguoiDung.QuanTri) {
            notification.warning({
                message: "User can not access page admin"
            })
            return navigate("/")
        }
    }, [])
    return (
        <Outlet />
    )
}
