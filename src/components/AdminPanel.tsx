import React, { useState } from "react";
import { Plus, Sparkles, Edit2, Check, Trash2, ShieldAlert, CheckCircle, Database, HelpCircle, Package, ArrowUpRight, TrendingUp, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { generateRandomProduct } from "../mockData";
import { formatCurrency } from "../utils/format";

interface AdminPanelProps {
  products: Product[];
  setProducts: (updater: Product[] | ((prev: Product[]) => Product[])) => void;
  categories: string[];
}

export default function AdminPanel({
  products,
  setProducts,
  categories
}: AdminPanelProps) {
  // Manual adding forms states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Electronics");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [newStock, setNewStock] = useState("15");
  const [newIsPrime, setNewIsPrime] = useState(true);
  const [newFeatures, setNewFeatures] = useState("");

  const [notification, setNotification] = useState<string | null>(null);
  const [searchAdminQuery, setSearchAdminQuery] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [temporaryPriceValue, setTemporaryPriceValue] = useState("");

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. ADD MANDATORY RANDOM PRODUCTS
  const handleAddRandomProducts = (count: number) => {
    const spawned: Product[] = [];
    for (let i = 0; i < count; i++) {
      spawned.push(generateRandomProduct());
    }

    setProducts((prev) => [...spawned, ...prev]);
    
    const names = spawned.map((p) => p.title.slice(0, 30) + "...").join(", ");
    triggerNotification(`Successfully injected ${count} random e-commerce products: [${names}]`);
  };

  // 2. SET PRODUCT PRICE
  const handleUpdatePrice = (id: string, priceVal: number) => {
    if (isNaN(priceVal) || priceVal <= 0) {
      alert("Please input a valid positive price number.");
      return;
    }
    
    // Parse to float 2 decimals
    const cleanPrice = parseFloat(priceVal.toFixed(2));
    
    setProducts((prev) => 
      prev.map((p) => (p.id === id ? { ...p, price: cleanPrice } : p))
    );
    
    setEditingPriceId(null);
    triggerNotification(`Updated Price of product [ID: ${id}] to ${formatCurrency(cleanPrice)}`);
  };

  // Instant quick percentage adjustments (-10%, +10%)
  const adjustPricePercentage = (id: string, multiplier: number) => {
    setProducts((prev) => 
      prev.map((p) => {
        if (p.id === id) {
          const updatedPrice = parseFloat((p.price * multiplier).toFixed(2));
          return { ...p, price: updatedPrice };
        }
        return p;
      })
    );
    triggerNotification(`Adjusted product pricing for ID ${id}`);
  };

  // 3. EDIT STOCK LEVEL DIRECTLY
  const handleUpdateStock = (id: string, stockVal: number) => {
    const cleanStock = Math.max(0, Math.floor(stockVal));
    setProducts((prev) => 
      prev.map((p) => (p.id === id ? { ...p, stock: cleanStock } : p))
    );
    triggerNotification(`Updated Stock levels for item ID ${id} to ${cleanStock}`);
  };

  // 4. DELETE PRODUCT
  const handleDeleteProduct = (id: string) => {
    const conf = window.confirm("Are you sure you want to permanently delete this product from database?");
    if (!conf) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    triggerNotification(`Deleted product [ID: ${id}] from inventory successfully.`);
  };

  // 5. MANUALLY CREATE A PRODUCT
  const handleManualAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle || !newPrice) {
      alert("Please configure a title and valid price rate.");
      return;
    }

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Price must be a valid positive number.");
      return;
    }

    const stockNum = parseInt(newStock) || 10;
    const fallbackImage = newImgUrl.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60";
    
    const formattedFeatures = newFeatures
      ? newFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
      : ["Premium materials verified", "Backed by standard 1-year product coverage"];

    const newProduct: Product = {
      id: "prod-man-" + Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      description: newDescription.trim() || "No detailed description provided by administrator.",
      price: priceNum,
      category: newCategory,
      rating: parseFloat((3.9 + Math.random() * 1.1).toFixed(1)),
      reviewCount: Math.floor(1 + Math.random() * 400),
      imageUrl: fallbackImage,
      isPrime: newIsPrime,
      stock: stockNum,
      features: formattedFeatures,
      dateAdded: new Date().toISOString().split("T")[0]
    };

    setProducts((prev) => [newProduct, ...prev]);

    // Clear Form Fields
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewImgUrl("");
    setNewStock("15");
    setNewIsPrime(true);
    setNewFeatures("");

    triggerNotification(`Custom product placed successfully: "${newProduct.title.slice(0, 30)}..."`);
  };

  // 6. CLEAR OR RESET TO SEED CATALOGS
  const handleResetCatalog = () => {
    const conf = window.confirm("This action rewrites local modifications and restores the classic 8 core catalog items. Proceed?");
    if (!conf) return;

    localStorage.removeItem("amazon_clone_products");
    window.location.reload();
  };

  const handleWipeCatalog = () => {
    const conf = window.confirm("WARNING: Proceeding completely empties your storefront. Excellent for testing blank storefront views. Proceed?");
    if (!conf) return;

    setProducts([]);
    triggerNotification("Wiped all inventory products out of active memory catalog.");
  };

  // Filter products relative to Admin search box
  const filteredAdminProducts = products.filter((p) => 
    p.title.toLowerCase().includes(searchAdminQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchAdminQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchAdminQuery.toLowerCase())
  );

  // Administrative calculations
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averagePrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;
  const criticalStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 font-sans text-gray-900 flex flex-col gap-8">
      {/* Notifications floating block */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#232f3e] text-white rounded-lg p-4 shadow-2xl flex items-start gap-3 border-l-4 border-[#febd69] tracking-normal max-w-md animate-slide-up">
          <CheckCircle className="h-5 w-5 text-[#febd69] mt-0.5 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">{notification}</p>
        </div>
      )}

      {/* Admin Title Header panel */}
      <div className="bg-[#131921] text-white p-6 rounded shadow-sm border border-gray-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-2 tracking-tight text-white">
            <Database className="h-6 w-6 text-[#febd69] animate-pulse" />
            <span>Admin Center Console</span>
          </h1>
          <p className="text-xs text-gray-300 mt-1 font-normal leading-relaxed">
            Real-time management node to rewrite pricing rates, inject dynamic pseudo-random listings, and audit active inventory levels.
          </p>
        </div>

        {/* Quick bulk generator actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add prefilled dynamic products */}
          <button
            onClick={() => handleAddRandomProducts(1)}
            className="amazon-btn-primary px-3 py-1.5 text-xs flex items-center gap-1 font-semibold"
            id="admin-add-1-random"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+1 Random Product</span>
          </button>
          
          <button
            onClick={() => handleAddRandomProducts(5)}
            className="w-xs select-none py-1.5 px-3 bg-gradient-to-b from-gray-700 to-gray-850 hover:from-gray-650 hover:to-gray-800 border border-gray-600 rounded text-xs text-white flex items-center justify-center gap-1 cursor-pointer transition-all font-semibold"
            id="admin-add-5-random"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>+5 Random Products</span>
          </button>

          <button
            onClick={() => handleAddRandomProducts(10)}
            className="w-xs select-none py-1.5 px-3 bg-[#e74c3c] hover:bg-[#c0392b] border border-[#c0392b] rounded text-xs text-white flex items-center justify-center gap-1 cursor-pointer transition-all font-semibold"
            id="admin-add-10-random"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300 fill-white" />
            <span>+10 Bulk Random</span>
          </button>
        </div>
      </div>

      {/* Stats Widgets dashboard Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total catalog items */}
        <div className="bg-white p-4 rounded border border-[#d5d9d9] flex justify-between items-center shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Products Cataloged</span>
            <span className="text-2xl font-black text-gray-950 font-mono">{products.length} Items</span>
          </div>
          <Package className="h-8 w-8 text-blue-500" />
        </div>

        {/* Total Value */}
        <div className="bg-white p-4 rounded border border-[#d5d9d9] flex justify-between items-center shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-medium font-semibold">Virtual Inventory Value</span>
            <span className="text-2xl font-black text-green-700 font-mono">{formatCurrency(totalValue)}</span>
          </div>
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>

        {/* Average Pricing */}
        <div className="bg-white p-4 rounded border border-[#d5d9d9] flex justify-between items-center shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Avg. Pricing Index</span>
            <span className="text-2xl font-black text-gray-900 font-mono">{formatCurrency(averagePrice)}</span>
          </div>
          <ArrowUpRight className="h-8 w-8 text-amber-500" />
        </div>

        {/* Critical low stocks alert count */}
        <div className="bg-white p-4 rounded border border-[#d5d9d9] flex justify-between items-center shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Low Stock Alert</span>
            <span className={`text-2xl font-black font-mono ${criticalStockCount > 0 ? "text-red-650" : "text-green-700"}`}>
              {criticalStockCount} items
            </span>
          </div>
          <ShieldAlert className={`h-8 w-8 ${criticalStockCount > 0 ? "text-red-500 animate-bounce" : "text-gray-300"}`} />
        </div>
      </div>

      {/* Main Split Layout: LEFT (Catalog Table) | RIGHT (Add Custom Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Product Sheets Administration Table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded border border-[#d5d9d9] shadow-sm overflow-hidden flex flex-col">
            
            {/* Header Control Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <h2 className="font-bold text-sm tracking-tight text-gray-800 self-start sm:self-center">
                Inventory Database Records ({filteredAdminProducts.length} filtered)
              </h2>
              
              {/* Table search filter */}
              <input
                type="text"
                placeholder="Locate title, ID or category..."
                value={searchAdminQuery}
                onChange={(e) => setSearchAdminQuery(e.target.value)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs w-full sm:max-w-xs focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-gray-400 font-medium text-gray-800"
                id="admin-search-catalog"
              />
            </div>

            {/* Catalog Sheet Grid Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 uppercase tracking-wider border-b border-gray-200 font-bold select-none">
                    <th className="p-3.5 pl-4 max-w-[60px]">Thumb</th>
                    <th className="p-3.5">System Identifiers & Description</th>
                    <th className="p-3.5 text-center">Fulfill</th>
                    <th className="p-3.5 text-right w-[110px]">Stock Count</th>
                    <th className="p-3.5 text-right w-[150px]">Product Price (₹)</th>
                    <th className="p-3.5 pr-4 text-center w-[60px]">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredAdminProducts.map((p) => (
                    <tr 
                      key={p.id}
                      className={`hover:bg-gray-50 transition-colors ${p.stock <= 5 ? "bg-red-50/40" : ""}`}
                      id={`admin-table-row-${p.id}`}
                    >
                      {/* Image Preview */}
                      <td className="p-3 pl-4">
                        <div className="h-10 w-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="max-h-9 max-w-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>

                      {/* Title description with badge */}
                      <td className="p-3 max-w-[280px]">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-gray-900 line-clamp-2 leading-snug">
                            {p.title}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-400">
                            <span className="font-mono text-gray-550 bg-gray-100 px-1 rounded">{p.id}</span>
                            <span>&bull;</span>
                            <span className="font-medium uppercase text-blue-500">{p.category}</span>
                            {p.isPrime && (
                              <>
                                <span>&bull;</span>
                                <span className="text-[#00a8e1] font-bold">PRIME</span>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Rating details badge */}
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          ★ <span>{p.rating}</span>
                        </div>
                      </td>

                      {/* STOCK LEVEL CHANGER CONTROL */}
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="number"
                            min="0"
                            max="999"
                            defaultValue={p.stock}
                            onBlur={(e) => handleUpdateStock(p.id, Number(e.target.value))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateStock(p.id, Number((e.target as HTMLInputElement).value));
                              }
                            }}
                            className="w-14 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded px-1.5 py-1 text-right focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono font-bold font-xs"
                            id={`admin-stock-input-${p.id}`}
                          />
                        </div>
                      </td>

                      {/* IN-LINE PRICE EDIT MODE SETTINGS */}
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {editingPriceId === p.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400 font-semibold">₹</span>
                              <input
                                type="text"
                                value={temporaryPriceValue}
                                onChange={(e) => setTemporaryPriceValue(e.target.value)}
                                className="w-16 border border-amber-400 rounded px-1.5 py-1 text-right focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-xs font-mono"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleUpdatePrice(p.id, parseFloat(temporaryPriceValue));
                                  if (e.key === "Escape") setEditingPriceId(null);
                                }}
                                id={`admin-price-input-${p.id}`}
                              />
                              <button
                                onClick={() => handleUpdatePrice(p.id, parseFloat(temporaryPriceValue))}
                                className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-sm cursor-pointer"
                              >
                                <Check className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setEditingPriceId(p.id);
                                setTemporaryPriceValue(p.price.toString());
                              }}
                              className="flex items-center gap-1.5 cursor-pointer group hover:bg-amber-50 hover:border-amber-400 border border-dashed border-transparent rounded px-2 py-1 transition-all"
                              title="Click to change Price"
                              id={`price-edit-lbl-${p.id}`}
                            >
                              <span className="font-bold text-gray-900 font-mono text-xs">
                                {formatCurrency(p.price)}
                              </span>
                              <Edit2 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}

                          {/* Quick percentage adjustment widgets */}
                          <div className="flex flex-col gap-0.5 scale-90">
                            <button
                              onClick={() => adjustPricePercentage(p.id, 0.9)}
                              className="text-[9px] bg-red-100 hover:bg-red-200 text-red-700 font-bold px-1 rounded-xs"
                              title="Reduce pricing by 10%"
                            >
                              -10%
                            </button>
                            <button
                              onClick={() => adjustPricePercentage(p.id, 1.1)}
                              className="text-[9px] bg-green-100 hover:bg-green-200 text-green-700 font-bold px-1 rounded-xs"
                              title="Advance pricing by 10%"
                            >
                              +10%
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Trash action button */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-gray-300 hover:text-red-600 p-2 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete this item completely"
                          id={`admin-delete-btn-${p.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredAdminProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-12 text-gray-400 italic">
                        Empty records. Search matched no products. Try clicking the "Bulk Random" inject buttons above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Utility database triggers */}
            <div className="p-4 border-t border-gray-150 bg-gray-50 flex items-center justify-between text-xs select-none">
              <span className="text-gray-500 font-light flex items-center gap-1">
                <Database className="h-4 w-4" />
                Database State: <span className="font-bold text-green-700">Healthy</span> LocalStorage
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetCatalog}
                  className="text-gray-600 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Restore Default Products</span>
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={handleWipeCatalog}
                  className="text-red-600 hover:text-red-800 hover:underline cursor-pointer font-bold"
                >
                  Wipe Catalog
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Manual Creator Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 rounded border border-[#d5d9d9] shadow-sm flex flex-col gap-4">
            <h2 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-1.5">
              <Plus className="h-4.5 w-4.5 text-amber-500" />
              <span>Register Custom Product</span>
            </h2>

            <form onSubmit={handleManualAddProduct} className="flex flex-col gap-3.5 text-xs">
              {/* Product title name */}
              <div className="flex flex-col gap-1.5 focus-within:text-amber-600">
                <label className="text-gray-500 font-bold select-none">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony, Anker, Keurig device specs..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-amber-500 outline-none placeholder:text-gray-400 placeholder:font-light"
                  id="admin-new-title"
                />
              </div>

              {/* Price rate input & Stock levels */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 focus-within:text-amber-600">
                  <label className="text-gray-500 font-bold select-none">Price (₹ INR) *</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    required
                    placeholder="e.g. 1499"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="border border-gray-300 rounded px-2.5 py-1.5 font-mono text-xs text-gray-800 font-bold focus:ring-1 focus:ring-amber-500 outline-none"
                    id="admin-new-price"
                  />
                </div>

                <div className="flex flex-col gap-1.5 focus-within:text-amber-600">
                  <label className="text-gray-500 font-bold select-none">Starting Stock</label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="border border-gray-300 rounded px-2.5 py-1.5 font-mono text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                    id="admin-new-stock"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Category select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-500 font-bold select-none">Department</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-700 bg-white cursor-pointer font-medium focus:ring-1 focus:ring-amber-500 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Is Prime Switch */}
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    id="newIsPrime"
                    checked={newIsPrime}
                    onChange={(e) => setNewIsPrime(e.target.checked)}
                    className="h-4.5 w-4.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="newIsPrime" className="text-gray-700 hover:text-black hover:font-semibold select-none cursor-pointer">
                    Enable Prime tag
                  </label>
                </div>
              </div>

              {/* Graphic unsplash image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-bold select-none">Unsplash Graphics URL</label>
                <input
                  type="url"
                  placeholder="Paste direct JPG link..."
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  className="border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 font-light focus:ring-1 focus:ring-amber-500 outline-none"
                  id="admin-new-img-url"
                />
                <span className="text-[10px] text-gray-400">Leave blank for controller-pad graphic.</span>
              </div>

              {/* Description text area */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-bold select-none">Item Description</label>
                <textarea
                  rows={3}
                  placeholder="Set rich overview details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border border-gray-300 rounded p-2.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-amber-500 outline-none leading-normal"
                />
              </div>

              {/* Features bullet checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-500 font-bold select-none">Technical Specifications (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="Active Noise cancellation&#10;Up to 30 hours battery&#10;USB C charger protocol..."
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="border border-gray-300 rounded p-2.5 text-xs text-gray-850 font-medium focus:ring-1 focus:ring-amber-500 outline-none leading-normal"
                />
              </div>

              {/* Form submit */}
              <button
                type="submit"
                className="amazon-btn-primary w-full py-2.5 rounded hover:scale-105 transition-transform text-xs font-semibold"
                id="admin-submit-new-product"
              >
                Log Register Entry &rarr;
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
