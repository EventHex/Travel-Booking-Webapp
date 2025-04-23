import React, { useState, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import instance from "../../../instance";

const AtlysWallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setUser(userData);
          const walletResponse = await instance.get(`/wallet?user=${userData._id}`);
          console.log(walletResponse, "walletResponse");
          
          if (walletResponse.data && walletResponse.data.success && walletResponse.data.response) {
            // Sort transactions by date in descending order (newest first)
            const sortedTransactions = walletResponse.data.response.sort((a, b) => 
              new Date(b.date) - new Date(a.date)
            );
            
            setTransactions(sortedTransactions);
            // Set current balance to the first transaction's currentBalance
            if (sortedTransactions.length > 0) {
              setCurrentBalance(sortedTransactions[0].currentBalance);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-5xl min-w-[300px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-xl font-[500] text-gray-900">Atlys Wallet</h1>

        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 gap-4 w-full sm:w-auto">
          {/* Current Balance */}
          <div className="bg-gray-100 px-5 py-2 rounded-full text-gray-800">
            <span className="font-medium">Current Balance:</span> ₹
            {currentBalance.toFixed(2)}
          </div>

          {/* Download CSV Button */}
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-2 rounded-full text-gray-600 hover:bg-gray-50">
            <Download size={18} />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Transaction Table - Fixed Width Container with Horizontal Scroll */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="inline-block min-w-full">
            <table className="min-w-full table-fixed" style={{ width: "800px" }}>
              {/* Fixed Header */}
              <thead className="sticky top-0 bg-indigo-800 text-white">
                <tr>
                  <th className="p-4 text-left  text-[12px] font-medium w-1/6">DATE/TIME</th>
                  <th className="p-4 text-left  text-[12px] font-medium w-1/6">DESCRIPTION</th>
                  <th className="p-4 text-left  text-[12px] font-medium w-1/6">TRANSACTION TYPE</th>
                  <th className="p-4 text-left  text-[12px] font-medium w-1/6">PREVIOUS BALANCE</th>
                  <th className="p-4 text-right  text-[12px] font-medium w-1/6">AMOUNT</th>
                  <th className="p-4 text-right  text-[12px] font-medium w-1/6">CURRENT BALANCE</th>
                </tr>
              </thead>

              {/* Transaction Rows */}
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions?.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className={transaction._id % 2 === 1 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-4">
                      <div className="text-[12px]">{formatDate(transaction.date)}</div>
                      <div className="text-gray-500 text-[12px]">{formatTime(transaction.date)}</div>
                    </td>
                    <td className="p-4 text-[12px]">
                      {transaction.transactionType} Transaction
                    </td>
                    <td className="p-4">
                      <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full w-fit">
                        <span className="text-[12px]">{transaction.transactionType}</span>
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </td>
                    <td className="p-4 text-[12px]">
                      ₹{transaction.previousBalance.toFixed(2)}
                    </td>
                    <td
                      className={`p-4 text-right text-[12px] ${
                        transaction.transactionAmount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.transactionAmount > 0 ? "₹" : "-₹"}
                      {Math.abs(transaction.transactionAmount).toFixed(2)}
                    </td>
                    <td className="p-4 text-right text-[12px]">
                      ₹{transaction.currentBalance.toFixed(2)}
                    </td>
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