import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  CircleHelp, Eye, Glasses, Heart, Instagram, Mail, Menu, Minus, MoveUpRight,
  PackageCheck, Play, Plus, RotateCcw, Search, ShieldCheck, ShoppingBag,
  SlidersHorizontal, Sparkles, Star, Sun, Trash2, Truck, X,
} from 'lucide-react';
import { pexels, HERO_LOOKS, COLLECTION_PHOTOS, SHAPE_PHOTOS, STORY_PHOTO } from './photos.js';
import { FRAME_COLORS, products, rupees } from './data.js';

const heroColors = ['midnight', 'amber', 'crystal', 'olive'];
const tabs = ['All frames', 'Eyeglasses', 'Sunglasses', 'Blue Light'];
const features = [
  { icon: Truck, title: 'Shipping on us', detail: 'Free delivery on orders ₹1,999+' },
  { icon: ShieldCheck, title: 'Made to last', detail: 'Premium materials, everyday comfort' },
  { icon: RotateCcw, title: 'Easy returns', detail: '7-day hassle-free returns*' },
  { icon: Eye, title: 'See in style', detail: 'Frames you’ll never want to take off' },
];

function getInitial(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function IconButton({ icon: Icon, label, count, onClick, className = '' }) {
  return <button className={`icon-button ${className}`} type="button" aria-label={label} onClick={onClick}>
    <Icon size={20} strokeWidth={1.8} />
    {count > 0 && <span className="icon-count">{count}</span>}
  </button>;
}

function Brand({ inverse = false }) {
  return <a href="#top" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="Lumora home">
    <span className="brand-icon" aria-hidden="true"><span /><span /></span>
    <span>LUMORA<span className="brand-period">.</span></span>
  </a>;
}

function ProductCard({ product, wishlisted, onWishlist, onAdd, onQuickView }) {
  return <article className="product-card reveal">
    <div className={`product-art art-${product.bg}`}>
      {product.tag && <span className="product-badge">{product.tag}</span>}
      <button className={`favorite-button ${wishlisted ? 'is-favorite' : ''}`} onClick={() => onWishlist(product.id)} type="button" aria-label={`${wishlisted ? 'Remove' : 'Add'} ${product.name} ${wishlisted ? 'from' : 'to'} wishlist`}>
        <Heart size={19} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.7} />
      </button>
      <button className="product-view" type="button" onClick={() => onQuickView(product)} aria-label={`View details for ${product.name}`}>
        <img className="product-photo" src={pexels(product.photoId, 640)} alt={`Photographic example of ${product.category.toLowerCase()} frames; actual product may differ`} loading="lazy" decoding="async" />
        <span className="quick-view-hint">QUICK VIEW <ArrowUpRight size={13} /></span>
      </button>
      <span className="product-art-number">0{product.id}</span>
    </div>
    <div className="product-detail">
      <div className="product-title-row"><div><p className="product-type">{product.subtitle}</p><h3>{product.name}</h3></div><span className="product-photo-note">PHOTO EXAMPLE</span></div>
      <div className="product-bottom"><div className="product-prices"><strong>{rupees(product.price)}</strong><del>{rupees(product.oldPrice)}</del></div>
        <button type="button" className="add-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}><Plus size={19} /></button>
      </div>
    </div>
  </article>;
}

function CartDrawer({ items, open, onClose, onAdd, onDecrease, onRemove }) {
  const subtotal = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const quantity = items.reduce((sum, line) => sum + line.quantity, 0);
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  useEffect(() => { if (open) setCheckoutNotice(false); }, [open]);
  return <div className={`drawer-layer ${open ? 'drawer-visible' : ''}`} aria-hidden={!open}>
    <button className="drawer-overlay" type="button" aria-label="Close shopping bag" onClick={onClose} tabIndex={open ? 0 : -1} />
    <aside className="drawer" role="dialog" aria-modal={open ? 'true' : undefined} aria-label="Shopping bag">
      <div className="drawer-top"><div><p className="section-kicker">YOUR PICKS</p><h2>Shopping bag <span>({quantity})</span></h2></div><IconButton icon={X} label="Close shopping bag" onClick={onClose} /></div>
      {items.length === 0 ? <div className="empty-cart"><div className="empty-cart-icon"><ShoppingBag size={37} strokeWidth={1.25} /></div><h3>Your bag looks a little empty.</h3><p>Find frames you love. Your next favorite pair is waiting.</p><button className="dark-btn" type="button" onClick={onClose}>Explore frames <ArrowUpRight size={17}/></button></div>
        : <><div className="cart-list">{items.map(({ product, quantity: qty }) => <div className="cart-item" key={product.id}>
          <div className={`cart-image art-${product.bg}`}><img className="cart-photo" src={pexels(product.photoId, 260)} alt={`Sample eyewear photo for ${product.name}`} loading="lazy"/></div>
          <div className="cart-text"><span>{product.subtitle}</span><h3>{product.name}</h3><strong>{rupees(product.price)}</strong><div className="qty-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => onDecrease(product.id)}><Minus size={13}/></button><span>{qty}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => onAdd(product)}><Plus size={13}/></button></div></div>
          <button className="trash-button" type="button" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}><Trash2 size={17}/></button>
        </div>)}</div><div className="drawer-footer"><div className="subtotal-row"><span>Subtotal</span><strong>{rupees(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><button type="button" className="dark-btn full-btn" onClick={() => setCheckoutNotice(true)}>Proceed to checkout <ArrowRight size={18}/></button>{checkoutNotice && <p className="checkout-note"><CircleHelp size={15}/> This is a storefront demo. Connect your own checkout to accept payments.</p>}</div></>}
    </aside>
  </div>;
}

function QuickView({ product, onClose, onAdd, onWishlist, wishlisted }) {

  if (!product) return null;
  return <div className="modal-layer" role="presentation" onMouseDown={onClose}>
    <section className="quick-modal" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${product.name} product details`}>
      <button className="modal-x" aria-label="Close product details" onClick={onClose}><X size={21}/></button>
      <div className={`quick-art art-${product.bg}`}><span>THE LUMORA EDIT / 0{product.id}</span><img className="quick-photo" src={pexels(product.photoId, 1000)} alt={`Real-world example photo for ${product.name}; illustrative, not exact inventory`} /></div>
      <div className="quick-copy"><p className="section-kicker">{product.category.toUpperCase()} / NEW PERSPECTIVE</p><h2>{product.name}</h2><div className="quick-rating"><ShieldCheck size={15}/> STOCK PHOTOGRAPHY <span>· Illustrative product image</span></div><p>Designed to look good and feel even better. A new go-to for everyday moments, big and small.</p>
        <div className="quick-price">{rupees(product.price)} <del>{rupees(product.oldPrice)}</del></div>
        <p className="detail-label">LISTED FRAME FINISH — {FRAME_COLORS[product.color].name}</p>
        <div className="photo-disclaimer">The photo shows a comparable eyewear style, not this exact frame or colour. Replace with your shop’s own product photography before taking orders.</div>
        <div className="quick-actions"><button className="dark-btn" type="button" onClick={() => { onAdd(product); onClose(); }}>Add to bag <ArrowRight size={17}/></button><button className={`quick-favorite ${wishlisted ? 'is-favorite' : ''}`} aria-label="Toggle wishlist" onClick={() => onWishlist(product.id)}><Heart size={20} fill={wishlisted ? 'currentColor' : 'none'}/></button></div>
        <span className="quick-subinfo"><Check size={15}/> Lightweight feel <Check size={15}/> Everyday fit</span>
      </div>
    </section>
  </div>;
}

export default function App() {
  const [heroColor, setHeroColor] = useState('midnight');
  const [assemblyKey, setAssemblyKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All frames');
  const [wishlist, setWishlist] = useState(() => getInitial('lumora-wishlist', []));
  const [cart, setCart] = useState(() => getInitial('lumora-cart', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);
  const [toast, setToast] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const heroSceneRef = useRef(null);

  useEffect(() => { window.localStorage.setItem('lumora-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem('lumora-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    const observe = () => document.querySelectorAll('.reveal:not(.visible)').forEach(node => observer.observe(node));
    observe();
    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, []);
  useEffect(() => {
    if (!(cartOpen || searchOpen || mobileOpen || quickProduct)) return;
    const onKeyDown = e => {
      if (e.key === 'Escape') { setCartOpen(false); setSearchOpen(false); setMobileOpen(false); setQuickProduct(null); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [cartOpen, searchOpen, mobileOpen, quickProduct]);
  useEffect(() => {
    if (!(cartOpen || searchOpen || mobileOpen || quickProduct)) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prior; };
  }, [cartOpen, searchOpen, mobileOpen, quickProduct]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 2300); return () => clearTimeout(id); }, [toast]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(line => line.id === product.id);
      return found ? prev.map(line => line.id === product.id ? { ...line, qty: line.qty + 1 } : line) : [...prev, { id: product.id, qty: 1 }];
    });
    setToast(`${product.name} added to your bag`);
  };
  const decreaseCart = id => setCart(prev => prev.map(line => line.id === id ? { ...line, qty: line.qty - 1 } : line).filter(line => line.qty > 0));
  const removeCart = id => setCart(prev => prev.filter(line => line.id !== id));
  const toggleWishlist = id => {
    const already = wishlist.includes(id);
    setWishlist(prev => already ? prev.filter(item => item !== id) : [...prev, id]);
    setToast(already ? 'Removed from wishlist' : 'Saved to your wishlist');
  };
  const handleHeroPointer = event => {
    if (!heroSceneRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    heroSceneRef.current.style.setProperty('--pointer-x', `${x * 10}deg`);
    heroSceneRef.current.style.setProperty('--pointer-y', `${y * -9}deg`);
    heroSceneRef.current.style.setProperty('--float-x', `${x * 14}px`);
    heroSceneRef.current.style.setProperty('--float-y', `${y * 10}px`);
  };
  const resetHeroPointer = () => {
    if (!heroSceneRef.current) return;
    ['--pointer-x', '--pointer-y', '--float-x', '--float-y'].forEach(prop => heroSceneRef.current.style.removeProperty(prop));
  };
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartItems = cart.map(line => ({ product: products.find(p => p.id === line.id), quantity: line.qty })).filter(line => line.product);
  const filteredProducts = useMemo(() => products.filter(p => activeCategory === 'All frames' || p.category === activeCategory), [activeCategory]);
  const searchResults = products.filter(p => `${p.name} ${p.category} ${p.subtitle} ${FRAME_COLORS[p.color]?.name}`.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  const browseCategory = name => { setActiveCategory(name); setMobileOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); };

  return <div id="top" className="site-wrap">
    <div className="announcement"><span>MORE THAN A FRAME. A WHOLE NEW POINT OF VIEW.</span><span className="announcement-offer">FREE SHIPPING ON ORDERS ABOVE ₹1,999 <ArrowUpRight size={13}/></span></div>
    <header className="header">
      <div className="header-inner container-wide">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#shop" onClick={() => setActiveCategory('Eyeglasses')}>Eyeglasses</a><a href="#shop" onClick={() => setActiveCategory('Sunglasses')}>Sunglasses</a><a href="#collections">Collections</a><a href="#story">Our story</a></nav>
        <div className="nav-actions">
          <IconButton icon={Search} label="Search products" onClick={() => setSearchOpen(true)} />
          <IconButton icon={Heart} label="Show saved products" count={wishlist.length} onClick={() => { setActiveCategory('All frames'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); setToast(wishlist.length ? `${wishlist.length} frames saved — look for filled hearts` : 'Tap the hearts to save frames'); }} className="desktop-icon" />
          <IconButton icon={ShoppingBag} label="Open shopping bag" count={cartCount} onClick={() => setCartOpen(true)} />
          <IconButton icon={Menu} label="Open menu" onClick={() => setMobileOpen(true)} className="mobile-menu-button" />
        </div>
      </div>
    </header>

    <main>
      <section className="hero" aria-label="Discover new eyewear">
        <div className="hero-inner container-wide">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot"/> THE NEW WAY TO SEE <span className="kicker-line"/> 2026 EDITION</div>
            <h1>LOOK<br/><span className="hero-line-accent">CLOSER<span className="hero-asterisk">✳</span></span><br/><em>live bolder.</em></h1>
            <p className="hero-description">Eyewear for the ones who see things differently. Thoughtful details, fearless frames, and a little everyday magic.</p>
            <div className="hero-actions"><a href="#shop" className="dark-btn">Find your frames <ArrowUpRight size={18}/></a><a className="text-link" href="#story">The Lumora story <ArrowRight size={17}/></a></div>
            <div className="hero-proof"><ShieldCheck size={17}/><strong>CURATED STYLES</strong><span>— real eyewear, real inspiration</span></div>
            <div className="hero-margin-note">01 — EYEWEAR, REIMAGINED</div>
          </div>
          <div className="hero-gallery" onPointerMove={handleHeroPointer} onPointerLeave={resetHeroPointer}>
            <div ref={heroSceneRef} className="hero-scene">
              <img key={`${heroColor}-${assemblyKey}`} className="hero-real-photo" src={pexels(HERO_LOOKS[heroColor].image, 1200)} alt="Lifestyle photograph of a model wearing stylish eyeglasses" fetchPriority="high" />
              <div className="hero-photo-shade" aria-hidden="true" />
              <span className="hero-sticker hero-sticker-top">THE<br/>EYEWEAR<br/>EDIT<span>↗</span></span>
              <span className="hero-model-label">{HERO_LOOKS[heroColor].caption} <span>/ LOOKBOOK 2026</span></span>
              <span className="hero-side-label">LOOK CLOSER &nbsp;·&nbsp; LIVE BOLDER</span>
              <div className="hero-control-panel">
                <div className="hero-color-info"><span>EXPLORE THE EDITORIAL LOOKS</span><strong>{HERO_LOOKS[heroColor].name}</strong></div>
                <div className="hero-swatches">{heroColors.map(key => <button type="button" key={key} aria-pressed={key === heroColor} aria-label={`View ${HERO_LOOKS[key].name} photograph`} title={HERO_LOOKS[key].name} onClick={() => { setHeroColor(key); setAssemblyKey(k => k + 1); }} className={heroColor === key ? 'active' : ''} style={{ '--swatch': FRAME_COLORS[key].swatch }} />)}</div>
              </div>
            </div>
            <button className="replay-button" type="button" onClick={() => setAssemblyKey(k => k + 1)}><Play size={12} fill="currentColor"/> REPLAY PHOTO REVEAL <RotateCcw size={14}/></button>
          </div>
        </div>
        <div className="hero-bottom"><span>GOOD VISION. GREAT STYLE.</span><span>SCROLL TO EXPLORE <ArrowDownRight size={17}/></span></div>
      </section>

      <section className="trust-strip" aria-label="Why shop Lumora"><div className="container-wide trust-grid">
        {features.map(({ icon: Icon, title, detail }) => <div className="trust-feature" key={title}><Icon size={24} strokeWidth={1.5}/><div><strong>{title}</strong><span>{detail}</span></div></div>)}
      </div></section>

      <section id="collections" className="categories-section section-pad container-wide">
        <div className="section-heading reveal"><div><p className="section-kicker"><span>01 / THE EDIT</span> — YOUR STYLE STARTS HERE</p><h2>A frame for <em>every mood.</em></h2></div><p>From everyday essentials to statement-makers, find a pair that just feels like you.</p></div>
        <div className="categories-grid">
          <button className="category-tile category-sand reveal" type="button" onClick={() => browseCategory('Eyeglasses')}><div className="category-top"><span>01 / EVERYDAY ICONS</span><ArrowUpRight size={23}/></div><div className="category-photo"><img src={pexels(COLLECTION_PHOTOS.Eyeglasses, 900)} loading="lazy" alt="Real eyewear frames photographed on a shop display" /></div><div className="category-copy"><h3>Eyeglasses</h3><span>For every little detail <ArrowRight size={16}/></span></div></button>
          <button className="category-tile category-olive reveal" type="button" onClick={() => browseCategory('Sunglasses')}><div className="category-top"><span>02 / SUN-LOVING STYLE</span><ArrowUpRight size={23}/></div><div className="category-photo"><img src={pexels(COLLECTION_PHOTOS.Sunglasses, 900)} loading="lazy" alt="Real sunglasses collection in a studio photograph" /></div><div className="category-copy"><h3>Sunglasses</h3><span>Your sunny-day staple <ArrowRight size={16}/></span></div></button>
          <button className="category-tile category-lilac reveal" type="button" onClick={() => browseCategory('Blue Light')}><div className="category-top"><span>03 / SCREEN-TIME SMARTS</span><ArrowUpRight size={23}/></div><div className="category-photo"><img src={pexels(COLLECTION_PHOTOS['Blue Light'], 900)} loading="lazy" alt="Real eyeglasses photographed near a laptop" /></div><div className="category-copy"><h3>Blue light</h3><span>Look good, stay focused <ArrowRight size={16}/></span></div></button>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({length: 4}, (_, i) => <span key={i}>SEE BEYOND THE ORDINARY <b>✳</b> GOOD FRAMES, GOOD ENERGY <b>✳</b></span>)}</div></div>

      <section id="shop" className="products-section section-pad container-wide">
        <div className="section-heading products-heading reveal"><div><p className="section-kicker"><span>02 / MOST LOVED</span> — THE FRAME FAVOURITES</p><h2>Made to be <em>noticed.</em></h2></div><p>It’s a look. It’s a feeling. It’s the pair you’ll reach for every single day.</p></div>
        <div className="products-toolbar"><div className="shop-filters" role="group" aria-label="Filter by collection">{tabs.map(tab => <button type="button" key={tab} className={activeCategory === tab ? 'filter-active' : ''} aria-pressed={activeCategory === tab} onClick={() => setActiveCategory(tab)}>{tab}</button>)}</div><div className="product-count"><SlidersHorizontal size={16}/> {filteredProducts.length} CURATED FRAMES</div></div>
        <p className="catalog-disclosure">Photographs are genuine lifestyle/product stock images for this design demo; exact frames, specifications and prices need to be supplied by the shop.</p>
        <div className="products-grid">{filteredProducts.map(p => <ProductCard key={p.id} product={p} wishlisted={wishlist.includes(p.id)} onWishlist={toggleWishlist} onAdd={addToCart} onQuickView={setQuickProduct}/>)}</div>
        <div className="shop-bottom-note"><span>EVERY FRAME HAS A STORY. FIND YOURS.</span><button type="button" onClick={() => { setActiveCategory('All frames'); setToast('Showing our complete edit'); }}>Explore the full edit <ArrowUpRight size={17}/></button></div>
      </section>

      <section id="story" className="story-section"><div className="container-wide story-inner">
        <div className="story-visual reveal"><span className="story-visual-tag">A FRESH PERSPECTIVE ON THE EVERYDAY</span><img className="story-real-photo" src={pexels(STORY_PHOTO, 1100)} alt="Portrait photograph of a person wearing modern eyeglasses" loading="lazy" /><span className="story-visual-foot">EST. WITH A DIFFERENT POINT OF VIEW / 2026</span></div>
        <div className="story-copy reveal"><p className="section-kicker">03 / NOT JUST ANOTHER PAIR</p><h2>Life’s too short<br/>for <em>boring</em> frames.</h2><p>We believe great eyewear should feel as unique as the person wearing it. No overthinking. No blending in. Just beautifully considered frames made to move with you.</p><div className="story-numbers"><div><strong>100<span>%</span></strong><small>PERSONAL STYLE</small></div><div><strong>∞</strong><small>WAYS TO SEE IT</small></div></div><a className="light-outline-btn" href="#collections">Discover our collections <ArrowUpRight size={18}/></a></div>
      </div></section>

      <section className="shape-section section-pad container-wide"><div className="section-heading reveal"><div><p className="section-kicker"><span>04 / THE RIGHT FIT</span> — SHAPE YOUR LOOK</p><h2>Find your <em>frame of mind.</em></h2></div><p>Every face tells a story. Choose the shape that tells yours best.</p></div><div className="shape-grid">
        {[{name:'The classics', subtitle:'Square & timeless', category:'Eyeglasses'}, {name:'The dreamers',subtitle:'Round & refined',category:'Eyeglasses'}, {name:'The bold ones', subtitle:'Cat-eye & unapologetic',category:'Eyeglasses'}].map((item, i) => <button type="button" className={`shape-card shape-card-${i} reveal`} key={item.name} onClick={() => browseCategory(item.category)}><span>0{i+1} — THE SHAPE EDIT</span><img className="shape-photo" src={pexels(SHAPE_PHOTOS[i], 750)} alt={`Example eyewear photograph for ${item.name}`} loading="lazy"/><div><strong>{item.name}</strong><small>{item.subtitle}</small></div><span className="shape-arrow"><ArrowUpRight size={18}/></span></button>)}
      </div></section>

      <section className="quote-section"><div className="container-wide quote-inner"><div className="quote-symbol">“</div><div className="quote-content reveal"><blockquote>“The right frames don’t just change how you see. They change how you <em>show up.</em>”</blockquote><div className="quote-author"><span className="quote-avatar">L.</span><span><strong>Lumora</strong><small>OUR DESIGN PHILOSOPHY</small></span></div></div><div className="quote-side-text">GOOD THINGS LOOK BETTER THROUGH GREAT FRAMES.</div></div></section>

      <section className="newsletter-section container-wide"><div className="newsletter-main reveal"><div className="newsletter-symbol"><Mail size={29} strokeWidth={1.35}/></div><div className="newsletter-copy"><p className="section-kicker">A LITTLE SOMETHING FOR YOUR INBOX</p><h2>Stay in the <em>frame.</em></h2><p>First dibs on new drops, fresh inspiration, and exclusive eyewear goodness.</p></div><form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (newsletterEmail.trim()) setNewsletterSent(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Enter your email address" value={newsletterEmail} onChange={e => { setNewsletterEmail(e.target.value); setNewsletterSent(false); }}/><button type="submit" aria-label="Join newsletter"><ArrowRight size={22}/></button><span>{newsletterSent ? 'Thanks! This is a demo signup—connect your mailing list to activate it.' : 'JUST THE GOOD STUFF. NO SPAM. PROMISE.'}</span></form></div></section>
    </main>

    <footer className="footer"><div className="container-wide"><div className="footer-top"><div className="footer-about"><Brand inverse/><p>Good frames. Good energy.<br/>A new way to see yourself and the world.</p><div className="footer-social"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19}/></a><a href="mailto:hello@example.com" aria-label="Email Lumora"><Mail size={19}/></a></div></div><div className="footer-links"><div><h4>SHOP</h4><a href="#shop" onClick={() => setActiveCategory('Eyeglasses')}>Eyeglasses</a><a href="#shop" onClick={() => setActiveCategory('Sunglasses')}>Sunglasses</a><a href="#shop" onClick={() => setActiveCategory('Blue Light')}>Blue light glasses</a><a href="#collections">Collections</a></div><div><h4>EXPLORE</h4><a href="#story">Our story</a><a href="#collections">Find your frames</a><a href="#shop">Best sellers</a><a href="#top">Back to top ↑</a></div><div><h4>SUPPORT</h4><a href="mailto:hello@example.com">Get in touch</a><a href="#story">Our promise</a><a href="#top">Delivery & returns*</a></div></div></div><div className="footer-wordmark">LUMORA<span>®</span></div><div className="footer-bottom"><span>© 2026 LUMORA. CONCEPT STORE DESIGN.</span><span>MADE FOR A BETTER POINT OF VIEW <span className="footer-sparkle">✳</span></span><span>SCROLL TO TOP <a href="#top" aria-label="Scroll to top">↑</a></span></div></div></footer>

    <CartDrawer items={cartItems} open={cartOpen} onClose={() => setCartOpen(false)} onAdd={addToCart} onDecrease={decreaseCart} onRemove={removeCart} />
    {searchOpen && <div className="search-layer" role="dialog" aria-modal="true" aria-label="Search products"><button className="search-backdrop" type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"/><div className="search-panel"><div className="search-header"><p className="section-kicker">THE PERFECT PAIR IS OUT THERE</p><IconButton icon={X} label="Close search" onClick={() => setSearchOpen(false)}/></div><div className="search-input-row"><Search size={26}/><input autoFocus value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="What frames are you looking for?" type="search" aria-label="Search frames"/></div><div className="search-items">{searchResults.length ? searchResults.slice(0, 5).map(p => <button key={p.id} type="button" onClick={() => { setSearchOpen(false); setQuickProduct(p); }}><span className={`search-thumb art-${p.bg}`}><img className="search-photo" src={pexels(p.photoId, 260)} alt={`Example photo of ${p.name}`} loading="lazy"/></span><span><strong>{p.name}</strong><small>{p.category} · {p.subtitle}</small></span><span>{rupees(p.price)} <ArrowUpRight size={17}/></span></button>) : <div className="no-results">No frames found. Try “round”, “sunglasses”, or “Arlo”.</div>}</div></div></div>}
    {mobileOpen && <div className="mobile-layer"><button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)}/><nav className="mobile-panel" aria-label="Mobile navigation"><div className="mobile-panel-top"><Brand/><IconButton icon={X} label="Close menu" onClick={() => setMobileOpen(false)}/></div><button onClick={() => browseCategory('Eyeglasses')}>Eyeglasses <ArrowUpRight/></button><button onClick={() => browseCategory('Sunglasses')}>Sunglasses <ArrowUpRight/></button><button onClick={() => browseCategory('Blue Light')}>Blue light <ArrowUpRight/></button><a href="#collections" onClick={() => setMobileOpen(false)}>Collections <ArrowUpRight/></a><a href="#story" onClick={() => setMobileOpen(false)}>Our story <ArrowUpRight/></a><p>GOOD VISION. GREAT STYLE.</p></nav></div>}
    {quickProduct && <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} onAdd={addToCart} wishlisted={wishlist.includes(quickProduct.id)} onWishlist={toggleWishlist}/>} 
    <div className={`toast ${toast ? 'toast-show' : ''}`} role="status"><Check size={16}/>{toast}</div>
  </div>;
}
