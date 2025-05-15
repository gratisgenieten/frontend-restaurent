'use client';
import React, { FC, useState, FormEvent, ChangeEvent } from 'react'
import CardAuthorBox from '@/components/CardAuthorBox'
import CardAuthorBox2 from '@/components/CardAuthorBox2'
import Heading from '@/shared/Heading'
import { DEMO_AUTHORS } from '@/data/authors'
import { AuthorType } from '@/data/types'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'

export interface SectionGridAuthorBoxCustomProps {
  className?: string
  boxCard?: 'box1' | 'box2'
  gridClassName?: string
}

interface FormData {
  name: string
  email: string
  avatar: string
  role: string
}

const SectionGridAuthorBoxCustom: FC<SectionGridAuthorBoxCustomProps> = ({
  className = '',
  boxCard = 'box1',
  gridClassName = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
}) => {
  const [authors, setAuthors] = useState<AuthorType[]>(DEMO_AUTHORS.slice(0, 10))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null)
  const [form, setForm] = useState<any>([])

  const openAddModal = () => {
    setForm({ name: '', email: '', avatar: '', role: '' })
    setSelectedAuthor(null)
    setIsModalOpen(true)
  }

  const openEditModal = (author: AuthorType) => {
    setSelectedAuthor(author)
    setForm({
      name: author.name || '',
      email: author.email || '',
      avatar: author.avatar || '',
      role: author.jobName || '',
    })
    setIsModalOpen(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev:any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim()) {
      alert('Name and Email are required')
      return
    }

    if (selectedAuthor) {
      setAuthors(prev =>
        prev.map(author =>
          author.id === selectedAuthor.id
            ? {
                ...author,
                name: form.name,
                email: form.email,
                avatar: form.avatar,
                jobName: form.role,
              }
            : author
        )
      )
    } else {
      const newAuthor: AuthorType = {
		  id: Date.now(), // or uuid()
		  name: form.name,
		  email: form.email,
		  avatar: form.avatar,
		  jobName: form.role,
		  href: '#',
		  firstName: '',
		  lastName: '',
		  displayName: '',
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
              />
              {/* <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEditModal(author)}
                  className="text-sm text-blue-600 bg-white px-2 py-1 rounded shadow"
                >
                  Edit
                </button>
              </div> */}
            </div>
          )
        )}
      </div>

      {/* <div className="mt-16 flex flex-col justify-center gap-y-3 sm:flex-row sm:gap-x-5 sm:gap-y-0">
        <ButtonSecondary loading>{T['common']['Show me more']}</ButtonSecondary>
        <ButtonPrimary>{T['common']['Become a host']}</ButtonPrimary>
      </div> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedAuthor ? 'Edit Client' : 'Add New Client'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={form.avatar}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {selectedAuthor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionGridAuthorBoxCustom
