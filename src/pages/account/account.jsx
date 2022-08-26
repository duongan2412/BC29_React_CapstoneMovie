import { USER_INFO_KEY } from 'constants/common'
import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAccountInfoApi } from 'services/user';
import { useAsync } from 'hooks/useAsync';

export default function Account() {
    const navigate = useNavigate();
    const { state: account = [] } = useAsync({
        dependencies: [],
        services: () => fetchAccountInfoApi()
    })

    const columns = [
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Account Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/account/${record.account}/edit`)}>Edit</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            account: `${account.taiKhoan}`,
            fullName: `${account.hoTen}`,
            email: `${account.email}`,
            phone: `${account.soDT}`,
            group: `${account.maNhom}`,
            type: `${account.maLoaiNguoiDung}`
        },
    ];

    return (
        <div className="container">
            {/* Nav tabs */}
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#menu1">Account Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#menu2">History Booking</a>
                </li>
            </ul>
            {/* Tab panes */}
            <div className="tab-content">
                <div id="menu1" className="container tab-pane active"><br />
                    <Table columns={columns} dataSource={data} pagination={false} />;
                </div>
                <div id="menu2" className="container tab-pane fade"><br />
                    <h3>Menu 1</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>

    )
}
