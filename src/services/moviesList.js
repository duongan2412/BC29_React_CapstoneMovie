import { request } from "../configs/axios";

const fetchMoviesListApi = () => {
    return request({
        url: '/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
        method: 'GET'
    });
};

const fetchMoviesDetailApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET'
    })
}

export { fetchMoviesListApi, fetchMoviesDetailApi }