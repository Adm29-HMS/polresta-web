import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Theme state
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    // Apply theme effect
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const navItems = [
        { name: 'Beranda', path: '/' },
        { name: 'Tentang', path: '/tentang' },
        { name: 'Layanan', path: '/layanan' },
        { name: 'Informasi', path: '/informasi' },
        { name: 'Statistik', path: '/statistik' },
        { name: 'PID', path: '/pid' },
        { name: 'Program', path: '/program' },
        { name: 'Prestasi', path: '/prestasi' },
        { name: 'Hubungi', path: '/hubungi' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <img
                            src="/logo_utama.ico"
                            alt="Logo Polresta"
                            className="w-10 h-10 object-contain drop-shadow-md"
                        />
                        POLRESTA SORONG KOTA
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white/80 transition-all font-medium text-sm lg:text-base py-1 border-b-2 border-transparent"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`hover:text-white/80 transition-all font-medium text-sm lg:text-base py-1 ${isActive(item.path)
                                        ? 'border-b-2 border-white'
                                        : 'border-b-2 border-transparent'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}

                        {/* Theme Toggle Button Desktop */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu & Theme Toggle */}
                    <div className="md:hidden flex items-center gap-4">


                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 absolute w-full left-0 shadow-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`block px-3 py-2 rounded-md hover:bg-white/10 transition-colors ${isActive(item.path)
                                        ? 'bg-white/20 font-bold'
                                        : ''
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                    <div className="px-2 pb-3 pt-1 border-t border-white/10 mt-2">
                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsOpen(false);
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                        >
                            {theme === 'light' ? (
                                <>
                                    <Moon size={20} />
                                    <span>Mode Gelap</span>
                                </>
                            ) : (
                                <>
                                    <Sun size={20} />
                                    <span>Mode Terang</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-polres-dark text-white py-10 mt-auto dark:bg-zinc-900 border-t border-white/10 transition-colors duration-300">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-polres-white mb-4">Polresta Sorong Kota</h3>
                    <p className="text-gray-300">
                        Melayani dengan integritas dan profesionalisme untuk menjaga keamanan dan ketertiban masyarakat Kota Sorong.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-polres-gold mb-4">Kontak Kami</h3>
                    <p className="text-gray-300">Jl. Jend. A. Yani No. 1</p>
                    <p className="text-gray-300">Kota Sorong - Papua Barat Daya</p>
                    <p className="text-gray-300">Call Center: 110</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-polres-gold mb-4">Tautan Cepat</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/layanan" className="hover:text-polres-gold transition-colors">Layanan SPKT</Link></li>
                        <li><Link to="/pid" className="hover:text-polres-gold transition-colors">Informasi Publik</Link></li>
                        <li><Link to="/statistik" className="hover:text-polres-gold transition-colors">Data Statistik</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Polresta Sorong Kota. All rights reserved.
            </div>
        </footer>
    );
};

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
