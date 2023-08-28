import { Table } from 'antd';
import React from 'react';

function Home() {

    const cols = [{title:'Food'},{title:'Restaurant'},{title:'Customer'}];
    const data = [];

    return <>
    <div style={{margin: 'auto', width: '80%', paddingTop: '5%'}}>
        <div style={{paddingLeft: 0, paddingBottom:'5%', maxWidth: '20%', fontWeight:'bold'}}>
        Welcome {JSON.parse(localStorage.getItem("RiderDetails")).name}
        </div>
        <Table columns={cols} dataSource={data} />
    </div>
    </>;
}

export default Home;