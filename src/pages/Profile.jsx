import { useSession } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, User, Mail, Camera, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { user, isLoading, updateUser } = useSession();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (user) {
      setName(user.name);
      setImage(user.image || '');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner text-[var(--color-summer-orange)]"></span></div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser({ name, image });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 w-full max-w-4xl mx-auto px-4 md:px-12 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white border border-[var(--color-summer-dark)] p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]"
      >
        <div className="flex justify-between items-start md:items-center mb-12 flex-col md:flex-row gap-6 border-b border-black/10 pb-8">
          <h1 className="text-[40px] md:text-[56px] font-black uppercase tracking-[-2px] leading-none">Your<br/>Profile</h1>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-transparent border border-[var(--color-summer-dark)] text-[var(--color-summer-dark)] hover:bg-[var(--color-summer-dark)] hover:text-white px-6 py-3 font-bold uppercase tracking-wider text-[11px] transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsEditing(false);
                setName(user.name);
                setImage(user.image || '');
              }}
              className="px-6 py-3 border border-transparent font-bold uppercase tracking-wider text-[11px] bg-gray-100 hover:bg-gray-200 flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="w-40 h-40 overflow-hidden border border-[var(--color-summer-dark)] bg-[#e8e4e0] shrink-0 p-2">
              <div className="w-full h-full overflow-hidden bg-white">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover filter grayscale" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <User className="w-16 h-16 text-gray-300" />
                   </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-8 w-full text-center md:text-left mt-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-black/50 mb-2">Display Name</p>
                <p className="text-[32px] md:text-[40px] font-black uppercase tracking-tight leading-none">{user.name}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-black/50 mb-2">Account ID</p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <p className="text-lg font-medium text-[#555]">{user.email}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-summer-dark)] text-white text-[11px] font-bold uppercase tracking-[2px]">
                  <ShieldCheck className="w-4 h-4" /> Checked & Verified
                </span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="animate-in fade-in zoom-in duration-300">
             <div className="flex flex-col md:flex-row gap-12 mb-10">
               <div className="flex flex-col items-center gap-4 shrink-0">
                 <div className="w-40 h-40 overflow-hidden border border-[var(--color-summer-dark)] bg-[#e8e4e0] p-2">
                    <div className="w-full h-full overflow-hidden bg-white">
                      {image ? (
                        <img src={image} alt="Preview" className="w-full h-full object-cover filter grayscale" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <User className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                 </div>
                 <label className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--color-summer-orange)] flex items-center gap-2 mt-2">
                   <Camera className="w-4 h-4" /> Edit Avatar URL
                 </label>
               </div>

               <div className="flex-1 space-y-8">
                 <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#111] mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FFFBF5] border border-black p-4 focus:outline-none focus:ring-1 focus:ring-black transition-all font-medium text-[16px]"
                      placeholder="Your Name"
                    />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#111] mb-2">Avatar URL Path</label>
                    <input 
                      type="url" 
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-[#FFFBF5] border border-black p-4 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[14px] font-mono"
                      placeholder="https://example.com/avatar.jpg"
                    />
                 </div>
               </div>
             </div>

             <div className="flex justify-end pt-8 border-t border-black/10">
               <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-[var(--color-summer-dark)] text-white px-10 py-4 font-bold uppercase tracking-widest text-[12px] flex items-center gap-3 hover:bg-[var(--color-summer-orange)] hover:text-white transition-colors"
                >
                  {isLoading ? <span className="loading loading-spinner w-5 h-5"></span> : <Save className="w-5 h-5" />}
                  Confirm Changes
               </button>
             </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
