'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import CategoryModal, { CategoryData } from './model/CategoryModal';

const initialCategories: CategoryData[] = [
    {
        category_id: 1,
        name: 'Amsterdam',
        slug: 'amsterdam',
        category_type: 'city',
        parent_id: null,
        level: 0,
    },
    {
        category_id: 2,
        name: 'Wellness',
        slug: 'wellness',
        category_type: 'partner_type',
        parent_id: 1,
        level: 1,
    },
    {
        category_id: 3,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
    {
        category_id: 4,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
    {
        category_id: 5,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
    {
        category_id: 6,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
    {
        category_id: 7,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
    {
        category_id: 8,
        name: 'Sushi',
        slug: 'sushi',
        category_type: 'kitchen',
        parent_id: 2,
        level: 2,
    },
];

const CategoriesPage = () => {
    const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
    const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (updated: CategoryData) => {
        if (updated.category_id) {
            setCategories((prev) =>
                prev.map((c) => (c.category_id === updated.category_id ? updated : c))
            );
        } else {
            setCategories((prev) => [
                ...prev,
                { ...updated, category_id: Math.floor(Math.random() * 10000) },
            ]);
        }
        setEditingCategory(null);
        setIsModalOpen(false);
    };

    const filteredCategories = categories.filter((c) => c.category_type !== '');

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Categories
                </h2>
                <ButtonPrimary
                    onClick={() => {
                        setEditingCategory(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Category
                </ButtonPrimary>
            </div>

            <div className="overflow-x-auto rounded border dark:border-neutral-700">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Slug</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Level</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900">
                        {filteredCategories.map((cat) => (
                            <tr key={cat.category_id} className="border-b border-neutral-200 dark:border-neutral-700">
                                <td className="px-6 py-4">{cat.name}</td>
                                <td className="px-6 py-4">{cat.slug}</td>
                                <td className="px-6 py-4">{cat.category_type}</td>
                                <td className="px-6 py-4">{cat.level}</td>
                                <td className="px-6 py-4">
                                    <NcModal
                                        modalTitle={`Edit ${cat.name}`}
                                        contentExtraClass="max-w-xl"
                                        isOpenProp={editingCategory?.category_id === cat.category_id}
                                        onCloseModal={() => setEditingCategory(null)}
                                        renderTrigger={(openModal) => (
                                            <button
                                                onClick={() => {
                                                    setEditingCategory(cat);
                                                    openModal();
                                                }}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        renderContent={() => (
                                            <CategoryModal
                                                initialData={editingCategory as CategoryData}
                                                allCategories={categories}
                                                onClose={() => setEditingCategory(null)}
                                                onSave={handleSave}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen ? (<>
                <NcModal
                    modalTitle="Add New Category"
                    contentExtraClass="max-w-xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <CategoryModal
                            allCategories={categories}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSave}
                        />
                    )}
                />
            </>) : ""}
        </div>
    );
};

export default CategoriesPage;
