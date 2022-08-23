import { Space, Table } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesListApi } from '../../services/movies';
import { formatDate } from '../../utils/common';

export default function ShowtimeTable() {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetchMovieList();
    }, []);

    const fetchMovieList = async () => {
        const result = await fetchMoviesListApi();
        setMovieList(result.data.content);
    }

    const columns = [
        {
            title: 'Movies',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Release Date',
            dataIndex: 'ngayKhoiChieu',
            key: 'ngayKhoiChieu',
            render: (text, record) => {
                // console.log(
                //     text,
                //     record
                // )
                return <span>{formatDate(text)}</span>
            }
        },
        {
            title: 'Rate',
            dataIndex: 'danhGia',
            key: 'danhGia',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/admin/showtime-management/${record.maPhim}/create`)}>CREATE</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table rowKey='maPhim' columns={columns} dataSource={movieList} />
        </>
    )
}
