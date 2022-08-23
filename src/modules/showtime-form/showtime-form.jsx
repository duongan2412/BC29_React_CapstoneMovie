import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    notification,
    Radio,
    Select,
} from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBrandListApi, fetchCinemasListApi, taoLichChieu } from 'services/cinema';

export default function ShowtimeForm() {
    const [componentSize, setComponentSize] = useState('default');
    const [form] = Form.useForm();
    const params = useParams();
    const navigate = useNavigate();

    const onFormLayoutChange = (event) => {
        // console.log(event)
        setComponentSize(event.target.value);
    };

    const handleSave = async (values) => {
        values.ngayChieuGioChieu = values.ngayChieuGioChieu.format('DD/MM/YYYY HH:mm:ss');
        values = { ...values, maPhim: params.movieId }
        // console.log(values)
        await taoLichChieu(values);
        notification.success({
            message: 'Successfully'
        });
        navigate("/admin/showtime-management");
    }

    const [brand, setBrand] = useState([]);
    const [brandSelected, setBrandSelected] = useState();
    const [cinemasList, setCinemasList] = useState([])

    useEffect(() => {
        fetchBrandList();
    }, [])

    useEffect(() => {
        if (brandSelected) {
            fetchCinemasList();
        }
    }, [brandSelected])

    const fetchBrandList = async () => {
        const result = await fetchBrandListApi();
        setBrand(result.data.content);
    }

    const handleChange = (value) => {
        setBrandSelected(value);
        form.setFieldsValue({
            maRap: undefined
        })
    }

    const renderBrand = () => {
        return brand?.map((ele) => {
            return (
                <Select.Option key={ele.maHeThongRap} value={ele.maHeThongRap}>{ele.tenHeThongRap}</Select.Option>
            )
        })
    }

    const fetchCinemasList = async () => {
        const result = await fetchCinemasListApi(brandSelected);
        setCinemasList(result.data.content)
    }

    const renderCinemas = () => {
        return cinemasList.map((ele) => {
            return (
                <Select.Option key={ele.maCumRap} value={ele.maCumRap}>{ele.tenCumRap}</Select.Option>
            )
        })
    }

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="vertical"
            initialValues={{
            }}
            size={componentSize}
            onFinish={handleSave}
        >
            <Form.Item label="Form Size">
                <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange} >
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Select Brand"
                rules={[{
                    required: true,
                    message: 'Brand is required'
                }]}>
                <Select onChange={handleChange}>
                    {renderBrand()}
                </Select>
            </Form.Item>
            <Form.Item label="Select Cinemas" name='maRap'
                rules={[{
                    required: true,
                    message: 'Brand is required'
                }]}>
                <Select>
                    {renderCinemas()}
                </Select>
            </Form.Item>
            <Form.Item label="Release Date" name="ngayChieuGioChieu"
                rules={[{
                    required: true,
                    message: 'Release Date is required'
                }]}>
                <DatePicker
                    showTime />
            </Form.Item>
            <Form.Item label="Price" name='giaVe'>
                <InputNumber style={{ width: 100 }} />
            </Form.Item>
            <Form.Item shouldUpdate>
                {
                    () => {
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
    );
}
