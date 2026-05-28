import React from "react";
import { Star, StarHalf } from "lucide-react";
import { Product } from "../types";
import { formatCurrency, getDeliveryEstimate } from "../utils/format";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  deliveryAddress: string;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({ product, deliveryAddress, onAddToCart, onSelectProduct }: ProductCardProps) {
  // Helpert to render star ratings based on number 1-5
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-[#f3a847] text-[#f3a847]" />
        );
      } else if (i === floorRating + 1 && hasHalf) {
        stars.push(
          <StarHalf key={i} className="h-3.5 w-3.5 fill-[#f3a847] text-[#f3a847]" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-xs p-4 flex flex-col justify-between cursor-pointer border border-[#e7e7e7] hover:shadow-lg hover:border-gray-300 transition-all duration-200 h-full group"
      id={`product-card-${product.id}`}
    >
      <div className="flex flex-col gap-2">
        {/* Aspect Ratio limited Product Image Container */}
        <div className="w-full h-[180px] flex items-center justify-center overflow-hidden bg-gray-50 rounded-xs mb-2 relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-[170px] max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {product.stock <= 5 && (
            <span className="absolute top-1 left-1.5 bg-red-600 text-white font-bold text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-sm">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Category tag */}
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">
          {product.category}
        </span>

        {/* Product Title */}
        <h2 className="text-[13.5px] font-medium text-[#0f1111] leading-tight hover:text-[#c45500] line-clamp-3 min-h-[50px] overflow-hidden">
          {product.title}
        </h2>

        {/* Ratings Section */}
        <div className="flex items-center gap-1 mt-1 text-xs">
          <span className="text-gray-800 font-semibold">{product.rating.toFixed(1)}</span>
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-[#007185] hover:text-[#c45500] hover:underline font-light text-[11px] ml-0.5">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price Breakdown block */}
        <div className="flex items-baseline mt-2 gap-1.5 flex-wrap">
          {/* Main Price */}
          <span className="text-xl font-bold leading-none tracking-tight text-[#0f1111]">{formatCurrency(product.price)}</span>

          {/* Regular Tag markup */}
          <span className="text-xs text-gray-400 line-through self-center">
            {formatCurrency(Math.round(product.price * 1.25))}
          </span>
        </div>

        {/* Prime Tag indicator */}
        <div className="flex flex-col gap-1 mt-1.5 min-h-[18px]">
          {product.isPrime ? (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="bg-[#00a8e1] text-white font-black italic text-[9px] px-1 py-0.2 rounded-xs select-none">
                  prime
                </span>
                <span className="text-[11px] font-bold text-green-700">
                  FREE Delivery
                </span>
              </div>
              <span className="text-[10.5px] text-gray-500 leading-tight">
                To <span className="font-semibold text-gray-700">{deliveryAddress}</span>: <span className="font-bold text-gray-800">{getDeliveryEstimate(deliveryAddress)}</span>
              </span>
            </div>
          ) : (
            <span className="text-[10.5px] text-gray-500 leading-tight">
              Delivery to <span className="font-semibold text-gray-700">{deliveryAddress}</span>: <span className="font-bold text-gray-800">{getDeliveryEstimate(deliveryAddress)}</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-1 flex flex-col gap-2">
        {/* Stock warning */}
        <span className={`text-[11px] leading-none ${product.stock > 0 ? "text-[#007600]" : "text-red-700 font-bold"}`}>
          {product.stock > 0 ? "In Stock" : "Temporarily Out Of Stock"}
        </span>

        {/* Quick Add Button */}
        <button
          disabled={product.stock <= 0}
          onClick={(e) => onAddToCart(product, e)}
          className={`amazon-btn-primary w-full py-1.5 text-xs select-none ${
            product.stock <= 0 ? "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300" : ""
          }`}
          id={`add-to-cart-quick-${product.id}`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
