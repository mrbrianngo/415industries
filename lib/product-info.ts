export interface SizingGuide {
  headers: string[];
  rows: string[][];
}

export interface ProductSpecs {
  description: string[];
  sizingGuide: SizingGuide;
}

export const PRODUCT_SPECS: Record<string, ProductSpecs> = {
  shirts: {
    description: [
      'Boxy, relaxed fit short-sleeve tee.',
      'Heavyweight 7.5 oz. 100% cotton jersey.',
      'Drop shoulder silhouette.',
      'Double-stitched, 3/4” neckband.',
      'Screenprinted graphics on left chest and back.',
      'Constructed with shoulder taping and side seams for durability.',
      'Unisex.',
      '16 singles for a premium, thick hand-feel.',
    ],
    sizingGuide: {
      headers: ['S', 'M', 'L', 'XL', '2XL'],
      rows: [
        ['Body Length', '28', '28 1/2', '29 1/2', '30 3/4', '32 1/4'],
        ['Chest Width (Laid Flat)', '20 7/8', '21 7/8', '23 7/8', '25 7/8', '25 7/8'],
        ['Sleeve Length', '7 3/4', '8 1/4', '8 3/4', '9 1/4', '9 3/4'],
      ],
    },
  },
  hoodies: {
    description: [
      'Relaxed fit pullover hooded sweatshirt.',
      'Mid-weight 9.4 oz. 80% cotton / 20% recycled polyester CVC fleece.',
      'Drop shoulder silhouette.',
      'Self-fabric-lined hood without drawcord.',
      'Screenprinted graphics at left/right chest and back.',
      'Kangaroo pocket.',
      'Sleeve cuff ribbing.',
      'Garment dyed finish for a faded, lived-in feel.',
      'Pre-shrunk to minimize shrinkage.',
      'Unisex.',
    ],
    sizingGuide: {
      headers: ['S', 'M', 'L', 'XL', '2XL'],
      rows: [
        ['Body Width', '22 1/2', '23 1/2', '24 3/4', '26', '27 1/4'],
        ['Body Length', '27 3/4', '28 3/4', '29 3/4', '30 3/4', '31 3/4'],
      ],
    },
  },
  'quarter-zips': {
    description: [
      'Regular fit quarter-zip sweatshirt.',
      'Mid-heavy weight 10.3 oz. 80% cotton / 20% recycled polyester anti-pill CVC fleece.',
      'Mock neck collar with silver SBS zip at front placket.',
      'Screenprinted graphics at left/right chest and back.',
      'Ribbed sleeve cuffs and hem.',
      'Pre-shrunk to minimize shrinkage.',
      'Cotton facing on fleece for a premium soft-touch exterior.',
      'Unisex.',
    ],
    sizingGuide: {
      headers: ['S', 'M', 'L', 'XL', '2XL'],
      rows: [
        ['Body Width', '20 1/2', '21 3/4', '22 3/4', '26', '25 1/4'],
        ['Body Length', '28 1/2', '29 1/2', '30 1/2', '30 3/4', '32 1/2'],
      ],
    },
  },
  polo: {
    description: [
      'Modern classic fit short sleeve polo.',
      'Premium 5.2 oz. ring-spun cotton double pique weave.',
      'Sport Grey variant constructed with 90% cotton / 10% polyester blend.',
      'Screenprinted graphics at left chest and right sleeve.',
      'Rolled forward shoulders and reinforced side seams for an engineered silhouette.',
      'Clean-finished placket with two color-matched buttons.',
      'Highly breathable fabric optimized for durability.',
      'Double-needle stitching throughout for a polished finish.',
      'Men\'s: Classic tailored fit with standard sleeve length.',
      'Women\'s: Contoured silhouette with shorter, refined sleeve styling.',
    ],
    sizingGuide: {
      headers: [],
      rows: [],
    },
  },
};

export function getProductCategory(productId: string): string {
  const id = productId.toLowerCase();
  if (id.includes('hoodie')) return 'hoodies';
  if (id.includes('tee') || id.includes('shirt')) return 'shirts';
  if (id.includes('quarter-zip')) return 'quarter-zips';
  if (id.includes('polo')) return 'polo';
  return 'shirts'; // Default
}
