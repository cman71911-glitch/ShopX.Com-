import React, { useState, useEffect } from "react";
import { X, Trash2, ShieldCheck, CheckCircle2, ChevronRight, CreditCard, Compass, Sparkles, MapPin } from "lucide-react";
import { CartItem, Product } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../utils/format";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  deliveryAddress: string;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = "idle" | "shipping" | "payment" | "simulating" | "success";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  deliveryAddress,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("idle");
  const [shippingAddress, setShippingAddress] = useState(deliveryAddress || "New Delhi, Delhi 110001");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardName, setCardName] = useState("Jane Doe");
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Sync general deliveryAddress update with checkout shipping field
  useEffect(() => {
    if (deliveryAddress) {
      setShippingAddress(deliveryAddress);
    }
  }, [deliveryAddress]);

  // Subtotal Calculation in INR
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal > 15000 ? subtotal * 0.1 : 0; // 10% discount over ₹15,0000
  const freeShippingThreshold = 599; // FREE Shipping above ₹599
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 49; // ₹49 classic container flow rate
  const estimatedTax = (subtotal - discount) * 0.18; // 18% standard GST rate in India
  const grandTotal = subtotal - discount + shippingCost + estimatedTax;

  // Run the checkout simulation
  const startCheckoutSimulation = () => {
    setCheckoutStep("simulating");
    setSimulationProgress(10);
    
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCheckoutStep("success");
            onClearCart();
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans text-gray-900">
      {/* Black backdrop click target */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#eaeded] flex flex-col h-full shadow-2xl relative">
          
          {/* Drawer Header */}
          <div className="bg-[#232f3e] text-white px-4 py-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Shopping Cart</span>
              <span className="bg-[#febd69] text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white rounded-md p-1 p-1 hover:bg-white/10 transition-colors cursor-pointer"
              id="close-cart-drawer-btn"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Main scroll-frame */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            
            {checkoutStep === "idle" && (
              <>
                {/* 1. Free Shipping Banner progress bar */}
                <div className="bg-white p-4 rounded-sm shadow-xs border border-gray-200">
                  {isFreeShipping ? (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-green-700 font-semibold text-xs">
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                        <span>Your order qualifies for FREE Shipping!</span>
                      </div>
                      <div className="w-full bg-green-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full w-full" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5 text-xs text-gray-700">
                      <p>
                        Add <span className="font-bold text-red-700">{formatCurrency(freeShippingThreshold - subtotal)}</span> more to qualify for <span className="font-bold text-green-700">FREE Shipping</span>.
                      </p>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-300" 
                          style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Items list */}
                {cart.length === 0 ? (
                  <div className="bg-white p-8 rounded-sm border border-gray-200 text-center flex flex-col items-center gap-3">
                    <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <Trash2 className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-base">Your shopX Cart is empty</h3>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                      Fill your basket with highly rated devices, tech systems, and home gadgets from our dynamic inventory catalog.
                    </p>
                    <button
                      onClick={onClose}
                      className="amazon-btn-primary px-4 py-2 text-xs font-semibold mt-1"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                      <div 
                        key={item.product.id}
                        className="bg-white p-3 rounded-sm border border-gray-200 flex gap-3 relative hover:border-gray-300 transition-all"
                        id={`cart-item-${item.product.id}`}
                      >
                        {/* Thumb Image */}
                        <div className="h-16 w-16 bg-gray-50 flex items-center justify-center rounded overflow-hidden shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="max-h-14 max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title & Controllers */}
                        <div className="flex-1 flex flex-col gap-1 pr-6">
                          <h4 
                            className="font-medium text-[12px] leading-tight text-gray-900 line-clamp-2 hover:text-[#c45500] cursor-pointer"
                          >
                            {item.product.title}
                          </h4>
                          
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                            {item.product.category}
                          </span>

                          <div className="flex items-center gap-4 mt-2">
                            {/* Quantity Trigger select */}
                            <div className="flex items-center gap-1 border border-gray-300 bg-gray-50 rounded px-1.5 py-0.5">
                              <span className="text-[10px] text-gray-500">Qty:</span>
                              <select
                                value={item.quantity}
                                onChange={(e) => onUpdateQuantity(item.product.id, Number(e.target.value))}
                                className="text-xs bg-transparent focus:outline-none cursor-pointer font-bold"
                                id={`cart-item-qty-${item.product.id}`}
                              >
                                {Array.from({ length: Math.min(10, item.product.stock) }, (_, i) => i + 1).map((n) => (
                                  <option key={n} value={n}>
                                    {n}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Trash action */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-gray-400 hover:text-red-600 flex items-center gap-0.5 text-xs transition-colors cursor-pointer"
                              id={`delete-cart-item-${item.product.id}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Pricing details */}
                        <div className="text-right flex flex-col shrink-0 min-w-[60px]">
                          <span className="font-bold text-sm text-gray-950">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-gray-500">
                              ({formatCurrency(item.product.price)} each)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Subtotal Block Summary */}
                {cart.length > 0 && (
                  <div className="bg-white p-4 rounded-sm shadow-xs border border-gray-200 flex flex-col gap-2.5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 pb-1.5 border-b border-gray-100">
                      Receipt Summary
                    </h3>
                    
                    <div className="flex justify-between text-xs text-gray-700">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-xs text-green-700 font-medium">
                        <span>Bulk Discount (10% over {formatCurrency(15000)})</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-gray-700">
                      <span>Shipping Rate</span>
                      <span className="font-medium">
                        {isFreeShipping ? <span className="text-green-700 font-bold">FREE</span> : formatCurrency(shippingCost)}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-700">
                      <span>GST Tax (Est. 18%)</span>
                      <span className="font-medium">{formatCurrency(estimatedTax)}</span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[#b12704] pt-2 border-t border-dashed border-gray-150">
                      <span>Estimated Grand Total</span>
                      <span>{formatCurrency(grandTotal)}</span>
                    </div>

                    {/* Submit Purchase Checkout Button */}
                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="amazon-btn-primary w-full py-2.5 rounded text-sm font-semibold select-none mt-2 flex items-center justify-center gap-1 cursor-pointer"
                      id="proceed-to-checkout-btn"
                    >
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    
                    <span className="text-[10px] text-center text-gray-400 mt-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                      <span>Encrypted SSL security checkout and private storage.</span>
                    </span>
                  </div>
                )}
              </>
            )}

            {/* CHECKOUT STEP: SHIPPING ADDRESS FORM */}
            {checkoutStep === "shipping" && (
              <div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                  <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-base">Select Shipping Address</h3>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <label className="text-gray-500 font-medium select-none">Fulfillment Terminal Destination</label>
                  <textarea
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-xs text-gray-800 leading-normal"
                    placeholder="Enter full shipping coordinate address..."
                  />
                  <span className="text-gray-400 leading-normal">
                    This mock order will deliver locally relative to this address inside Dallas municipal zip boundaries.
                  </span>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setCheckoutStep("idle")}
                    className="amazon-btn-secondary px-4 py-2 text-xs"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={() => setCheckoutStep("payment")}
                    className="amazon-btn-primary flex-1 py-2 text-xs"
                    id="shipping-next-btn"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* CHECKOUT STEP: PAYMENT FORM CARD */}
            {checkoutStep === "payment" && (
              <div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                  <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-base">Setup Mock Credit Card</h3>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="bg-gray-800 rounded-lg p-4 text-white flex flex-col gap-4 shadow relative overflow-hidden select-none">
                    <div className="absolute right-4 top-4 h-6 w-9 bg-yellow-400/25 rounded" />
                    <CreditCard className="h-8 w-8 text-amber-400" />
                    
                    <div className="font-mono text-sm tracking-widest mt-2">{cardNumber || "•••• •••• •••• ••••"}</div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wide text-gray-400">Cardholder</span>
                        <span className="font-semibold">{cardName || "CLIENT USER"}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] uppercase text-gray-400 leading-none">Expires</span>
                        <span className="font-semibold text-[11px]">10 / 2030</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-2">
                    <label className="text-gray-500 font-medium">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
                      placeholder="Card credit number..."
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-gray-500 font-medium">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs font-semibold"
                      placeholder="Full label name..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setCheckoutStep("shipping")}
                    className="amazon-btn-secondary px-4 py-2 text-xs"
                  >
                    Change Shipping
                  </button>
                  <button
                    onClick={startCheckoutSimulation}
                    className="amazon-btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-1"
                    id="payment-next-btn"
                  >
                    <span>Place Order ({formatCurrency(grandTotal)})</span>
                  </button>
                </div>
              </div>
            )}

            {/* CHECKOUT STEP: SIMULATING DELIVERY */}
            {checkoutStep === "simulating" && (
              <div className="bg-white p-6 rounded border border-gray-200 text-center flex flex-col items-center gap-4">
                <Spinner3D />
                <h3 className="font-bold text-base text-gray-900">Processing Your Order</h3>
                <p className="text-xs text-gray-500 leading-normal max-w-xs">
                  Analyzing stock quotas, packing in the warehouse, and preparing standard routing corridors to <span className="font-bold">{shippingAddress.split(",")[0]}</span>.
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-2 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-green-500 transition-all duration-300" 
                    style={{ width: `${simulationProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-500">{simulationProgress}% Complete</span>
              </div>
            )}

            {/* CHECKOUT STEP: SUCCESS */}
            {checkoutStep === "success" && (
              <div className="bg-white p-6 rounded border border-gray-300 text-center flex flex-col items-center gap-4 shadow-sm">
                <div className="h-14 w-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-green-800">Order Placed Successfully!</h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">MOCK-ID: SHPX-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed max-w-xs">
                  Congratulations! Since this is a browser training sandbox, your mock credit card was debited exactly <span className="font-bold">₹0</span>! The warehouse will dispatch your invisible mock particles safely.
                </p>

                {/* Simulated timeline tracking */}
                <div className="bg-gray-50 p-4 rounded w-full flex flex-col gap-3 text-left border border-gray-150 text-[11px]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-amber-500" />
                    <span>Real-Time Shipping Timeline</span>
                  </h4>
                  
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 bg-green-600 rounded-full" />
                      <div className="w-[1.5px] bg-green-600 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 leading-none">Order Received</span>
                      <span className="text-gray-400 text-[9px] mt-0.5">May 27, 2026 - 15:49 UTC</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 bg-green-600 rounded-full" />
                      <div className="w-[1.5px] bg-gray-200 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 leading-none">Preparing and Bundling</span>
                      <span className="text-gray-400 text-[9px] mt-0.5">Completed at Fulfillment Center</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse border border-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-light text-gray-400 leading-none">Dispatched for delivery</span>
                      <span className="text-gray-400 text-[9px] mt-0.5">Estimated Arrival tomorrow morning</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep("idle");
                    onClose();
                  }}
                  className="amazon-btn-primary w-full py-2.5 mt-2"
                >
                  Continue Browsing
                </button>
              </div>
            )}

          </div>

          {/* Cart Footer */}
          {cart.length > 0 && checkoutStep === "idle" && (
            <div className="bg-white border-t border-gray-200 p-4 flex flex-col gap-2">
              <button
                onClick={onClearCart}
                className="text-xs text-red-600 hover:underline cursor-pointer text-center font-medium self-center"
                id="clear-all-cart-btn"
              >
                Clear all items from Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Visual mini rotating spinner inside simulating state
function Spinner3D() {
  return (
    <div className="relative h-12 w-12 flex items-center justify-center">
      <div className="animate-spin rounded-full h-11 w-11 border-4 border-amber-200 border-t-amber-600" />
      <Sparkles className="h-4.5 w-4.5 text-amber-500 absolute animate-pulse" />
    </div>
  );
}
