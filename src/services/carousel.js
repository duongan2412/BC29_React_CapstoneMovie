import { request } from './../configs/axios';

const fetchDanhSachBannerApi = () => {
    return request({
        url: '/QuanLyPhim/LayDanhSachBanner',
        method: 'GET'
    });
};

export { fetchDanhSachBannerApi }