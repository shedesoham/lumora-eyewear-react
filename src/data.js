export const FRAME_COLORS = {
  midnight: { name: 'Midnight Ink', swatch: '#252527', frame: '#292929', highlight: '#77736e', shadow: '#111311', lens: '#c5e9e6' },
  amber: { name: 'Amber Tortoise', swatch: '#9a5c35', frame: '#865139', highlight: '#e1a565', shadow: '#4c291f', lens: '#f4dcb7' },
  crystal: { name: 'Crystal Clear', swatch: '#d8dad3', frame: '#d9dfd8', highlight: '#ffffff', shadow: '#7d8985', lens: '#d1f1e8' },
  olive: { name: 'Olive Moss', swatch: '#586657', frame: '#4a5e50', highlight: '#a2ac80', shadow: '#293b2e', lens: '#d5e6c9' },
  rose: { name: 'Rose Quartz', swatch: '#c8888b', frame: '#c58e92', highlight: '#efc8b4', shadow: '#80575e', lens: '#e4d3df' },
  blue: { name: 'Deep Cobalt', swatch: '#415b89', frame: '#40577e', highlight: '#9ab0d1', shadow: '#223750', lens: '#d4e9f5' },
};

export const products = [
  { id: 1, name: 'The Arlo', subtitle: 'Everyday rectangle', color: 'midnight', category: 'Eyeglasses', shape: 'square', price: 2499, oldPrice: 3299, tag: 'BESTSELLER', bg: 'sand', rating: '4.9', reviews: 126 },
  { id: 2, name: 'The Sienna', subtitle: 'Soft cat-eye', color: 'amber', category: 'Eyeglasses', shape: 'cat', price: 2899, oldPrice: 3599, tag: 'NEW DROP', bg: 'lavender', rating: '4.8', reviews: 94 },
  { id: 3, name: 'The Nico', subtitle: 'Effortless round', color: 'olive', category: 'Eyeglasses', shape: 'round', price: 2199, oldPrice: 2799, tag: '', bg: 'mint', rating: '4.9', reviews: 78 },
  { id: 4, name: 'The Sol', subtitle: 'Modern aviator', color: 'blue', category: 'Sunglasses', shape: 'aviator', price: 3299, oldPrice: 4199, tag: 'TRENDING', bg: 'peach', rating: '4.9', reviews: 153 },
  { id: 5, name: 'The Iris', subtitle: 'Lightweight classic', color: 'crystal', category: 'Eyeglasses', shape: 'square', price: 2799, oldPrice: 3499, tag: 'NEW DROP', bg: 'peach', rating: '4.7', reviews: 61 },
  { id: 6, name: 'The Remy', subtitle: 'Playful optical', color: 'rose', category: 'Blue Light', shape: 'round', price: 2599, oldPrice: 3199, tag: '', bg: 'lavender', rating: '4.8', reviews: 82 },
  { id: 7, name: 'The Atlas', subtitle: 'Statement square', color: 'amber', category: 'Sunglasses', shape: 'square', price: 3499, oldPrice: 4299, tag: 'HOT', bg: 'sand', rating: '4.9', reviews: 115 },
  { id: 8, name: 'The Cleo', subtitle: 'Blue-light essential', color: 'midnight', category: 'Blue Light', shape: 'cat', price: 2399, oldPrice: 2999, tag: '', bg: 'mint', rating: '4.6', reviews: 53 },
];

export const rupees = (value) => `₹${value.toLocaleString('en-IN')}`;
