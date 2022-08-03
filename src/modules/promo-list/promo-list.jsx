import { Col, Row } from 'antd';
import { Card } from 'antd';
import React from 'react'
import "./index.scss";

export default function PromoList() {
    const { Meta } = Card;
    return (
        <div className='container'>
            <h1 className='pt-4 mb-0 moviesTitle'>PROMOTIONS</h1>
            <Row >
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_1.webp" />}>
                        <Meta title='Sun Bundle Deal' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_2.webp" />}>
                        <Meta title='Movie Gift Vouchers' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_3.webp" />}>
                        <Meta title='Purchase Premium Seat Tickets & Get $3 off Regular Popcorn Combo' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_4.webp" />}>
                        <Meta title='Wednesday and Sunday $2.50 off tickets promo' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_9.webp" />}>
                        <Meta title='HSBC/POSB Movie Privilege' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_8.webp" />}>
                        <Meta title='HSBC Movie Privilege' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_6.webp" />}>
                        <Meta title='Student Offer' />
                    </Card>
                </Col>
                <Col md={6} sm={4} style={{ marginTop: '30px' }}>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="..." src="./images/promo_7.webp" />}>
                        <Meta title='Senior Citizens Concession Rate' />
                    </Card>
                </Col>
            </Row>
        </div >
    )
}
