import axios from 'axios';
import React, { useState } from 'react';

function Login() {

    const [formData, setFormData] = useState({cred:'',password:''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://localhost:8080/login', formData);
            const { token } = res.data;
            localStorage.setItem('token', token);
            console.log("Successfully logged in");
        } catch (error) {
            console.error(error);
        }
    }
    
    return <>
        <div className='p-5 w-1/2 flex flex-col bg-slate-700/60 backdrop-blur-md rounded-xl border-double border-slate-400'>
            <input type='text' id='cred' placeholder='Enter email or phone' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='password' id='password' placeholder='Enter password' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='submit' className='m-5 p-5 rounded-xl bg-slate-800/75 text-sky-400' value='Log in' />
        </div>
    </>;
}

export default Login;