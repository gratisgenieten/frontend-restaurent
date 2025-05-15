import React from "react";

export default function DealForm() {
  return (
    <div className="px-48 py-12">
      <form className="space-y-8 ">
        {/* General Information */}
        <section>
          <h3 className="text-lg font-semibold mb-4">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Deal ID" name="id" type="number" />
            <InputField label="Title" name="title" />
            <InputField label="Slug" name="slug" />
            <InputField label="Location" name="location" />
            <InputField label="Categories (comma-separated)" name="categories" />
            <InputField label="Tags (comma-separated)" name="tags" />
            <InputField label="Image Gallery (URLs, comma-separated)" name="image_gallery" />
            <InputField label="Main Image URL" name="main_image" />
          </div>
          <TextAreaField label="Description" name="description" />
        </section>

        {/* Price & Wallet Info */}
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

        {/* Booking & Availability */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Booking & Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Available Dates (comma-separated YYYY-MM-DD)" name="calendar_available_dates" />
            <CheckboxField label="Requires Confirmation" name="requires_confirmation" />
            <InputField label="Time Slots (comma-separated)" name="time_slots" />
          </div>
        </section>

        {/* Location & Contact */}
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

        {/* Partner Info */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Partner Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Partner ID" name="partner_id" type="number" />
            <InputField label="Partner Name" name="partner_name" />
          </div>
          <TextAreaField label="Partner Description" name="partner_description" />
        </section>

        {/* Internal / Technical Fields */}
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
      </form>
    </div>

  );
}

function InputField({ label, name, type = "text", step }: any) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      <input
        type={type}
        name={name}
        step={step}
        className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function TextAreaField({ label, name }: any) {
  return (
    <div className="space-y-1 mt-4">
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      <textarea
        name={name}
        rows={4}
        className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      ></textarea>
    </div>
  );
}

function CheckboxField({ label, name }: any) {
  return (
    <div className="flex items-center space-x-2 mt-1">
      <input type="checkbox" name={name} className="w-4 h-4 text-primary" />
      <label className="text-sm text-neutral-700">{label}</label>
    </div>
  );
}
