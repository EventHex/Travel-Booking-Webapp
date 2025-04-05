import React, { useState } from 'react';
import { CreditCard, Building2, Wifi, ArrowDownToLine, Building, Copy, Check } from 'lucide-react';

const LoadWallet = () => {
  const [selectedTab, setSelectedTab] = useState('bank');
  const [copiedText, setCopiedText] = useState(null);
  
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedText(field);
    setTimeout(() => setCopiedText(null), 2000);
  };
  
  const tabs = [
    { id: 'credit', label: 'Credit Card', fee: '2%', icon: <CreditCard /> },
    { id: 'bank', label: 'Bank Transfer', fee: '0%', icon: <Building2 /> },
    { id: 'upi', label: 'UPI', fee: '0%', icon: <Wifi /> },
    { id: 'refund', label: 'Refund to Bank Account', fee: '', icon: <ArrowDownToLine /> },
  ];
  
  const accounts = [
    {
      name: 'Atlys Bank 1',
      preferred: true,
      accountNumber: '11122220240321589670',
      ifscCode: 'YESB0CMSNOC',
      beneficiary: 'Atlys'
    },
    {
      name: 'Atlys Bank 2',
      preferred: false,
      accountNumber: '2223220216482428',
      ifscCode: 'UTIB000RAZP',
      beneficiary: 'Atlys'
    }
  ];


  const [copied, setCopied] = useState(false);
  const upiId = "20240321956866@yesbank";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // Dynamic content based on selected tab

//   form +****************
const [formData, setFormData] = useState({
    beneficiaryName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    amount: '',
    reason: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.beneficiaryName.trim()) {
      newErrors.beneficiaryName = 'Beneficiary name is required';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    
    if (!formData.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = 'Please confirm account number';
    } else if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }
    
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    }
    
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for refund is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Process form submission
    console.log('Form submitted:', formData);
    // Reset form after submission if needed
    // setFormData({...});
  };
  const renderTabContent = () => {
    switch(selectedTab) {
      case 'credit':
        return <CreditCardTab />;
      case 'bank':
        return <BankTransferTab accounts={accounts} handleCopy={handleCopy} copiedText={copiedText} />;
      case 'upi':
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
              <div className="flex items-center text-lg font-medium text-gray-800 mb-6">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                UPI Details
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="border-4 border-blue-900 p-2 rounded-lg">
                  <div className="bg-white p-2 flex items-center justify-center">
                    <img 
                      src="/api/placeholder/200/200" 
                      alt="UPI QR Code" 
                      className="w-48 h-48"
                    />
                  </div>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div 
                  className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-50 cursor-pointer"
                  onClick={copyToClipboard}
                >
                  <span className="text-gray-700 text-sm">{upiId}</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </div>
                {copied && (
                  <div className="absolute -top-8 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Copied!
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>Scan the QR code or add the VPA to preferred UPI app and make a payment. Please wait for 30mins - 2hrs for the payment to reflect in your wallet. Our system is completely automated and amount will be reflected in your wallet.</p>
              </div>
            </div>
          </div>
        );
      case 'refund':
        return (
            <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Beneficiary Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="beneficiaryName"
              value={formData.beneficiaryName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            {errors.beneficiaryName && (
              <p className="text-red-500 text-xs mt-1">{errors.beneficiaryName}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={formData.confirmAccountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            {errors.confirmAccountNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmAccountNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            {errors.ifscCode && (
              <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                ₹
              </div>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Amount"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            Reason for Refund <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
          {errors.reason && (
            <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Confirm
          </button>
        </div>
        
        <p className="text-center text-gray-600 mt-4">
          Will take 5-7 business days to reflect in your bank account.
        </p>
      </form>
    </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Load Wallet</h1>
      
      <p className="text-gray-700 mb-6">
        Please wait for 30mins - 2hrs for the payment to reflect in your wallet. Our system is completely automated. If in 
        2hrs the payment is not reflected in your account, please check if you got a refund. If not, please create a support 
        ticket and we will help you.
      </p>
      
      <div className="border-t border-gray-200 pt-6">
        {/* Tabs */}
        <div className="flex items-center  flex-wrap justify-center mb-2   text-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex text-[12px]   gap-2 md:text-[14px] items-center px-1 md:px-2 py-1 md:py-2 mx-1 md:mx-2 ${
                selectedTab === tab.id ? 'text-blue-600 font-[400]' : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.fee && <span className="ml-1">({tab.fee} fee)</span>}
            </button>
          ))}
        </div>
        
        {/* Dynamic Content Area */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Credit Card Tab Component
const CreditCardTab = () => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayment = () => {
    console.log(`Initiating payment of ₹${amount}`);
    // Actual Razorpay integration code would go here
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <p className="text-gray-800 text-[12px] md:text-[14px] font-400 leading-relaxed">
          Initiate a secure transaction with Razorpay, a trusted payment gateway. Our platform supports Netbanking and UPI,
          ensuring a seamless and secure payment experience
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
        <div className="relative w-full">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="w-full py-3 px-4 pl-8 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
        </div>
        
        <button
          onClick={handlePayment}
          className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2 bg-white py-3 px-6 border border-gray-300 rounded-full text-gray-800 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <CreditCard className="w-5 h-5" />
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

// Bank Transfer Tab Component
const BankTransferTab = ({ accounts, handleCopy, copiedText }) => {
  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="text-center mb-8">
        <p className="text-gray-800 font-medium">
          Only add money to the details mentioned below and do not send money to any other account. Atlys will not be 
          responsible if you send money to other accounts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {accounts.map((account, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center mb-4">
              <Building className="text-blue-600 w-5 h-5 mr-2" />
              <span className="font-medium">{account.name}</span>
              {account.preferred && (
                <span className="ml-2 text-gray-500 text-sm">(preferred)</span>
              )}
            </div>

            <div className="space-y-3">
              <div className="relative">
                <div className="border border-gray-200 rounded-md py-3 px-4 bg-gray-50 flex justify-between items-center">
                  <span className="text-gray-700">{account.accountNumber}</span>
                  <button 
                    onClick={() => handleCopy(account.accountNumber, `account-${index}`)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    {copiedText === `account-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="border border-gray-200 rounded-md py-3 px-4 bg-gray-50 flex justify-between items-center">
                  <span className="text-gray-700">{account.ifscCode}</span>
                  <button 
                    onClick={() => handleCopy(account.ifscCode, `ifsc-${index}`)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    {copiedText === `ifsc-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="border border-gray-200 rounded-md py-3 px-4 bg-gray-50 flex justify-between items-center">
                  <span className="text-gray-700">{account.beneficiary}</span>
                  <button 
                    onClick={() => handleCopy(account.beneficiary, `beneficiary-${index}`)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    {copiedText === `beneficiary-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-8 text-center">
        <p className="text-gray-800">
          For instant transfers up to <span className="font-medium">Rs. 2L</span> use <span className="font-medium text-blue-600">IMPS</span>.
        </p>
        <p className="text-gray-800">
          For larger transaction use <span className="font-medium text-blue-600">NEFT</span>.
        </p>
      </div>

      <div className="mt-6">
        <p className="text-gray-800">
          Add Atlys as a beneficiary and pay via NEFT/RTGS/IMPS online or at a bank branch. Please wait for 30mins - 
          2hrs for the payment to reflect in your wallet. Our system is completely automated and amount will be 
          reflected in your wallet.
        </p>
      </div>
    </div>
  );
};

export default LoadWallet;