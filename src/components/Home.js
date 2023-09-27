import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, } from 'antd';
import { EyeOutlined, FileProtectOutlined, LogoutOutlined, ScheduleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorDialog, infoDialog, successDialog } from './Modals';

function Home() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const poll = () => {
        try {
            axios.get(`http://localhost:8080/order/get-orders?city=${JSON.parse(localStorage.getItem('RiderDetails'))['city']}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        poll();
        const pollInterval = setInterval(poll, 10000);
        return () => clearInterval(pollInterval);
    }, []);

    const columns = [
        {title: 'Order ID', key: 'id', render: (_, order) => (<>
            {`Order #${order.id}`}
        </>)},
        {title: 'Restaurant', key: 'restaurant', render: (_, order) => (<>
            {order.restaurantName}<br/>{order.restaurantAddressLine}, {order.city}
        </>)},
        {title: 'Customer', key: 'customer', render: (_, order) => (<>
            {order.customerName}<br/>{order.customerAddressLine}, {order.city}
        </>)},
        {title: 'Placed At', key: 'placed_at', render: (_, order) => (<>
            {new Date(order.placedAt).toLocaleDateString()} <br />
			{new Date(order.placedAt).toLocaleTimeString()}
        </>)},
        {title: '', key: 'action', render: (_, order) => (<>
            <Button icon={<EyeOutlined />} onClick={() => viewOrderDetails(order)}>View</Button>
        </>)},
    ];

    const viewOrderDetails = (order) => {
        localStorage.setItem('Order',JSON.stringify(order));
        navigate('/order-details');
    }

    const logout = () => {
        localStorage.removeItem("RiderDetails");
        localStorage.removeItem("RiderJWT");
        localStorage.removeItem("Order");
        infoDialog("Logged out...")
        navigate("/login");
    }

    const accMenuProps = {
        items: [
            { key: 1, label: 'Delivered Orders', icon: <ScheduleOutlined /> },
            { key: 2, label: 'Edit Profile', icon: <UserOutlined /> },
            { key: 3, label: 'Change Password', icon:<FileProtectOutlined /> },
            { key: 4, label: 'Logout', danger: true, icon: <LogoutOutlined /> }
        ],
        onClick: ({key}) => {
            switch (key) {
                case '1': navigate('/delivered'); break;
                case '2': navigate('/userdetails'); break;
                case '3': navigate('/changepswd'); break;
                case '4': logout(); break;
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
        <Table dataSource={data} columns={columns} />
    </div>
    </>;
}

export default Home;