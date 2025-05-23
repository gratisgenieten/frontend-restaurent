// 'use client';

// import React, { useState } from 'react';
// import ButtonPrimary from '@/shared/ButtonPrimary';
// import NcModal from '@/shared/NcModal';
// import StatusCard from '@/components/StatusCard';
// import TransactionModal, { TransactionData } from './model/TransactionModal';

// const initialTransactions: TransactionData[] = [
//     {
//         transaction_id: 1,
//         user_id: 101,
//         type: 'affiliate_earn',
//         amount: 50.0,
//         related_reservation_id: null,
//         related_partner_id: 1,
//         description: 'Affiliate earnings for Sushi Palace',
//         status: 'confirmed',
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//     },
//     {
//         transaction_id: 2,
//         user_id: 101,
//         type: 'wallet_spend',
//         amount: -30.0,
//         related_reservation_id: 10,
//         related_partner_id: null,
//         description: 'Wallet spent on reservation',
//         status: 'confirmed',
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//     },
// ];

// const TransactionListPage = () => {
//     const [transactions, setTransactions] = useState<TransactionData[]>(initialTransactions);
//     const [editingTransaction, setEditingTransaction] = useState<TransactionData | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleSave = (data: TransactionData) => {
//         if (data.transaction_id) {
//             setTransactions((prev) =>
//                 prev.map((t) => (t.transaction_id === data.transaction_id ? data : t))
//             );
//         } else {
//             const newTransaction = {
//                 ...data,
//                 transaction_id: Math.floor(Math.random() * 100000),
//                 created_at: new Date().toISOString(),
//                 updated_at: new Date().toISOString(),
//             };
//             setTransactions((prev) => [...prev, newTransaction]);
//         }
//         setEditingTransaction(null);
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="container min-h-screen mx-auto py-10 space-y-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
//                     Transactions
//                 </h2>
//                 <ButtonPrimary onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}>
//                     + Add Transaction
//                 </ButtonPrimary>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
//                 {transactions.map((txn) => (
//                     <NcModal
//                         key={txn.transaction_id}
//                         modalTitle={`Edit Transaction #${txn.transaction_id}`}
//                         contentExtraClass="max-w-xl"
//                         isOpenProp={editingTransaction?.transaction_id === txn.transaction_id}
//                         onCloseModal={() => setEditingTransaction(null)}
//                         renderTrigger={(openModal) => (
//                             <StatusCard
//                                 logo=""
//                                 title={`€${txn.amount}`}
//                                 subtitle={`${txn.type} · ${txn.status}`}
//                                 value={txn.description}
//                                 valueCaption={`User ID: ${txn.user_id}`}
//                                 onClick={() => {
//                                     setEditingTransaction(txn);
//                                     openModal();
//                                 }}
//                             />
//                         )}
//                         renderContent={() => (
//                             <TransactionModal
//                                 initialData={editingTransaction as TransactionData}
//                                 onClose={() => setEditingTransaction(null)}
//                                 onSave={handleSave}
//                             />
//                         )}
//                     />
//                 ))}
//             </div>
//             {isModalOpen ? (<>
//                 <NcModal
//                     modalTitle="Add New Transaction"
//                     contentExtraClass="max-w-xl"
//                     isOpenProp={isModalOpen}
//                     onCloseModal={() => setIsModalOpen(false)}
//                     renderContent={() => (
//                         <TransactionModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
//                     )}
//                 />
//             </>) : null}
//         </div>
//     );
// };

// export default TransactionListPage;
'use client';

import React, { useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import TransactionModal, { TransactionData } from './model/TransactionModal';
import { getTransactions } from '@/hooks/apis/useWallet'; // ✅ Your API call

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<TransactionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      const transformed = res.data.map((txn: any) => ({
        transaction_id: txn.id,
        user_id: txn.user_id,
        type: txn.type,
        amount: txn.amount,
        status: txn.status_id === 1 ? 'confirmed' : 'pending',
        description: `${txn.type.replace('_', ' ').toUpperCase()} transaction`,
        created_at: txn.created_at,
        updated_at: txn.updated_at,
        related_reservation_id: null,
        related_partner_id: null,
      }));
      setTransactions(transformed);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSave = (data: TransactionData) => {
    if (data.transaction_id) {
      setTransactions((prev) =>
        prev.map((t) => (t.transaction_id === data.transaction_id ? data : t))
      );
    } else {
      const newTransaction = {
        ...data,
        transaction_id: Math.floor(Math.random() * 100000),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTransactions((prev) => [...prev, newTransaction]);
    }
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container min-h-screen mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Transactions
        </h2>
        <ButtonPrimary onClick={() => {
          setEditingTransaction(null);
          setIsModalOpen(true);
        }}>
          + Add Transaction
        </ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">No transactions found.</p>
        ) : (
          transactions.map((txn) => (
            <NcModal
              key={txn.transaction_id}
              modalTitle={`Edit Transaction #${txn.transaction_id}`}
              contentExtraClass="max-w-xl"
              isOpenProp={editingTransaction?.transaction_id === txn.transaction_id}
              onCloseModal={() => setEditingTransaction(null)}
              renderTrigger={(openModal) => (
                <StatusCard
                  logo=""
                  title={`€${txn.amount}`}
                  subtitle={`${txn.type} · ${txn.status}`}
                  value={txn.description}
                  valueCaption={`User ID: ${txn.user_id}`}
                  onClick={() => {
                    setEditingTransaction(txn);
                    openModal();
                  }}
                />
              )}
              renderContent={() => (
                <TransactionModal
                  initialData={editingTransaction as TransactionData}
                  onClose={() => setEditingTransaction(null)}
                  onSave={handleSave}
                />
              )}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <NcModal
          modalTitle="Add New Transaction"
          contentExtraClass="max-w-xl"
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          renderContent={() => (
            <TransactionModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
          )}
        />
      )}
    </div>
  );
};

export default TransactionListPage;
