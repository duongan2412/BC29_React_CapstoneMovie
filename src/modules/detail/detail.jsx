import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchMoviesDetailApi } from '../../services/moviesList';
import moment from 'moment';
import "./index.scss";

export default function Detail() {
    const [{ tenPhim, hinhAnh, moTa, ngayKhoiChieu, trailer }, setMovieDetail] = useState({});
    const params = useParams();
    useEffect(() => {
        fetchMovieDetail();
    }, []);

    const fetchMovieDetail = async () => {
        const result = await fetchMoviesDetailApi(params.movieId);
        setMovieDetail(result.data.content);
    }

    return (
        <div className="row py-5">
            <div className="col-3">
                <img className="w-100" src={hinhAnh} />
            </div>
            <div className="col-9">
                <h4 className='font-weight-bold'>{tenPhim}</h4>
                <p>{moTa}</p>
                <p className='font-weight-bold'>Release: {moment(ngayKhoiChieu).format('LLL')}</p>
                <div>
                    <button className="btn btn-primary mr-2">
                        <a className='text-decoration-none text-white' rel="noreferrer" target="_blank" href={trailer}>TRAILER</a>
                    </button>
                </div>
            </div>
        </div >
    )
}
