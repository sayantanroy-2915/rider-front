import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import bcrypt from 'bcrypt';

function Login() {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
        //    values.password = bcrypt.hashSync(values.password,5);
            axios.post('http://localhost:8080/login',values)
            .then(res => {
                localStorage.setItem("",res.data);
                navigate("/home");
                
            })
            .catch(err => {
                console.error(err);
            })
        })
    }

    const handleReset = () => {
        form.resetFields();
    }

    return <>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}} initialValues={{remember: true}} autoComplete='off' >
            <Form.Item name='cred' label='Phone or Email' rules={[{required: 'true', message: 'Please enter your phone number or email id!'}]}>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: 'true', message: 'Please enter your password!'}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' onClick={handleSubmit}>Log In</Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' onClick={handleReset}>Clear All</Button>
            </Form.Item>
        </Form>
        <Link to='/signup'>Create new account</Link>
    </>;
}

export default Login;