import React from 'react'
import Carousel from '../../modules/carousel/carousel'
import MoviesList from '../../modules/movies-list/movies-list'
import PromoList from '../../modules/promo-list/promo-list'

export default function Home() {
    return (
        <div className="py-2">
            <Carousel />
            <MoviesList />
            <PromoList />
        </div>
    )
}
