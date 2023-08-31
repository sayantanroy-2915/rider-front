import React from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import bcrypt from 'bcrypt';

function Signup() {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const warningDialog = (msg) => {
        Modal.warning({title: "Warning", content: msg});
    }

    const successDialog = (msg) => {
        Modal.success({title: "Success", content: msg});
    }
    

    const handleSubmit = () => {
        form.validateFields().then((values) => {
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
            })
        })
        .catch(err => {
            console.error(err);
        })
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
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' onClick={() => {form.resetFields()}} style={{border: '1pt solid black'}}>Clear All</Button>
                </Form.Item>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' onClick={handleSubmit} style={{border: '1pt solid black'}}>Create account</Button>
                </Form.Item>
            </div>
        </Form>
        <Link to='/login'>Already have an account? Log in</Link>
        </div>
    </>;
}

export default Signup;