import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

export default function Home() {
  const featuredProducts = productsData.slice(0, 3);

  return (
    <div className="min-h-screen pt-20 pb-16 flex flex-col items-center w-full">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 md:px-12 mb-32 mt-8 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 text-[var(--color-summer-dark)]"
          >
            <div className="text-[12px] uppercase tracking-[4px] font-bold mb-4 text-[var(--color-summer-orange)]">
              Limited Release Summer of 2026
            </div>
            <h1 className="animate__animated animate__fadeInDown text-[100px] md:text-[140px] lg:text-[160px] leading-[0.82] font-black tracking-[-4px] md:tracking-[-8px] uppercase mb-8">
              Hot<br/>Deals<br/>
              <span className="text-[var(--color-summer-orange)]">50% OFF</span>
            </h1>
            <p className="text-[14px] leading-[1.6] max-w-[400px] mt-6 text-[#555]">
              Elevate your seasonal aesthetic with SunCart's curated high-fashion essentials. Hand-picked skincare and premium optics for the modern traveler.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#products" className="border border-[var(--color-summer-dark)] text-[var(--color-summer-dark)] hover:bg-[var(--color-summer-dark)] hover:text-white px-[30px] py-[15px] rounded-[4px] font-bold text-[12px] uppercase tracking-wider transition-colors inline-block">
                Shop the Drop
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-10 relative hidden lg:block w-full"
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#e8e4e0] rounded-none">
               <img src="https://images.pexels.com/photos/16362229/pexels-photo-16362229.jpeg?_gl=1*pdu49p*_ga*MTg5MDAxODU3NS4xNzY3NTQ2NjM2*_ga_8JE65Q40S6*czE3Nzc2MzM4NDgkbzIkZzEkdDE3Nzc2MzM4NTIkajU2JGwwJGgw" alt="Summer Fashion" className="w-full h-full object-cover grayscale mix-blend-multiply contrast-125" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="w-full max-w-7xl px-4 md:px-12 mb-32">
        <div className="mb-12 border-b border-black/10 pb-4">
          <div className="text-[11px] uppercase tracking-[2px] font-bold opacity-40 mb-2">Featured Essentials</div>
          <div className="flex justify-between items-end">
             <h2 className="text-4xl md:text-6xl font-black tracking-[-2px] uppercase">The Collection</h2>
             <Link to="/" className="hidden md:block text-[12px] font-bold uppercase tracking-wider hover:text-[var(--color-summer-orange)] transition-colors">
               View All
             </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:max-w-4xl">
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer flex flex-col md:flex-row gap-6 md:items-center border-b border-black/5 pb-8 relative"
            >
              <Link to={`/products/${product.id}`} className="block relative w-full md:w-[120px] lg:w-[150px] aspect-square bg-[#e8e4e0] shrink-0 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">{product.name}</h3>
                  <p className="text-[14px] opacity-60 font-medium">
                    {product.brand} &bull; {product.category}
                  </p>
                </div>
                <div className="font-mono font-bold text-[18px] text-[var(--color-summer-orange)] md:text-right">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <Link to={`/products/${product.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="w-full max-w-7xl px-4 md:px-12 mb-32">
        <div className="bg-[var(--color-summer-dark)] text-white p-12 lg:p-20 border border-[var(--color-summer-dark)]">
          <div className="mb-16">
            <h2 className="text-[48px] md:text-[64px] font-black uppercase tracking-[-3px] leading-none mb-6">Summer Protocol</h2>
            <p className="opacity-70 max-w-md font-medium text-[14px] leading-relaxed">Protect your skin and stay stylish with our essential sun care rituals engineered for high UV environments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="flex flex-col border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[var(--color-summer-orange)]">01. UV Protection</h3>
              <p className="opacity-60 text-sm leading-relaxed font-medium">Always wear broad-spectrum SPF 30 or higher. Reapply every two hours when outdoors.</p>
            </div>
            
            <div className="flex flex-col border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[var(--color-summer-orange)]">02. Hydration</h3>
              <p className="opacity-60 text-sm leading-relaxed font-medium">Sun exposure depletes moisture. Use hyaluronic acid serums to replenish and lock in hydration.</p>
            </div>

            <div className="flex flex-col border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[var(--color-summer-orange)]">03. Barrier Care</h3>
              <p className="opacity-60 text-sm leading-relaxed font-medium">Protect your skin barrier with gentle cleansers and ceramides after long beach days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands Marquee */}
      <section className="w-full overflow-hidden border-y border-[var(--color-summer-dark)] py-12 bg-[#e8e4e0]">
        <div className="flex w-full">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex whitespace-nowrap items-center gap-16 px-8 min-w-max"
          >
            {/* Duplicated for smooth infinite scroll */}
            {['DIOR', 'PRADA', 'TOM FORD', 'VERSACE', 'LA MER', 'GIVENCHY', 'DIOR', 'PRADA', 'TOM FORD', 'VERSACE', 'LA MER', 'GIVENCHY'].map((brand, i) => (
              <h3 key={i} className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[var(--color-summer-dark)] opacity-20 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors duration-300">
                {brand}
              </h3>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
