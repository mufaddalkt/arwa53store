import React from 'react';
import { ArrowRight, MapPin, Heart, MessageCircle } from 'lucide-react';

export function EditorialHero({ onExplore, onVisit, onCategory }) {
  return <section className="editorial-hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">ARWA 53 COLLECTION · BANSWARA</p>
      <h1 id="hero-title">A little sparkle.<br /><em>A lot of you.</em></h1>
      <p className="hero-description">The finishing touch to your everyday, and the moments worth dressing up for. Discover our collection of gold-finish fashion jewellery.</p>
      <div className="hero-actions"><button className="primary-action" onClick={onExplore}>Explore the collection <ArrowRight size={17} /></button><button className="text-action" onClick={onVisit}>Visit our boutique <MapPin size={16} /></button></div>
      <div className="hero-note"><span>Rings & earrings</span><span>Chains & bangles</span><span>Enquire on WhatsApp</span></div>
    </div>
    <div className="hero-photography">
      <img src="/images/earrings/image_1.webp" alt="Crystal drop earrings from the Arwa 53 collection" width="1000" height="1000" fetchPriority="high" />
      <div className="photo-caption"><span>DETAILS THAT MAKE A DIFFERENCE</span><strong>Find your everyday favourite</strong></div>
    </div>
    <nav className="category-shortcuts" aria-label="Shop by category">{[['Rings','ring_1','/images/rings/image_1.webp'],['Earrings','earring_1','/images/earrings/image_2.webp'],['Chains','chain_1','/images/chains/image_1.webp'],['Bracelets','img1','/media/bangle-1.webp']].map(([category,id,image])=><button key={id} onClick={()=>onCategory(category)}><img src={image} alt="" width="64" height="64" loading="lazy" /><span>{category === 'Bracelets' ? 'Bangles & bracelets' : category}</span><ArrowRight size={16}/></button>)}</nav>
  </section>;
}

export function ShoppingGuide({ phone }) {
  return <section id="shopping-guide" className="shopping-guide">
    <div><p className="eyebrow">A MORE PERSONAL WAY TO SHOP</p><h2>Find it. Save it.<br />Make it yours.</h2><p>Browse online, then talk to our Banswara store about the pieces you love.</p></div>
    <div className="guide-steps">{[[Heart,'01','Save your favourites','Tap the heart on any piece to build your own shortlist. It stays saved in this browser.'],[MessageCircle,'02','Ask us on WhatsApp','Send one piece or your whole wishlist. We’ll help you confirm availability, sizing and the current price.'],[MapPin,'03','Visit the boutique','See the details up close at our store opposite Vaibhav Opticals, Nai Abadi, Banswara.']].map(([Icon,n,title,body])=><article key={n}><span className="step-number">{n}</span><Icon size={21}/><h3>{title}</h3><p>{body}</p></article>)}</div>
    <div className="faq"><h2>A few things to know</h2>
      <details><summary>Is this real gold jewellery?</summary><p>Our catalogue features artificial and gold-finish fashion jewellery. Ask us about the material and finish of a specific piece before purchasing.</p></details>
      <details><summary>How do I check sizes and availability?</summary><p>Open a product and choose “Inquire on WhatsApp”. Please confirm its size, fit, price and availability with the store before making a visit or payment.</p></details>
      <details><summary>Can I arrange delivery or an exchange?</summary><p>Contact the store to confirm delivery options, any charges, and the exchange conditions for your chosen piece before purchasing.</p><a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">Ask the store on WhatsApp</a></details>
      <details><summary>How should I care for fashion jewellery?</summary><p>Keep pieces dry, avoid direct contact with perfume and cleaning products, and store separately in a soft pouch. Ask us for any care instructions specific to your piece.</p></details>
    </div>
  </section>;
}
