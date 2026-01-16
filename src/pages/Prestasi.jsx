import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Calendar, Award } from 'lucide-react';
import { getPrestasi, STORAGE_URL } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Prestasi = () => {
    const [prestasi, setPrestasi] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPrestasi();
                setPrestasi(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching prestasi:', error);
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
                <div className="inline-flex items-center justify-center p-3 bg-polres-gold/10 rounded-full mb-4">
                    <Award className="w-8 h-8 text-polres-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-polres-dark dark:text-white mb-4">
                    Prestasi & Penghargaan
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Jejak keberhasilan dan dedikasi Polresta Sorong Kota
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {prestasi.length > 0 ? (
                    prestasi.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-card border-t-4 border-t-polres-gold">
                                <div className="relative aspect-video overflow-hidden">
                                    {item.gambar ? (
                                        <img
                                            src={`${STORAGE_URL}/${item.gambar}`}
                                            alt={item.judul}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                            <Award className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-polres-gold hover:bg-polres-gold text-white border-0 shadow-md">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-polres-dark dark:text-white mb-3 line-clamp-2 leading-tight">
                                        {item.judul}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                                        {item.deskripsi}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Belum Ada Data</h3>
                        <p className="text-gray-500">Data prestasi belum ditambahkan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prestasi;
