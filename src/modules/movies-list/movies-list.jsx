import { Col, Row } from 'antd';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesListApi } from '../../services/moviesList';
import moment from "moment";
import "./index.scss";

export default function MoviesList() {
    const navigate = useNavigate();
    const [moviesList, setMoviesList] = useState([]);
    const { Meta } = Card;
    useEffect(() => {
        fetchMoviesList();
    }, []);

    const fetchMoviesList = async () => {
        const result = await fetchMoviesListApi();
        setMoviesList(result.data.content)
    };


    const renderMoviesList = () => {
        return moviesList.map((ele) => {
            return (
                <Col md={6} sm={4} style={{ marginTop: '30px' }} key={ele.maPhim}>
                    <Card
                        onClick={() => navigate(`/movie/${ele.maPhim}`)}
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src={ele.hinhAnh} style={{ height: 350, objectFit: 'cover' }} />}
                    >
                        <p className='releaseDate'>RELEASE DATE: {moment(ele.ngayKhoiChieu).format('LLL')}</p>
                        <Meta title={ele.tenPhim} />
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div className='container'>
            <h1 className='pt-4 mb-0 moviesTitle'>MOVIES</h1>
            <Row >
                {renderMoviesList()}
            </Row>
        </div>
    )
}
