'use client';

import PageTemplate from '@/components/templates/PageTemplate';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { DashboardCard } from '../organisms/DashboardCard';
import { IncomeExpenseChart } from '../organisms/IncomeExpenseChart';
import { TransactionTable } from '../organisms/TransactionTable';
import EntryModal from '../organisms/EntryModal';
import { Plus } from 'lucide-react';
import AddEntryDialog from '@/components/organisms/AddEntryDialog';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateEntry = () => {
    setShowModal(true);
  };

  const FloatingAddEntryButton = () => {

  }

  /**
   * TODO: fetch total income in the last 30 days
   *  fetch total expense in the last 30 days
   *  fetch top spending category in the last 30 days
   *
   */
  /**
   * NOTE: if there are no entries, show only a "quickstart" guide
   *  see contra for inspiration
   */

  function NewEntryButton() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateEntry}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Entry
        </motion.button>
      </motion.div>
    );
  }

  function quickStatsBar() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Today</p>
          <p className="text-lg font-light text-slate-700">+$234</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">This Week</p>
          <p className="text-lg font-light text-slate-700">+$1,456</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Saved</p>
          <p className="text-lg font-light text-slate-700">$3,890</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Goal</p>
          <p className="text-lg font-light text-slate-700">78%</p>
        </div>
      </motion.div>
    );
  }

  function createEntryActionButtonMobile() {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCreateEntry}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 md:hidden"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    );
  }

  return (
    <PageTemplate navTitle="Dashboard" navSubtitle="Your financial overview at a glance">
      <div className="min-h-screen">
        {/* Primary Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="mb-3 text-2xl font-light">Key Metrics</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <DashboardCard
              title="Total Income"
              amount="$24,500"
              change={12.5}
              data={[
                20000, 21500, 19800, 22300, 21900, 23100, 22800, 24200, 23600, 24800, 23900, 24500,
              ]}
            />
            <DashboardCard
              title="Total Expenses"
              amount="$6,800"
              change={5.2}
              data={[6200, 6400, 6100, 6600, 6300, 6700, 6500, 6900, 6600, 7000, 6750, 6800]}
            />
            <DashboardCard
              title="Top Spending Category"
              amount="$45,820"
              change={7.8}
              period="vs last quarter"
              data={[
                38000, 39500, 37200, 41800, 40300, 42900, 41600, 44200, 43100, 45600, 44200, 45820,
              ]}
            />
          </div>
        </motion.section>

        {/* Cash Flow Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mt-6 mb-3 text-2xl font-light">This Month</h2>
          {/* TODO: Add option to see weekly, 3 month and maybe custom date range chart */}
          <IncomeExpenseChart />
        </motion.section>

        {/* Transaction Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="mt-6 mb-3 text-2xl font-light">Recent Transactions</h2>
          {/*<motion.button*/}
          {/*  whileHover={{ scale: 1.05 }}*/}
          {/*  whileTap={{ scale: 0.95 }}*/}
          {/*  className="text-muted-foreground ml-2 text-sm font-medium transition-colors duration-200 hover:text-(--theme)"*/}
          {/*>*/}
          {/*  View All*/}
          {/*</motion.button>*/}
          <TransactionTable />
        </motion.section>
      </div>

      <AddEntryDialog/>
    </PageTemplate>
  );
}
