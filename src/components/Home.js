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
            <div>Welcome {JSON.parse(localStorage.getItem("RiderDetails")).name}</div>
            <div>
                <Button type='primary' style={{border: '1pt solid black'}}>Account</Button>
                <Button type='primary' style={{border: '1pt solid black'}} onClick={logout}>Logout</Button>
            </div>
        </div>
        <Table dataSource={data}>
            <Column title='Order ID' />
            <Column title='Items' />
            <Column title='Restaurant' />
            <Column title='Customer' />
            <Column title='Bill amount' />
            <Column title='Order placed' />
            <ColumnGroup title='Pick up time' >
                <Column title='Expected' />
                <Column title='Estimated' />
            </ColumnGroup>
            <Column title='Estimated delivery time' />
            <Column title='Status' />
            <Column title='Actions' />
        </Table>
    </div>
    </>;
}

export default Home;