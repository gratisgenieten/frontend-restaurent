'use client';
import React, { useState } from "react";

const tabs = [
  { id: "general", label: "General Info" },
  { id: "pricing", label: "Pricing" },
  { id: "booking", label: "Booking" },
  { id: "location", label: "Location" },
  { id: "partner", label: "Partner" },
  { id: "internal", label: "Internal" },
];

export default function DealForm() {
  const [activeTab, setActiveTab] = useState("general");

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextTab = tabs[currentIndex + 1];
    if (nextTab) setActiveTab(nextTab.id);
  };

  return (
    <div className="px-4 sm:px-12 md:px-24 lg:px-48 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex space-x-4 mb-8 border-b border-gray-300 dark:border-gray-700 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-t-md font-medium focus:outline-none transition ${
              activeTab === tab.id
                ? "nc-ButtonPrimary bg-primary-600 text-neutral-50 hover:bg-primary-700 disabled:bg-opacity-70"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form className="space-y-6 min-h-[60vh]">
        {activeTab === "general" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Deal ID" name="id" type="number" />
              <InputField label="Title" name="title" />
              <InputField label="Slug" name="slug" />
              <InputField label="Location" name="location" />
              <InputField label="Categories (comma-separated)" name="categories" />
              <InputField label="Tags (comma-separated)" name="tags" />
              <InputField label="Image Gallery (URLs)" name="image_gallery" />
              <InputField label="Main Image URL" name="main_image" />
            </div>
            <TextAreaField label="Description" name="description" />
          </section>
        )}

        {activeTab === "pricing" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Price & Wallet Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Retail Price" name="retail_price" type="number" step="0.01" />
              <InputField label="Deal Price" name="deal_price" type="number" step="0.01" />
              <InputField label="Max Wallet Discount" name="max_wallet_discount" type="number" step="0.01" />
              <InputField label="Min iDEAL Payment" name="min_ideal_payment" type="number" step="0.01" />
              <InputField label="My Cashback" name="mijn_cashback" type="number" step="0.01" />
            </div>
          </section>
        )}

        {activeTab === "booking" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Booking & Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Available Dates (comma-separated YYYY-MM-DD)" name="calendar_available_dates" />
              <CheckboxField label="Requires Confirmation" name="requires_confirmation" />
              <InputField label="Time Slots (comma-separated)" name="time_slots" />
            </div>
          </section>
        )}

        {activeTab === "location" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Location & Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Address" name="address" />
              <InputField label="Latitude" name="latitude" type="number" step="0.0001" />
              <InputField label="Longitude" name="longitude" type="number" step="0.0001" />
              <InputField label="Google Maps Link" name="google_maps_link" type="url" />
              <InputField label="Contact Info (phone/email/website)" name="contact_info" />
            </div>
          </section>
        )}

        {activeTab === "partner" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Partner Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Partner ID" name="partner_id" type="number" />
              <InputField label="Partner Name" name="partner_name" />
            </div>
            <TextAreaField label="Partner Description" name="partner_description" />
          </section>
        )}

        {activeTab === "internal" && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Internal / Technical Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField label="Is Featured" name="is_featured" />
              <CheckboxField label="Is Highlighted" name="is_highlighted" />
              <InputField label="Valid From" name="valid_from" type="date" />
              <InputField label="Valid Until" name="valid_until" type="date" />
              <InputField label="Inventory Count" name="inventory_count" type="number" />
            </div>
            <TextAreaField label="Voucher Terms" name="voucher_terms" />
          </section>
        )}

        <div className="pt-8">
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2  text-white rounded-md nc-ButtonPrimary bg-primary-600 text-neutral-50 hover:bg-primary-700 disabled:bg-opacity-70 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, name, type = "text", step }: any) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <input
        type={type}
        name={name}
        step={step}
        className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
}

function TextAreaField({ label, name }: any) {
  return (
    <div className="space-y-1 mt-4">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <textarea
        name={name}
        rows={4}
        className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      ></textarea>
    </div>
  );
}

function CheckboxField({ label, name }: any) {
  return (
    <div className="flex items-center space-x-2 mt-1">
      <input
        type="checkbox"
        name={name}
        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
      />
      <label className="text-sm text-neutral-700 dark:text-neutral-300">{label}</label>
    </div>
  );
}
