export interface Product {
  name: string;
  detail: string;
  price: string;
  image: string;
  badge?: string;
  subscribePrice?: string;
}

export const bestSellers: Product[] = [
  {
    name: "Full Tank | Workout Fuel",
    detail: "Blue Slushy",
    price: "$49.95",
    image: "/images/products/full-tank.png",
    badge: "Best Seller",
  },
  {
    name: "Elevated | Natural T Booster",
    detail: "30 Day Supply",
    price: "$69.95",
    image: "/images/products/elevated.png",
    badge: "4.8 ★ Rated",
  },
  {
    name: "One Scoop Only | Pre Workout",
    detail: "Fruit Snacks",
    price: "$49.95",
    image: "/images/products/one-scoop-only.png",
  },
  {
    name: "RF-350 | Muscle Accelerator",
    detail: "RipFactor® Formula",
    price: "$39.95",
    image: "/images/products/rf-350.png",
  },
  {
    name: "Sleep + Recover",
    detail: "Nighttime Recovery",
    price: "$54.95",
    image: "/images/products/sleep-recover.png",
  },
  {
    name: "Ecdysterone | Natural Anabolic",
    detail: "Lean Muscle Builder",
    price: "$44.95",
    image: "/images/products/ecdysterone.png",
  },
  {
    name: "Magnesium | 3-Source Blend",
    detail: "Recovery & Sleep",
    price: "$26.95",
    image: "/images/products/magnesium.png",
  },
  {
    name: "Multivitamin | High Bioavailability",
    detail: "Daily Health Foundation",
    price: "$34.95",
    image: "/images/products/multivitamin.png",
  },
];

export const subscribeSave: Product[] = [
  {
    name: "Elevated | Natural T Booster",
    detail: "30 Day Supply",
    price: "$69.95",
    subscribePrice: "$59.45",
    image: "/images/products/elevated.png",
  },
  {
    name: "Full Tank | Workout Fuel",
    detail: "Blue Slushy",
    price: "$49.95",
    subscribePrice: "$42.45",
    image: "/images/products/full-tank.png",
  },
  {
    name: "One Scoop Only | Pre Workout",
    detail: "Fruit Snacks",
    price: "$49.95",
    subscribePrice: "$42.45",
    image: "/images/products/one-scoop-only.png",
  },
  {
    name: "Sleep + Recover",
    detail: "Nighttime Recovery",
    price: "$54.95",
    subscribePrice: "$46.70",
    image: "/images/products/sleep-recover.png",
  },
];
