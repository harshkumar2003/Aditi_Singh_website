"use client";

import React, { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
};

function AdminPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  useEffect(() => {
    let mounted = true;
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setLoggedIn(Boolean(data.session));
      setSessionReady(true);
    });
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange((_e, s) => {
      setLoggedIn(Boolean(s));
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        throw new Error("Not authenticated");
      }
      const res = await fetch("/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to load bookings");
      }
      setBookings(json.bookings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        throw new Error("Not authenticated");
      }
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to update status");
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }
    await fetchBookings();
  }

  async function onLogout() {
    await supabaseBrowser.auth.signOut();
    setBookings([]);
  }

  useEffect(() => {
    if (loggedIn) {
      fetchBookings();
    }
  }, [loggedIn]);

  const monthKey = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "unknown";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  };

  const monthLabel = (key: string) => {
    if (key === "unknown") return "Unknown";
    const [y, m] = key.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const monthCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    const key = monthKey(b.created_at);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const monthOptions = Object.keys(monthCounts).sort((a, b) =>
    a < b ? 1 : -1
  );

  const filteredBookings = bookings.filter((b) => {
    const status = b.status || "pending";
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesMonth =
      monthFilter === "all" || monthKey(b.created_at) === monthFilter;
    const q = search.trim().toLowerCase();
    if (!q) return matchesStatus && matchesMonth;
    const haystack = [
      b.name,
      b.email,
      b.phone || "",
      b.message || "",
      b.date,
      b.time || "",
      status,
    ]
      .join(" ")
      .toLowerCase();
    return matchesStatus && matchesMonth && haystack.includes(q);
  });

  if (!sessionReady) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <div className="mx-4 md:mx-10 lg:mx-24 xl:mx-40 py-12">
        <h1 className="text-center font-semibold text-4xl">Admin Login</h1>
        <form
          onSubmit={onLogin}
          className="mt-8 max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            required
          />
          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#DF8020] text-white font-semibold py-3 rounded-lg hover:bg-[#c96f1b] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-10 lg:mx-24 xl:mx-40 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">Admin</p>
          <h1 className="font-semibold text-3xl">Appointments</h1>
          <p className="text-gray-700 mt-1">Manage requests and track status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookings}
            className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-black"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: bookings.length },
          {
            label: "Pending",
            value: bookings.filter((b) => (b.status || "pending") === "pending")
              .length,
          },
          {
            label: "Confirmed",
            value: bookings.filter((b) => b.status === "confirmed").length,
          },
          {
            label: "Completed",
            value: bookings.filter((b) => b.status === "completed").length,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {card.label}
            </p>
            <p className="text-2xl font-semibold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, date..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Month</label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
            >
              <option value="all">All</option>
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {monthOptions.map((m) => (
            <div
              key={m}
              className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {monthLabel(m)}
              </p>
              <p className="text-xl font-semibold mt-1">{monthCounts[m]}</p>
            </div>
          ))}
          {monthOptions.length === 0 && (
            <div className="text-gray-500">No monthly data yet.</div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {filteredBookings.map((row) => {
            const status = row.status || "pending";
            const statusClass =
              status === "confirmed"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : status === "completed"
                ? "bg-green-50 text-green-700 border-green-200"
                : status === "cancelled"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-amber-50 text-amber-700 border-amber-200";
            return (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{row.name}</div>
                    <div className="text-sm text-gray-600">{row.email}</div>
                    <div className="text-sm text-gray-500">
                      {row.phone || "No phone"}
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full border text-xs ${statusClass}`}
                  >
                    {status}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">Schedule</div>
                  <div>
                    {row.date} {row.time ? `• ${row.time}` : ""}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">Message</div>
                  <div className="text-gray-600">{row.message || "—"}</div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span>{" "}
                  {row.created_at}
                </div>
                <div>
                  <select
                    value={status}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 bg-white text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            );
          })}
          {filteredBookings.length === 0 && !loading && (
            <div className="text-gray-500">No bookings yet.</div>
          )}
        </div>

        <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredBookings.map((row) => {
              const status = row.status || "pending";
              const statusClass =
                status === "confirmed"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : status === "completed"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : status === "cancelled"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-amber-50 text-amber-700 border-amber-200";
              return (
                <tr key={row.id} className="border-t border-gray-100 align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">
                      {row.phone || "No phone"}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-500">
                      {row.time || "No time set"}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[260px]">
                    <p className="text-gray-700">
                      {row.message || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs ${statusClass}`}
                    >
                      {status}
                    </div>
                    <select
                      value={status}
                      onChange={(e) => updateStatus(row.id, e.target.value)}
                      className="mt-2 border border-gray-300 rounded-md px-2 py-1 bg-white text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {row.created_at}
                  </td>
                </tr>
              );
            })}
            {filteredBookings.length === 0 && !loading && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={6}>
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
