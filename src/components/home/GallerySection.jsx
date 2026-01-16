import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMedia, STORAGE_URL } from '../../services/api';
import { Button } from '@/components/ui/button';

const GallerySection = ({ limit, showPagination = false, itemsPerPage = 8 }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await getMedia({ type: 'photo' });
                // Filter client-side just in case, though API might handle it if params serve as filter
                // Based on API: MediaController checks params but simple index() returns all if no filter logic in index?
                // Wait, MediaController index() is just Media::latest()->get(). It doesn't use params!
                // So we definitely need to filter here.
                const allMedia = response.data || response;
                const photoData = Array.isArray(allMedia)
                    ? allMedia.filter(item => item.type === 'photo')
                    : [];

                // Store ALL photos in state, let render logic handle slicing
                setPhotos(photoData);
            } catch (error) {
                console.error("Failed to load gallery photos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    // if (!loading && photos.length === 0) {
    //     return null; // Don't show section if empty
    // }

    return (
        <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-polres-gold font-bold uppercase tracking-wider text-sm block mb-2">
                        Galeri Kegiatan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-polres-dark dark:text-white">
                        Dokumentasi Polresta
                    </h2>
                    <div className="w-20 h-1 bg-polres-gold mx-auto mt-4 rounded-full"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-polres-gold" />
                    </div>
                ) : photos.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">Belum ada foto kegiatan.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(showPagination
                                ? photos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                : (limit ? photos.slice(0, limit) : photos.slice(0, 8))
                            ).map((photo, idx) => (
                                <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-gray-100 dark:bg-zinc-800"
                                    onClick={() => setSelectedImage(photo)}
                                >
                                    <img
                                        src={photo.file_path ? `${STORAGE_URL}/${photo.file_path}` : photo.url}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <ZoomIn className="text-white w-8 h-8" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <p className="text-white text-sm font-medium line-clamp-1">{photo.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {showPagination && photos.length > itemsPerPage && (
                            <div className="mt-8 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                {Array.from({ length: Math.ceil(photos.length / itemsPerPage) }, (_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant={currentPage === i + 1 ? "default" : "outline"}
                                        size="icon"
                                        className={currentPage === i + 1 ? "bg-polres-gold text-white" : "dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(photos.length / itemsPerPage), p + 1))}
                                    disabled={currentPage === Math.ceil(photos.length / itemsPerPage)}
                                    className="dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white hover:text-polres-gold transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage.file_path ? `${STORAGE_URL}/${selectedImage.file_path}` : selectedImage.url}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="mt-4 text-white text-center">
                                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
