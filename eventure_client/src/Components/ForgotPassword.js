import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file
import { FaEnvelope } from 'react-icons/fa';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Email is required');
            return;
        }

        axios.post('http://localhost:3001/forgot-password', { email })
            .then(result => {
                if (result.data.success) {
                    setMessage('Reset link sent to your email!');
                } else {
                    setError(result.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className='forgot-password-container d-flex justify-content-center align-items-center vh-100'>
            <div className='forgot-password-form bg-white p-4 rounded'>
                <h2 className='text-center mb-4'>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 input-group'>
                        <span className="input-group-text">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="form-control rounded"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {message && <p className='text-success text-center'>{message}</p>}
                    {error && <p className='text-danger text-center'>{error}</p>}
                    <button type='submit' className='btn btn-primary w-100 rounded'>
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
