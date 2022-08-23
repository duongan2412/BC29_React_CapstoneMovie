import { Button, Form, Input, Row, Col, notification } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GROUP_ID } from '../../constants/common';
import { signUpApi } from '../../services/user';
import './index.scss'

export default function SignUp() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        values = {
            ...values,
            maNhom: GROUP_ID
        };
        await signUpApi(values);
        navigate("/");
        notification.success({
            message: "Register Successfully"
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row className='signUpPages'>
            <Col span={12}>
                <Form
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
                >
                    <Form.Item
                        label="Username"
                        name="taiKhoan"
                        rules={[
                            {
                                required: true,
                                message: 'Username is required!',
                            },
                        ]}
                    >
                        <Input />
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
                        name="soDt"
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
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    )
}
