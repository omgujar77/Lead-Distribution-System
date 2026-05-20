"use client";

import { useState } from "react";

export default function TestToolsPage() {
  const [webhookId, setWebhookId] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState("");
  const [providerId, setProviderId] = useState("");

  // ======================================
  // RESET QUOTAS
  // ======================================

  const resetQuotas = async () => {
    try {
      setLoading("reset");

      const response = await fetch("/api/admin/reset-quotas", {
        method: "POST",
      });

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to reset quotas");
    } finally {
      setLoading("");
    }
  };

  // ======================================
  // TEST WEBHOOK
  // ======================================

  const testWebhook = async () => {
    try {
      setLoading("webhook");

      const response = await fetch("/api/webhooks/payment-success", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          webhookId,
          providerId,
        }),
      });

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Webhook test failed");
    } finally {
      setLoading("");
    }
  };

  // ======================================
  // TEST CONCURRENCY
  // ======================================

  const testConcurrency = async () => {
    try {
      setLoading("concurrency");

      const response = await fetch("/api/admin/test-concurrency", {
        method: "POST",
      });

      const data = await response.json();

      console.log(data);

      setMessage("Concurrency test completed");
    } catch (error) {
      setMessage("Concurrency test failed");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white text-2xl font-bold shadow-xl mb-5">
            ⚙️
          </div>

          <h1 className="text-4xl font-bold text-gray-900">Admin Test Tools</h1>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Manage internal testing utilities, webhook simulations, quota
            resets, and concurrency stress testing.
          </p>
        </div>

        {/* MAIN CARD */}

        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl overflow-hidden">
          {/* TOP BAR */}

          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                System Utilities
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Execute admin-level testing actions safely.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              Active
            </div>
          </div>

          {/* BODY */}

          <div className="p-6 sm:p-8 space-y-8">
            {/* RESET QUOTAS */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Reset Provider Quotas
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Restore quota limits for all providers instantly.
                  </p>
                </div>

                <button
                  onClick={resetQuotas}
                  disabled={loading === "reset"}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-70"
                >
                  {loading === "reset" ? "Resetting..." : "Reset Quotas"}
                </button>
              </div>
            </div>

            {/* TEST WEBHOOK */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900">
                  Test Payment Webhook
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Simulate successful payment webhook events.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter Webhook ID"
                  value={webhookId}
                  onChange={(e) => setWebhookId(e.target.value)}
                  className="flex-1 h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Enter Provider ID"
                  value={providerId}
                  onChange={(e) => setProviderId(e.target.value)}
                  className="flex-1 h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                />

                <button
                  onClick={testWebhook}
                  disabled={loading === "webhook"}
                  className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-lg disabled:opacity-70"
                >
                  {loading === "webhook" ? "Testing..." : "Run Webhook"}
                </button>
              </div>
            </div>

            {/* CONCURRENCY */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Concurrent Lead Testing
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Generate 5 simultaneous leads to test system stability.
                  </p>
                </div>

                <button
                  onClick={testConcurrency}
                  disabled={loading === "concurrency"}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-70"
                >
                  {loading === "concurrency" ? "Generating..." : "Start Test"}
                </button>
              </div>
            </div>

            {/* MESSAGE */}

            {message && (
              <div
                className={`rounded-2xl px-5 py-4 text-sm font-semibold border ${
                  message.toLowerCase().includes("failed")
                    ? "bg-red-100 border-red-200 text-red-700"
                    : "bg-green-100 border-green-200 text-green-700"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
