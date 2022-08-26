import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import Chair from '../../modules/chair/chair';
import { bookingTicketApi, fetchRoomListApi } from '../../services/booking';
import styled from 'styled-components';
import "./index.scss"
import { Modal, Table, Button, Form, Input, Select, Row, Col, notification } from 'antd';
import { ORDER_INFO_KEY } from 'constants/common';
import { useEffect } from 'react';

export default function BookingMovie() {
    const navigate = useNavigate();
    const [dsGhe, setDsGhe] = useState([]);
    const params = useParams();
    const [visible, setVisible] = useState(false);
    const [visibleOrder, setVisibleOrder] = useState(false);
    const { state: roomList = [] } = useAsync({
        dependencies: [],
        services: () => fetchRoomListApi(params.maLichChieu)
    })
    const [form] = Form.useForm();

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

    const handleOrderInfo = () => {
        localStorage.removeItem(ORDER_INFO_KEY)
        const dsVe = dsGhe.map((ele) => {
            return {
                maGhe: ele.maGhe,
                giaVe: ele.giaVe
            }
        })
        const order = {
            dsVe: dsVe,
            movie: `${roomList.thongTinPhim.tenPhim}`,
            cinemas: `${roomList.thongTinPhim.tenCumRap} - ${roomList.thongTinPhim.tenRap}`,
            showtime: `${roomList.thongTinPhim.ngayChieu} - ${roomList.thongTinPhim.gioChieu}`,
            maLichChieu: params.maLichChieu,
        };
        localStorage.setItem(ORDER_INFO_KEY, JSON.stringify(order));
        setVisible(true);
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
            danhSachVe: dsVe,
        };

        // console.log(submitData)
        await bookingTicketApi(submitData);
        notification.success({
            message: 'Tickets booked successfully'
        })
        setVisible(false)
        navigate("/")
    }

    const orderInfo = JSON.parse(localStorage.getItem(ORDER_INFO_KEY));

    const total = dsGhe.reduce((preValue, curValue) => {
        preValue += curValue.giaVe
        return preValue
    }, 0)

    useEffect(() => {
        if (total > 0) {
            setVisibleOrder(true)
        } else {
            setVisibleOrder(false)
        }
    }, [total])

    const dataSource = [
        {
            key: '1',
            movie: `${orderInfo.movie}`,
            cinemas: `${orderInfo.cinemas}`,
            showtime: `${orderInfo?.showtime}`,
            seats: `${orderInfo.dsVe.length}`,
            total: `${total.toLocaleString()} vnđ`
        },
    ];


    const columns = [
        {
            title: 'Movie',
            dataIndex: 'movie',
            key: 'movie',
        },
        {
            title: 'Cinemas',
            dataIndex: 'cinemas',
            key: 'cinemas',
        },
        {
            title: 'Show Time',
            dataIndex: 'showtime',
            key: 'showtime',
        },
        {
            title: 'Seats',
            dataIndex: 'seats',
            key: 'seats',
        },
        {
            title: 'Order Total',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    return (
        <>
            {roomList.thongTinPhim && (
                <div className='row w-75 mx-auto py-5' >
                    <div className="col-12">
                        <div className="row align-items-center bg-light">
                            <div className="col-3 py-5 px-5">
                                <img className="w-100 img-fluid" src={roomList.thongTinPhim.hinhAnh} alt="..." />
                            </div>
                            <div className="col-9 px-3 font-weight-bold">
                                <h4 style={{ color: '#007bff' }}>{roomList.thongTinPhim.tenPhim}</h4>
                                <p><i className="fas fa-calendar-alt mr-2"></i>{roomList.thongTinPhim.ngayChieu} {roomList.thongTinPhim.gioChieu}</p>
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
                            <p>Chossen Seat</p>
                            {dsGhe.length === 0 ? <span>-</span> : <p>{dsGhe.map(ele => (
                                <span key={ele.tenGhe} className="badge badge-success ml-1"> {ele.tenGhe}</span>
                            ))}</p>}
                            <p className='mt-3' >Total:</p>
                            <span>
                                {dsGhe.reduce((preValue, curValue) => {
                                    preValue += curValue.giaVe
                                    return preValue
                                }, 0).toLocaleString()}
                            </span>
                            <span className='ml-1'>vnđ</span>
                            <div className='mt-1'>
                                <Button type='primary' onClick={() => handleOrderInfo()} className='btn btn-success' disabled={!visibleOrder}>ORDER</Button>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            <Modal
                title="Order Confirm & Payment"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                okText="Place Order"
                cancelText="Return"
                width={1000}
                footer={null}
            >
                <Table className='mb-2' size='small' dataSource={dataSource} columns={columns} pagination={false} />

                <Form
                    name="basic"
                    layout='vertical'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                        // expY: 'YEAR',
                        // expM: 'MONTH'
                    }}
                    autoComplete="off"
                    form={form}
                    onFinish={handleBookingTicket}
                >
                    <Row>
                        <Col md={12} sx={24}>
                            <Form.Item
                                label="Card Type"
                                name="cartType"
                                rules={[
                                    {
                                        required: true,
                                        message: '"Card Type is required!',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value='Visa'>Visa</Select.Option>
                                    <Select.Option value='MasterCard'>MasterCard</Select.Option>
                                    <Select.Option value='American Express'>American Express</Select.Option>
                                    <Select.Option value='Discover'>Discover</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Credit Card Number:"
                                name="cardNum"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Credit Card Number is required!',
                                    },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: 'Credit Card Number not a valid number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Card CVV:"
                                name="CVV"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Card CVV is required!',
                                    },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: 'Card CVV not a valid number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={24}>
                            <p>Exp Date</p>
                            <Row>
                                <Col lg={12} md={24}>
                                    <Form.Item
                                        name="expY"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Year is required!',
                                            },
                                        ]}
                                        style={{ width: '200px' }}
                                    >
                                        <Select defaultValue={['YEAR']}>
                                            <Select.Option value='2018'>2018</Select.Option>
                                            <Select.Option value='2019'>2019</Select.Option>
                                            <Select.Option value='2020'>2020</Select.Option>
                                            <Select.Option value='2021'>2021</Select.Option>
                                            <Select.Option value='2022'>2022</Select.Option>
                                            <Select.Option value='2023'>2023</Select.Option>
                                            <Select.Option value='2024'>2024</Select.Option>
                                            <Select.Option value='2025'>2025</Select.Option>
                                            <Select.Option value='2026'>2026</Select.Option>
                                            <Select.Option value='2027'>2027</Select.Option>
                                            <Select.Option value='2028'>2028</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={12} md={24}>
                                    <Form.Item
                                        name="expM"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Month is required!',
                                            },
                                        ]}
                                        style={{ width: '200px' }}
                                    >
                                        <Select defaultValue={['MONTH']}>
                                            <Select.Option value='1'>1</Select.Option>
                                            <Select.Option value='2'>2</Select.Option>
                                            <Select.Option value='3'>3</Select.Option>
                                            <Select.Option value='4'>4</Select.Option>
                                            <Select.Option value='5'>5</Select.Option>
                                            <Select.Option value='6'>6</Select.Option>
                                            <Select.Option value='7'>7</Select.Option>
                                            <Select.Option value='8'>8</Select.Option>
                                            <Select.Option value='9'>9</Select.Option>
                                            <Select.Option value='10'>10</Select.Option>
                                            <Select.Option value='11'>11</Select.Option>
                                            <Select.Option value='12'>12</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <div className='mb-5'>
                                        <p>Pay secure using your credit card.</p>
                                        <img className='img-fluid' width={300} src={process.env.PUBLIC_URL + '/images/payment_method.png'} alt='...'></img>
                                    </div>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 20,
                                            span: 8,
                                        }}
                                        shouldUpdate
                                        className='ml-auto'
                                    >
                                        {
                                            () => {
                                                return (
                                                    <Button type="primary" htmlType="submit"
                                                        disabled={!form.isFieldsTouched() || form.getFieldsError().some((ele) => ele.errors.length > 0)}
                                                    >
                                                        Confirm
                                                    </Button>
                                                )
                                            }
                                        }
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
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