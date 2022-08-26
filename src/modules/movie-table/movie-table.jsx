import { Button, Input, notification, Space, Table } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMovieApi, fetchMoviesListApi } from '../../services/movies';
import { formatDate } from '../../utils/common';

export default function MovieTable() {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [movieListF, setMovieListF] = useState([]);
    const [keyword, setKeyWord] = useState()

    const handleChange = (e) => {
        setKeyWord(e.target.value)
    }

    useEffect(() => {
        fetchMovieList();
    }, []);

    useEffect(() => {
        const data = movieList.filter(ele => {
            return ele.tenPhim.toLowerCase().trim().indexOf(keyword?.toLowerCase().trim()) !== - 1
        })
        setMovieListF(data)
    }, [keyword])

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
            <div style={{ display: 'flex' }} className='mb-2'>
                <div className='text-left mb-2'>
                    <Input style={{ width: 200 }} name='keyword' placeholder="Search by Movie" onChange={handleChange} />
                </div>
                <div className='ml-auto'>
                    <Button onClick={() => navigate('/admin/movie-management/create')} type='primary'>CREATE</Button>
                </div>
            </div>
            <Table rowKey='maPhim' columns={columns} dataSource={movieList} />
        </>
    )
}
