import React, { useState } from 'react';

function SignUp() {

    const [formData, setFormData] = useState({name:'',phone:'',email:'',pswd:'',cnfPswd:''});
    
    return <>
        <div className='p-5 w-1/2 flex flex-col bg-slate-700/60 backdrop-blur-md rounded-xl border-double border-slate-400'>
            <input type='text' id='name' placeholder='Enter name' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='tel' id='phone' placeholder='Enter phone number' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='email' id='email' placeholder='Enter e-mail ID' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='password' id='password' placeholder='Enter password' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='password' id='cnfpassword' placeholder='Confirm password' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400'/>
            <input type='submit' className='m-5 p-5 rounded-xl bg-slate-800/75 text-slate-400' value='Register' />
        </div>
    </>;
}

export default SignUp;