import { Col, Row, Card, Drawer } from 'antd';
import { useAsync } from 'hooks/useAsync';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBrandListApi, fetchCinemasShowTimeApi } from 'services/cinema';
import { formatDate } from 'utils/common';
import "./index.scss";

export default function CinemasList() {
    const { Meta } = Card;
    const { state: cinemas = [] } = useAsync({
        dependencies: [],
        services: () => fetchBrandListApi()
    })

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const [cinemasCode, setCinemasCode] = useState({})

    const handleDetailCinemas = (maHeThongRap) => {
        setCinemasCode(maHeThongRap);
        showDrawer();
    }

    const renderCinemas = () => {
        return cinemas?.map((ele) => {
            return (
                <Col lg={6} md={12} sx={24} style={{ marginTop: '30px' }} key={ele.maHeThongRap}>
                    <Card
                        onClick={() => handleDetailCinemas(ele.maHeThongRap)}
                        hoverable
                        style={{
                            width: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 10
                        }}
                        cover={<img alt="..." src={ele.logo} style={{ width: 100, height: 100, objectFit: 'cover' }} />}
                    >
                        <Meta title={ele.tenHeThongRap} />
                    </Card>
                </Col >
            )
        })
    }

    const { state: cinemasList = [] } = useAsync({
        dependencies: [cinemasCode],
        services: () => fetchCinemasShowTimeApi(cinemasCode)
    })

    const renderContent = () => {
        return cinemasList[0]?.lstCumRap?.map((element, idx) => {
            return (
                <div className="card" key={element.maCumRap}>
                    <div className="card-header">
                        <a className="card-link location d-flex align-items-center" data-toggle="collapse" href={`#${element.maCumRap}`}>
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {element.tenCumRap}
                            <i className="fas fa-arrow-circle-down ml-auto"></i>
                        </a>
                    </div>
                    <div id={`${element.maCumRap}`} className={`collapse ${idx === 0 && 'show'}`} data-parent="#accordion">
                        <div className="card-body mx-5">
                            {
                                element.danhSachPhim.map((ele) => {
                                    return (
                                        <div key={ele.maPhim} className="row mb-5">
                                            <div className="col-12 bg-light py-3 px-3 text-center">
                                                <div className="row">
                                                    <div className="col-md-3 col-12">
                                                        <img
                                                            className="img-fluid rounded"
                                                            src={ele.hinhAnh} alt="..."
                                                        />
                                                    </div>
                                                    <div className="col-md-9 col-12 pl-0">
                                                        <h5 className='font-weight-bold'>{ele.tenPhim}</h5>
                                                        {/* <span className="text-muted">
                                                            {ele.diaChi}
                                                        </span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    {
                                                        ele.lstLichChieuTheoPhim.map((e) => {
                                                            return (
                                                                <div key={e.maLichChieu} className="col-md-3 col-12">
                                                                    <p className='mt-3 font-weight-bold'>{formatDate(e.ngayChieuGioChieu, 'LL')}</p>
                                                                    <Link to={`/booking/${e.maLichChieu}`}>
                                                                        <button className='btn btn-outline-primary font-weight-bold'>{formatDate(e.ngayChieuGioChieu, 'LT')}</button>
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
        <div className='container'>
            <h1 className='pt-4 mb-0 moviesTitle'>CINEMAS</h1>
            <Row >
                {renderCinemas()}
            </Row>
            <Drawer title={cinemasCode} placement="right" onClose={onClose} visible={visible} >
                <div id='accordion'>
                    {renderContent()}
                </div>
            </Drawer>
        </div>
    )
}
