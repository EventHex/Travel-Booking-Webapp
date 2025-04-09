import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';

const AtlysWallet = () => {
  // Sample transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '3/28/2025',
      time: '9:24:00 PM',
      description: 'APL cashback credited for 3 runs scored',
      application: '',
      type: 'Credit',
      amount: 150.00,
      balance: 152.67
    },
    {
      id: 2,
      date: '3/28/2025',
      time: '4:26:06 PM',
      description: 'Visa payment',
      application: 'Applications (1)',
      type: 'Debit',
      amount: -2569.00,
      balance: 2.67
    },
    {
      id: 3,
      date: '3/28/2025',
      time: '4:24:54 PM',
      description: 'Credited',
      application: '',
      type: 'Credit',
      amount: 200.00,
      balance: 2571.67
    },
    {
      id: 4,
      date: '3/26/2025',
      time: '3:19:27 PM',
      description: 'Visa payment',
      application: 'Applications (1)',
      type: 'Debit',
      amount: -2569.00,
      balance: 2371.67
    }
  ]);

  const currentBalance = 152.67;

  return (
    <div className="w-full max-w-5xl min-w-[300px]   bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900">Atlys Wallet</h1>
        
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 gap-4 w-full sm:w-auto">
          {/* Current Balance */}
          <div className="bg-gray-100 px-5 py-2 rounded-full text-gray-800">
            <span className="font-medium">Current Balance:</span> ₹{currentBalance.toFixed(2)}
          </div>
          
          {/* Download CSV Button */}
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-2 rounded-full text-gray-600 hover:bg-gray-50">
            <Download size={18} />
            <span>Download CSV</span>
          </button>
        </div>
      </div>
      
      {/* Transaction Table - Fixed Width Container with Horizontal Scroll */}
      <div className="w-full  overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="inline-block min-w-full">
            <table className="min-w-full table-fixed" style={{ width: '800px' }}>
              {/* Fixed Header */}
              <thead className="sticky top-0 bg-indigo-800 text-white">
                <tr>
                  <th className="p-4 text-left font-medium w-1/6">DATE/TIME</th>
                  <th className="p-4 text-left font-medium w-1/6">DESCRIPTION</th>
                  <th className="p-4 text-left font-medium w-1/6">APPLICATION</th>
                  <th className="p-4 text-left font-medium w-1/6">TYPE</th>
                  <th className="p-4 text-right font-medium w-1/6">AMOUNT</th>
                  <th className="p-4 text-right font-medium w-1/6">BALANCE</th>
                </tr>
              </thead>
              
              {/* Transaction Rows */}
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id}
                    className={index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="p-4">
                      <div className="text-[12px]">{transaction.date}</div>
                      <div className="text-gray-500 text-[12px]">{transaction.time}</div>
                    </td>
                    <td className="p-4 text-[12px]">{transaction.description}</td>
                    <td className="p-4">
                      {transaction.application && (
                        <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full w-fit">
                          <span className="text-[12px]">{transaction.application}</span>
                          <ChevronDown size={16} className="ml-1" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-[12px]">{transaction.type}</td>
                    <td className={`p-4 text-right text-[12px] ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'Credit' ? '₹' : '-₹'}{Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="p-4 text-right text-[12px]">₹{transaction.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Scroll indicator for small screens */}
        <div className="block sm:hidden text-center text-gray-500 text-xs py-2 bg-gray-50 border-t">
          Swipe left/right to view all transaction details
        </div>
      </div>
    </div>
  );
};

export default AtlysWallet;