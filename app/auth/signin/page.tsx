"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password.');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
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
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md"
            >
              Sign in with Email
            </button>
        </form>
        <div className="my-4 text-center">or</div>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign in with Google
        </button>
        <p className="text-center text-sm mt-4"> Do not have an account? <Link href="/auth/signup" className="underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}