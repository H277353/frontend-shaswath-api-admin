import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, User, ChevronDown, LogOut, Lock, UserCircle } from 'lucide-react';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dropdownRef = useRef(null);

    // Sample wallet data - replace with actual data
    const [walletBalance, setWalletBalance] = useState({
        prepaid: 15000.50,
        postpaid: 25000.75
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate API call to refresh wallet balance
        setTimeout(() => {
            // Update wallet balance here
            setIsRefreshing(false);
        }, 1000);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(amount);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-end items-center px-6 py-3 gap-6">
                {/* Wallet Balances */}
                <div className="flex items-center gap-4">
                    {/* Prepaid Wallet */}
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium">Prepaid</span>
                        <span className="text-sm font-semibold text-gray-800">
                            {formatCurrency(walletBalance.prepaid)}
                        </span>
                    </div>

                    {/* Postpaid Wallet */}
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium">Postpaid</span>
                        <span className="text-sm font-semibold text-gray-800">
                            {formatCurrency(walletBalance.postpaid)}
                        </span>
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        title="Refresh wallet balance"
                    >
                        <RefreshCw
                            className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
                        />
                    </button>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-300"></div>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    // Navigate to profile
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <UserCircle className="w-4 h-4" />
                                <span>Profile</span>
                            </button>

                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    // Navigate to change password
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Change Password</span>
                            </button>

                            <div className="my-1 border-t border-gray-200"></div>

                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;