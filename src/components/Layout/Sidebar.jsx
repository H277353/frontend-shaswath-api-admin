import React, { useState, useRef } from "react";
import {
    Menu,
    X,
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    FolderKanban,
    DollarSign,
    ClipboardList,
    BookOpen,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

export const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    {
        name: "User Management",
        icon: Users,
        children: [
            { name: "User Creation", path: "/management/user/create" },
            { name: "Pending User", path: "/management/user/pending" },
            { name: "Onboarded Users", path: "/management/user/onboarded" },
            { name: "Rejected User", path: "/management/user/rejected" },
            { name: "Admin User", path: "/management/admin-user" },
            { name: "KYC Approved Summary", path: "/management/kyc-approved" },
            { name: "Pending KYC", path: "/management/kyc-pending" },
            { name: "View User", path: "/management/view-user" },
            { name: "Block/Unblock User", path: "/management/block-unblock-user" },
            { name: "Settlement Bank", path: "/management/settlement-bank" },
            { name: "User Mapping", path: "/management/user-mapping" },
        ],
    },
    {
        name: "Finance",
        icon: DollarSign,
        children: [
            { name: "Prefunding Authorization", path: "/funding/authorization" },
            { name: "Credit/Debit", path: "/funding/credit-debit" },
            { name: "Manage Payment", path: "/funding/manage-payment" },
            { name: "Manage Settlement", path: "/funding/manage-settlement" },
            { name: "Settlement", path: "/funding/settlement" },
            { name: "Update Transaction", path: "/funding/update-transaction" },
            { name: "Low Balance", path: "/funding/low-balance" },
            { name: "Bulk Credit/Debit", path: "/funding/bulk-credit-debit" },
        ],
    },    
    {
        name: "Product Settings",
        icon: Settings,
        children: [
            { name: "Schemes List", path: "/schemes/schemeslist" },
            { name: "Schemes Hierarchy", path: "/schemes/hierarchy" },
            { name: "Schemes Allocation", path: "/schemes/allocation" },
            { name: "Transaction Limit Settings", path: "/schemes/transaction-limit" },
        ],
    },
    {
        name: "Masters",
        icon: FolderKanban,
        children: [
            { name: "Product Master", path: "/master/product" },
            { name: "Sub-Product Master", path: "/master/sub-product" },
            { name: "Operator Master", path: "/master/operator" },
            { name: "Sub-Operator Master", path: "/master/sub-operator" },
            { name: "Vendor Master", path: "/master/vendor" },
            { name: "Vendor Credential Master", path: "/master/vendor-credential" },
            { name: "Vendor Routing Master", path: "/master/vendor-routing" },
            { name: "Bank Master", path: "/master/banks" },
            { name: "Network Bank Master", path: "/master/network-banks" },
            {
                name: "Location Master",
                children: [
                    { name: "Country Master", path: "/master/country" },
                    { name: "State Master", path: "/master/state" },
                    { name: "District Master", path: "/master/district" },
                    { name: "City Master", path: "/master/city" },
                    { name: "Pincode Master", path: "/master/pincode" },
                ],
            },
        ],
    },
   
    {
        name: "Reports",
        icon: FileText,
        children: [
            { name: "Live Transaction Report", path: "/report/live-transaction" },
            { name: "Transaction Report", path: "/report/transaction" },
        ],
    },
    { name: "Logs", icon: ClipboardList, path: "/logs" },
];


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const sidebarRef = useRef(null);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const toggleSubmenu = (menuName) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    // Check if any child path matches current location
    const isParentActive = (children) => {
        if (!children) return false;
        return children.some((child) => {
            if (child.path && location.pathname === child.path) return true;
            if (child.children) return isParentActive(child.children);
            return false;
        });
    };



    return (
        <div className="flex h-screen">
            <aside
                ref={sidebarRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${isOpen ? "w-64" : "w-16"} 
          bg-gray-200 border-r border-gray-300 shadow-lg 
          flex flex-col transition-all duration-200 ease-in-out z-40`}
                style={{ overflow: isOpen ? "visible" : "hidden" }}
            >
                {/* Header */}
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gray-200 border-b border-gray-300 shrink-0">
                    <div className="flex items-center space-x-2 overflow-hidden">
                        <h1
                            className={`text-xs font-bold text-gray-800 transition-all duration-300 
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                        >
                            Admin Portal
                        </h1>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 shrink-0"
                    >
                        {isOpen ? (
                            <X className="w-5 h-5 text-gray-600" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                </div>


                {/* Menu */}
                <nav className={`flex flex-col space-y-1 px-2 py-3 flex-1 ${isOpen ? "overflow-y-auto" : "overflow-hidden"}`}>
                    {menuItems.map((item, index) => {
                        const hasChildren = !!item.children;
                        const isExpanded = expandedMenus[item.name];
                        const parentActive = hasChildren && isParentActive(item.children);

                        return (
                            <div key={index}>
                                {hasChildren ? (
                                    <>
                                        <button
                                            onClick={() => toggleSubmenu(item.name)}
                                            className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                        ${parentActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"}`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex justify-center w-5 shrink-0">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span
                                                    className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                                                        }`}
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                            {isOpen && (
                                                <div className="shrink-0">
                                                    {isExpanded ? (
                                                        <ChevronDown className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4" />
                                                    )}
                                                </div>
                                            )}
                                        </button>

                                        {/* Child links */}
                                        {isExpanded && isOpen && (
                                            <div className="ml-9 mt-1 space-y-1">
                                                {item.children.map((child, i) => {
                                                    const hasGrandChildren = !!child.children;
                                                    const isChildExpanded = expandedMenus[child.name];
                                                    const childActive = hasGrandChildren && isParentActive(child.children);

                                                    return (
                                                        <div key={i}>
                                                            {!hasGrandChildren ? (
                                                                <NavLink
                                                                    to={child.path}
                                                                    className={({ isActive }) =>
                                                                        `block px-3 py-1.5 text-sm rounded transition-colors ${isActive
                                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                                            : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
                                                                        }`
                                                                    }
                                                                >
                                                                    {child.name}
                                                                </NavLink>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => toggleSubmenu(child.name)}
                                                                        className={`flex items-center justify-between w-full text-sm px-3 py-1.5 rounded transition-colors ${childActive
                                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                                            : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
                                                                            }`}
                                                                    >
                                                                        <span>{child.name}</span>
                                                                        {isChildExpanded ? (
                                                                            <ChevronDown className="w-3 h-3" />
                                                                        ) : (
                                                                            <ChevronRight className="w-3 h-3" />
                                                                        )}
                                                                    </button>
                                                                    {isChildExpanded && (
                                                                        <div className="ml-4 mt-1 space-y-1">
                                                                            {child.children.map((grand, j) => (
                                                                                <NavLink
                                                                                    key={j}
                                                                                    to={grand.path}
                                                                                    className={({ isActive }) =>
                                                                                        `block px-3 py-1.5 text-xs rounded transition-colors ${isActive
                                                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                                                            : "text-gray-500 hover:bg-gray-300 hover:text-gray-900"
                                                                                        }`
                                                                                    }
                                                                                >
                                                                                    {grand.name}
                                                                                </NavLink>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                      ${isActive
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"}`
                                        }
                                    >
                                        <div className="flex justify-center w-5 shrink-0">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span
                                            className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                    </NavLink>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;