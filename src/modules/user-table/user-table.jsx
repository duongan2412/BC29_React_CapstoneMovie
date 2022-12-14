import { Button, Input, notification, Space, Table } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deteleUserApi, fetchUserListApi } from 'services/user';

export default function UserTable() {
    const [userList, setUserList] = useState([]);
    const [userListF, setUserListF] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState()

    const handleChange = (e) => {
        setKeyWord(e.target.value)
    }

    useEffect(() => {
        fetchUserList();
    }, [])

    useEffect(() => {
        const data = userList.filter(ele => {
            return ele.taiKhoan.toLowerCase().trim().indexOf(keyword?.toLowerCase().trim()) !== - 1
        })
        setUserListF(data)
    }, [keyword])

    const fetchUserList = async () => {
        const result = await fetchUserListApi();
        setUserList(result.data.content);
    }

    const handleDeleteUSer = async (userID) => {
        await deteleUserApi(userID);
        notification.success({
            message: 'Delete Successfully!'
        });
        fetchUserList();
    }

    const columns = [
        {
            title: 'Acount ID',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'soDT',
            key: 'soDT',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Acount Type',
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/admin/user-management/${record.taiKhoan}/update`)}>EDIT</a>
                    <a onClick={() => handleDeleteUSer(record.taiKhoan)}>DELETE</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div style={{ display: 'flex' }} className='mb-2'>
                <div className='text-left'>
                    <Input name='keyword' placeholder="Search by Account ID" onChange={handleChange} />
                </div>
                <div className='ml-auto'>
                    <Button onClick={() => navigate('/admin/user-management/create')} type='primary'>CREATE</Button>
                </div>
            </div>
            <Table rowKey='taiKhoan' columns={columns} dataSource={keyword ? userListF : userList} />
        </>
    )
}
