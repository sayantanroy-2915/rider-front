import React from 'react';
import { Table, Button, Modal } from 'antd';
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
    
    return <>
    <div style={{margin: 'auto', width: '90%'}}>
        <div style={{margin: '5%', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', fontWeight:'bold'}}>
            <div style={{maxWidth:'50%'}}>Welcome {JSON.parse(localStorage.getItem("RiderDetails")).name}</div>
            <div style={{maxWidth:'50%', display:'flex'}}>
                <Button type='primary' style={{marginLeft: '10%', border: '1pt solid black'}} onClick={() => {navigate("/userdetails")}}>Account</Button>
                <Button type='primary' style={{marginLeft: '10%', border: '1pt solid black'}} onClick={logout}>Logout</Button>
            </div>
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