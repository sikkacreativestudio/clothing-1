 // =====================================================
// YARDS — PRODUCT DATABASE
// 6 Men's Products + 6 Women's Products
// =====================================================

const products = [
  {
    id: 1,
    name: "Essential Oversized T-Shirt",
    category: "Men",
    type: "T-Shirts",
    price: 999,
    oldPrice: 1299,
    badge: "BESTSELLER",
    description:
      "A premium oversized T-shirt with a relaxed fit for everyday style.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    colors: ["Black", "White", "Beige"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 2,
    name: "Premium Streetwear Hoodie",
    category: "Men",
    type: "Hoodies",
    price: 1999,
    oldPrice: 2499,
    badge: "TRENDING",
    description:
      "A comfortable premium hoodie designed for a modern streetwear look.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    colors: ["Black", "Grey", "Cream"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 3,
    name: "Classic Casual Shirt",
    category: "Men",
    type: "Shirts",
    price: 1499,
    oldPrice: 1799,
    badge: "NEW",
    description:
      "A versatile casual shirt for smart everyday outfits.",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
    colors: ["White", "Blue", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 4,
    name: "Modern Denim Jacket",
    category: "Men",
    type: "Jackets",
    price: 2799,
    oldPrice: 3299,
    badge: "POPULAR",
    description:
      "A timeless denim jacket that adds character to your outfit.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 5,
    name: "Relaxed Fit Trousers",
    category: "Men",
    type: "Trousers",
    price: 1799,
    oldPrice: 2199,
    badge: "",
    description:
      "Relaxed-fit trousers with a clean silhouette and versatile styling.",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    colors: ["Black", "Beige", "Olive"],
    sizes: ["30", "32", "34", "36"]
  },

  {
    id: 6,
    name: "Minimal Everyday Sneakers",
    category: "Men",
    type: "Footwear",
    price: 2499,
    oldPrice: 2999,
    badge: "LIMITED",
    description:
      "Minimal sneakers designed to complement casual and streetwear outfits.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    colors: ["White", "Black", "Red"],
    sizes: ["7", "8", "9", "10", "11"]
  },


  // ================= WOMEN'S COLLECTION =================

  {
    id: 7,
    name: "Elegant Everyday Top",
    category: "Women",
    type: "Tops",
    price: 899,
    oldPrice: 1199,
    badge: "BESTSELLER",
    description:
      "An elegant everyday top designed for effortless modern styling.",
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85",
    colors: ["White", "Black", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  {
    id: 8,
    name: "Premium Oversized Sweatshirt",
    category: "Women",
    type: "Sweatshirts",
    price: 1599,
    oldPrice: 1999,
    badge: "TRENDING",
    description:
      "A soft oversized sweatshirt with a relaxed contemporary silhouette.",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    colors: ["Grey", "Cream", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  {
    id: 9,
    name: "Classic Denim Jeans",
    category: "Women",
    type: "Jeans",
    price: 1699,
    oldPrice: 2099,
    badge: "POPULAR",
    description:
      "Classic denim jeans designed for versatile everyday outfits.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    colors: ["Blue", "Black"],
    sizes: ["26", "28", "30", "32", "34"]
  },

  {
    id: 10,
    name: "Contemporary Fashion Dress",
    category: "Women",
    type: "Dresses",
    price: 2299,
    oldPrice: 2799,
    badge: "NEW",
    description:
      "A contemporary dress designed for a refined, fashionable look.",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85",
    colors: ["Black", "Red", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  {
    id: 11,
    name: "Chic Women's Jacket",
    category: "Women",
    type: "Jackets",
    price: 2699,
    oldPrice: 3199,
    badge: "LIMITED",
    description:
      "A statement jacket that brings a polished finish to your outfit.",
    image:
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=900&q=85",
    colors: ["Black", "Brown", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  {
    id: 12,
    name: "Minimal Women's Sneakers",
    category: "Women",
    type: "Footwear",
    price: 2399,
    oldPrice: 2899,
    badge: "POPULAR",
    description:
      "Modern sneakers made for everyday comfort and effortless style.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    colors: ["White", "Black", "Pink"],
    sizes: ["4", "5", "6", "7", "8"]
  }
];


// Make products available to script.js
 window.YARDS_PRODUCTS = products;