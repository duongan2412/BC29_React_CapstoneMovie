import { request } from "../configs/axios"

const loginApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data: data
    })
}

export { loginApi }