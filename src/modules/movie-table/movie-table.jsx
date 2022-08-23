import { Button, notification, Space, Table } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMovieApi, fetchMoviesListApi } from '../../services/movies';
import { formatDate } from '../../utils/common';

export default function MovieTable() {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetchMovieList();
    }, []);

    const fetchMovieList = async () => {
        const result = await fetchMoviesListApi();
        setMovieList(result.data.content);
    }
    const handleDeleteMovie = async (movieID) => {
        await deleteMovieApi(movieID);
        notification.success({
            message: 'Delete Successfully!'
        });
        fetchMovieList();
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
                    <a onClick={() => navigate(`/admin/movie-management/${record.maPhim}/update`)}>EDIT</a>
                    <a onClick={() => handleDeleteMovie(record.maPhim)}>DELETE</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='text-right'>
                <Button onClick={() => navigate('/admin/movie-management/create')} type='primary'>CREATE</Button>
            </div>
            <Table rowKey='maPhim' columns={columns} dataSource={movieList} />
        </>
    )
}
