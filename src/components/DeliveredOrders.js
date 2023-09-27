import axios from "axios";
import { useEffect, useState } from "react";
import { errorDialog } from "./Modals";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { CaretLeftOutlined, MobileTwoTone, ScanOutlined, WalletTwoTone } from "@ant-design/icons";

function DeliveredOrders() {

	const [data, setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://localhost:8080/order/get-delivered-orders?rider=${JSON.parse(localStorage.getItem('RiderDetails'))['id']}`)
		.then(res => setData(res.data))
		.catch(err => console.error(err))
	},[setData]);

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
        {title: 'Delivery Date and Time', key: 'delivered_at', render: (_, order) => (<>
            {new Date(order.deliveredAt).toLocaleDateString()} <br />
			{new Date(order.deliveredAt).toLocaleTimeString()}
        </>)},
        {title: 'Bill amount', key: 'bill', render: (_, order) => (<>
            {order.billAmt}/- {
				(() => {switch(order.paymentMode) {
					case 'Online': return <MobileTwoTone twoToneColor='blue' />;
					case 'CoD': return <WalletTwoTone twoToneColor='brown' />;
					case 'PoD': return <ScanOutlined />;
				}})()}
        </>)},
    ];

	return <>
		<div style={{margin: 'auto', width: '90%', paddingTop: '5%', paddingBottom: '5%'}}>
			<div width='100%' style={{marginBottom: '5%', display:'flex'}}>
				<Button type='link' style={{color: 'darkblue', fontWeight: 'bold'}} onClick={() => {navigate("/home")}}>
					<CaretLeftOutlined /> Back
				</Button>
				<div style={{width: '80%', fontWeight: 'bold', paddingTop: '1%'}}>
				Delivered Orders
				</div>
			</div>
			<Table dataSource={data} columns={columns} />
		</div>
	</>
}

export default DeliveredOrders;