'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/movenorw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {status === 'sent' && (
        <p className="notice" role="status">
          Thanks. Your message is on its way; I’ll reply soon.
        </p>
      )}
      {status === 'error' && (
        <p className="notice" role="alert">
          That didn’t send. Please try again, or reach me on LinkedIn.
        </p>
      )}

      <div className="field">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field">
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea className="input" id="message" name="message" rows={5} required />
      </div>

      <div>
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send'}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
