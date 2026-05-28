import React, { useState } from "react";
import { Search, ShoppingCart, MapPin, Menu, User, Settings, Database, Store, X } from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  currentTab: "store" | "admin";
  setCurrentTab: (tab: "store" | "admin") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  onOpenCart: () => void;
  totalProductsCount: number;
  deliveryAddress: string;
  onChangeDeliveryAddress: (address: string) => void;
}

export default function Navbar({
  cart,
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  onOpenCart,
  totalProductsCount,
  deliveryAddress,
  onChangeDeliveryAddress
}: NavbarProps) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const indianMetroPresets = [
    "New Delhi, Delhi 110001",
    "Mumbai, Maharashtra 400001",
    "Bangalore, Karnataka 560001",
    "Chennai, Tamil Nadu 600001",
    "Kolkata, West Bengal 700001",
    "Hyderabad, Telangana 500001 font-mono",
  ];

  const handleApplyCustomAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAddress.trim()) {
      onChangeDeliveryAddress(customAddress.trim());
      setShowAddressModal(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col text-white font-sans w-full">
      {/* Upper main header bar */}
      <div className="bg-[#131921] h-[60px] px-4 flex items-center justify-between gap-4 select-none">
        {/* Left Section: Logo & Deliver Location */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab("store")}
            className="flex flex-col cursor-pointer p-2 border border-transparent hover:border-white rounded-sm mt-1 transition-all"
            id="nav-logo"
          >
            <div className="flex items-baseline font-bold text-xl leading-none tracking-tight">
              <span>shop</span>
              <span className="text-[#febd69] text-xl font-extrabold ml-0.5 italic">X</span>
            </div>
            {/* Swoosh */}
            <div className="h-1 w-12 bg-[#febd69] rounded-full -mt-0.5 relative overflow-hidden self-center">
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#131921] rotate-[20deg] origin-top"></div>
            </div>
          </div>

          {/* Delivery Location */}
          <div 
            onClick={() => setShowAddressModal(true)}
            className="flex items-center gap-1 cursor-pointer p-2 border border-transparent hover:border-white rounded-sm transition-all text-xs"
            id="nav-delivery-location-trigger"
          >
            <MapPin className="h-5 w-5 text-gray-300 self-end -mb-0.5" />
            <div className="flex flex-col max-w-[140px]">
              <span className="text-gray-300 font-light text-[11px] leading-3">Deliver to</span>
              <span className="font-bold text-[13px] leading-4 truncate">{deliveryAddress || "Select Location"}</span>
            </div>
          </div>
        </div>

        {/* Center Section: Unified Real-Time Search Bar */}
        <div className="flex-1 max-w-[800px] flex items-center h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f3a847] bg-white text-gray-900 shadow-sm">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 hover:bg-gray-200 border-r border-gray-300 text-xs px-3 h-full cursor-pointer rounded-l-md outline-none max-w-[120px] select-none text-gray-700 font-medium"
            id="nav-search-category"
          >
            <option value="">All Departments</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search shopX catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-3 text-[15px] outline-none h-full placeholder:text-gray-400 bg-white"
            id="nav-search-input"
          />

          {/* Search Icon Submit Button */}
          <button 
            type="button"
            className="bg-[#febd69] hover:bg-[#f3a847] h-full px-6 flex items-center justify-center cursor-pointer transition-colors"
            id="nav-search-submit"
          >
            <Search className="h-[20px] w-[20px] text-gray-800 font-bold" />
          </button>
        </div>

        {/* Right Section: Admin/Store Toggle, Language, Account & Orders, Cart */}
        <div className="flex items-center gap-1.5 md:gap-3 text-xs">
          {/* ADMIN PORTAL SPECIAL MODE TOGGLERS */}
          <div className="flex items-center bg-gray-800 rounded-md p-1 border border-gray-700 mr-2">
            <button
              onClick={() => {
                setCurrentTab("store");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer transition-all font-semibold ${
                currentTab === "store"
                  ? "bg-[#febd69] text-gray-900 shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              id="switch-to-store-btn"
            >
              <Store className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab("admin");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer transition-all font-semibold relative ${
                currentTab === "admin"
                  ? "bg-[#febd69] text-gray-900 shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              id="switch-to-admin-btn"
            >
              <Database className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin Panel</span>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
          </div>

          {/* Account Details */}
          <div className="hidden lg:flex flex-col cursor-pointer p-2 border border-transparent hover:border-white rounded-sm transition-all">
            <span className="text-gray-300 font-light text-[11px] leading-3">Hello, Customer</span>
            <span className="font-bold text-[13px] leading-4 flex items-center">
              Account & Lists
            </span>
          </div>

          {/* Returns & Orders */}
          <div className="hidden lg:flex flex-col cursor-pointer p-2 border border-transparent hover:border-white rounded-sm transition-all">
            <span className="text-gray-300 font-light text-[11px] leading-3">Returns</span>
            <span className="font-bold text-[13px] leading-4">& Orders</span>
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1 cursor-pointer p-2 border border-transparent hover:border-white rounded-sm transition-all h-[44px]"
            id="nav-cart-btn"
          >
            <div className="relative flex items-center">
              <span className="absolute top-[-8px] left-[50%] translate-x-[-50%] text-[#f08804] text-[15px] font-bold z-10">
                {totalCartItems}
              </span>
              <ShoppingCart className="h-[30px] w-[30px] text-white stroke-2" />
            </div>
            <div className="hidden sm:flex flex-col self-end">
              <span className="text-gray-300 font-light text-[10px] leading-[10px]">Your</span>
              <span className="font-bold text-[13px] leading-[14px]">Cart</span>
            </div>
          </button>
        </div>
      </div>

      {/* Lower dynamic category/deal subbar bar */}
      <div className="bg-[#232f3e] h-[39px] px-4 flex items-center justify-between text-xs font-semibold select-none border-b border-[#1a232e]">
        <div className="flex items-center gap-3">
          {/* Shop Menu */}
          <div className="flex items-center gap-1 cursor-pointer py-1.5 px-2 hover:outline hover:outline-1 hover:outline-white/70 rounded-xs">
            <Menu className="h-4 w-4" />
            <span>All</span>
          </div>

          <div 
            onClick={() => { setSelectedCategory(""); setSearchQuery(""); setCurrentTab("store"); }}
            className={`cursor-pointer py-1.5 px-2 hover:outline hover:outline-1 hover:outline-white/70 rounded-xs ${!selectedCategory && !searchQuery && currentTab === "store" ? "text-[#f3a847] underline underline-offset-4" : ""}`}
          >
            Today's Deals
          </div>

          {/* Categories Shortcuts */}
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchQuery("");
                setCurrentTab("store");
              }}
              className={`hidden sm:inline-block cursor-pointer py-1.5 px-2 hover:outline hover:outline-1 hover:outline-white/70 rounded-xs ${
                selectedCategory === cat && currentTab === "store" ? "text-[#f3a847] underline underline-offset-4" : ""
              }`}
            >
              {cat}
            </div>
          ))}

          <span className="hidden md:inline-block text-gray-400 font-normal">|</span>
          <span className="hidden md:inline-block text-gray-300 font-light italic">
            Catalog contains <span className="font-bold text-white text-xs">{totalProductsCount}</span> premium items
          </span>
        </div>

        {/* Highlight notification */}
        <div className="hidden lg:flex items-center text-gray-300 gap-1.5 pr-2">
          <span>Manage Prices & Inventory randomly inside</span>
          <button
            onClick={() => setCurrentTab("admin")}
            className="text-[#febd69] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <Settings className="h-3 w-3 animate-spin duration-3000" /> Control Panel &rarr;
          </button>
        </div>
      </div>

      {/* Choose delivery location Modal overlay component */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] text-gray-900 p-4">
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
            id="address-modal-container"
          >
            {/* Header portion */}
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-gray-900">Choose your delivery location</h3>
              <button 
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                id="close-address-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body flow */}
            <div className="p-6 flex flex-col gap-5 text-xs">
              <p className="text-gray-500 leading-normal font-normal">
                Delivery options and dispatch speeds vary relative to your dynamic region coordinates or pin code. Select a preset below or enter a custom address directly:
              </p>

              {/* Presets List */}
              <div className="flex flex-col gap-2">
                <span className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Select Indian Metro presets:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {indianMetroPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        onChangeDeliveryAddress(preset);
                        setShowAddressModal(false);
                      }}
                      className={`text-left p-2.5 rounded-md border text-[11px] font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                        deliveryAddress === preset 
                          ? "border-amber-500 bg-amber-50 text-amber-900" 
                          : "border-gray-200 hover:bg-gray-50 text-gray-750"
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{preset.replace(" font-mono", "")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input form container */}
              <form onSubmit={handleApplyCustomAddress} className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]" htmlFor="custom-address-input">
                  Type Custom Address or Pincode:
                </label>
                <div className="flex gap-2">
                  <input
                    id="custom-address-input"
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra 411001"
                    className="border border-gray-300 rounded px-2.5 py-1.5 flex-1 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="amazon-btn-primary px-4 py-1.5 font-bold text-xs shadow-sm"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
