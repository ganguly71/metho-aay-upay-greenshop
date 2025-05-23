
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
  };
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "root-vegetables",
    name: "Root Vegetables",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fruit-vegetables",
    name: "Fruit Vegetables",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "exotic",
    name: "Exotic Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "organic",
    name: "Organic Certified",
    image: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?q=80&w=600&auto=format&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "spinach-fresh",
    name: "Fresh Spinach",
    category: "leafy-greens",
    price: 35,
    unit: "250g bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop",
    description: "Crisp, dark green spinach leaves packed with nutrients. Perfect for salads, smoothies, or cooking.",
    inStock: true,
    featured: true,
    nutritionFacts: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
    },
  },
  {
    id: "carrot-organic",
    name: "Organic Carrots",
    category: "root-vegetables",
    price: 40,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=600&auto=format&fit=crop",
    description: "Sweet, crunchy organic carrots grown without pesticides. Excellent source of beta-carotene.",
    inStock: true,
    featured: true,
    nutritionFacts: {
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fiber: 2.8,
    },
  },
  {
    id: "tomato-vine",
    name: "Vine Tomatoes",
    category: "fruit-vegetables",
    price: 60,
    discountPrice: 50,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop",
    description: "Juicy, ripe tomatoes on the vine for maximum flavor. Great for salads and cooking.",
    inStock: true,
    nutritionFacts: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fiber: 1.2,
    },
  },
  {
    id: "cucumber-english",
    name: "English Cucumber",
    category: "fruit-vegetables",
    price: 30,
    unit: "each",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=600&auto=format&fit=crop",
    description: "Cool, crisp cucumber with thin skin. No need to peel!",
    inStock: true,
    nutritionFacts: {
      calories: 15,
      protein: 0.6,
      carbs: 3.6,
      fiber: 0.5,
    },
  },
  {
    id: "bell-pepper-mix",
    name: "Mixed Bell Peppers",
    category: "fruit-vegetables",
    price: 80,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=600&auto=format&fit=crop",
    description: "Colorful mix of red, yellow and green bell peppers. Sweet and crunchy!",
    inStock: true,
    featured: true,
    nutritionFacts: {
      calories: 31,
      protein: 1,
      carbs: 6,
      fiber: 2.1,
    },
  },
  {
    id: "potato-russet",
    name: "Russet Potatoes",
    category: "root-vegetables",
    price: 45,
    unit: "1kg bag",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop",
    description: "Versatile russet potatoes, perfect for baking, mashing, or roasting.",
    inStock: true,
    nutritionFacts: {
      calories: 77,
      protein: 2,
      carbs: 17,
      fiber: 1.3,
    },
  },
  {
    id: "broccoli",
    name: "Broccoli Crown",
    category: "leafy-greens",
    price: 70,
    unit: "each",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=600&auto=format&fit=crop",
    description: "Nutritious broccoli crowns, rich in vitamins and minerals.",
    inStock: true,
    featured: true,
    nutritionFacts: {
      calories: 34,
      protein: 2.8,
      carbs: 6.6,
      fiber: 2.6,
    },
  },
  {
    id: "onion-red",
    name: "Red Onions",
    category: "root-vegetables",
    price: 30,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=600&auto=format&fit=crop",
    description: "Sweet red onions perfect for salads and garnishes.",
    inStock: true,
    nutritionFacts: {
      calories: 40,
      protein: 1.1,
      carbs: 9.3,
      fiber: 1.7,
    },
  },
  {
    id: "okra-fresh",
    name: "Fresh Okra",
    category: "exotic",
    price: 50,
    unit: "250g pack",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?q=80&w=600&auto=format&fit=crop",
    description: "Tender green okra pods, ideal for curries and stir-fries.",
    inStock: true,
    nutritionFacts: {
      calories: 33,
      protein: 1.9,
      carbs: 7.5,
      fiber: 3.2,
    },
  },
  {
    id: "bitter-gourd",
    name: "Bitter Gourd",
    category: "exotic",
    price: 45,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1627965294606-8cdfab70c7fb?q=80&w=600&auto=format&fit=crop",
    description: "Fresh bitter gourd, known for its unique flavor and health benefits.",
    inStock: true,
    nutritionFacts: {
      calories: 17,
      protein: 1,
      carbs: 3.7,
      fiber: 2.8,
    },
  },
  {
    id: "methi-fresh",
    name: "Fresh Methi",
    category: "leafy-greens",
    price: 20,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1643102581129-65ab4b021ca8?q=80&w=600&auto=format&fit=crop",
    description: "Fragrant fenugreek leaves (methi) perfect for Indian cooking.",
    inStock: true,
    featured: true,
    nutritionFacts: {
      calories: 49,
      protein: 4.4,
      carbs: 6,
      fiber: 3.9,
    },
  },
  {
    id: "cabbage-green",
    name: "Green Cabbage",
    category: "leafy-greens",
    price: 35,
    unit: "each",
    image: "https://images.unsplash.com/photo-1551888633-72c93f1ce989?q=80&w=600&auto=format&fit=crop",
    description: "Crisp green cabbage head, versatile for salads and cooking.",
    inStock: true,
    nutritionFacts: {
      calories: 25,
      protein: 1.3,
      carbs: 5.8,
      fiber: 2.5,
    },
  },
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
