export interface Product {
  id: string;
  name: string;
  image: string;
  images?: string[];
}

export const products: Product[] = [
  {
    id: 'classic-hoodie-legacy',
    name: "CLASSIC HOODIE 'LEGACY'",
    image: '/products/classic hoodie back.png',
    images: ['/products/classic hoodie back.png', '/products/hoodie front.png'],
  },
  {
    id: 'classic-tee-legacy',
    name: "CLASSIC TEE 'LEGACY'",
    image: '/products/classic tee back.png',
    images: ['/products/classic tee back.png', '/products/t shirt front.png'],
  },
  {
    id: 'rover-hoodie-drilled',
    name: "ROVER HOODIE 'DRILLED'",
    image: '/products/drilled hoodie back.png',
    images: ['/products/drilled hoodie back.png', '/products/hoodie front.png'],
  },
  {
    id: 'rover-tee-drilled',
    name: "ROVER TEE 'DRILLED'",
    image: '/products/drilled tee front.png',
    images: ['/products/drilled tee front.png', '/products/t shirt front.png'],
  },
  {
    id: 'quarter-zip-matcha',
    name: "QUARTER ZIP 'MATCHA'",
    image: '/products/green quarter zip front.png',
    images: ['/products/green quarter zip front.png', '/products/green quarter zip back.jpg'],
  },
  {
    id: 'quarter-zip-cobalt',
    name: "QUARTER ZIP 'COBALT'",
    image: '/products/black quarter zip front.png',
    images: ['/products/black quarter zip front.png', '/products/black quarter zip back.jpg'],
  },
  {
    id: 'mooned-hoodie-manny',
    name: "MOONED HOODIE 'MANNY'",
    image: '/products/manny hoodie back.png',
    images: ['/products/manny hoodie back.png', '/products/hoodie front.png'],
  },
  {
    id: 'mooned-tee-manny',
    name: "MOONED TEE 'MANNY'",
    image: '/products/manny tee back.png',
    images: ['/products/manny tee back.png', '/products/t shirt front.png'],
  },
  {
    id: 'sports-tee-athlos',
    name: "SPORTS TEE 'ATHLOS'",
    image: '/products/athlos tee front.png',
    images: ['/products/athlos tee front.png', '/products/athlos tee back.jpg'],
  },
  {
    id: 'team-polo-legacy',
    name: "TEAM POLO 'LEGACY'",
    image: '/products/legacy polo front.png',
    images: ['/products/legacy polo front.png', '/products/legacy polo back.png'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
