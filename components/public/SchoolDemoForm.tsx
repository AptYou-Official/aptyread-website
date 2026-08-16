'use client';

import { useState, FormEvent } from 'react';

const BOARDS = [
  'CBSE',
  'ICSE',
  'State',
  'British',
  'American',
  'IB',
  'Other',
] as const;

export default function SchoolDemoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const lines = [
      'School demo request from aptyread.ai/schools',
      '',
      `School Name: ${data.get('schoolName') || ''}`,
      `Principal Name: ${data.get('principalName') || ''}`,
      `Your Name and Designation: ${data.get('contactName') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `City and Country: ${data.get('location') || ''}`,
      `Board or Curriculum: ${data.get('board') || ''}`,
      `Students in Early Years: ${data.get('studentCount') || ''}`,
      `Best Time to Call: ${data.get('bestTime') || ''}`,
    ];

    const subject = encodeURIComponent(
      `School Demo Request: ${data.get('schoolName') || 'School'}`
    );
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:contact@aptyread.ai?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const fieldClass =
    'w-full rounded-xl border border-apty-coral-accent bg-white px-4 py-3 text-apty-dark placeholder:text-apty-gray/70 focus:outline-none focus:ring-2 focus:ring-apty-coral/40 focus:border-apty-coral';
  const labelClass = 'block text-sm font-semibold text-apty-dark mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="schoolName" className={labelClass}>
            School Name
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            required
            className={fieldClass}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="principalName" className={labelClass}>
            Principal Name
          </label>
          <input
            id="principalName"
            name="principalName"
            type="text"
            required
            className={fieldClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Your Name and Designation
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={fieldClass}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            City and Country
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="board" className={labelClass}>
            Board or Curriculum
          </label>
          <select id="board" name="board" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {BOARDS.map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="studentCount" className={labelClass}>
            Number of Students in Early Years
          </label>
          <input
            id="studentCount"
            name="studentCount"
            type="text"
            required
            className={fieldClass}
            placeholder="e.g. 120"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bestTime" className={labelClass}>
          Best Time to Call
        </label>
        <input
          id="bestTime"
          name="bestTime"
          type="text"
          className={fieldClass}
          placeholder="e.g. Weekday mornings"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:opacity-95 transition-opacity"
      >
        Request a Demo
      </button>

      <p className="text-sm text-apty-gray">
        {submitted
          ? 'Your email app should open with the request ready to send.'
          : 'Submitting opens a prepared email in your email app.'}
      </p>
    </form>
  );
}
