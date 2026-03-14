'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase-client';
import { applyActionCode, confirmPasswordReset } from 'firebase/auth';
import Link from 'next/link';

function AuthActionContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'form'>('loading');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const mode = searchParams.get('mode') || '';
  const oobCode = searchParams.get('oobCode') || '';

  useEffect(() => {
    if (!auth || !oobCode) {
      setStatus('error');
      setMessage(!oobCode ? 'Invalid link. Please use the link from your email.' : 'Authentication is not configured.');
      return;
    }

    const run = async () => {
      if (mode === 'verifyEmail' || mode === 'recoverEmail') {
        try {
          await applyActionCode(auth, oobCode);
          setStatus('success');
          setMessage(mode === 'verifyEmail' ? 'Your email has been verified. You can now sign in.' : 'Your email has been recovered. You can now sign in with your new email.');
        } catch (err: any) {
          setStatus('error');
          setMessage(err?.message || 'This link has expired or has already been used.');
        }
        return;
      }

      if (mode === 'resetPassword') {
        setStatus('form');
        return;
      }

      setStatus('error');
      setMessage('Unknown action. Please use the link from your email.');
    };

    run();
  }, [mode, oobCode]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !oobCode) return;
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    setSubmitDisabled(true);
    setMessage('');
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus('success');
      setMessage('Your password has been reset. You can now sign in with your new password.');
    } catch (err: any) {
      setMessage(err?.message || 'This link has expired or has already been used.');
    } finally {
      setSubmitDisabled(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-apty-warm flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-lg max-w-md w-full text-center">
          <p className="text-apty-dark">Processing…</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-apty-warm flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-lg max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-apty-coral mb-2">Something went wrong</h1>
          <p className="text-apty-gray mb-6">{message}</p>
          <Link href="/" className="text-apty-coral hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  if (status === 'form') {
    return (
      <div className="min-h-screen bg-apty-warm flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-apty-coral mb-2">Reset your password</h1>
          <p className="text-apty-gray mb-6">Enter your new password below.</p>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-apty-dark mb-2">New password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-apty-border rounded-lg focus:outline-none focus:ring-2 focus:ring-apty-coral"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-apty-dark mb-2">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-apty-border rounded-lg focus:outline-none focus:ring-2 focus:ring-apty-coral"
              />
            </div>
            {message && <p className="text-red-600 text-sm">{message}</p>}
            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full bg-apty-coral text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {submitDisabled ? 'Resetting…' : 'Reset password'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // success (verifyEmail, recoverEmail, or after resetPassword)
  return (
    <div className="min-h-screen bg-apty-warm flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-lg max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-apty-coral mb-2">Done</h1>
        <p className="text-apty-gray mb-6">{message}</p>
        <Link href="/" className="inline-block bg-apty-coral text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">Back to home</Link>
      </div>
    </div>
  );
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-apty-warm flex items-center justify-center">
        <p className="text-apty-dark">Loading…</p>
      </div>
    }>
      <AuthActionContent />
    </Suspense>
  );
}
