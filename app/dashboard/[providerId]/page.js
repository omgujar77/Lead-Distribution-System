"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  getSocket,
} from "@/lib/socketClient";

export default function ProviderDashboard() {

  const params = useParams();

  const providerId =
    params.providerId;

  const [provider, setProvider] =
    useState(null);

  const [leads, setLeads] =
    useState([]);

  // ==========================
  // FETCH PROVIDER DATA
  // ==========================

  async function fetchProvider() {

    try {

      const response =
        await fetch(
          `/api/providers/${providerId}`
        );

      const data =
        await response.json();

      if (data.success) {

        setProvider(
          data.provider
        );

        setLeads(
          data.leads
        );
      }

    } catch (error) {

      console.log(error);
    }
  }

  // ==========================
  // INITIAL FETCH
  // ==========================

  useEffect(() => {

    if (providerId) {

      fetchProvider();
    }

  }, [providerId]);

  // ==========================
  // SOCKET LISTENER
  // ==========================

  useEffect(() => {

    const socket =
      getSocket();

    socket.on(
      "lead-assigned",
      () => {

        fetchProvider();
      }
    );

    return () => {

      socket.off(
        "lead-assigned"
      );
    };

  }, [providerId]);

  // ==========================
  // LOADING
  // ==========================

  if (!provider) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 flex items-center justify-center">

        <div className="bg-white px-8 py-5 rounded-2xl shadow-xl border border-gray-200">

          <p className="text-lg font-semibold text-gray-700 animate-pulse">

            Loading Dashboard...

          </p>
        </div>
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 p-4 sm:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white text-xl font-bold shadow-lg mb-4">

              {provider.name?.charAt(0)}

            </div>

            <h1 className="text-4xl font-bold text-gray-900">

              {provider.name} Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

              Manage assigned leads and provider activity in real-time.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-5 py-4">

            <p className="text-sm text-gray-500 mb-1">

              Live Status
            </p>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="font-semibold text-gray-800">

                Connected
              </span>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* QUOTA */}

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-7 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">

                  Quota Remaining

                </p>

                <h2 className="text-5xl font-bold text-gray-900 mt-2">

                  {provider.quotaRemaining}

                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">

                📦
              </div>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

              <div
                className="bg-blue-500 h-full rounded-full"
                style={{
                  width: `${Math.min(
                    provider.quotaRemaining * 10,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* TOTAL ASSIGNED */}

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-7 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">

                  Total Assigned

                </p>

                <h2 className="text-5xl font-bold text-gray-900 mt-2">

                  {provider.totalAssigned}

                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">

                🚀
              </div>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

              <div
                className="bg-green-500 h-full rounded-full"
                style={{
                  width: `${Math.min(
                    provider.totalAssigned * 10,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* LEADS TABLE */}

        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">

          {/* TABLE HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-200">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Assigned Leads

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Real-time lead assignment updates.
              </p>
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">

              Total Leads : {leads.length}

            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="bg-gray-100 text-left">

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">

                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">

                    Phone
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">

                    Service
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">

                    City
                  </th>
                </tr>
              </thead>

              <tbody>

                {leads.length === 0 && (

                  <tr>

                    <td
                      colSpan="4"
                      className="px-6 py-14 text-center text-gray-500"
                    >

                      <div className="flex flex-col items-center">

                        <div className="text-5xl mb-3">

                          📭
                        </div>

                        <p className="text-lg font-semibold">

                          No leads assigned yet
                        </p>

                        <p className="text-sm text-gray-400 mt-1">

                          New assigned leads will appear here.
                        </p>
                      </div>

                    </td>
                  </tr>
                )}

                {leads.map((lead, index) => (

                  <tr
                    key={lead._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">

                          {lead.name?.charAt(0)}

                        </div>

                        <div>

                          <p className="font-semibold text-gray-900">

                            {lead.name}

                          </p>

                          <p className="text-xs text-gray-500">

                            Lead #{index + 1}
                          </p>
                        </div>
                      </div>

                    </td>

                    <td className="px-6 py-4 text-gray-700 font-medium">

                      {lead.phone}

                    </td>

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">

                        {lead.serviceType}

                      </span>

                    </td>

                    <td className="px-6 py-4 text-gray-700 font-medium">

                      {lead.city}

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}