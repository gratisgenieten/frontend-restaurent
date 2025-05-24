'use client';

import React, { useState } from 'react';
import OptionGroupsOnly from './(components)/OptionGroupsOnly';
import OptionsManagerOnly from './(components)/OptionsManagerOnly';

const OptionsAndGroupsManager = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'options'>('groups');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-1/4 border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="text-lg font-semibold mb-6">Manage</div>
        <nav className="space-y-4">
          <div
            onClick={() => setActiveTab('groups')}
            className={`cursor-pointer p-3 rounded font-medium ${
              activeTab === 'groups'
                ? 'bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Option Groups
          </div>
          <div
            onClick={() => setActiveTab('options')}
            className={`cursor-pointer p-3 rounded font-medium ${
              activeTab === 'options'
                ? 'bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Options
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-neutral-700">
          {activeTab === 'groups' ? <OptionGroupsOnly /> : <OptionsManagerOnly />}
        </div>
      </main>
    </div>
  );
};

export default OptionsAndGroupsManager;
