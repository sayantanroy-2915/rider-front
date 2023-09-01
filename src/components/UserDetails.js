import React from "react"; 
import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
    
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const riderobj = JSON.parse(localStorage.getItem('RiderDetails'));
    
    const warningDialog = (msg) => {
        Modal.warning({title: "Warning", content: msg});
    }

    const successDialog = (msg) => {
        Modal.success({title: "Success", content: msg});
    }

    const errorDialog = (msg) => {
        Modal.error({title: "Error", content: msg});
    }

    const handleUpdate = () => {
        form.validateFields().then((values) => {
            const header = {
                Authorization: `Bearer ${localStorage.getItem('RiderJWT')}`,
                'Content-type': 'application/json'
            }
            const payload = {
                rider: {id:riderobj.id,name:values.name,phone:values.phone,email:values.email,password:values.password},
                oldPassword: values.old_password,
                jwt: localStorage.getItem('RiderJWT')
            }
            axios.post('http://localhost:8080/rider/update-all',payload, {headers:header})
            .then(res => {
                successDialog(JSON.stringify(res));
            }).catch(err => {
                errorDialog(JSON.stringify(err));
            })
        }).catch(err => {});
    }

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '5%'}}>
        <div width='100%' style={{marginBottom: '5%', display:'flex'}}>
            <Button type='link' style={{color: 'darkblue', fontWeight: 'bold'}} onClick={() => {navigate("/home")}}>&lt; Back</Button>
        </div>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} autoComplete='off'
            initialValues={{name: riderobj.name, phone: riderobj.phone, email: riderobj.email}}
        >
            <Form.Item name='name' label='Name' rules={[{required: 'true', message: 'Please enter your name!'}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='phone' label='Phone No.' rules={[{required: 'true', message: 'Please enter your mobile number!'}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='email' label='E-mail ID' rules={[{}]}>
                <Input style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='old_password' label='Current Password' rules={[{required: 'true', message: 'Please enter your current password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='password' label='New Password' rules={[{required: 'true', message: 'Please enter new password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' style={{border: '1pt solid black'}} onClick={() => {form.resetFields()}}>Reset All</Button>
                </Form.Item>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' style={{border: '1pt solid black'}} onClick={handleUpdate}>Update</Button>
                </Form.Item>
            </div>
        </Form>
        </div>
    </>
}

export default UserDetails;