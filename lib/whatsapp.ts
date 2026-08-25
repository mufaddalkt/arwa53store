import { Product } from '@/types/product';
import { formatINR } from './utils';

export const PRIMARY_WHATSAPP_NUMBER = '918619338794';
export const SECONDARY_WHATSAPP_NUMBER = '918949540902';

export const STORE_DETAILS = {
  name: 'Arwa 53 Collection',
  atelier: 'Banswara Atelier & Digital Flagship',
  address: 'HC2W+PRQ, Near Mewad Hospital, Opposite Vaibhav Opticals, Najmi Bagh, Nai Abadi, Banswara, Rajasthan 327001',
  shortAddress: 'Nai Abadi, Najmi Bagh, Banswara, Rajasthan',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=23.551843,74.447071',
  phone1: '+91 8619338794',
  phone2: '+91 8949540902',
};

/**
 * Creates an authorized luxury WhatsApp concierge inquiry link for a specific product.
 */
export function createWhatsAppInquiryLink(product: Product): string {
  const text = `Hello Arwa 53 Concierge,

I would like to inquire about reserving the following high jewellery piece from the Arwa 53 Collection:

• *Piece:* ${product.name}
• *SKU:* ${product.sku}
• *Category:* ${product.category}
• *Price:* ${formatINR(product.price)} ${product.originalPrice ? `(${formatINR(product.originalPrice)})` : ''}
• *Specifications:* ${product.specs.join(', ')}

Please provide details regarding:
[ ] Banswara Flagship Boutique Pickup
[ ] Insured Courier Delivery with Certificate of Purity

Thank you.`;

  return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates a general luxury concierge inquiry link.
 */
export function createGeneralConciergeLink(): string {
  const text = `Hello Arwa 53 Concierge,

I would like to connect with your private jewellery consultant regarding bespoke orders, bespoke sizing, and visiting the Banswara boutique showroom.

Thank you.`;

  return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
