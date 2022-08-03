import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchMoviesShowTimesApi } from '../../services/cinema';
import moment from 'moment';

export default function ShowTimes() {
    const [showTimes, setShowTimes] = useState([]);
    const params = useParams();
    useEffect(() => {
        fetchMovieShowTimes();
    }, []);

    const fetchMovieShowTimes = async () => {
        const result = await fetchMoviesShowTimesApi(params.movieId);
        setShowTimes(result.data.content);
    };
    const renderTab = () => {
        return showTimes?.heThongRapChieu?.map((ele, idx) => {
            return (
                <a
                    key={ele.maHeThongRap}
                    className={`nav-link text-capitalize ${idx === 0 && 'active'}`}
                    data-toggle="pill"
                    href={`#${ele.maHeThongRap}`}
                    role="tab"
                    aria-selected="true">{ele.tenHeThongRap}</a>
            )
        })
    }

    const renderContent = () => {
        return showTimes?.heThongRapChieu?.map((ele, index) => {
            return (
                <div
                    className={`tab-pane fade show ${index === 0 && "active"}`}
                    id={ele.maHeThongRap}
                    role="tabpanel"
                    key={ele.maHeThongRap}
                >
                    {
                        ele.cumRapChieu.map((ele) => {
                            return (
                                <div key={ele.maCumRap} className="row mb-5">
                                    <div className="col-1">
                                        <img
                                            className="img-fluid rounded"
                                            src={ele.hinhAnh}
                                        />
                                    </div>
                                    <div className="col-11 pl-0">
                                        <h5>{ele.tenCumRap}</h5>
                                        <span className="text-muted">
                                            {ele.diaChi}
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            {
                                                ele.lichChieuPhim.map((ele) => {
                                                    return (
                                                        <div key={ele.maLichChieu} className="col-3">
                                                            <p className='mt-3 font-weight-bold'>{moment(ele.ngayChieuGioChieu).format('LL')}</p>
                                                            <Link to={`/booking/${ele.maLichChieu}`}>
                                                                <button className='btn btn-outline-primary font-weight-bold'>{moment(ele.ngayChieuGioChieu).format('LT')}</button>
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
            )
        })
    }
    return (
        <div className="row">
            <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <h5 className='mb-3'>Select a cinema</h5>
                    {renderTab()}
                </div>
            </div>
            <div className="col-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <h5 className='mb-3'>Select time slot for
                        <span style={{ fontSize: '21px', fontWeight: 'bold' }}> {showTimes.tenPhim}</span>
                    </h5>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
