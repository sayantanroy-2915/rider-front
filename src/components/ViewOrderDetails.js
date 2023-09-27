import { CaretLeftOutlined, CheckCircleOutlined, CreditCardTwoTone, DashboardTwoTone, EnvironmentTwoTone, HomeTwoTone, MobileTwoTone, ScanOutlined, ShopTwoTone, ShoppingTwoTone, WalletTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewOrderDetails = () => {

	const order = JSON.parse(localStorage.getItem('Order'))
	const navigate = useNavigate();

	const acceptOrder = () => {
        axios.put(`http://localhost:8080/order/assign-rider?order=${order.id}&rider=${JSON.parse(localStorage.getItem('RiderDetails'))['id']}`)
        .then(() => {
            localStorage.setItem('order',JSON.stringify(order));
            navigate("/delivery");
        })
        .catch()
    };

	return <>
		<div style={{margin: 'auto', width: '60%', paddingTop: '5%', paddingBottom: '5%'}}>
			<div width='100%' style={{marginBottom: '5%', display:'flex'}}>
				<Button type='link' style={{color: 'darkblue', fontWeight: 'bold'}} onClick={() => { localStorage.removeItem("Order"); navigate("/home"); }}>
					<CaretLeftOutlined /> Back
				</Button>
			</div>
			<div style={{textAlign: 'left'}}>
				<h2>Order #{order.id}</h2>
				<div style={{marginLeft:'2vw'}}>
					<table>
					<>
						<td style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							<h3><DashboardTwoTone twoToneColor='red' /> Order placed at</h3>
						</td>
						<td style={{paddingLeft: '3vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							{new Date(order.placedAt).toLocaleDateString()}<br />{new Date(order.placedAt).toLocaleTimeString()}
						</td>
					</>
					<tr>
						<td style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							<h3><ShoppingTwoTone twoToneColor='indigo' /> Items</h3>
						</td>
						<td style={{paddingLeft: '3vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							{(() => order.items.split(', ').forEach((item) => <p>item</p>))()}
							{order.items.split(', ').map((item) => <>{item}<br/></>)}
						</td>
					</tr>
					<tr>
						<td style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							<h3><ShopTwoTone twoToneColor='brown'/>  Restaurant</h3>
						</td>
						<td style={{paddingLeft: '3vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							{order.restaurantName}<br />{order.restaurantAddressLine}, {order.city}<br />
							<EnvironmentTwoTone twoToneColor='red' /> ({order.restaurantLocationX}, {order.restaurantLocationY})
						</td>
					</tr>
					<tr>
						<td style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							<h3><HomeTwoTone twoToneColor='blue' /> To be delivered to</h3>
						</td>
						<td style={{paddingLeft: '3vw', paddingRight: '3vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							{order.customerName}<br />{order.customerAddressLine}, {order.city}<br />
							<EnvironmentTwoTone twoToneColor='red' /> ({order.customerLocationX}, {order.customerLocationY})
						</td>
					</tr>
					<tr>
						<td style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							<h3><CreditCardTwoTone twoToneColor='green' /> Billing</h3>
						</td>
						<td style={{paddingLeft: '3vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh', width: '30%'}}>
							{order.billAmt}/- {(() => {switch(order.paymentMode) {
								case 'Online': return <MobileTwoTone twoToneColor='blue' />;
								case 'CoD': return <WalletTwoTone twoToneColor='brown' />;
								case 'PoD': return <ScanOutlined />;
							}})()}
						</td>
					</tr>
					</table>
				</div>
			</div>
			<Button type='primary' style={{border: '1pt solid black', marginTop: '5%'}} onClick={acceptOrder}>
				<CheckCircleOutlined /> Accept
			</Button>
		</div>
	</>
}

export default ViewOrderDetails;