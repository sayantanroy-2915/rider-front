import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
// import bcrypt from 'bcrypt';

function Signup() {

    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
        //    values.password = bcrypt.hashSync(values.password,5);
            axios.post('http://localhost:8080/auth/register',values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    const handleReset = () => {
        form.resetFields();
    }

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '10%'}}>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} initialValues={{remember: true}} autoComplete='off' >
            <Form.Item name='name' label='Name' rules={[{required: 'true', message: 'Please enter your name!'}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='phone' label='Phone No.' rules={[{required: 'true', message: 'Please enter your mobile number!'}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='email' label='E-mail ID' rules={[{}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: 'true', message: 'Please enter your password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' onClick={handleSubmit} style={{border: '1pt solid black'}}>Create account</Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' onClick={handleReset} style={{border: '1pt solid black'}}>Clear All</Button>
            </Form.Item>
        </Form>
        <Link to='/login'>Already have an account? Log in</Link>
        </div>
    </>;
}

export default Signup;