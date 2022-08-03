import React, { useEffect, useState } from 'react'
import { Carousel as CarouselAntd } from 'antd';
import { fetchDanhSachBannerApi } from '../../services/carousel';

const contentStyle = {
    // height: '160px',
    // color: '#fff',
    // lineHeight: '160px',
    // textAlign: 'center',
    // background: '#364d79',
    width: '100%',
    height: '500px'

};

export default function Carousel() {
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        fetchBannerList();
    }, [])

    const fetchBannerList = async () => {
        const result = await fetchDanhSachBannerApi();
        setBannerList(result.data.content)
    }

    const renderBanner = () => {
        return bannerList.map((ele) => {
            return (
                <div key={ele.maBanner}>
                    <img src={ele.hinhAnh} style={contentStyle} alt="..." />
                </div>
            )
        })
    }
    return (
        <CarouselAntd autoplay >
            {renderBanner()}
        </CarouselAntd >
    )
}
