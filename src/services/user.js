import { GROUP_ID } from "constants/common"
import { request } from "../configs/axios"

const loginApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data: data
    })
}

const signUpApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/DangKy',
        method: 'POST',
        data: data
    })
}

const fetchUserListApi = () => {
    return request({
        url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
        method: 'GET'
    })
}

const fetchUserDetailApi = (userId) => {
    return request({
        url: `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${userId}`,
        method: 'GET'
    })
}

const addUserApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/ThemNguoiDung',
        method: 'POST',
        data: data
    })
}

const deteleUserApi = (user) => {
    return request({
        url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
        method: 'DELETE',
    })
}

const updateUserApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'POST',
        data: data
    })
}

export { loginApi, signUpApi, fetchUserListApi, addUserApi, deteleUserApi, fetchUserDetailApi, updateUserApi }