import { request } from "../configs/axios";
import { GROUP_ID } from "../constants/common";

const fetchMoviesListApi = () => {
    return request({
        url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
        method: 'GET'
    });
};

const fetchMoviesDetailApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET'
    })
}

const addMovieUpdateImageApi = (data) => {
    return request({
        url: '/QuanLyPhim/ThemPhimUploadHinh',
        method: 'POST',
        data: data
    })
}

const updateMovieUpdateImageApi = (data) => {
    return request({
        url: '/QuanLyPhim/CapNhatPhimUpload',
        method: 'POST',
        data: data
    })
}

const deleteMovieApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/XoaPhim?MaPhim=${movieId}`,
        method: 'DELETE'
    })
}

export { fetchMoviesListApi, fetchMoviesDetailApi, updateMovieUpdateImageApi, addMovieUpdateImageApi, deleteMovieApi }