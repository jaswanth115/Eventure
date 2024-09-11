import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import Bootstrap Icons

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        if (!name) {
            setError("Please enter your full name");
            return;
        }
        if (!email) {
            setError("Please enter your email");
            return;
        }
        if (!password) {
            setError("Please enter your password");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                if (typeof result.data === "string") {
                    setError(result.data);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center vh-100">
            <div className="signup-form bg-white p-4 rounded">
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaUser />
                        </span>
                        <input 
                            type="text"
                            placeholder="Full Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div> 
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaEnvelope />
                        </span>
                        <input 
                            type="email"
                            placeholder="Email"
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
                            placeholder="Password"
                            name="password"
                            className="form-control rounded"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="form-control rounded"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className='text-danger text-center'>{error}</p>}
                    <button type="submit" className="btn btn-primary w-100 rounded">
                        Register
                    </button>
                </form>
                <p className="text-center mt-3">Already have an account?</p>
                <Link to="/login" className="btn btn-secondary w-100 rounded text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
