import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartDrawer from "./components/CartDrawer";
import AdminPanel from "./components/AdminPanel";
import { Product, CartItem } from "./types";
import { INITIAL_PRODUCTS } from "./mockData";
import { ShoppingBag, ArrowRight, ShieldCheck, HelpCircle, CornerDownRight, Sparkles } from "lucide-react";

const CATEGORIES = ["Electronics", "Home & Kitchen", "Apparel", "Sports & Outdoors", "Books"];

export default function App() {
  // 1. Core State Managers
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("amazon_clone_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved product records", err);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("amazon_clone_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved cart items", err);
      }
    }
    return [];
  });

  const [currentTab, setCurrentTab] = useState<"store" | "admin">("store");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    return localStorage.getItem("shopx_delivery_address") || "New Delhi, Delhi 110001";
  });

  // App-level notification banners
  const [appNotification, setAppNotification] = useState<{ msg: string; type: "success" | "warn" } | null>(null);

  // Sync deliveryAddress to storage
  useEffect(() => {
    localStorage.setItem("shopx_delivery_address", deliveryAddress);
  }, [deliveryAddress]);

  // Sync products state to local storage on adjustments
  useEffect(() => {
    localStorage.setItem("amazon_clone_products", JSON.stringify(products));
  }, [products]);

  // Sync cart state to local storage on adjustments
  useEffect(() => {
    localStorage.setItem("amazon_clone_cart", JSON.stringify(cart));
  }, [cart]);

  // Trigger floating alert banner
  const triggerAppNotification = (msg: string, type: "success" | "warn" = "success") => {
    setAppNotification({ msg, type });
    const timer = setTimeout(() => setAppNotification(null), 3000);
    return () => clearTimeout(timer);
  };

  // 2. Shopping Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    // Audit active product stock quotas
    const currentInventoryProduct = products.find((p) => p.id === product.id);
    if (!currentInventoryProduct) {
      triggerAppNotification("Product not found in system records.", "warn");
      return;
    }

    const cartItem = cart.find((item) => item.product.id === product.id);
    const existingQty = cartItem ? cartItem.quantity : 0;
    const requestedTotal = existingQty + quantity;

    if (requestedTotal > currentInventoryProduct.stock) {
      triggerAppNotification(
        `Unable to add item. Capitalized stock limits are ${currentInventoryProduct.stock} units (You already have ${existingQty} inside cart).`,
        "warn"
      );
      return;
    }

    setCart((prevCart) => {
      const match = prevCart.find((item) => item.product.id === product.id);
      if (match) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: requestedTotal }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    triggerAppNotification(`Successfully added ${quantity}x "${product.title.slice(0, 30)}..." to your shopping cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const currentInventoryProduct = products.find((p) => p.id === productId);
    if (!currentInventoryProduct) return;

    if (quantity > currentInventoryProduct.stock) {
      triggerAppNotification(
        `Insufficient catalog count. Only ${currentInventoryProduct.stock} stock units remaining.`,
        "warn"
      );
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerAppNotification("Item removed from cart layout.");
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Immediate "Buy Now" checkout bypass: injects item and auto-propmts payment steps
  const handleDirectCheckout = (item: CartItem) => {
    setCart([item]);
    setIsCartOpen(true);
    triggerAppNotification(`Direct shipping channel opened for "${item.product.title.slice(0, 30)}..."`);
  };

  // 3. Filtering logic computations
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchQuery =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory ? p.category === selectedCategory : true;

      return matchQuery && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Combine unique categories present inside catalog to allow custom additions filter too
  const dynamicCategories = useMemo(() => {
    const fromProducts = Array.from(new Set(products.map((p) => p.category)));
    // Blend with default lists to maintain standard departments
    return Array.from(new Set([...CATEGORIES, ...fromProducts])).filter(Boolean);
  }, [products]);

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col font-sans text-gray-900 overflow-x-hidden pb-12 antialiased">
      {/* 1. Primary Header Navigation */}
      <Navbar
        cart={cart}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={dynamicCategories}
        onOpenCart={() => setIsCartOpen(true)}
        totalProductsCount={products.length}
        deliveryAddress={deliveryAddress}
        onChangeDeliveryAddress={setDeliveryAddress}
      />

      {/* App Alert system widget */}
      {appNotification && (
        <div className="fixed top-20 left-1/2 translate-x-[-50%] bg-[#232f3e] z-50 text-white rounded-md px-6 py-3.5 shadow-2xl flex items-center gap-3 border border-gray-700 animate-slide-down pointer-events-auto">
          <div className={`h-2.5 w-2.5 rounded-full ${appNotification.type === "success" ? "bg-green-500 animate-ping" : "bg-amber-500 animate-pulse"}`} />
          <span className="text-xs font-semibold leading-none">{appNotification.msg}</span>
        </div>
      )}

      {/* 2. Core Tab Switching Views */}
      <main className="flex-grow w-full relative">
        {currentTab === "store" ? (
          /* ==================== STOREFRONT SCREEN ==================== */
          <div className="flex flex-col w-full">
            {/* Promo Slider Banner (only displayed when search filters are empty to clean workspace) */}
            {!searchQuery && !selectedCategory ? (
              <HeroSlider />
            ) : (
              <div className="bg-[#232f3e] text-white p-4 text-xs font-medium border-t border-gray-800 flex items-center gap-2 shadow-inner">
                <ShoppingBag className="h-4.5 w-4.5 text-[#febd69]" />
                <span>
                  Showing search results for <span className="text-[#febd69] font-bold">"{searchQuery || selectedCategory}"</span> &bull; Found {filteredProducts.length} matching departments in current catalog schema
                </span>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}
                    className="ml-auto bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 px-2.5 py-1 rounded text-white text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            )}

            {/* Shopping shelf section */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full -mt-12 sm:-mt-24 md:-mt-32 lg:-mt-36 relative z-20 flex flex-col gap-8">
              
              {/* Category Quick Selector Cards (Only on empty filter/landing) */}
              {!searchQuery && !selectedCategory && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Card 1 */}
                  <div className="bg-white p-4 rounded-sm shadow-sm flex flex-col justify-between border border-gray-200">
                    <h3 className="font-extrabold text-base tracking-tight mb-2 text-gray-900">Electronics Essentials</h3>
                    <img
                      src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60"
                      alt="Tech"
                      className="h-[120px] w-full object-contain mb-3"
                    />
                    <button
                      onClick={() => setSelectedCategory("Electronics")}
                      className="text-[#007185] text-xs font-bold hover:text-[#c45500] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Shop Tech Gadgets</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Category Card 2 */}
                  <div className="bg-white p-4 rounded-sm shadow-sm flex flex-col justify-between border border-gray-200">
                    <h3 className="font-extrabold text-base tracking-tight mb-2 text-gray-900">Home & Culinary</h3>
                    <img
                      src="https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=600&auto=format&fit=crop&q=60"
                      alt="Home"
                      className="h-[120px] w-full object-contain mb-3"
                    />
                    <button
                      onClick={() => setSelectedCategory("Home & Kitchen")}
                      className="text-[#007185] text-xs font-bold hover:text-[#c45500] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Browse Appliances</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Category Card 3 */}
                  <div className="bg-white p-4 rounded-sm shadow-sm flex flex-col justify-between border border-gray-200">
                    <h3 className="font-extrabold text-base tracking-tight mb-2 text-gray-900">Wardrobe Apparel</h3>
                    <img
                      src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60"
                      alt="Apparel"
                      className="h-[120px] w-full object-contain mb-3"
                    />
                    <button
                      onClick={() => setSelectedCategory("Apparel")}
                      className="text-[#007185] text-xs font-bold hover:text-[#c45500] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Explore Wearwear</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Category Card 4 */}
                  <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200 flex flex-col justify-between">
                    <h3 className="font-extrabold text-base tracking-tight mb-2 text-gray-900">Sandbox Admin Center</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      Direct access panel to rewrite listed prices, audit stock metrics, or randomly inject new products into live shop shelves instantly.
                    </p>
                    <button
                      onClick={() => setCurrentTab("admin")}
                      className="w-full bg-[#f0c14b] hover:bg-[#eeb933] border border-[#a88734] text-xs font-bold text-gray-900 py-1.5 rounded-sm shadow-sm cursor-pointer transition-transform duration-200 text-center"
                      id="card-admin-link"
                    >
                      Open Administrative Panel &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Product Shelf Grid Row */}
              <div className={`flex flex-col gap-4 ${!searchQuery && !selectedCategory ? "mt-4" : "mt-16"}`}>
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 flex-wrap gap-2">
                  <h2 className="font-extrabold text-xl tracking-tight text-gray-900 flex items-center gap-1.5 leading-none">
                    <span>{selectedCategory || "Our Departmental Catalog Specialities"}</span>
                    {!selectedCategory && !searchQuery && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ml-2">Today's Highlights</span>
                    )}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">Showing {filteredProducts.length} premium selections</span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        deliveryAddress={deliveryAddress}
                        onAddToCart={(p, e) => {
                          e.stopPropagation();
                          handleAddToCart(p, 1);
                        }}
                        onSelectProduct={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-12 text-center rounded-sm border border-gray-200 shadow-sm flex flex-col items-center gap-3">
                    <ShoppingBag className="h-16 w-16 text-gray-300" />
                    <h3 className="font-bold text-base text-gray-900">No Matching Products In Catalog</h3>
                    <p className="text-xs text-gray-500 leading-normal max-w-sm">
                      We couldn't locate any products matching your query filters inside the active database state. Try adjusting search words, or head over to the Admin Center to generate random items!
                    </p>
                    <div className="flex gap-2.5 mt-2">
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("");
                        }}
                        className="amazon-btn-secondary px-4 py-2 text-xs font-semibold"
                      >
                        Reset Search Filters
                      </button>
                      <button
                        onClick={() => setCurrentTab("admin")}
                        className="amazon-btn-primary px-4 py-2 text-xs"
                      >
                        Go to Admin Panel &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informational corporate banner details representing trustworthy specs */}
              <div className="bg-white mt-12 p-6 rounded-sm border border-gray-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 select-none font-sans">
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Sandbox Transaction Guarantee</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">Our server environment secures simulated checkout tokens locally. Test shopping workflows without checking credit line margins.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Dynamic Procedural Generator</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">Need realistic objects instantly? Use the Admin's bulk integration triggers to create endless high-density cards with ratings, graphics, and descriptions.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shrink-0">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Need Guidance Assistance?</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">Locate active components by typing e.g. "sony", "watch" or "bottle" inside our navigation search bar. Live results recalculate on every keystroke.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ==================== ADMINISTRATION CONTROL SCREEN ==================== */
          <div className="animate-fade-in">
            <AdminPanel
              products={products}
              setProducts={setProducts}
              categories={dynamicCategories}
            />
          </div>
        )}
      </main>

      {/* 3. Global Interactive Detail Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        deliveryAddress={deliveryAddress}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onDirectCheckout={(item) => handleDirectCheckout(item)}
      />

      {/* 4. Global Interactive Shopping cart Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        deliveryAddress={deliveryAddress}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
