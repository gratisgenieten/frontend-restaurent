'use client';
import React, { FC, useState, FormEvent, ChangeEvent } from 'react'
import CardAuthorBox from '@/components/CardAuthorBox'
import CardAuthorBox2 from '@/components/CardAuthorBox2'
import Heading from '@/shared/Heading'
import { DEMO_AUTHORS } from '@/data/authors'
import { AuthorType } from '@/data/types'
import { StaticImageData } from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'

export interface SectionGridAuthorBoxCustomProps {
  className?: string
  boxCard?: 'box1' | 'box2'
  gridClassName?: string
}

interface FormData {
  // General Information
  title: string
  firstName: string
  lastName: string
  position: string
  company: string
  businessArena: string
  employees: string

  // Contact Details
  street: string
  additionalInfo: string
  zipCode: string
  place: string
  country: string
  countryCode: string
  phoneNumber: string
  email: string
  // For display purposes
  avatar: string | StaticImageData
}


const SectionGridAuthorBoxCustom: FC<SectionGridAuthorBoxCustomProps> = ({
  className = '',
  boxCard = 'box1',
  gridClassName = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
}) => {
  const [authors, setAuthors] = useState<AuthorType[]>(DEMO_AUTHORS.slice(0, 10))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null)
  const [form, setForm] = useState<FormData>({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    businessArena: '',
    employees: '',
    street: '',
    additionalInfo: '',
    zipCode: '',
    place: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
    avatar: ''
  })
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)

  const openAddModal = () => {
    setForm({
      title: '',
      firstName: '',
      lastName: '',
      position: '',
      company: '',
      businessArena: '',
      employees: '',
      street: '',
      additionalInfo: '',
      zipCode: '',
      place: '',
      country: '',
      countryCode: '',
      phoneNumber: '',
      email: '',
      avatar: ''
    })
    setTermsAccepted(false)
    setSelectedAuthor(null)
    setIsModalOpen(true)
  }

  const openEditModal = (author: AuthorType) => {
    setSelectedAuthor(author)
    // Split name into first and last name if possible
    let firstName = '', lastName = '';
    if (author.name) {
      const nameParts = author.name.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    setForm({
      title: author.title || '',
      firstName: firstName,
      lastName: lastName,
      position: author.position || '',
      company: author.company || '',
      businessArena: author.businessArena || '',
      employees: author.employees || '',
      street: author.street || '',
      additionalInfo: author.additionalInfo || '',
      zipCode: author.zipCode || '',
      place: author.place || '',
      country: author.country || '',
      countryCode: author.countryCode || '',
      phoneNumber: author.phoneNumber || '',
      email: author.email || '',
      avatar: author.avatar || '',
    })
    setTermsAccepted(true) // Assuming terms are accepted for existing records
    setIsModalOpen(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.firstName.trim() || !form.email.trim()) {
      alert('First Name and Email are required')
      return
    }

    if (!termsAccepted) {
      alert('You must accept the Terms and Conditions')
      return
    }

    const fullName = `${form.firstName} ${form.lastName}`.trim()

    if (selectedAuthor) {
      setAuthors(prev =>
        prev.map(author =>
          author.id === selectedAuthor.id
            ? {
                ...author,
                name: fullName,
                title: form.title,
                position: form.position,
                company: form.company,
                businessArena: form.businessArena,
                employees: form.employees,
                street: form.street,
                additionalInfo: form.additionalInfo,
                zipCode: form.zipCode,
                place: form.place,
                country: form.country,
                countryCode: form.countryCode,
                phoneNumber: form.phoneNumber,
                email: form.email,
                avatar: form.avatar,
                jobName: form.position || form.company, // Use position as jobName for display
              }
            : author
        )
      )
    } else {
      const newAuthor: AuthorType = {
        id: Date.now(),
        name: fullName,
        title: form.title,
        position: form.position,
        company: form.company,
        businessArena: form.businessArena,
        employees: form.employees,
        street: form.street,
        additionalInfo: form.additionalInfo,
        zipCode: form.zipCode,
        place: form.place,
        country: form.country,
        countryCode: form.countryCode,
        phoneNumber: form.phoneNumber,
        email: form.email,
        avatar: form.avatar,
        jobName: form.position || form.company, // Use position as jobName for display
        href: '#',
        firstName: form.firstName,
        lastName: form.lastName,
        displayName: fullName,
        count: 0,
        desc: ''
      }
      setAuthors(prev => [...prev, newAuthor])
    }

    setIsModalOpen(false)
  }

  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`}>
      <div className="mb-6 flex justify-between items-center">
        <Heading>Manage Clients</Heading>
        <ButtonPrimary onClick={openAddModal}>+ Add Client</ButtonPrimary>
      </div>

      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {authors.map((author, index) =>
          boxCard === 'box2' ? (
            <CardAuthorBox2 key={author.id.toString()} author={author} />
          ) : (
            <div key={author.id.toString()} className="relative group">
              <CardAuthorBox
                index={index < 3 ? index + 1 : undefined}
                author={author}
                className="border border-green-500"
              />
              {/* Edit button code remains commented out as in original */}
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* General Information Column */}
              <div className="p-6 md:w-1/2">
                <h2 className="text-xl font-semibold mb-6 text-blue-700">
                  General Information
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <select
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="" disabled>Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <select
                      name="position"
                      value={form.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="" disabled>Position</option>
                      <option value="CEO">CEO</option>
                      <option value="CTO">CTO</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                    </select>
                  </div>
                  
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="businessArena"
                      placeholder="Business Arena"
                      value={form.businessArena}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                    
                    <select
                      name="employees"
                      value={form.employees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="" disabled>Employees</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  
                  <input
                    type="text"
                    name="avatar"
                    placeholder="Avatar URL (for display)"
                    value={typeof form.avatar === 'string' ? form.avatar : ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </form>
              </div>
              
              {/* Contact Details Column */}
              <div className="p-6 md:w-1/2 bg-blue-600 text-white">
                <h2 className="text-xl font-semibold mb-6">
                  Contact Details
                </h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street + Nr"
                    value={form.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                  />
                  
                  <input
                    type="text"
                    name="additionalInfo"
                    placeholder="Additional Information"
                    value={form.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={form.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                    />
                    
                    <select
                      name="place"
                      value={form.place}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded bg-transparent border-white/50"
                    >
                      <option value="" disabled>Place</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Houston">Houston</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded bg-transparent border-white/50"
                  >
                    <option value="" disabled>Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="countryCode"
                      placeholder="Code +"
                      value={form.countryCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                    />
                    
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={form.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                    />
                  </div>
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded bg-transparent border-white/50 placeholder-white/70"
                  />
                  
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-800 border-white"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm">
                      I do accept the <a href="#" className="underline">Terms and Conditions</a> of your site.
                    </label>
                  </div>
                  
                  {/* <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 font-medium"
                      disabled={!termsAccepted}
                    >
                      Register Badge
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
            
            {/* Footer with cancel button */}
            <div className="px-6 py-4 bg-gray-100 flex justify-between rounded-b-lg">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!termsAccepted}
              >
                {selectedAuthor ? 'Update' : 'Save Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionGridAuthorBoxCustom