import React from 'react';
import { Table, Button, Modal, Dropdown } from 'antd';
import { FileProtectOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Column, ColumnGroup } = Table;

function Home() {

    const data = [];
    const navigate = useNavigate();
    
    const infoDialog = (msg) => {
        Modal.info({content: msg});
    }

    const logout = () => {
        localStorage.removeItem("RiderDetails");
        localStorage.removeItem("RiderJWT");
        infoDialog("Logged out...")
        navigate("/login");
    }

    const accMenuProps = {
        items: [
            { key: 1, label: 'Edit Profile', icon: <UserOutlined /> },
            { key: 2, label: 'Change Password', icon:<FileProtectOutlined /> },
            { key: 3, label: 'Logout', danger: true, icon: <LogoutOutlined /> }
        ],
        onClick: ({key}) => {
            switch (key) {
                case '1': navigate('/userdetails'); break;
                case '2': navigate('/changepswd'); break;
                case '3': logout(); break;
            }
        }
    };
    
    return <>
    <div style={{margin: 'auto', width: '90%'}}>
        <div style={{margin: '5%', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', fontWeight:'bold'}}>
            <div>Welcome {JSON.parse(localStorage.getItem("RiderDetails")).name}</div>
            <Dropdown menu={accMenuProps} trigger={['click']}>
                <Button type='link' style={{color: 'darkblue'}}><SettingOutlined /></Button>
            </Dropdown>
        </div>
        <Table dataSource={data}>
            <Column title='Order ID' />
            <Column title='Restaurant' />
            <Column title='Customer' />
            <Column title='Order placed' />
            <Column title='Expected Pick up time' />
            <Column title='Estimated Pick up time' />
            <Column title='Estimated delivery time' />
            <Column title='Actions' />
        </Table>
    </div>
    </>;
}

export default Home;