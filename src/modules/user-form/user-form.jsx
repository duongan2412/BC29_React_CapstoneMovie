import { Button, Form, Input, Row, Col, notification, Select } from 'antd';
import { MaLoaiNguoiDung } from 'enums/common';
import { useAsync } from 'hooks/useAsync';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GROUP_ID } from '../../constants/common';
import { addUserApi, fetchUserDetailApi, updateUserApi } from '../../services/user';

export default function UserForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [form] = Form.useForm();

    const { state: userDetail } = useAsync({
        services: () => fetchUserDetailApi(params.userId),
        dependencies: [params.userId],
        condition: !!params.userId
    })

    useEffect(() => {
        if (userDetail) {
            form.setFieldsValue(userDetail[0])
        }
    }, [userDetail]);

    const onFinish = async (values) => {
        values = {
            ...values,
            maNhom: GROUP_ID
        };
        if (params.userId) {
            await updateUserApi(values);
        } else {
            await addUserApi(values);
        }
        navigate("/admin/user-management");
        notification.success({
            message: "Successfully"
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row className='mt-5'>
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
                        label="Acount Type"
                        name="maLoaiNguoiDung"
                        rules={[
                            {
                                required: true,
                                message: 'Full name is required!',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value={MaLoaiNguoiDung.KhachHang}>Customer</Select.Option>
                            <Select.Option value={MaLoaiNguoiDung.QuanTri}>Admin</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        shouldUpdate
                    >
                        {
                            () => {
                                // console.log(form.getFieldsError())
                                return (
                                    <Button type="primary" htmlType="submit"
                                        disabled={!form.isFieldsTouched() || form.getFieldsError().some((ele) => ele.errors.length > 0)}
                                    >
                                        SAVE
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
