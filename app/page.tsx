'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '@/lib/products';
import { Header } from '@/components/header';
import { AddToCart } from '@/components/add-to-cart';
import { ProductImage } from '@/components/product-image';

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columns, setColumns] = useState(9);
  const [isPending, startTransition] = useTransition();

  const handleProductClick = (product: Product) => {
    startTransition(() => {
      setSelectedProduct(product);
      setCurrentImageIndex(0);
      window.history.pushState(null, '', `/p/${product.id}`);
    });
  };

  const handleBack = useCallback(() => {
    startTransition(() => {
      setSelectedProduct(null);
      window.history.pushState(null, '', '/');
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedProduct) {
        if (event.key === 'Escape') {
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct, handleBack]);

  useEffect(() => {
    const handlePopState = () => {
      const productId = window.location.pathname.split('/').pop();
      if (productId && productId !== '') {
        const product = products.find((p) => p.id === productId);
        if (product) {
          setSelectedProduct(product);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleColumnToggle = useCallback(() => {
    setColumns((prev) => (prev === 9 ? 6 : prev === 6 ? 3 : 9));
  }, []);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProduct) return;
    const images = selectedProduct.images || [selectedProduct.image];
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProduct) return;
    const images = selectedProduct.images || [selectedProduct.image];
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const gridColsClass = 
    columns === 9 
      ? "grid-cols-3 sm:grid-cols-6 lg:grid-cols-9" 
      : columns === 6 
      ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6" 
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isBackVisible={!!selectedProduct} 
        onBack={handleBack} 
        onColumnToggle={handleColumnToggle}
        showColumnToggle={!selectedProduct}
      />
      <main className="flex-grow relative pt-12">
        {!selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-mono text-center tracking-widest uppercase">Season 1: Legacy</h1>
            <p className="text-center text-sm mt-2 text-gray-500 font-mono">The debut collection from 415 Industries</p>
          </motion.div>
        )}
        <motion.div
          className={`grid gap-x-5 gap-y-12 pb-8 ${gridColsClass}`}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
              animate={{
                opacity: selectedProduct
                  ? selectedProduct.id === product.id
                    ? 1
                    : 0
                  : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <ProductImage
                product={product}
                layoutId={`product-image-${product.id}`}
              />
              <motion.p
                className="font-medium text-center font-mono uppercase"
                animate={{
                  opacity: selectedProduct
                    ? selectedProduct.id === product.id
                      ? 1
                      : 0
                    : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {product.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-between bg-white bg-opacity-90"
              style={{
                top: '0',
                height:
                  'calc(100vh - 80px - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
                paddingTop: 'calc(20px + env(safe-area-inset-top))',
                paddingBottom: '0',
              }}
            >
              <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center p-4 relative">
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <button onClick={handlePrevImage} className="absolute left-4 md:left-12 z-20 p-2 hover:opacity-70 transition-opacity" aria-label="Previous image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                )}
                
                <ProductImage
                  product={selectedProduct}
                  maxWidth="100%"
                  maxHeight="calc(100vh - 250px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
                  className="w-full"
                  layoutId={`product-image-${selectedProduct.id}`}
                  srcOverride={selectedProduct.images ? selectedProduct.images[currentImageIndex] : selectedProduct.image}
                />

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <button onClick={handleNextImage} className="absolute right-4 md:right-12 z-20 p-2 hover:opacity-70 transition-opacity" aria-label="Next image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                )}

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                 <div className="absolute bottom-8 flex space-x-3">
                   {selectedProduct.images.map((_, idx) => (
                     <div key={idx} className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${idx === currentImageIndex ? 'bg-black' : 'bg-gray-300'}`} />
                   ))}
                 </div>
                )}
              </div>

              <motion.div
                className="w-full max-w-md mx-auto p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <AddToCart product={selectedProduct} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
