import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

function Login() {

    const [form] = Form.useForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://localhost:8080/login',);
            const { token } = res.data;
            localStorage.setItem('token', token);
            console.log("Successfully logged in");
        } catch (error) {
            console.error(error);
        }
    }

    const check = () => {
        console.log(JSON.stringify(form));
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
                <Button type='primary' onClick={check}>For Test</Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' htmlType='submit'>Log In</Button>
            </Form.Item>
        </Form>
    </>;
}

export default Login;