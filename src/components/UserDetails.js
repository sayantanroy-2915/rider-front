import React from "react"; 
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CaretLeftOutlined, ClearOutlined, SyncOutlined } from "@ant-design/icons";
import { successDialog, errorDialog } from './Modals';

function UserDetails() {
    
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const riderobj = JSON.parse(localStorage.getItem('RiderDetails'));
    
    const handleUpdate = () => {
        form.validateFields().then((values) => {
            const payload = {...values,id:JSON.parse(localStorage.getItem('RiderDetails'))['id']};
            console.log(payload);
            axios.post('http://localhost:8080/rider/update-details',payload)
            .then(res => {
                successDialog("Updated successfully!");
                localStorage.setItem("RiderDetails",JSON.stringify(res.data));
            }).catch(err => {
                errorDialog(JSON.stringify(err.response.data));
            })
        }).catch(err => {});
    }

    return <>
        <div style={{margin: 'auto', width: '60%', paddingTop: '5%'}}>
        <div width='100%' style={{marginBottom: '5%', display:'flex'}}>
            <Button type='link' style={{color: 'darkblue', fontWeight: 'bold'}} onClick={() => {navigate("/home")}}>
                <CaretLeftOutlined /> Back
            </Button>
        </div>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} autoComplete='off'
            initialValues={{name: riderobj.name, phone: riderobj.phone, email: riderobj.email, city: riderobj.city}}
        >
            <Form.Item name='name' label='Name' rules={[
                {required: true, message: 'Please enter your name!'},
                {whitespace: true, message: 'Name cannot be empty!'}
            ]} hasFeedback>
                <Input style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='phone' label='Phone No.' rules={[
                {required: true, message: 'Please enter your mobile number!'},
                {max: 16, message: 'Character limit exceeded'},
                {pattern: new RegExp(/^(\+\d{1,3}[-\s]){0,1}(\d{10}|(\d{5}[-\s]\d{5})|(\d{3}[-\s]\d{3}[-\s]\d{4}))$/), message: 'Please enter a valid mobile number!'}
            ]} hasFeedback>
                <Input type='tel' style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='email' label='E-mail ID' rules={[{type: 'email', message: 'Please enter a valid E-mail ID!'}]} hasFeedback>
                <Input type='email' style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='city' label='City' rules={[{required: true, message: 'Please enter your city!'}]} hasFeedback>
                <Input style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <Form.Item name='password' label='Current Password' rules={[{required: true, message: 'Please enter your current password!'}]} hasFeedback>
                <Input.Password style={{border: '1pt solid black'}} allowClear />
            </Form.Item>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' style={{border: '1pt solid black'}} onClick={() => {form.resetFields()}}>
                    <ClearOutlined /> Reset All</Button>
                </Form.Item>
                <Form.Item style={{marginLeft: '2%'}}>
                    <Button type='primary' style={{border: '1pt solid black'}} onClick={handleUpdate}>
                        <SyncOutlined /> Update
                    </Button>
                </Form.Item>
            </div>
        </Form>
        </div>
    </>
}

export default UserDetails;