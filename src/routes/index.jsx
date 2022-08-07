import React from 'react';
import { useRoutes } from 'react-router-dom'
import HomeLayout from '../layouts/home';
import Home from '../pages/home/home';
import ComingSoon from '../pages/coming-soon/coming-soon';
import MovieDetail from '../pages/moivie-detail/moivie-detail';
import Booking from '../pages/booking/booking';


export default function Router() {
    const routing = useRoutes([
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/all-movies",
                    element: <ComingSoon />
                },
                {
                    path: "/all-cinemas",
                    element: <ComingSoon />
                },
                {
                    path: "/all-promotions",
                    element: <ComingSoon />
                },
                {
                    path: "/all-new",
                    element: <ComingSoon />
                },
                {
                    path: "/privacy-policy",
                    element: <ComingSoon />
                },
                {
                    path: "/movie/:movieId",
                    element: <MovieDetail />
                },
                {
                    path: "/booking/:maLichChieu",
                    element: <Booking />
                }
            ]
        }
    ]);

    return routing;
}