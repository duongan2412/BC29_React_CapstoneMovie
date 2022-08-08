import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchMoviesShowTimesApi } from '../../services/cinema';
import "./index.scss"
import { formatDate } from '../../utils/common';
import { useAsync } from '../../hooks/useAsync';

export default function ShowTimes() {

    const params = useParams();

    const { state: showTimes = [] } = useAsync({
        dependencies: [],
        services: () => fetchMoviesShowTimesApi(params.movieId)
    })

    const renderContent = () => {
        return showTimes?.heThongRapChieu?.map((ele, idx) => {
            return (
                <div className="card" key={ele.maHeThongRap}>
                    <div className="card-header">
                        <a className="card-link location d-flex align-items-center" data-toggle="collapse" href={`#${ele.maHeThongRap}`}>
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {ele.tenHeThongRap}
                            <i className="fas fa-arrow-circle-down ml-auto"></i>
                        </a>
                    </div>
                    <div id={`${ele.maHeThongRap}`} className={`collapse ${idx === 0 && 'show'}`} data-parent="#accordion">
                        <div className="card-body mx-5">
                            {
                                ele.cumRapChieu.map((ele) => {
                                    return (
                                        <div key={ele.maCumRap} className="row mb-5">
                                            <div className="col-12 bg-light py-3 px-3">
                                                <div className="row">
                                                    <div className="col-1">
                                                        <img
                                                            className="img-fluid rounded"
                                                            src={ele.hinhAnh} alt="..."
                                                        />
                                                    </div>
                                                    <div className="col-11 pl-0">
                                                        <h5 className='font-weight-bold'>{ele.tenCumRap}</h5>
                                                        <span className="text-muted">
                                                            {ele.diaChi}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    {
                                                        ele.lichChieuPhim.map((ele) => {
                                                            return (
                                                                <div key={ele.maLichChieu} className="col-3">
                                                                    <p className='mt-3 font-weight-bold'>{formatDate(ele.ngayChieuGioChieu, 'LL')}</p>
                                                                    <Link to={`/booking/${ele.maLichChieu}`}>
                                                                        <button className='btn btn-outline-primary font-weight-bold'>{formatDate(ele.ngayChieuGioChieu, 'LT')}</button>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div id='accordion'>
            {renderContent()}
        </div>
    )
}
