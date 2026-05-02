"use client";

import Image from "next/image";
import { ShoppingCart, Star, Filter } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Pure Vitality B-Complex",
    category: "Supplements",
    price: "$24.99",
    rating: 4.8,
    image: "/products.png",
  },
  {
    id: 2,
    name: "Organic Glow Face Oil",
    category: "Skincare",
    price: "$32.50",
    rating: 4.9,
    image: "/products.png",
  },
  {
    id: 3,
    name: "Immune Boost Wellness Kit",
    category: "Wellness",
    price: "$45.00",
    rating: 4.7,
    image: "/products.png",
  },
  {
    id: 4,
    name: "Deep Sleep Magnesium",
    category: "Supplements",
    price: "$19.99",
    rating: 4.6,
    image: "/products.png",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              Featured Products
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Explore Our <span className="text-primary">Wellness Essentials</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-2xl font-bold text-foreground hover:bg-border/30 transition-all shrink-0">
            <Filter size={18} />
            Filter By Category
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[32px] p-4 border border-border/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-6 bg-mint-50/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                  <ShoppingCart size={18} />
                </button>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star size={14} fill="currentColor" />
                    {product.rating}
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-display font-bold text-primary">
                    {product.price}
                  </span>
                  <button className="text-sm font-bold text-foreground underline hover:text-primary transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
