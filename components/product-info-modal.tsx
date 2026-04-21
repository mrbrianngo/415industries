'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Product } from '@/lib/products';
import { PRODUCT_SPECS, getProductCategory } from '@/lib/product-info';

interface ProductInfoModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductInfoModal({ product, isOpen, onClose }: ProductInfoModalProps) {
  const category = getProductCategory(product.id);
  const specs = PRODUCT_SPECS[category];

  if (!specs) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="bg-white border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-black hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              <div className="p-8 md:p-12">
                <h2 className="font-mono text-2xl font-bold uppercase mb-8 border-b border-black pb-4">
                  {product.name}
                </h2>

                <div className="space-y-8">
                  {/* Description */}
                  <section>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      Description
                    </h3>
                    <ul className="space-y-2">
                      {specs.description.map((item, index) => (
                        <li key={index} className="font-mono text-sm leading-relaxed flex items-start">
                          <span className="mr-2 select-none">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Sizing Guide */}
                  {specs.sizingGuide.headers.length > 0 && (
                    <section>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Sizing Guide
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-mono text-xs">
                          <thead>
                            <tr>
                              <th className="border border-black p-2 text-left bg-black text-white">
                                SIZE
                              </th>
                              {specs.sizingGuide.headers.map((header) => (
                                <th key={header} className="border border-black p-2 text-center bg-black text-white">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {specs.sizingGuide.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className={`border border-black p-2 ${
                                      cellIndex === 0 ? 'text-left font-bold' : 'text-center'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
