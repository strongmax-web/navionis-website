"use client";

import { FormEvent, useState } from "react";

const ROLES = [
  "Yacht crew",
  "OOW student",
  "Master student",
  "Merchant navy",
  "Sailing / cruising",
  "Instructor",
  "Other",
];

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submission = { name, email, role, submittedAt: new Date().toISOString() };
    console.log("Navionis waitlist submission:", submission);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-lg border border-brass/40 bg-charcoal px-6 py-5 text-center text-lg text-ivory">
        Thank you. You&apos;re on the Navionis waitlist.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm text-steel-grey">
        Name
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-h-11 rounded-md border border-steel-grey/40 bg-charcoal px-4 py-3 text-base text-ivory outline-none focus:border-brass"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-steel-grey">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 rounded-md border border-steel-grey/40 bg-charcoal px-4 py-3 text-base text-ivory outline-none focus:border-brass"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-steel-grey">
        Role
        <select
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="min-h-11 rounded-md border border-steel-grey/40 bg-charcoal px-4 py-3 text-base text-ivory outline-none focus:border-brass"
        >
          <option value="" disabled>
            Select your role
          </option>
          {ROLES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="mt-2 min-h-11 rounded-md bg-brass px-6 py-3 text-base font-semibold text-deep-navy transition-opacity hover:opacity-90"
      >
        Join the Waitlist
      </button>
    </form>
  );
}
