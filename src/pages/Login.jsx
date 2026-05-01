import { motion } from 'motion/react';
import { useSession } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const { signIn, user, isLoading } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    await signIn();
  };

  const handleGoogleLogin = async () => {
    setError('');
    await signIn(); // Just mock the login process
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[var(--color-summer-sand)] w-full px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-[var(--color-summer-dark)] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]"
      >
        <div className="text-center mb-10">
          <h1 className="text-[32px] font-black uppercase tracking-[-1px] mb-2">Welcome<br/>Back</h1>
          <p className="text-[#555] text-sm font-medium">Log in to secure your summer items</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#111] mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFFBF5] border border-black p-3 pl-12 focus:outline-none focus:ring-1 focus:ring-black transition-all font-medium text-[14px]"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#111] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FFFBF5] border border-black p-3 pl-12 focus:outline-none focus:ring-1 focus:ring-black transition-all font-medium text-[14px]"
                placeholder="Your secure password"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="font-medium hover:text-[var(--color-summer-orange)] transition-colors">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-[var(--color-summer-dark)] text-white p-4 font-bold uppercase tracking-widest text-[12px] hover:bg-[var(--color-summer-orange)] transition-colors disabled:opacity-70"
          >
            {isLoading ? <span className="loading loading-spinner w-5 h-5"></span> : (
               <>
                 <LogIn className="w-5 h-5" />
                 Secure Login
               </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-black/20 w-full absolute"></div>
            <span className="bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-black/40 relative">Or access via</span>
          </div>
          
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-3 bg-white border border-[var(--color-summer-dark)] text-[#111] p-3 font-bold uppercase tracking-wide text-[12px] hover:bg-[#FFFBF5] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.8 15.69 17.58V20.34H19.26C21.34 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.58C14.71 18.24 13.45 18.63 12 18.63C9.18 18.63 6.8 16.73 5.89 14.18H2.22V17.03C4.02 20.61 7.72 23 12 23Z" fill="#34A853"/>
              <path d="M5.89 14.18C5.66 13.49 5.53 12.76 5.53 12C5.53 11.24 5.66 10.51 5.89 9.82V6.97H2.22C1.48 8.44 1.05 10.16 1.05 12C1.05 13.84 1.48 15.56 2.22 17.03L5.89 14.18Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.07 5.94 16.21 7.02L19.33 3.89C17.45 2.14 14.97 1.05 12 1.05C7.72 1.05 4.02 3.39 2.22 6.97L5.89 9.82C6.8 7.27 9.18 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}
