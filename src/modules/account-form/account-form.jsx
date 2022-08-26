import { Button, Form, Input, Row, Col, notification, Select } from 'antd';
import { GROUP_ID } from '../../constants/common';
import { MaLoaiNguoiDung } from 'enums/common';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchAccountInfoApi, updateUserApi } from 'services/user';

export default function AccountForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [form] = Form.useForm();
    const [account, setAccount] = useState({})

    const fetchAccountInfo = async () => {
        const result = await fetchAccountInfoApi();
        console.log(result.data.content)
        setAccount(result.data.content);
    }

    useEffect(() => {
        fetchAccountInfo();
        console.log(account)
    }, [])

    const onFinish = async (values) => {
        console.log(account)
        values = {
            ...values,
            maNhom: GROUP_ID,
            maLoaiNguoiDung: account.maLoaiNguoiDung
        };
        await updateUserApi(values);
        navigate("/account");
        notification.success({
            message: "Successfully"
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className='mt-5 container '>
            <Col span={12}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Account"
                        name="taiKhoan"
                        rules={[
                            {
                                required: true,
                                message: 'Username is required!',
                            },
                        ]}
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="matKhau"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email is required!',
                            },
                            {
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Email is not a valid email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="soDT"
                        rules={[
                            {
                                required: true,
                                message: 'Phone is required!',
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Phone is not a valid phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Full name"
                        name="hoTen"
                        rules={[
                            {
                                required: true,
                                message: 'Full name is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                        shouldUpdate
                    >
                        {
                            () => {
                                return (
                                    <Button type="primary" htmlType="submit" className='mx-0'
                                        disabled={!form.isFieldsTouched() || form.getFieldsError().some((ele) => ele.errors.length > 0)}
                                    >
                                        UPDATE
                                    </Button>
                                )
                            }
                        }
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    )
}
