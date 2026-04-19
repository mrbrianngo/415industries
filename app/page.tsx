'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '@/lib/products';
import { Header } from '@/components/header';
import { AddToCart } from '@/components/add-to-cart';
import { ProductImage } from '@/components/product-image';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0
    };
  },
  center: {
    z: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      z: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    };
  }
};

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeSeason, setActiveSeason] = useState('Season 1: Legacy Robotics');
  const [columns, setColumns] = useState(6);
  const [isPending, startTransition] = useTransition();

  const dynamicSeasons = Array.from(new Set(products.map(p => p.season)));
  const seasons = Array.from(new Set(['Season 1: Legacy Robotics', 'Season 2', ...dynamicSeasons]));
  const filteredProducts = products.filter(p => p.season === activeSeason);

  const handleProductClick = (product: Product) => {
    startTransition(() => {
      setSelectedProduct(product);
      setCurrentImageIndex(0);
      setDirection(0);
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
        } else if (event.key === 'ArrowRight') {
          handleNextImage(event as any);
        } else if (event.key === 'ArrowLeft') {
          handlePrevImage(event as any);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, handleBack, currentImageIndex]);

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
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleColumnToggle = useCallback(() => {
    setColumns((prev) => (prev === 6 ? 4 : prev === 4 ? 2 : 6));
  }, []);

  const handlePrevImage = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (!selectedProduct) return;
    const images = selectedProduct.images || [selectedProduct.image];
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (!selectedProduct) return;
    const images = selectedProduct.images || [selectedProduct.image];
    setDirection(1);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const gridColsClass = 
    columns === 6 
      ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6" 
      : columns === 4 
      ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4" 
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isBackVisible={!!selectedProduct} 
        onBack={handleBack} 
        onColumnToggle={handleColumnToggle}
        showColumnToggle={!selectedProduct}
      />
      <main className="flex-grow relative pt-16 px-5">
        {!selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8"
          >
            <div className="flex justify-center space-x-6 overflow-x-auto pb-2 mb-6">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setActiveSeason(season)}
                  className={`pb-2 text-sm font-mono tracking-widest uppercase transition-colors relative whitespace-nowrap ${
                    activeSeason === season ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {season}
                  {activeSeason === season && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" 
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500 font-mono tracking-widest text-sm uppercase">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              Loading...
            </motion.div>
          </div>
        ) : (
          <motion.div
            className={`grid gap-x-5 gap-y-12 pb-8 ${gridColsClass}`}
          >
            {filteredProducts.map((product) => (
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
                className="font-medium text-center font-mono uppercase mt-2 text-sm"
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
        )}

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-between bg-white bg-opacity-90 z-50"
              style={{
                height: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
                paddingTop: 'calc(60px + env(safe-area-inset-top))',
                paddingBottom: '0',
              }}
              onClick={handleBack}
            >
              <div className="absolute top-4 left-4 z-50">
                <button onClick={handleBack} className="p-2 hover:opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
              </div>

              <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <button onClick={handlePrevImage} className="absolute left-4 md:left-12 z-20 p-2 hover:opacity-70 transition-opacity hidden md:block" aria-label="Previous image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                )}
                
                <div className="relative w-full h-full flex items-center justify-center">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentImageIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                          handleNextImage();
                        } else if (swipe > swipeConfidenceThreshold) {
                          handlePrevImage();
                        }
                      }}
                      className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing bg-white"
                    >
                      <ProductImage
                        product={selectedProduct}
                        maxWidth="100%"
                        maxHeight="calc(100vh - 250px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
                        className="w-full"
                        layoutId={currentImageIndex === 0 ? `product-image-${selectedProduct.id}` : undefined}
                        srcOverride={selectedProduct.images ? selectedProduct.images[currentImageIndex] : selectedProduct.image}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <button onClick={handleNextImage} className="absolute right-4 md:right-12 z-20 p-2 hover:opacity-70 transition-opacity hidden md:block" aria-label="Next image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                )}

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                 <div className="absolute bottom-8 flex space-x-3 z-20">
                   {selectedProduct.images.map((_, idx) => (
                     <div key={idx} className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${idx === currentImageIndex ? 'bg-black' : 'bg-gray-300'}`} />
                   ))}
                 </div>
                )}
              </div>

              <motion.div
                className="w-full max-w-md mx-auto p-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={(e) => e.stopPropagation()}
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
