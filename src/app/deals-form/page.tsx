'use client';
import React, { useState } from "react";
import Image from "next/image";

import roundedCurve from "@/images/custom-home/rounded-curv.png";
import { FaTrash } from 'react-icons/fa';

const tabs = [
  { id: "general", label: "General Info" },
  { id: "pricing", label: "Pricing" },
  { id: "booking", label: "Booking" },
  { id: "location", label: "Location" },
  { id: "partner", label: "Partner" },
  { id: "internal", label: "Internal" },
  { id: "images", label: "Images" },
];

export default function DealForm() {
  const [activeTab, setActiveTab] = useState("general");

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextTab = tabs[currentIndex + 1];
    if (nextTab) setActiveTab(nextTab.id);
  };

  const [photos, setPhotos] = useState<string[]>([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...newImages]);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== indexToDelete));
  };


  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <Image
        src={roundedCurve}
        alt="Rounded Curve"
        className="absolute top-0 sm:top-60 left-0 z-0 w-full max-w-[1250px] h-auto opacity-20"
        style={{ transform: "translateY(-30%)" }}
      />

      <div className="relative z-10 px-4 sm:px-12 md:px-24 lg:px-48 py-[34px] text-gray-800 dark:text-white">
        <div className=" p-4 ">
          <h1 className="text-4xl font-bold mb-4">Let&lsquo;s connect</h1>
          <p className="text-xl  mb-10">Who are you looking  to connect with ?</p>

          <div className="flex flex-wrap bg-white dark:bg-gray-800 rounded-t-md shadow-md border border-gray-300 dark:border-gray-700 px-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 mr-2 mb-2 rounded-md font-medium focus:outline-none transition 
        ${activeTab === tab.id
                    ? "bg-primary-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Body */}
          <form className="space-y-6 bg-white dark:bg-gray-800 border-t-0 border border-gray-300 dark:border-gray-700 rounded-b-md shadow-md p-6 min-h-[60vh]">
            {activeTab === "general" && (
              <Section title="General Information">
                <InputGrid>
                  <InputField label="Deal ID" name="id" type="number" />
                  <InputField label="Title" name="title" />
                  <InputField label="Slug" name="slug" />
                  <InputField label="Location" name="location" />
                  <InputField label="Categories (comma-separated)" name="categories" />
                  <InputField label="Tags (comma-separated)" name="tags" />
                  <InputField label="Image Gallery (URLs)" name="image_gallery" />
                  <InputField label="Main Image URL" name="main_image" />
                </InputGrid>
                <TextAreaField label="Description" name="description" />
              </Section>
            )}

            {activeTab === "pricing" && (
              <Section title="Price & Wallet Info">
                <InputGrid>
                  <InputField label="Retail Price" name="retail_price" type="number" step="0.01" />
                  <InputField label="Deal Price" name="deal_price" type="number" step="0.01" />
                  <InputField label="Max Wallet Discount" name="max_wallet_discount" type="number" step="0.01" />
                  <InputField label="Min iDEAL Payment" name="min_ideal_payment" type="number" step="0.01" />
                  <InputField label="My Cashback" name="mijn_cashback" type="number" step="0.01" />
                </InputGrid>
              </Section>
            )}

            {activeTab === "booking" && (
              <Section title="Booking & Availability">
                <InputGrid>
                  <InputField label="Available Dates (YYYY-MM-DD)" name="calendar_available_dates" />
                  <CheckboxField label="Requires Confirmation" name="requires_confirmation" />
                  <InputField label="Time Slots (comma-separated)" name="time_slots" />
                </InputGrid>
              </Section>
            )}

            {activeTab === "location" && (
              <Section title="Location & Contact">
                <InputGrid>
                  <InputField label="Address" name="address" />
                  <InputField label="Latitude" name="latitude" type="number" step="0.0001" />
                  <InputField label="Longitude" name="longitude" type="number" step="0.0001" />
                  <InputField label="Google Maps Link" name="google_maps_link" type="url" />
                  <InputField label="Contact Info" name="contact_info" />
                </InputGrid>
              </Section>
            )}

            {activeTab === "partner" && (
              <Section title="Partner Info">
                <InputGrid>
                  <InputField label="Partner ID" name="partner_id" type="number" />
                  <InputField label="Partner Name" name="partner_name" />
                </InputGrid>
                <TextAreaField label="Partner Description" name="partner_description" />
              </Section>
            )}

            {activeTab === "internal" && (
              <Section title="Internal / Technical Fields">
                <InputGrid>
                  <CheckboxField label="Is Featured" name="is_featured" />
                  <CheckboxField label="Is Highlighted" name="is_highlighted" />
                  <InputField label="Valid From" name="valid_from" type="date" />
                  <InputField label="Valid Until" name="valid_until" type="date" />
                  <InputField label="Inventory Count" name="inventory_count" type="number" />
                </InputGrid>
                <TextAreaField label="Voucher Terms" name="voucher_terms" />
              </Section>
            )}

            {activeTab === "images" && (
              <div className="rounded-md sm:rounded-xl">
                <div className="mb-8">
                  <label
                    htmlFor="image-upload"
                    className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2"
                  >
                    Upload Images
                  </label>
                  <div className="relative border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                    <svg
                      className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click or drag files to upload
                    </p>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Supported formats: JPG, PNG, WEBP · You can upload multiple images
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {photos.map((src, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800"
                    >
                      <div className="aspect-w-4 aspect-h-3">
                        <Image
                          src={src}
                          alt={`Uploaded ${index}`}
                          fill
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteImage(index)}
                        type="button"
                        className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md transition"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                      <div
                        className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Section({ title, children }: any) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </section>
  );
}

function InputGrid({ children }: any) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
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
