import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import keys from '../keys'; // Adjust the import path as necessary

const Login = () => {
    const [inputKey, setInputKey] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (inputKey === 'demouser') {
            navigate('/demo');
        } else if (keys.includes(inputKey)) {
            navigate('/beta');
        } else {
            alert('Invalid key!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter your key"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
