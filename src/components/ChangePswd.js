import React from "react"; 
import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CaretLeftOutlined, FileProtectOutlined } from "@ant-design/icons";

function ChangePswd() {
    
    const [form] = Form.useForm();
    const navigate = useNavigate();

	const handleUpdate = () => {}

	return <>
		<div style={{margin: 'auto', width: '60%', paddingTop: '5%'}}>
        <div width='100%' style={{marginBottom: '5%', display:'flex'}}>
            <Button type='link' style={{color: 'darkblue', fontWeight: 'bold'}} onClick={() => {navigate("/home")}}>
                <CaretLeftOutlined /> Back
            </Button>
        </div>
        <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600, fontWeight: 'bold'}} autoComplete='off'>
			<Form.Item name='old_password' label='Old Password' rules={[{required: 'true', message: 'Please enter your current password!'}]}>
            	<Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
            <Form.Item name='new_password' label='New Password' rules={[{required: 'true', message: 'Please enter new password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
			<Form.Item name='confirm_password' label='Retype New Password' rules={[{required: 'true', message: 'Please re-enter new password!'}]}>
                <Input.Password style={{border: '1pt solid black'}} />
            </Form.Item>
			<Form.Item style={{marginLeft: '2%'}}>
                <Button type='primary' style={{border: '1pt solid black'}} onClick={handleUpdate}><FileProtectOutlined /> Change Password</Button>
            </Form.Item>
		</Form>
		</div>
	</>;
}

export default ChangePswd;