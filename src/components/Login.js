import React from 'react';
import { Button, Form, Input } from 'antd';

function Login() {

    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log(values);
            form.submit();
        })
    }

    const handleReset = () => {
        form.resetFields();
    }

    const check = () => {
        alert(JSON.stringify(form));
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
    </>;
}

export default Login;