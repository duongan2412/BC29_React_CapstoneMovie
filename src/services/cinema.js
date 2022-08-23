import { GROUP_ID } from "constants/common"
import { request } from "../configs/axios"

const fetchMoviesShowTimesApi = (movieId) => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
        method: 'GET'
    })
}

const fetchBrandListApi = () => {
    return request({
        url: '/QuanLyRap/LayThongTinHeThongRap',
        method: 'GET'
    })
}

const fetchCinemasListApi = (brandId) => {
    return request({
        url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${brandId}`,
        method: 'GET'
    })
}

const fetchCinemasShowTimeApi = (maHeThongRap) => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUP_ID}`,
        method: 'GET'
    })
}

const taoLichChieu = (data) => {
    return request({
        url: '/QuanLyDatVe/TaoLichChieu',
        method: 'POST',
        data: data
    })
}

export { fetchMoviesShowTimesApi, fetchBrandListApi, fetchCinemasShowTimeApi, fetchCinemasListApi, taoLichChieu }