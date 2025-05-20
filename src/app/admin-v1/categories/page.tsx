// Path: app/admin-v1/categories/page.tsx

'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const initialData = [
    {
        id: 'cat1',
        name: 'City',
        subcategories: [
            {
                id: 'sub1',
                name: 'Eindhoven',
                subSubcategories: [
                    { id: 'item1', name: 'Analysis regression' },
                ],
            },
            {
                id: 'sub2',
                name: 'Amsterdam',
                subSubcategories: [],
            },
            {
                id: 'sub3',
                name: 'Rotterdam',
                subSubcategories: [
                    { id: 'item2', name: 'Analysis regression' },
                ],
            },
        ],
    },
    {
        id: 'cat2',
        name: 'Kitchen',
        subcategories: [],
    },
    {
        id: 'cat3',
        name: 'Type',
        subcategories: [],
    },
];

export default function CategoryPage() {
    const [data, setData] = useState(initialData);
    const [activeCategoryId, setActiveCategoryId] = useState('');
    const [openSubcategoryId, setOpenSubcategoryId] = useState('');
    const [draggedItems, setDraggedItems] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newSubItem, setNewSubItem] = useState('');

    const handleDragStart = (e: any, item: any) => {
        e.dataTransfer.setData('item', JSON.stringify(item));
    };

    const handleDropItem = (e: any) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('item'));
        setDraggedItems((prev) => [...prev, item]);
    };

    const handleConfirm = ({ subcategoryId, action }: any) => {
        const newData = [...data];

        draggedItems.forEach((draggedItem) => {
            const targetSub = newData
                .flatMap((c) => c.subcategories)
                .find((s) => s.id === subcategoryId);

            if (!targetSub) return;

            if (action === 'duplicate') {
                targetSub.subSubcategories.push({
                    id: Date.now().toString(),
                    name: draggedItem.name,
                });
            } else if (action === 'move') {
                const sourceSub = newData
                    .flatMap((c) => c.subcategories)
                    .find((s) => s.id === draggedItem.fromSubcategoryId);

                if (sourceSub) {
                    sourceSub.subSubcategories = sourceSub.subSubcategories.filter(
                        (i) => i.id !== draggedItem.id
                    );
                }

                targetSub.subSubcategories.push({
                    ...draggedItem,
                    fromSubcategoryId: subcategoryId,
                });
            }
        });

        setData(newData);
        setShowPopup(false);
        setDraggedItems([]);
    };

    const handleAddSubSubcategory = (subId: string) => {
        if (!newSubItem.trim()) return;
        const updated = data.map((cat) => {
            return {
                ...cat,
                subcategories: cat.subcategories.map((sub) => {
                    if (sub.id === subId) {
                        return {
                            ...sub,
                            subSubcategories: [
                                ...sub.subSubcategories,
                                { id: Date.now().toString(), name: newSubItem },
                            ],
                        };
                    }
                    return sub;
                }),
            };
        });
        setData(updated);
        setNewSubItem('');
    };

    const selectedCategory = data.find((cat) => cat.id === activeCategoryId);
    const allSubcategories = data.flatMap((c) => c.subcategories);

    return (
        <div className="flex p-6 gap-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className="w-1/4 min-h-[80vh] bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 rounded p-3">
                <h2 className="font-bold mb-2">CATEGORIES</h2>
                {data.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => {
                            setActiveCategoryId(cat.id);
                            setOpenSubcategoryId('');
                        }}
                        className={`cursor-pointer px-2 py-1 rounded mb-1 transition-colors duration-200 ${cat.id === activeCategoryId
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        {cat.name}
                    </div>
                ))}
            </div>

            <div className="w-3/4 bg-gray-50 flex gap-6 dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
                <div className='w-1/2'>
                    <h2 className="font-bold mb-2">SUBCATEGORY ITEMS</h2>
                    {selectedCategory?.subcategories.map((sub) => (
                        <div key={sub.id} className="bg-white dark:bg-gray-900 mb-3 p-3 rounded border border-gray-200 dark:border-gray-700">
                            <div
                                className="flex items-center justify-between font-semibold cursor-pointer"
                                onClick={() =>
                                    setOpenSubcategoryId((prev) => (prev === sub.id ? '' : sub.id))
                                }
                            >
                                <span>{sub.name}</span>
                                {openSubcategoryId === sub.id ? <FaChevronDown /> : <FaChevronRight />}
                            </div>
                            {openSubcategoryId === sub.id && (
                                <div className="ml-4">

                                    {sub.subSubcategories.length > 0 ? (
                                        sub.subSubcategories.map((item) => (
                                            <div
                                                key={item.id}
                                                draggable
                                                onDragStart={(e) =>
                                                    handleDragStart(e, {
                                                        ...item,
                                                        fromSubcategoryId: sub.id,
                                                    })
                                                }
                                                className="my-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-sm border border-blue-300 dark:border-blue-700 rounded cursor-move"
                                            >
                                                {item.name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 dark:text-gray-500">No items</p>
                                    )}
                                    <div className="flex mt-2 gap-2">
                                        <input
                                            type="text"
                                            value={newSubItem}
                                            onChange={(e) => setNewSubItem(e.target.value)}
                                            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:text-black dark:border-gray-700 rounded"
                                            placeholder="Add sub-subcategory"
                                        />
                                        <button
                                            onClick={() => handleAddSubSubcategory(sub.id)}
                                            className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                                        >
                                            Add
                                        </button>
                                    </div>


                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    onDrop={handleDropItem}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-1/2 mt-6 p-4 border-2 border-dashed border-blue-500 rounded text-blue-600 dark:text-blue-400 text-left min-h-[100px]"
                >
                    <p className="mb-2 font-medium">Selected Items for Move/Duplicate:</p>
                    {draggedItems.length > 0 ? (
                        <>
                            <ul className="text-sm list-disc ml-5">
                                {draggedItems.map((item, idx) => (
                                    <li key={idx}>{item.name}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setShowPopup(true)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No items dragged yet.</p>
                    )}
                </div>
            </div>

            {showPopup && draggedItems.length > 0 && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-96">
                        <h3 className="font-bold mb-3">Move/Duplicate {draggedItems.length} items</h3>

                        <select
                            className="w-full border p-2 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
                            onChange={(e) =>
                                setDraggedItems((prev) =>
                                    prev.map((item) => ({
                                        ...item,
                                        targetSubcategoryId: e.target.value,
                                    }))
                                )
                            }
                            defaultValue=""
                        >
                            <option value="">Select Subcategory</option>
                            {allSubcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex gap-4 mb-4">
                            <label>
                                <input
                                    type="radio"
                                    name="action"
                                    value="move"
                                    defaultChecked
                                    onChange={(e) =>
                                        setDraggedItems((prev) =>
                                            prev.map((item) => ({
                                                ...item,
                                                action: e.target.value,
                                            }))
                                        )
                                    }
                                />{' '}
                                Move
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="action"
                                    value="duplicate"
                                    onChange={(e) =>
                                        setDraggedItems((prev) =>
                                            prev.map((item) => ({
                                                ...item,
                                                action: e.target.value,
                                            }))
                                        )
                                    }
                                />{' '}
                                Duplicate
                            </label>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="text-red-500"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() =>
                                    handleConfirm({
                                        subcategoryId: draggedItems[0].targetSubcategoryId,
                                        action: draggedItems[0].action || 'move',
                                    })
                                }
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}