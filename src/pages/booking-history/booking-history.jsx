import { Table } from 'antd';
import React from 'react'
import { formatDate } from 'utils/common';

export default function BookingHistory(props) {
    const dataSource = props.account.thongTinDatVe?.map((ele, idx) => {
        return {
            key: idx + 1,
            tenPhim: ele.tenPhim,
            ngayDat: formatDate(ele.ngayDat, 'LLL'),
            tenHeThongRap: ele.danhSachGhe.map((element, index) => index === 0 ? element.tenHeThongRap : ''),
            tenGhe: ele.danhSachGhe.map((element) => element.tenGhe + ' '),
            giaVe: (ele.giaVe * ele.danhSachGhe.length).toLocaleString(),
        }
    });
    // console.log(dataSource);
    const columns = [
        {
            title: 'Movie',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
        },
        {
            title: 'Booking Date',
            dataIndex: 'ngayDat',
            key: 'ngayDat',
        },
        {
            title: 'Cinemas',
            dataIndex: 'tenHeThongRap',
            key: 'tenHeThongRap',
        },
        {
            title: 'Seat',
            dataIndex: 'tenGhe',
            key: 'tenGhe',
        },
        {
            title: 'Price',
            dataIndex: 'giaVe',
            key: 'giaVe',
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}
