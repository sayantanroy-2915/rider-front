import React from 'react';
import { Link } from 'react-router-dom';

function SignupComplete() {
    return <>
    <div style={{margin: 'auto', width: '60%', paddingTop: '10%', fontWeight: 'bold'}}>
        Account created. Go to the <Link to='/login'>Login</Link> page.
    </div>
    </>;
}

export default SignupComplete;