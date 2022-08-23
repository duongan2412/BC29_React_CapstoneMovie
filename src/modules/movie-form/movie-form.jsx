import {
    Button,
    DatePicker,
    Form,
    Image,
    Input,
    InputNumber,
    notification,
    Radio,
    Switch
} from 'antd';
import { GROUP_ID } from 'constants/common';
import { useAsync } from 'hooks/useAsync';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { updateMovieUpdateImageApi } from 'services/movies';
import { addMovieUpdateImageApi } from 'services/movies';
import { fetchMoviesDetailApi } from 'services/movies';

export default function MovieForm() {
    const [componentSize, setComponentSize] = useState('default');
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const params = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const { state: movieDetail } = useAsync({
        services: () => fetchMoviesDetailApi(params.movieId),
        dependencies: [params.movieId],
        condition: !!params.movieId
    })

    useEffect(() => {
        if (movieDetail) {
            form.setFieldsValue({
                ...movieDetail,
                ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
            });

            setImage(movieDetail.hinhAnh);
        }
    }, [movieDetail]);

    const onFormLayoutChange = (event) => {
        setComponentSize(event.target.value);
    };

    const handleSave = async (values) => {
        values.ngayKhoiChieu = values.ngayKhoiChieu.format('DD/MM/YYYY');
        values.maNhom = GROUP_ID;

        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        file && formData.append('File', file, file.name);
        params.movieId && formData.append('maPhim', params.movieId);

        if (params.movieId) {
            await updateMovieUpdateImageApi(formData);
        } else {
            await addMovieUpdateImageApi(formData);
        }

        notification.success({
            description: 'Successfully!',
        });
        navigate('/admin/movie-management');
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImage(e.target.result);
            setFile(file);
        };
    };

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout='vertical'
            initialValues={{
                tenPhim: '',
                moTa: '',
                ngayKhoiChieu: '',
                sapChieu: true,
                dangChieu: true,
                hot: true,
                trailer: '',
                danhGia: '',
            }}
            onFinish={handleSave}
            size={componentSize}
        >
            <Form.Item label='Form Size'>
                <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange}>
                    <Radio.Button value='small'>Small</Radio.Button>
                    <Radio.Button value='default'>Default</Radio.Button>
                    <Radio.Button value='large'>Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label='Movie'
                name='tenPhim'
                rules={[
                    {
                        required: true,
                        message: 'Movie name is required!',
                    }
                ]} >
                <Input />
            </Form.Item>
            <Form.Item
                label='Trailer'
                name='trailer'
                rules={[
                    {
                        required: true,
                        message: 'Trailer name is required!',
                    },
                    {
                        pattern: '(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.+',
                        message: 'Trailer must be a website url !',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Description'
                name='moTa'
                rules={[
                    {
                        required: true,
                        message: 'Description name is required!',
                    },
                    {
                        min: 60,
                        message: 'Description must be min 60 character!',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Release Date'
                name='ngayKhoiChieu'
                validateTrigger='onBlur'
                rules={[
                    {
                        required: true,
                        message: 'Release Date is required!',
                    },
                ]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label='Showing' valuePropName='checked' name='dangChieu'>
                <Switch />
            </Form.Item>
            <Form.Item label='Soon' valuePropName='checked' name='sapChieu'>
                <Switch />
            </Form.Item>
            <Form.Item label='Hot' valuePropName='checked' name='hot'>
                <Switch />
            </Form.Item>
            <Form.Item label='Rate' name='danhGia'>
                <InputNumber />
            </Form.Item>
            <Form.Item label='Image'>
                <Input type='file' onChange={handleChangeImage} />
            </Form.Item>
            <Image src={image} />
            <Form.Item className='mt-4' shouldUpdate>
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
        </Form >
    );
}
