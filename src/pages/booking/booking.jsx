import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Chair from '../../modules/chair/chair';
import { bookingTicketApi, fetchRoomListApi } from '../../services/booking';


export default function Booking() {
    const [dsGhe, setDsGhe] = useState([]);
    const [roomList, setRoomList] = useState();
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchRoomList()
    }, []);

    const fetchRoomList = async () => {
        const result = await fetchRoomListApi(params.maLichChieu);
        setRoomList(result.data.content)
    }

    const handleSelect = (selectedChair) => {
        const data = [...dsGhe]
        const idx = data.findIndex(ele => ele.tenGhe === selectedChair.tenGhe)
        // console.log(selectedChair);
        if (idx !== -1) {
            data.splice(idx, 1)
        } else {
            data.push(selectedChair)
        }
        setDsGhe(data)
    }
    const handleBookingTicket = async () => {
        console.log(dsGhe);
        const dsVe = dsGhe.map((ele) => {
            return {
                maGhe: ele.maGhe,
                giaVe: ele.giaVe
            }
        })
        console.log(dsVe);
        const submitData = {
            maLichChieu: params.maLichChieu,
            danhSachVe: dsVe
        };
        await bookingTicketApi(submitData);
        alert("DAT VE THANH CONG");
        navigate("/")
    }

    // console.log(roomList)
    return (
        roomList ? (
            <div className='row w-75 mx-auto py-5'>
                <div className="col-8">
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
                <div className="col-4">
                    <img src={roomList.thongTinPhim.hinhAnh} className="img-fluid" />
                    <h4>Ten phim: {roomList.thongTinPhim.tenPhim}</h4>
                    <h5>Mo ta {roomList.thongTinPhim.moTa}</h5>
                    <p>Ghe:
                        {dsGhe.map(ele => (
                            <span key={ele.tenGhe} className="badge badge-danger"> {ele.tenGhe}  </span>
                        ))}
                    </p>
                    <p>Tong tien:
                        {dsGhe.reduce((preValue, curValue) => {
                            preValue += curValue.giaVe
                            return preValue
                        }, 0).toLocaleString()}
                    </p>
                    <button onClick={handleBookingTicket} className='btn btn-success'>DAT VE</button>
                </div>
            </div>
        )
            : (
                'Loading....'
            )
    )
}
