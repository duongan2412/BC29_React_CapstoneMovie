import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import Chair from '../../modules/chair/chair';
import { bookingTicketApi, fetchRoomListApi } from '../../services/booking';
import { formatDate } from '../../utils/common';
import styled from 'styled-components';
import "./index.scss"

export default function Booking() {
    const [dsGhe, setDsGhe] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const { state: roomList = [] } = useAsync({
        dependencies: [],
        services: () => fetchRoomListApi(params.maLichChieu)
    })

    const handleSelect = (selectedChair) => {
        const data = [...dsGhe]
        const idx = data.findIndex(ele => ele.tenGhe === selectedChair.tenGhe)
        if (idx !== -1) {
            data.splice(idx, 1)
        } else {
            data.push(selectedChair)
        }
        setDsGhe(data)
    }

    const handleBookingTicket = async () => {
        const dsVe = dsGhe.map((ele) => {
            return {
                maGhe: ele.maGhe,
                giaVe: ele.giaVe
            }
        })

        const submitData = {
            maLichChieu: params.maLichChieu,
            danhSachVe: dsVe
        };

        await bookingTicketApi(submitData);
        alert("DAT VE THANH CONG");
        navigate("/")
    }

    return (
        roomList.thongTinPhim && (
            <div className='row w-75 mx-auto py-5' >
                <div className="col-12">
                    <div className="row align-items-center bg-light">
                        <div className="col-3 py-5 px-5">
                            <img className="w-100 img-fluid" src={roomList.thongTinPhim.hinhAnh} alt="..." />
                        </div>
                        <div className="col-9 px-3 font-weight-bold">
                            <h4 style={{ color: '#007bff' }}>{roomList.thongTinPhim.tenPhim}</h4>
                            <p><i className="fas fa-calendar-alt mr-2"></i>{formatDate(roomList.thongTinPhim.ngayChieu)}</p>
                            <p><i className="fas fa-map-marker-alt mr-2"></i>{roomList.thongTinPhim.tenCumRap} - {roomList.thongTinPhim.tenRap}</p>
                        </div>
                    </div>
                </div>
                <div className="col-9 mt-5 px-5">
                    <SreenStyted className='container'>SCREEN</SreenStyted>
                    <div className='chair_area'>
                        {
                            roomList.danhSachGhe.map((ele, idx) => {
                                return (
                                    <React.Fragment key={ele.tenGhe}>
                                        <Chair handleSelect={handleSelect} item={ele}></Chair>
                                        {(idx + 1) % 16 === 0 && <br />}
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-3 mt-5 pt-5 d-flex flex-column text-center">
                    <div className="statusChair d-flex justify-content-around">
                        <span className="badge badge-danger d-flex align-items-center justify-content-center vipChair">VIP Chair</span>
                        <span className="badge badge-warning d-flex align-items-center justify-content-center selectingChair">Selecting Chair</span>
                        <span className="badge badge-dark mb-5 d-flex align-items-center justify-content-center selectedChair">Selected Chair</span>
                    </div>
                    <div className="contentOrder">
                        <p>Selected Seat</p>
                        {dsGhe.length === 0 ? <span>-</span> : <p>{dsGhe.map(ele => (
                            <span key={ele.tenGhe} className="badge badge-success ml-1"> {ele.tenGhe}</span>
                        ))}</p>}
                        <p className='mt-3' >Total:</p>
                        <p>
                            {dsGhe.reduce((preValue, curValue) => {
                                preValue += curValue.giaVe
                                return preValue
                            }, 0).toLocaleString()}
                        </p>
                        <button onClick={handleBookingTicket} className='btn btn-success'>ORDER</button>
                    </div>
                </div>
            </div >
        )
    )
}


const SreenStyted = styled.div`
    width: 100%;
    text-align: center;
    height: 70px;
    background-color: darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin-bottom: 10px;
    color: white;
    font-weight: bold;
    font-size: 30px
}
`