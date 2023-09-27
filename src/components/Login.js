import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ClearOutlined, LoginOutlined } from '@ant-design/icons';
import { errorDialog } from './Modals';
// import bcrypt from 'bcrypt';

function Login() {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        form.validateFields().then(values => {
        //    values.password = bcrypt.hashSync(values.password,5);
            axios.post('http://localhost:8080/auth/login',values)
            .then(res => {
                localStorage.setItem("RiderJWT",res.data.jwt);
                localStorage.setItem("RiderDetails",JSON.stringify(res.data.rider));
                console.log(res);
                navigate("/home");
            })
            .catch(err => {
                errorDialog(err.response.data);
            })
        })
        .catch(err => {});
    }

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '10%'}}> 
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} initialValues={{remember: true}} autoComplete='off' >
            <Form.Item name='username' label='Phone or Email' rules={[{required: 'true', message: 'Please enter your phone number or email id!'}]}>
                <Input style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: 'true', message: 'Please enter your password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' onClick={() => {form.resetFields()}} style={{border: '1pt solid black'}}>
                        <ClearOutlined />Clear All
                    </Button>
                </Form.Item>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' onClick={handleSubmit} style={{border: '1pt solid black'}}>
                        <LoginOutlined /> Log In
                    </Button>
                </Form.Item>
            </div>
        </Form>
        <Link to='/signup'>Create new account</Link>
        </div>
    </>;
}

export default Login;