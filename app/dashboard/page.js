"use client";

import {
  useEffect,
  useState,
} from "react";

export default function DashboardPage() {

  const [
    messages,
    setMessages,
  ] = useState([]);

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================

  const fetchDashboardData =
    async () => {

      try {

        const response =
          await fetch(
            "/api/dashboard"
          );

        const data =
          await response.json();

        if (data.success) {

          const formatted =
            data.assignments.map(
              (item) => ({

                event:
                  "Lead Assigned",

                providerName:
                  item.providerId?.name,

                quotaRemaining:
                  item.providerId
                    ?.quotaRemaining,

                leadId:
                  item.leadId?._id,

                leadName:
                  item.leadId?.name,

                serviceType:
                  item.leadId
                    ?.serviceType,
              })
            );

          setMessages(
            formatted.reverse()
          );
        }

      } catch (error) {

        console.log(
          "Dashboard Error:",
          error
        );
      }
    };

  // =========================================
  // AUTO REFRESH
  // =========================================

  useEffect(() => {

    fetchDashboardData();

    const interval =
      setInterval(() => {

        fetchDashboardData();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white text-2xl shadow-xl mb-4">

              📡

            </div>

            <h1 className="text-4xl font-bold text-gray-900">

              Overall Dashboard

            </h1>

            <p className="text-gray-500 mt-2 max-w-2xl">

              Monitor live lead assignment activity and provider updates.
            </p>
          </div>

          {/* LIVE STATUS */}

          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-5 py-4">

            <p className="text-sm text-gray-500 mb-2">

              Connection Status

            </p>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="font-semibold text-gray-800">

               Live Connected

              </span> 
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {/* TOTAL EVENTS */}

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6">

            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">

              Total Events

            </p>

            <h2 className="text-5xl font-bold text-gray-900 mt-3">

              {messages.length}

            </h2>

            <p className="text-sm text-gray-400 mt-3">

              Total lead assignments
            </p>
          </div>

          {/* STREAM STATUS */}

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6">

            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">

              Dashboard Status

            </p>

            <div className="flex items-center gap-3 mt-5">

              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-2xl font-bold text-gray-900">

                Active

              </span>
            </div>

            <p className="text-sm text-gray-400 mt-3">

              Refreshing every 5 seconds
            </p>
          </div>

          {/* LAST EVENT */}

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6">

            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">

              Latest Event

            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">

              {
                messages[0]?.event ||
                "No Events"
              }

            </h2>

            <p className="text-sm text-gray-400 mt-3">

              Most recent activity
            </p>
          </div>
        </div>

        {/* EVENT FEED */}

        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">

          {/* TOP BAR */}

          <div className="border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Activity Feed

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Recent lead assignment activity.
              </p>
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">

              Events : {messages.length}

            </div>
          </div>

          {/* EMPTY STATE */}

          {
            messages.length === 0 && (

              <div className="py-20 px-6 text-center">

                <div className="text-6xl mb-5">

                  📭

                </div>

                <h3 className="text-2xl font-bold text-gray-800">

                  No Events Yet

                </h3>

                <p className="text-gray-500 mt-3 max-w-md mx-auto">

                  Waiting for lead assignments.
                </p>
              </div>
            )
          }

          {/* EVENT LIST */}

          <div className="divide-y divide-gray-100">

            {
              messages.map(
                (msg, index) => (

                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-all duration-200"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      {/* LEFT */}

                      <div className="flex items-start gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl shadow-lg">

                          ⚡

                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-3 mb-3">

                            <h3 className="text-xl font-bold text-gray-900">

                              {msg.event}

                            </h3>

                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">

                              ACTIVE

                            </span>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">

                            <div className="bg-gray-100 rounded-xl px-4 py-3">

                              <p className="text-gray-500 mb-1">

                                Provider
                              </p>

                              <p className="font-semibold text-gray-900">

                                {msg.providerName}
                              </p>
                            </div>

                            <div className="bg-gray-100 rounded-xl px-4 py-3">

                              <p className="text-gray-500 mb-1">

                                Quota Remaining
                              </p>

                              <p className="font-semibold text-gray-900">

                                {msg.quotaRemaining}
                              </p>
                            </div>

                            <div className="bg-gray-100 rounded-xl px-4 py-3">

                              <p className="text-gray-500 mb-1">

                                Lead Name
                              </p>

                              <p className="font-semibold text-gray-900">

                                {msg.leadName}
                              </p>
                            </div>

                            <div className="bg-gray-100 rounded-xl px-4 py-3">

                              <p className="text-gray-500 mb-1">

                                Service Type
                              </p>

                              <p className="font-semibold text-gray-900">

                                {msg.serviceType}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}

                      <div className="flex items-center">

                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">

                          Event #{messages.length - index}

                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
}