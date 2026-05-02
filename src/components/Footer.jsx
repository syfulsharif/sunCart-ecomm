import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-summer-dark)] text-white">
      <div className="footer p-12 lg:p-20 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-black text-4xl tracking-tighter uppercase">SunCart<span className="text-[var(--color-summer-orange)]">.</span></span>
          </div>
          <p className="opacity-60 max-w-xs text-sm leading-relaxed">
            Elevate your seasonal aesthetic with SunCart's curated high-fashion essentials. Hand-picked skincare and premium optics for the modern traveler.
          </p>
        </div>
        <div>
          <span className="footer-title text-white opacity-40 uppercase tracking-[2px] font-bold text-[11px] mb-6">Categories</span>
          <a className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Sunglasses</a>
          <a className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Skincare</a>
          <a className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Accessories</a>
        </div>
        <div>
          <span className="footer-title text-white opacity-40 uppercase tracking-[2px] font-bold text-[11px] mb-6">Company</span>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">About us</Link>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Contact</Link>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Jobs</Link>
        </div>
        <div>
          <span className="footer-title text-white opacity-40 uppercase tracking-[2px] font-bold text-[11px] mb-6">Legal</span>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Terms of use</Link>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Privacy policy</Link>
          <Link href="/" className="link link-hover text-[13px] font-bold uppercase tracking-wide mb-2 hover:text-[var(--color-summer-orange)] transition-colors">Cookie policy</Link>
        </div>
      </div>

      <div className="px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-[12px] text-white/70">
          <div className="w-2 h-2 bg-[var(--color-summer-orange)] rounded-full"></div>
          <span>Summer Tip: Re-apply SPF every 2 hours under direct sunlight.</span>
        </div>

        <div className="flex items-center gap-3 text-[12px] text-white/70">
          <span> &copy; 2026 SunCart. All rights reserved.</span>
        </div>

        <div className="flex gap-8 opacity-40 text-lg font-black uppercase tracking-widest">
          <div>CELINE</div>
          <div>HERMES</div>
          <div>RAY-BAN</div>
          <div>DIOR</div>
        </div>
      </div>
    </footer>
  );
}
