import React from 'react';
import { useRoutes } from 'react-router-dom'
import HomeLayout from '../layouts/home';
import Home from '../pages/home/home';
import ComingSoon from '../pages/coming-soon/coming-soon';
import MovieDetail from '../pages/moivie-detail/moivie-detail';
import Booking from '../pages/booking/booking';
import AuthGuard from '../guards/auth.guards';
import NoAuthGuard from '../guards/no-auth.guards';
import Login from '../pages/login/login';
import SignUp from '../pages/sign-up/sign-up';
import AdminGuard from '../guards/admin-guard';
import AdminLayout from '../layouts/admin';
import MoviesManagement from '../pages/movie-management/movies-managent';
import CreateMovie from 'pages/create-movie/create-movie';
import UpdateMovie from 'pages/update-movie/update-movie';
import UserManagement from 'pages/user-management/user-management';
import CreateUser from 'pages/create-user/create-user';
import UpdateUser from 'pages/update-user/update-user';
import MoviesList from 'modules/movies-list/movies-list';
import PromoList from 'modules/promo-list/promo-list';
import Cinemas from 'pages/cinemas/cinemas';
import ShowtimeManagement from 'pages/showtime-management/showtime-management';
import ShowtimeForm from 'modules/showtime-form/showtime-form';
import Account from 'pages/account/account';
import AccountForm from 'modules/account-form/account-form';

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
                    element: <MoviesList />
                },
                {
                    path: "/all-cinemas",
                    element: <Cinemas />
                },
                {
                    path: "/all-promotions",
                    element: <PromoList />
                },
                {
                    path: "/all-new",
                    element: <ComingSoon />
                },
                {
                    path: "/movie/:movieId",
                    element: <MovieDetail />
                },
                {
                    path: "/",
                    element: <AuthGuard />,
                    children: [
                        {
                            path: "/booking/:maLichChieu",
                            element: <Booking />
                        },
                        {
                            path: "/account",
                            element: <Account />
                        }

                    ]
                },
                {
                    path: "/",
                    element: <NoAuthGuard />,
                    children: [
                        {
                            path: "/login",
                            element: <Login />
                        },
                        {
                            path: "/signup",
                            element: <SignUp />
                        },
                    ]
                }
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/movie-management",
                    element: <AdminGuard />,
                    children: [
                        {
                            path: "/admin/movie-management",
                            element: <MoviesManagement />
                        },
                        {
                            path: "/admin/movie-management/create",
                            element: <CreateMovie />
                        },
                        {
                            path: "/admin/movie-management/:movieId/update",
                            element: <UpdateMovie />
                        }
                    ]
                },
                {
                    path: "/admin/user-management",
                    element: <AdminGuard />,
                    children: [
                        {
                            path: "/admin/user-management",
                            element: <UserManagement />
                        },
                        {
                            path: "/admin/user-management/create",
                            element: <CreateUser />
                        },
                        {
                            path: "/admin/user-management/:userId/update",
                            element: <UpdateUser />
                        }
                    ]
                },
                {
                    path: "/admin/showtime-management",
                    element: <AdminGuard />,
                    children: [
                        {
                            path: "/admin/showtime-management",
                            element: <ShowtimeManagement />
                        },
                        {
                            path: "/admin/showtime-management/:movieId/create",
                            element: <ShowtimeForm />
                        }
                    ]
                }
            ]
        }
    ]);

    return routing;
}