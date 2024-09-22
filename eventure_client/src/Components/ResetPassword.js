import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!newPassword || !confirmPassword) {
            setError('Both fields are required');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Assuming you will get the email or token in some way (like through the URL)
        const email = 'user@example.com'; // Replace this with the actual way to get the email/token
        axios.post('http://localhost:3001/reset-password', { email, newPassword })
            .then(result => {
                if (result.data.success) {
                    setMessage('Password reset successfully!');
                    navigate('/login'); // Redirect to login after successful reset
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
        <div className='reset-password-container d-flex justify-content-center align-items-center vh-100'>
            <div className='reset-password-form bg-white p-4 rounded'>
                <h2 className='text-center mb-4'>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="form-control rounded"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control rounded"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {message && <p className='text-success text-center'>{message}</p>}
                    {error && <p className='text-danger text-center'>{error}</p>}
                    <button type='submit' className='btn btn-primary w-100 rounded'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
