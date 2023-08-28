import React from 'react';
import { Table, Button } from 'antd';
const { Column, ColumnGroup } = Table;

function Home() {

    const data = [];
    
    return <>
    <div style={{margin: 'auto', width: '90%'}}>
        <div style={{margin: '5%', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', fontWeight:'bold'}}>
            <div>Welcome {JSON.parse(localStorage.getItem("RiderDetails")).name}</div>
            <div>
                <Button type='primary' style={{border: '1pt solid black'}}>Account</Button>
                <Button type='primary' style={{border: '1pt solid black'}}>Logout</Button>
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