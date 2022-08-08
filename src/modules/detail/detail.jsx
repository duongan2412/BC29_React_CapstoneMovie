import React from 'react'
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { fetchMoviesDetailApi } from '../../services/moviesList';
import { formatDate } from '../../utils/common';
import "./index.scss";

export default function Detail() {
    const params = useParams();

    const { state: MovieDetail = [] } = useAsync({
        dependencies: [],
        services: () => fetchMoviesDetailApi(params.movieId)
    })

    const { tenPhim, hinhAnh, moTa, ngayKhoiChieu, trailer } = MovieDetail;

    return (
        <div className="row d-flex py-5 px-5 align-items-center">
            <div className="col-3">
                <img className="w-100" src={hinhAnh} alt="..." />
            </div>
            <div className="col-9">
                <h4 className='font-weight-bold'>{tenPhim}</h4>
                <p>{moTa}</p>
                <p className='font-weight-bold'>Release: {formatDate(ngayKhoiChieu)}</p>
                <div>
                    <button className="btn btn-primary mr-2">
                        <a className='text-decoration-none text-white' rel="noreferrer" target="_blank" href={trailer}>TRAILER</a>
                    </button>
                </div>
            </div>
        </div >
    )
}
