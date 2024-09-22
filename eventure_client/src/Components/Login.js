import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import Bootstrap Icons

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!password) {
            setError('Password is required');
            return;
        }

        axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            console.log(result);
            if (result.data.message === "Success") {
                navigate(`/home/${result.data.name}`);
            } else if (result.data === "Password is incorrect") {
                setError("Wrong password. Please try again.");
            } else if (result.data === "No record existed") {
                setError("User not found. Please register.");
            } else {
                setError(`${result.data}`);
            }
        })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className='login-container d-flex justify-content-center align-items-center vh-100'>
            <div className='login-form bg-white p-4 rounded'>
                <h2 className='text-center mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 input-group'>
                        <span className="input-group-text">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className='text-danger text-center'>{error}</p>}
                    <button type='submit' className='btn btn-primary w-100 rounded'>
                        Login
                    </button>
                </form>
                <p className='text-center mt-3'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <p className='text-center mt-3'>Don't have an account?</p>
                <Link to="/register" className="btn btn-secondary w-100 rounded text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;