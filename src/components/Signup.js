import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ClearOutlined, UserAddOutlined } from '@ant-design/icons';
import { successDialog, warningDialog, errorDialog} from './Modals';
// import bcrypt from 'bcrypt';

function Signup() {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            delete values.confirm_password
            axios.post('http://localhost:8080/auth/register',values)
            .then(res => {
                successDialog("Account created. Login to continue.")
                navigate("/login");
            })
            .catch(err => {
                const errmsg = err.response.data;
                if(errmsg.includes('riders_phone_key'))
                    warningDialog("Phone number exists");
                else if(errmsg.includes('riders_email_key'))
                    warningDialog("Email ID exists");
                else
                    errorDialog(errmsg);
            })
        })
        .catch(err => {});
    }

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '10%'}}>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} initialValues={{remember: true}} autoComplete='off' >
            <Form.Item name='name' label='Name' rules={[
                {required: true, message: 'Please enter your name!'},
                {whitespace: true, message: 'Name cannot be empty!'}
            ]} hasFeedback>
                <Input style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='phone' label='Phone No.' rules={[
                {required: 'true', message: 'Please enter your mobile number!'},
                {max: 16, message: 'Character limit exceeded'},
                {pattern: new RegExp(/^(\+\d{1,3}[-\s]){0,1}(\d{10}|(\d{5}[-\s]\d{5})|(\d{3}[-\s]\d{3}[-\s]\d{4}))$/), message: 'Please enter a valid mobile number!'}
            ]} hasFeedback>
                <Input type='tel' style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='email' label='E-mail ID' rules={[{type: 'email', message: 'Please enter a valid E-mail ID!'}]} hasFeedback>
                <Input type='email' style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='city' label='City' rules={[{required: 'true', message: 'Please enter your city!'}]} hasFeedback>
                <Input style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: 'true', message: 'Please enter your password!'}]} hasFeedback>
                <Input.Password style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='confirm_password' label='Confirm Password' rules={[
                {required: 'true', message: 'Please confirm your password!'},
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value)
                            return Promise.resolve();
                        return Promise.reject("Passwords do not match");
                    }
                })
            ]} hasFeedback>
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
                        <UserAddOutlined /> Create account
                    </Button>
                </Form.Item>
            </div>
        </Form>
        <Link to='/login'>Already have an account? Log in</Link>
        </div>
    </>;
}

export default Signup;