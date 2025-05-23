// 'use client';

// import React, { FC, useEffect } from 'react';
// import Heading2 from '@/shared/Heading2';
// import ButtonPrimary from '@/shared/ButtonPrimary';
// import StatusCard from '@/components/StatusCard';
// import T from '@/utils/getT';
// import { getTransactions, getWalletBalance } from '@/hooks/apis/useWallet';

// export interface SectionWalletPageProps {
//   className?: string;
// }

// const cashbackData = [
//   {
//     amount: 5.0,
//     type: 'Affiliate Earn',
//     status: 'Confirmed',
//     description: 'Cashback from MediaMarkt',
//     userId: 101,
//   },
//   {
//     amount: 2.5,
//     type: 'Affiliate Earn',
//     status: 'Pending',
//     description: 'Cashback from Coolblue',
//     userId: 101,
//   },
//   {
//     amount: 3.8,
//     type: 'Wallet Spend',
//     status: 'Confirmed',
//     description: 'Spent on Essent',
//     userId: 101,
//   },
// ];

// const calculateBalance = () => {
//   let total = 0;
//   cashbackData.forEach((txn) => {
//     total += txn.type === 'Wallet Spend' ? -txn.amount : txn.amount;
//   });
//   return total.toFixed(2);
// };

// const SectionWalletPage: FC<SectionWalletPageProps> = ({ className = '' }) => {
//   const totalBalance = calculateBalance();
//   useEffect(()=>{
//     getWalletBalance().then((res)=>{

//     }).catch((error:any)=>{

//     }).finally(()=>{

//     });
//     getTransactions().then((res)=>{

//     }).catch((error:any)=>{

//     }).finally(()=>{

//     });
//   },[]);
//   return (
//     <div className={`nc-SectionWalletPage ${className}`}>
//       <Heading2
//         heading="My Wallet"
//         subHeading={
//           <span className="mt-2 block text-sm text-neutral-500 dark:text-neutral-400">
//             View your recent transactions and cashback activity
//           </span>
//         }
//       />
//       <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 flex flex-col gap-4 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm">
//           {cashbackData.map((txn, index) => (
//             <StatusCard
//               logo=""
//               title={`€${txn.amount.toFixed(2)}`}
//               subtitle={`${txn.type} · ${txn.status}`}
//               value={txn.description}
//               valueCaption={`User ID: ${txn.userId}`}
//               key={index}
//             />
//           ))}
//           <div className="mt-8 flex justify-center">
//             <ButtonPrimary>{T['common']['Show me more'] || 'Show more'}</ButtonPrimary>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <div className="h-fit w-full lg:max-w-sm bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-500 text-white p-6 rounded-3xl shadow-md flex flex-col items-center text-center">
//             <span className="text-sm uppercase tracking-widest opacity-80">Available Balance</span>
//             <h2 className="text-4xl font-bold mt-2 mb-4">€{totalBalance}</h2>
//             <p className="text-sm opacity-90">Total confirmed earnings minus spending</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionWalletPage;
'use client';

import React, { FC, useEffect, useState } from 'react';
import Heading2 from '@/shared/Heading2';
import ButtonPrimary from '@/shared/ButtonPrimary';
import StatusCard from '@/components/StatusCard';
import T from '@/utils/getT';
import NcModal from '@/shared/NcModal';
import Input from '@/shared/Input';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { getTransactions, getWalletBalance, createDeposit } from '@/hooks/apis/useWallet';

export interface SectionWalletPageProps {
  className?: string;
}

const DepositModal: FC<{ onClose: () => void; onSave: (amount: number) => void }> = ({ onClose, onSave }) => {
  const [amount, setAmount] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof amount === 'number' && amount > 0) {
      onSave(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="number"
        name="amount"
        placeholder="Enter deposit amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Deposit</ButtonPrimary>
      </div>
    </form>
  );
};

const SectionWalletPage: FC<SectionWalletPageProps> = ({ className = '' }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWallet = async () => {
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        getWalletBalance(),
        getTransactions(),
      ]);

      setBalance(balanceRes.balance || 0);

      const txns = transactionsRes.data.map((txn: any) => ({
        amount: txn.amount,
        type: txn.type,
        status: txn.status_id === 1 ? 'Confirmed' : 'Pending',
        description: `${txn.type} transaction`,
        userId: txn.user_id,
      }));

      setTransactions(txns);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (amount: number) => {
    try {
      await createDeposit({
        amount,
      });
      setIsModalOpen(false);
      fetchWallet();
    } catch (error) {
      console.error('Failed to deposit:', error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className={`nc-SectionWalletPage ${className}`}>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm">
          {loading ? (
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">No transactions found.</div>
          ) : (
            <>
              {transactions.map((txn, index) => (
                <StatusCard
                  key={index}
                  logo=""
                  title={`€${txn.amount.toFixed(2)}`}
                  subtitle={`${txn.type} · ${txn.status}`}
                  value={txn.description}
                  valueCaption={`User ID: ${txn.userId}`}
                />
              ))}
              <div className="mt-8 flex justify-center">
                <ButtonPrimary>{T['common']['Show me more'] || 'Show more'}</ButtonPrimary>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col justify-center items-end  gap-4">
           <ButtonPrimary onClick={() => setIsModalOpen(true)}>
            + Deposit Amount
          </ButtonPrimary>
          <div className="h-fit w-full lg:max-w-sm bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-500 text-white p-6 rounded-3xl shadow-md flex flex-col items-center text-center">
            <span className="text-sm uppercase tracking-widest opacity-80">Available Balance</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">€{balance}</h2>
            <p className="text-sm opacity-90">Total confirmed earnings minus spending</p>
          </div>
         
        </div>
      </div>
      {isModalOpen ?
        <NcModal
          modalTitle="Deposit to Wallet"
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          renderContent={() => (
            <DepositModal onClose={() => setIsModalOpen(false)} onSave={handleDeposit} />
          )}
        />
        : null}

    </div>
  );
};

export default SectionWalletPage;