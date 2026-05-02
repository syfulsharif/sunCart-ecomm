import { useRouter } from 'next/router';
import { useSession } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import productsData from '../data/products.json';
import { motion } from 'motion/react';
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading } = useSession();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (id) {
      setProduct(productsData.find((p) => p.id === id));
    }
  }, [id]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner text-[var(--color-summer-orange)]"></span></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex flex-col justify-center items-center font-serif text-2xl">Product not found</div>;
  }

  return (
    <div className="min-h-screen pt-28 pb-16 w-full max-w-7xl mx-auto px-4 md:px-12">
      <button 
        onClick={() => router.push('/')} 
        className="flex items-center gap-2 mb-10 text-[11px] font-bold uppercase tracking-widest text-[#111] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[1px] before:bg-currentColor hover:before:w-full before:transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[4/5] border border-[var(--color-summer-dark)] bg-[#e8e4e0] p-4 shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"
        >
          <div className="w-full h-full bg-white overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale mix-blend-multiply contrast-125 hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="bg-white/90 text-black px-3 py-1 text-[10px] uppercase font-bold tracking-widest border border-black/10 backdrop-blur-sm">Featured</span>
              <span className="bg-white/90 text-black px-3 py-1 text-[10px] uppercase font-bold tracking-widest border border-black/10 backdrop-blur-sm shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[var(--color-summer-orange)] fill-current" /> {product.rating}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-start md:pt-4"
        >
          <div className="flex gap-2 items-center mb-4">
             <span className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--color-summer-orange)]">{product.brand}</span>
             <span className="text-[11px] font-bold uppercase tracking-[2px] opacity-30 text-[#111]">&bull;</span>
             <span className="text-[11px] font-bold uppercase tracking-[2px] opacity-50 text-[#111]">{product.category}</span>
          </div>

          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-black uppercase tracking-[-2px] leading-[0.9] mb-8">{product.name}</h1>
          
          <div className="flex justify-between items-end border-b border-black/10 pb-6 mb-8">
            <p className="font-mono text-[32px] md:text-[48px] font-bold text-[#111] leading-none">${product.price.toFixed(2)}</p>
            <span className="text-[11px] uppercase tracking-widest font-bold opacity-40">{product.stock} Units Remaining</span>
          </div>
          
          <p className="text-[15px] opacity-70 leading-relaxed mb-10 text-[#111] font-medium max-w-lg">
            {product.description}
          </p>

          <button className="w-full bg-[var(--color-summer-dark)] text-white py-5 font-bold uppercase tracking-widest text-[13px] hover:bg-[var(--color-summer-orange)] hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-all duration-300 mb-12">
            Add to Requisition
          </button>

          <div className="grid grid-cols-1 gap-6">
             <div className="flex items-start gap-4 p-4 border border-[var(--color-summer-dark)] bg-white">
               <Truck className="w-5 h-5 text-[var(--color-summer-orange)] mt-0.5 shrink-0" />
               <div>
                 <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Priority Dispatch</h4>
                 <p className="text-[13px] text-[#555] opacity-80">Complimentary priority shipping on acquisitions over $150. Global network.</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4 p-4 border border-[var(--color-summer-dark)] bg-white">
               <RotateCcw className="w-5 h-5 text-[var(--color-summer-orange)] mt-0.5 shrink-0" />
               <div>
                 <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Return Protocol</h4>
                 <p className="text-[13px] text-[#555] opacity-80">Seamless 30-day evaluation period for unused items in original conditions.</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4 p-4 border border-[var(--color-summer-dark)] bg-white">
               <ShieldCheck className="w-5 h-5 text-[var(--color-summer-orange)] mt-0.5 shrink-0" />
               <div>
                 <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Verified Logistics</h4>
                 <p className="text-[13px] text-[#555] opacity-80">Every piece is cryptographically verified for complete authenticity.</p>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
