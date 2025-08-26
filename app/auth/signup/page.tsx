// app/auth/signup/page.tsx
"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
        });
    } else {
        const data = await res.json();
        setError(data.error || 'Failed to create account.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
          Sign Up
        </button>
        <p className="text-center text-sm">
            Already have an account? <Link href="/auth/signin" className="underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}