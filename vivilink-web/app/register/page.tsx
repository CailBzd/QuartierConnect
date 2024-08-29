"use client"; // Ajoutez cette ligne en haut

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/authSlice';
import type { RootState, AppDispatch } from '../store';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { error, status } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ email, password }));
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
            {status === 'failed' && <p>{error}</p>}
        </div>
    );
};

export default RegisterPage;
