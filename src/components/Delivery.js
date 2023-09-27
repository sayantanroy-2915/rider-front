import { Button, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successDialog } from "./Modals";


function Delivery() {
	
	const order = JSON.parse(localStorage.getItem("Order"));
	const navigate = useNavigate();
	const [x, setX] = useState(Math.pow(-1,Math.round(Math.random()))*Math.random());
	const [y, setY] = useState(Math.pow(-1,Math.round(Math.random()))*Math.random());
	const [pickedUp, setPickedUp] = useState(false);
	const [pickUpButton, activatePickUpButton] = useState(false);
	const [deliverButton, activateDeliverButton] = useState(false);

	const handleKeyDown = (event) => {
		if(event.key === 'ArrowLeft')
			setX(x-.0035)
		if(event.key === 'ArrowRight')
			setX(x+.0035)
		if(event.key === 'ArrowUp')
			setY(y+.0035)
		if(event.key === 'ArrowDown')
			setY(y-.0035)

		activatePickUpButton(Math.pow(x-order.restaurantLocationX,2)+Math.pow(y-order.restaurantLocationY,2)<0.01 && !pickedUp)
		activateDeliverButton(Math.pow(x-order.customerLocationX,2)+Math.pow(y-order.customerLocationY,2)<0.01 && pickedUp);
		
	}

	const pickup = () => {
		axios.put(`http://localhost:8080/order/pick-up?order=${order.id}`)
		.then(() => {
			successDialog("Order picked up from the restaurant");
			setPickedUp(true);
			activatePickUpButton(false);
		})
	}

	const deliver = () => {
		axios.put(`http://localhost:8080/order/deliver?order=${order.id}`)
		.then(() => {
			successDialog("Order delivered to customer");
			activateDeliverButton(false);
			setTimeout(() => { localStorage.removeItem("Order"); navigate('/'); }, 1000);
		})
	}
	
	return <>
		<div tabindex="1" onKeyDown={handleKeyDown}>
			<svg width={500} height={550}>
				<rect x={0} y={50} height={500} width={500} fill={"lightgrey"} />
				<text x={order.restaurantLocationX*250+250} y={300-order.restaurantLocationY*250} fill="chocolate">&#10102;</text>
				<text x={order.customerLocationX*250+250} y={300-order.customerLocationY*250} fill="green">&#10103;</text>
				<text x={x*250+250} y={300-y*250} fill="darkblue">&#x25c9;</text>
			</svg>
			<div>
				<Button type="primary" danger disabled={!pickUpButton} onClick={pickup}>PickUp</Button>
				<Button type="primary" danger disabled={!deliverButton} onClick={deliver}>Deliver</Button>
			</div>
		</div>
	</>;
}

export default Delivery;