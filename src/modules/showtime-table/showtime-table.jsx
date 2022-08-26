import { Input, Space, Table } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesListApi } from '../../services/movies';
import { formatDate } from '../../utils/common';

export default function ShowtimeTable() {
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
            <div className='text-left mb-2'>
                <Input style={{ width: 200 }} name='keyword' placeholder="Search by Movie" onChange={handleChange} />
            </div>
            <Table rowKey='maPhim' columns={columns} dataSource={keyword ? movieListF : movieList} />
        </>
    )
}
