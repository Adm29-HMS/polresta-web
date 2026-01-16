import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Phone, ExternalLink, Calendar, MapPin, Instagram, Facebook, Twitter, Youtube, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBerita, STORAGE_URL } from '@/services/api';
import GallerySection from '../components/home/GallerySection';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Home = () => {
    const [berita, setBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoading(true);
                const response = await getBerita({ limit: 3 });
                setBerita(response.data.data || response.data);
            } catch (err) {
                console.error('Error fetching berita:', err);
                setError('Gagal memuat berita');
            } finally {
                setLoading(false);
            }
        };
        fetchBerita();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col bg-polres-light dark:bg-zinc-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-polres-dark text-white">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero.jpg"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center', objectFit: 'cover' }}
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-polres-dark/95 via-polres-dark/70 to-transparent"></div>
                </div>

                <div className="container mx-auto relative z-10 px-6 md:px-12 lg:px-20 pt-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polres-gold/20 text-polres-white border border-polres-gold/30 backdrop-blur-sm mb-6 font-medium text-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Siaga Melayani 24/7
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                        >
                            Polresta <br />
                            Sorong Kota
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
                        >
                            Melayani dengan hati untuk mewujudkan keamanan dan ketertiban masyarakat Kota Sorong yang kondusif dengan pelayanan yang Transparan, Akuntabel, dan Humanis.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/layanan">
                                <Button size="lg" className="bg-polres-gold text-polres-white font-bold px-8 h-12 text-lg">
                                    Layanan
                                </Button>
                            </Link>
                            <Link to="/hubungi">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black h-12 px-8 text-lg bg-transparent">
                                    Hubungi
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="absolute bottom-10 right-10 hidden lg:block opacity-30"
                >
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
                        <circle cx="100" cy="100" r="70" stroke="#FFC50F" strokeWidth="2" />
                    </svg>
                </motion.div>
            </section>

            {/* Quick Stats - Floating Overlap */}
            <div className="container mx-auto px-4 relative z-20 -mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Phone, title: "Call Center 110", text: "Layanan Kepolisian 24 Jam", color: "text-polres-blue", link: "tel:110" },
                        { icon: Shield, title: "SPKT", text: "Sentra Pelayanan Kepolisian Terpadu", color: "text-polres-blue", link: "/layanan" },
                        { icon: Users, title: "Layanan Publik", text: "SKCK, SIM, Pengawalan dan lain-lain", color: "text-polres-blue", link: "/layanan" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <Link to={item.link} className="block group">
                                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full dark:bg-card dark:text-white">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className={`p-4 rounded-xl bg-gray-50 dark:bg-white/5 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors ${item.color}`}>
                                            <item.icon size={36} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1 group-hover:text-polres-gold transition-colors text-polres-dark dark:text-white">{item.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.text}</p>
                                        </div>
                                        <div className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="text-gray-400 dark:text-gray-500" size={20} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Personnel Stats Section */}
            <section className="py-16 bg-polres-light dark:bg-zinc-900 text-polres-dark dark:text-white relative overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 opacity-5">
                    <img src="/pattern.png" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg dark:shadow-none"
                        >
                            <div className="text-polres-gold mb-4 flex justify-center">
                                <Users size={48} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-polres-dark dark:text-white">600+</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Personil Polresta</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg dark:shadow-none"
                        >
                            <div className="text-polres-gold mb-4 flex justify-center">
                                <MapPin size={48} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-polres-dark dark:text-white">1:427</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Rasio Polisi : Penduduk, Tahun 2025</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Recent News / Updates Section */}
            <section className="py-20 bg-polres-light dark:bg-zinc-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-polres-gold font-bold uppercase tracking-wider text-sm">Update Terkini</span>
                            <h2 className="text-3xl font-bold text-polres-dark dark:text-white mt-2 transition-colors">Seputar Polresta Sorong Kota</h2>
                        </div>
                        <a href="http://localhost:5175/" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="text-polres-dark dark:text-white hover:text-polres-gold dark:hover:text-polres-gold hidden md:flex items-center gap-2">
                                Lihat Semua Berita <ArrowRight size={16} />
                            </Button>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="col-span-3 flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-polres-gold" />
                            </div>
                        ) : error ? (
                            <div className="col-span-3 text-center py-12 text-red-500">
                                {error}
                            </div>
                        ) : berita.length === 0 ? (
                            <div className="col-span-3 text-center py-12 text-gray-500">
                                Belum ada berita terbaru.
                            </div>
                        ) : (
                            berita.map((item) => (
                                <a key={item.id} href={`http://localhost:5175/berita/${item.slug}`} target="_blank" rel="noopener noreferrer" className="group">
                                    <div className="bg-white dark:bg-card border dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={item.cover ? `${STORAGE_URL}/${item.cover}` : 'https://images.unsplash.com/photo-1596386461350-326ea7750550?q=80&w=400&auto=format&fit=crop'}
                                                alt={item.judul}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 bg-polres-gold text-polres-dark text-xs font-bold px-3 py-1 rounded-full">
                                                {item.kategori?.nama || 'Berita'}
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(item.published_at)}</span>
                                                <span className="flex items-center gap-1"><Users size={14} /> {item.penulis || 'Admin'}</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-polres-gold transition-colors">
                                                {item.judul}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                                {item.ringkasan || item.konten?.substring(0, 150) + '...'}
                                            </p>
                                            <span className="text-polres-gold text-sm font-bold flex items-center gap-1 mt-auto">
                                                Baca Selengkapnya <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <GallerySection limit={4} />

            {/* Map Integration Placeholder */}
            <section className="h-[400px] relative bg-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 opacity-40">
                    <img src="/kotasorong.jpg" className="w-full h-full object-cover" alt="Map BG" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <MapPin size={48} className="mx-auto text-polres-gold mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Lokasi Pelayanan</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Temukan lokasi kantor polisi terdekat dan pos pelayanan di sekitar Anda.
                    </p>
                    <Link to="/statistik">
                        <Button className="bg-polres-gold text-polres-dark hover:bg-white hover:text-black">
                            Buka Peta Digital
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Social Media Section */}
            {/* Social Media Section */}
            <section className="bg-polres-light dark:bg-zinc-900 text-polres-dark dark:text-white py-12 border-t border-black/5 dark:border-white/10 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-8">Ikuti Kami di Media Sosial</h2>
                    <div className="flex justify-center gap-6">
                        <a href="https://www.instagram.com/polrestasorongkota/" className="p-4 rounded-full bg-polres-dark/10 dark:bg-white/10 hover:bg-polres-gold hover:text-white transition-all transform hover:scale-110">
                            <Instagram size={32} />
                        </a>
                        <a href="https://www.facebook.com/polres.sorkot" className="p-4 rounded-full bg-polres-dark/10 dark:bg-white/10 hover:bg-polres-gold hover:text-white transition-all transform hover:scale-110">
                            <Facebook size={32} />
                        </a>
                        <a href="https://twitter.com/polrestasorongkota" className="p-4 rounded-full bg-polres-dark/10 dark:bg-white/10 hover:bg-polres-gold hover:text-white transition-all transform hover:scale-110">
                            <Twitter size={32} />
                        </a>
                        <a href="https://www.youtube.com/@humaspolrestasorongkota" className="p-4 rounded-full bg-polres-dark/10 dark:bg-white/10 hover:bg-polres-gold hover:text-white transition-all transform hover:scale-110">
                            <Youtube size={32} />
                        </a>
                    </div>
                    <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
                        * * *
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
