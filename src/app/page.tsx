"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HyvraComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email.");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase
      .from("waitlist_signups")
      .insert([{ email: email.trim().toLowerCase() }]);

    if (error) {
      if (error.message.toLowerCase().includes("duplicate")) {
        setStatus("You’re already on the waitlist.");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } else {
      setStatus("You’re on the waitlist.");
      setEmail("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_38%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_30%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.24em] text-white/75 uppercase backdrop-blur">
            Coming Soon
          </div>

          <div className="mb-12">
            <img
              src="/Hyvra-wordmark-red.png"
              alt="Hyvra"
              className="h-48 md:h-64 lg:h-72 mx-auto object-contain drop-shadow-[0_0_100px_rgba(239,68,68,1)]"
            />
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Hybrid training.
            <br />
            Smarter by design.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Hyvra is a premium performance platform for people who train across
            strength, running, HIIT, sports, and recovery — all guided by one
            intelligent system.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none placeholder:text-white/35 backdrop-blur"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-14 rounded-2xl bg-red-600 px-6 text-sm font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Joining..." : "Get notified"}
            </button>
          </form>

          {status ? (
            <p className="mt-4 text-sm text-white/70">{status}</p>
          ) : null}

          <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Train</p>
              <h2 className="mt-3 text-xl font-medium text-white">
                One system for hybrid athletes
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Bring lifting, cardio, conditioning, and sport into one clear
                plan.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Adapt</p>
              <h2 className="mt-3 text-xl font-medium text-white">
                Built around real recovery
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Hyvra helps you balance performance, fatigue, and consistency
                over time.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Improve</p>
              <h2 className="mt-3 text-xl font-medium text-white">
                Guidance that feels personal
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Intelligent recommendations designed to help you keep moving
                forward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}