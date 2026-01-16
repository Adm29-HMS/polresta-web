import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPrograms, STORAGE_URL } from '@/services/api';
import { motion } from 'framer-motion';

const Program = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPrograms();
                setPrograms(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-polres-gold" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl font-bold mb-4 text-polres-dark dark:text-white">Program Bersama Masyarakat</h1>
                <div className="w-24 h-1 bg-polres-gold mx-auto mb-6"></div>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Sinergi Polri dan Masyarakat adalah kunci keamanan. Ikuti berbagai program unggulan kami yang dirancang untuk mendekatkan pelayanan kepada Anda.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.length > 0 ? (
                    programs.map((prog, index) => (
                        <motion.div
                            key={prog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100 dark:border-gray-800"
                        >
                            <div className="relative h-56 overflow-hidden">
                                {prog.gambar ? (
                                    <img
                                        src={`${STORAGE_URL}/${prog.gambar}`}
                                        alt={prog.judul}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                        <Calendar className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-polres-dark text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                    Program Unggulan
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-3 text-polres-dark dark:text-white line-clamp-2">{prog.judul}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm">{prog.deskripsi}</p>

                                <div className="space-y-3 mt-auto text-sm text-gray-500 dark:text-gray-400">
                                    {prog.jadwal_hari && (
                                        <div className="flex items-center gap-3">
                                            <Calendar size={18} className="text-polres-gold" />
                                            <span>{prog.jadwal_hari}</span>
                                        </div>
                                    )}
                                    {prog.waktu && (
                                        <div className="flex items-center gap-3">
                                            <Clock size={18} className="text-polres-gold" />
                                            <span>{prog.waktu}</span>
                                        </div>
                                    )}
                                    {prog.lokasi && (
                                        <div className="flex items-center gap-3">
                                            <MapPin size={18} className="text-polres-gold" />
                                            <span>{prog.lokasi}</span>
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full mt-6 bg-transparent border border-polres-gold text-polres-dark dark:text-polres-gold hover:bg-polres-gold/10 font-bold transition-colors">
                                    Lihat Jadwal Lengkap
                                </Button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Belum Ada Program</h3>
                        <p className="text-gray-500">Program publik belum ditambahkan.</p>
                    </div>
                )}
            </div>

            {/* Call to Action Grid */}
            <div className="mt-20">
                <div className="bg-polres-dark rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Punya Ide Program Kolaborasi?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Kami sangat terbuka dengan masukan dan ide kegiatan positif dari masyarakat, komunitas, atau instansi pendidikan.
                        </p>
                        <Button className="bg-polres-gold text-polres-dark font-bold px-8 py-6 text-lg hover:bg-yellow-400 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Ajukan Usulan Program
                        </Button>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-polres-red/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
}

export default Program;
