import { Col, Input, Row } from 'antd';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesListApi } from '../../services/movies';
import { useAsync } from '../../hooks/useAsync';
import { formatDate } from '../../utils/common';
import "./index.scss";

export default function MoviesList() {
    const navigate = useNavigate();
    const { Meta } = Card;

    const { state: moviesList = [] } = useAsync({
        dependencies: [],
        services: () => fetchMoviesListApi()
    })

    const [movieListF, setMovieListF] = useState([]);
    const [keyword, setKeyWord] = useState()

    const handleChange = (e) => {
        setKeyWord(e.target.value)
    }

    useEffect(() => {
        const data = moviesList.filter(ele => {
            return ele.tenPhim.toLowerCase().trim().indexOf(keyword?.toLowerCase().trim()) !== - 1
        })
        setMovieListF(data)
    }, [keyword])

    const renderMoviesList = () => {
        return (keyword ? movieListF : moviesList).map((ele) => {
            return (
                <Col lg={6} md={12} sx={24} style={{ marginTop: '30px' }} key={ele.maPhim}>
                    <Card
                        onClick={() => navigate(`/movie/${ele.maPhim}`)}
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src={ele.hinhAnh} style={{ height: 350, objectFit: 'cover' }} />}
                    >
                        <p className='releaseDate'>RELEASE DATE: {formatDate(ele.ngayKhoiChieu, 'LL')}</p>
                        <Meta title={ele.tenPhim} />
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div className='container' >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <h1 className='pt-4 mb-0 moviesTitle'>MOVIES</h1>
                </div>
                <div className='ml-auto pt-4'>
                    <Input style={{ width: 200 }} name='keyword' placeholder="Search Movie" onChange={handleChange} />
                </div>
            </div>
            <Row >
                {renderMoviesList()}
            </Row>
        </div>
    )
}
