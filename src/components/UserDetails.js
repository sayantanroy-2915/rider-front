import React from "react";
import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function UserDetails() {
    
    const [form] = Form.useForm();
    const navigate = useNavigate();

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '10%'}}> 
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} initialValues={{remember: true}} autoComplete='off' >
            <Form.Item name='name' label='Name' rules={[{required: 'true', message: 'Please enter your name!'}]}>
                <Input style={{border: '1pt solid black'}} value={localStorage.getItem("RiderDetails")["name"]} />
            </Form.Item>
            <Form.Item name='phone' label='Phone No.' rules={[{required: 'true', message: 'Please enter your mobile number!'}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='email' label='E-mail ID' rules={[{}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='old_password' label='Old Password' rules={[{required: 'true', message: 'Please enter old your password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='password' label='New Password' rules={[{required: 'true', message: 'Please enter your new password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' style={{border: '1pt solid black'}}>Update</Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type='primary' style={{border: '1pt solid black'}}>Reset All</Button>
            </Form.Item>
        </Form>
        </div>
    </>
}

export default UserDetails;