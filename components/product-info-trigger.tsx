'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { type Product } from '@/lib/products';
import { ProductInfoModal } from './product-info-modal';

export function ProductInfoTrigger({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productName = product.id
    .split('-')
    .slice(0, -1)
    .join('-')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full max-w-[320px] mx-auto">
        <div className="flex flex-col items-center">
          {/* Product Name */}
          <div className="h-8 relative w-full flex justify-center items-center overflow-hidden">
            <p className="font-medium font-mono uppercase">
              {productName}
            </p>
          </div>

          {/* Info Button */}
          <div className="mt-8 relative w-full h-12 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 flex items-center justify-center bg-transparent hover:opacity-50 transition-opacity font-mono text-xs font-bold uppercase tracking-widest"
              aria-label="Product Information"
            >
              Information
            </button>
          </div>
        </div>
      </div>

      <ProductInfoModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
