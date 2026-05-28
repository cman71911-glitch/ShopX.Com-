import React, { useState } from "react";
import { X, Star, StarHalf, ShieldCheck, Truck, RefreshCw, Lock, Zap } from "lucide-react";
import { Product, CartItem, Review } from "../types";
import { MOCK_REVIEWS } from "../mockData";
import { formatCurrency, getDeliveryEstimate } from "../utils/format";

interface ProductDetailsModalProps {
  product: Product | null;
  deliveryAddress: string;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectCheckout: (item: CartItem) => void;
}

export default function ProductDetailsModal({
  product,
  deliveryAddress,
  onClose,
  onAddToCart,
  onDirectCheckout
}: ProductDetailsModalProps) {
  if (!product) return null;

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"about" | "reviews">("about");

  // Render stars
  const renderStars = (rating: number, size = "h-4 w-4") => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<Star key={i} className={`${size} fill-[#f3a847] text-[#f3a847]`} />);
      } else if (i === floorRating + 1 && hasHalf) {
        stars.push(<StarHalf key={i} className={`${size} fill-[#f3a847] text-[#f3a847]`} />);
      } else {
        stars.push(<Star key={i} className={`${size} text-gray-300`} />);
      }
    }
    return stars;
  };

  // Static reviews list mixed with randomized details
  const reviewsList: Review[] = MOCK_REVIEWS.map((rev, idx) => ({
    ...rev,
    id: `rev-spec-${rev.id}-${idx}`,
    // Tweak reviews slightly for variation
    rating: idx === 1 ? Math.max(1, Math.round(product.rating - 0.5)) : Math.min(5, Math.ceil(product.rating))
  }));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto font-sans text-[#0f1111]">
      <div 
        className="bg-white rounded-md w-full max-w-5xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        id="product-details-container"
      >
        {/* Close Button top corner */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer transition-all z-10"
          id="close-details-modal-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Scrollable Core Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Main 3 Column Desktop Layout, Stacked mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Column 1: Image Frame */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-4">
              <div className="border border-gray-100 rounded-lg p-6 bg-gray-50 flex items-center justify-center min-h-[260px] md:min-h-[380px] h-full shadow-inner relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-[340px] max-w-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
                
                {product.isPrime && (
                  <span className="absolute top-3 left-3 bg-[#00a8e1] text-white font-black italic text-[11px] px-2 py-0.5 rounded-sm shadow-sm select-none">
                    prime
                  </span>
                )}
              </div>
              <span className="text-xs text-center text-gray-400">
                Roll over image to zoom | High Definition stock photo
              </span>
            </div>

            {/* Column 2: Product Specifics Center */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-3.5">
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold leading-snug text-[#0f1111] tracking-tight">
                  {product.title}
                </h1>
                <span className="text-xs text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
                  Visit the shopX {product.category} Boutique Hub
                </span>
              </div>

              {/* Score breakdown */}
              <div className="flex items-center gap-1 border-b border-gray-200 pb-3">
                <span className="font-bold text-sm text-gray-800">{product.rating.toFixed(1)}</span>
                <div className="flex items-center mr-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-xs text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline font-medium">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-xs text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline font-medium">
                  8+ answered questions
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-1 bg-gray-50 p-2.5 rounded border-l-4 border-amber-400 flex-wrap">
                <span className="text-red-700 font-bold text-xs uppercase tracking-wider bg-red-100 px-1.5 py-0.5 rounded mr-1">-25%</span>
                <span className="text-3xl font-extrabold text-gray-900 leading-none">{formatCurrency(product.price)}</span>
                <span className="text-xs text-gray-400 line-through ml-2">
                  M.R.P.: {formatCurrency(Math.round(product.price * 1.25))}
                </span>
              </div>

              {/* Brief details checklist */}
              <div className="text-xs flex flex-col gap-1 text-gray-700 font-normal">
                <div><span className="font-bold text-gray-900 w-24 inline-block">Department:</span> {product.category}</div>
                <div><span className="font-bold text-gray-900 w-24 inline-block">Availability:</span> {product.stock > 0 ? `${product.stock} units left in stock` : "Unavailable"}</div>
                <div><span className="font-bold text-gray-900 w-24 inline-block">Fulfillments:</span> Shipped from shopX Fulfillment Facility</div>
              </div>

              {/* Product Specifications / Bullet Features list */}
              <div className="border-t border-gray-200 pt-3">
                <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2.5">
                  About this item
                </h4>
                <ul className="list-disc pl-4 text-[12.5px] leading-relaxed text-[#0f1111] flex flex-col gap-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="font-normal pl-0.5">
                      <span className="text-gray-850 font-medium">{feat}</span>
                    </li>
                  ))}
                  {product.features.length === 0 && (
                    <li className="list-none italic text-gray-400 text-xs">No specifications logged by sellers.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Column 3: The Right Side Buy Box */}
            <div className="col-span-1 md:col-span-3">
              <div className="border border-[#d5d9d9] rounded-lg p-4 flex flex-col gap-3.5 bg-white shadow-sm font-sans">
                {/* Full Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold leading-none text-[#0f1111]">{formatCurrency(product.price)}</span>
                </div>

                {/* Delivery details */}
                <div className="text-xs text-gray-800 flex flex-col gap-1.5">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {product.isPrime && <span className="bg-[#00a8e1] text-white font-extrabold italic text-[9px] px-1.5 py-0.1 rounded-xs">prime</span>}
                      <span className="text-xs font-bold text-green-750">FREE Delivery</span>
                    </div>
                    <p className="text-gray-700">
                      Delivering to <span className="font-bold text-gray-900">{deliveryAddress}</span>
                    </p>
                    <p className="text-xs font-semibold text-[#0f1111] mt-1 bg-green-50 text-green-800 px-2 py-1.5 rounded-sm">
                      Estimated Delivery: {getDeliveryEstimate(deliveryAddress)}
                    </p>
                  </div>

                  {/* Ship From details */}
                  <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-[11px] leading-none">
                    <Truck className="h-3.5 w-3.5 text-amber-500" />
                    <span>Ships from and sold by shopX Corp</span>
                  </div>
                </div>

                {/* Stock Tag */}
                <div>
                  <span className={`text-sm font-semibold ${product.stock > 0 ? "text-[#007600]" : "text-red-700"}`}>
                    {product.stock > 0 ? "In Stock" : "Temporarily Out Of Stock"}
                  </span>
                  {product.stock > 0 && product.stock <= 5 && (
                    <p className="text-xs text-red-700 font-bold mt-0.5">Only {product.stock} items remaining — order soon!</p>
                  )}
                </div>

                {/* Quantity dropdown */}
                {product.stock > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-700">Quantity:</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                      id="details-qty-select"
                    >
                      {Array.from({ length: Math.min(10, product.stock) }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Trigger Buttons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    disabled={product.stock <= 0}
                    onClick={() => {
                      onAddToCart(product, qty);
                      onClose();
                    }}
                    className={`amazon-btn-primary w-full py-2.5 text-[13px] rounded ${
                      product.stock <= 0 ? "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 shadow-none" : ""
                    }`}
                    id="add-to-cart-details-btn"
                  >
                    Add to Cart
                  </button>

                  <button
                    disabled={product.stock <= 0}
                    onClick={() => {
                      onDirectCheckout({ product, quantity: qty });
                      onClose();
                    }}
                    className={`w-full py-2.5 text-[13px] font-medium text-white bg-gradient-to-b from-[#f5af19] to-[#f12711] border border-[#a23d11] hover:brightness-[1.05] rounded shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
                      product.stock <= 0 ? "opacity-50 cursor-not-allowed shadow-none" : ""
                    }`}
                    id="buy-now-details-btn"
                  >
                    <Zap className="h-4 w-4 fill-white" />
                    Buy Now and Deliver
                  </button>
                </div>

                {/* Secure purchase card */}
                <div className="flex flex-col gap-1.5 mt-1 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-600">Secure transaction system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>Return Policy: Elegant 30-Day returns</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Description & Reviews tabs pane and view */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-2.5 text-sm font-bold cursor-pointer transition-all border-b-2 leading-none ${
                  activeTab === "about"
                    ? "border-amber-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                id="tab-detail-about-btn"
              >
                Product Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2.5 text-sm font-bold cursor-pointer transition-all border-b-2 leading-none flex items-center gap-2 ${
                  activeTab === "reviews"
                    ? "border-amber-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                id="tab-detail-reviews-btn"
              >
                Customer Reviews ({product.reviewCount.toLocaleString()})
              </button>
            </div>

            {activeTab === "about" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-md">
                <div>
                  <h3 className="font-bold text-sm mb-3">Product Description</h3>
                  <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-3">Item Specifications</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm border border-gray-200 p-4 rounded bg-white">
                    <div className="text-gray-500 font-medium">Model ID</div>
                    <div className="font-semibold">{product.id}</div>
                    <div className="text-gray-500 font-medium">Department</div>
                    <div className="font-semibold">{product.category}</div>
                    <div className="text-gray-500 font-medium">Primary Class</div>
                    <div className="font-semibold">{product.isPrime ? "Prime Fully Covered" : "Standard Post"}</div>
                    <div className="text-gray-500 font-medium">Storage Safety</div>
                    <div className="font-semibold">UL Laboratories Approved</div>
                    <div className="text-gray-500 font-medium">Logged Date</div>
                    <div className="font-semibold font-mono text-xs">{product.dateAdded}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left side average ratings breakdown */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#0f1111]">Product Ratings Summary</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm font-bold">{product.rating} out of 5 stars</span>
                    </div>
                  </div>

                  {/* Rating distribution progression */}
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-10 hover:underline cursor-pointer">5 star</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div className="bg-[#f3a847] h-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="w-8 text-right font-medium">75%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 hover:underline cursor-pointer">4 star</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div className="bg-[#f3a847] h-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="w-8 text-right font-medium">15%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 hover:underline cursor-pointer">3 star</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div className="bg-[#f3a847] h-full" style={{ width: "6%" }}></div>
                      </div>
                      <span className="w-8 text-right font-medium">6%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 hover:underline cursor-pointer">2 star</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div className="bg-[#f3a847] h-full" style={{ width: "3%" }}></div>
                      </div>
                      <span className="w-8 text-right font-medium">3%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 hover:underline cursor-pointer">1 star</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div className="bg-[#f3a847] h-full" style={{ width: "1%" }}></div>
                      </div>
                      <span className="w-8 text-right font-medium">1%</span>
                    </div>
                  </div>
                </div>

                {/* Reviews comments thread list */}
                <div className="md:col-span-8 flex flex-col gap-6">
                  <h3 className="font-bold text-sm text-[#0f1111] uppercase tracking-wider mb-2">
                    Top reviews from United States
                  </h3>
                  
                  {reviewsList.map((review) => (
                    <div key={review.id} className="border-b border-gray-150 pb-5 flex flex-col gap-2">
                      {/* Avatar & Author name */}
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                          <span className="text-[10px] font-bold">{review.author.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#0f1111]">{review.author}</span>
                      </div>

                      {/* Rating details & review title */}
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating, "h-3.5 w-3.5")}</div>
                        <span className="text-xs sm:text-sm font-bold text-[#0f1111]">{review.title}</span>
                      </div>

                      {/* Metadata dates */}
                      <span className="text-gray-500 font-light text-[11px]">
                        Reviewed in the United States on {new Date(review.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>

                      {/* Verified purchase mark */}
                      <div className="text-[#c45500] font-bold text-[11px] leading-none uppercase">
                        Verified Purchase
                      </div>

                      {/* Comment text */}
                      <p className="text-xs sm:text-sm text-gray-805 leading-relaxed font-normal">
                        {review.comment}
                      </p>

                      {/* Useful votes widgets */}
                      <div className="flex items-center gap-3.5 text-xs text-gray-500 mt-1">
                        <button className="amazon-btn-secondary px-3 py-1 font-semibold text-[11px] cursor-pointer">
                          Helpful
                        </button>
                        <span>|</span>
                        <span className="cursor-pointer hover:underline text-[11px]">Report abuse</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
