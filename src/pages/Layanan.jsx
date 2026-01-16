import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
    FileText,
    CreditCard,
    Users,
    ShieldAlert,
    FileSearch,
    Megaphone,
    Car,
    Building,
    Phone,
    Loader2,
    HelpCircle
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLayanan } from "@/services/api";

// Icon mapping from string to component
const iconMap = {
    'FileText': FileText,
    'CreditCard': CreditCard,
    'Users': Users,
    'ShieldAlert': ShieldAlert,
    'FileSearch': FileSearch,
    'Megaphone': Megaphone,
    'Car': Car,
    'Building': Building,
    'Phone': Phone,
};

const getIconComponent = (iconName) => {
    return iconMap[iconName] || HelpCircle;
};

const Layanan = () => {
    const [layanan, setLayanan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLayanan = async () => {
            try {
                setLoading(true);
                const response = await getLayanan();
                setLayanan(response.data.data || response.data);
            } catch (err) {
                console.error('Error fetching layanan:', err);
                // Fallback to static data if API fails
                setLayanan([
                    { id: 1, nama: 'SPKT', slug: 'spkt', deskripsi: 'Sentra Pelayanan Kepolisian Terpadu. Layanan pengaduan dan laporan.', icon: 'Building' },
                    { id: 2, nama: 'SKCK', slug: 'skck', deskripsi: 'Surat Keterangan Catatan Kepolisian. Pembuatan baru dan perpanjangan.', icon: 'FileText' },
                    { id: 3, nama: 'SIM', slug: 'sim', deskripsi: 'Surat Izin Mengemudi. Layanan pembuatan SIM A, C, dan perpanjangan.', icon: 'CreditCard' },
                    { id: 4, nama: 'Izin Keramaian', slug: 'izin-keramaian', deskripsi: 'Pengurusan izin untuk kegiatan yang mengumpulkan massa/keramaian.', icon: 'Users' },
                    { id: 5, nama: 'SP2HP', slug: 'sp2hp', deskripsi: 'Surat Pemberitahuan Perkembangan Hasil Penyidikan Online.', icon: 'FileSearch' },
                    { id: 6, nama: 'Binluh', slug: 'binluh', deskripsi: 'Pembinaan dan Penyuluhan Hukum kepada masyarakat atau institusi.', icon: 'Megaphone' },
                    { id: 7, nama: 'Pengawalan', slug: 'pengawalan', deskripsi: 'Layanan pengawalan jalan untuk VIP, uang/barang berharga, atau iring-iringan.', icon: 'Car' },
                    { id: 8, nama: 'Pam Obvit', slug: 'pam-obvit', deskripsi: 'Pengamanan Obyek Vital Nasional dan Obyek Tertentu.', icon: 'ShieldAlert' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchLayanan();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4 text-polres-dark dark:text-white">Layanan Kepolisian</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Kami siap melayani kebutuhan administrasi dan keamanan Anda dengan proses yang cepat, transparan, dan akuntabel.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-polres-gold" />
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {layanan.map((service) => {
                        const IconComponent = getIconComponent(service.icon);
                        return (
                            <motion.div key={service.id || service.slug} variants={item}>
                                <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-t-transparent hover:border-t-polres-gold flex flex-col dark:bg-card dark:text-white">
                                    <CardHeader>
                                        <div className="mb-4 p-3 bg-polres-cream dark:bg-white/10 w-fit rounded-lg">
                                            <IconComponent className="w-10 h-10 text-polres-gold" />
                                        </div>
                                        <CardTitle className="text-xl">{service.nama}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                                            {service.deskripsi}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        <Link to={`/layanan/${service.slug}`} className="w-full">
                                            <Button variant="outline" className="w-full text-polres-dark hover:text-white hover:bg-polres-dark dark:text-white dark:border-white/20 dark:hover:bg-polres-gold">
                                                Info Persyaratan
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Info Section */}
            <div className="mt-16 bg-polres-dark text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-polres-gold">Butuh Bantuan Mendesak?</h2>
                        <p className="text-gray-300">Hubungi Call Center kami yang siaga 24 jam untuk keadaan darurat.</p>
                    </div>
                    <a href="tel:110" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-xl flex items-center gap-2">
                        <Phone /> CALL 110
                    </a>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};
export default Layanan;
