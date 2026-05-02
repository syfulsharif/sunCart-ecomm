import '../src/index.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
