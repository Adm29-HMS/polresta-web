import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getPejabat, getProfil, STORAGE_URL } from "@/services/api";
import GallerySection from "../components/home/GallerySection";

const Tentang = () => {
    const [pejabat, setPejabat] = useState([]);
    const [profil, setProfil] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [pejabatRes, profilRes] = await Promise.all([
                    getPejabat(),
                    getProfil()
                ]);
                setPejabat(pejabatRes.data.data || pejabatRes.data);

                // Convert profil array to object by key
                const profilData = profilRes.data.data || profilRes.data;
                const profilMap = {};
                if (Array.isArray(profilData)) {
                    profilData.forEach(item => {
                        profilMap[item.key] = item.value;
                    });
                }
                setProfil(profilMap);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
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
            >
                <h1 className="text-3xl font-bold mb-6 text-polres-dark dark:text-white border-b-4 border-polres-gold inline-block pb-2">Tentang Kami</h1>

                <Tabs defaultValue="profil" className="w-full">
                    <TabsList className="flex w-full overflow-x-auto md:grid md:grid-cols-5 lg:w-[800px] mb-8 bg-polres-cream dark:bg-zinc-800 border border-polres-gold/20 h-auto p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <TabsTrigger value="profil" className="flex-shrink-0 w-auto px-6 md:px-3 md:w-full dark:text-white dark:data-[state=active]:bg-polres-gold dark:data-[state=active]:text-white">Profil</TabsTrigger>
                        <TabsTrigger value="pejabat" className="flex-shrink-0 w-auto px-6 md:px-3 md:w-full dark:text-white dark:data-[state=active]:bg-polres-gold dark:data-[state=active]:text-white">Pejabat Utama</TabsTrigger>
                        <TabsTrigger value="visimisi" className="flex-shrink-0 w-auto px-6 md:px-3 md:w-full dark:text-white dark:data-[state=active]:bg-polres-gold dark:data-[state=active]:text-white">Visi & Misi</TabsTrigger>
                        <TabsTrigger value="sejarah" className="flex-shrink-0 w-auto px-6 md:px-3 md:w-full dark:text-white dark:data-[state=active]:bg-polres-gold dark:data-[state=active]:text-white">Sejarah</TabsTrigger>
                        <TabsTrigger value="gallery" className="flex-shrink-0 w-auto px-6 md:px-3 md:w-full dark:text-white dark:data-[state=active]:bg-polres-gold dark:data-[state=active]:text-white">Gallery Foto</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profil" className="bg-white dark:bg-card p-6 rounded-lg shadow-md border-t-4 border-polres-gold">
                        <h2 className="text-2xl font-bold mb-4 text-polres-dark dark:text-white">Profil Polresta Sorong Kota</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <img
                                src="/heros.jpeg"
                                alt="Polresta Sorong Kota"
                                className="w-full md:w-1/3 rounded-lg object-cover h-64 shadow-sm"
                            />
                            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Kepolisian Resor Kota (Polresta) Sorong Kota merupakan satuan pelaksana tugas kepolisian pada tingkat Kota yang berada di bawah naungan Kepolisian Daerah (Polda) Papua Barat.
                                    Polresta Sorong Kota bertugas menyelenggarakan tugas pokok kepolisian dalam memelihara keamanan dan ketertiban masyarakat, menegakkan hukum, serta memberikan perlindungan, pengayoman, dan pelayanan kepada masyarakat.
                                </p>
                                <p>
                                    Wilayah hukum Polresta Sorong Kota mencakup seluruh Distrik yang ada di Kota Sorong, sebagai pintu gerbang utama di Tanah Papua. Kami berkomitmen untuk menciptakan situasi kamtibmas yang kondusif guna mendukung pembangunan nasional dan daerah.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="pejabat" className="bg-white dark:bg-card p-6 rounded-lg shadow-md border-t-4 border-polres-gold">
                        <h2 className="text-2xl font-bold mb-6 text-polres-dark dark:text-white">Pejabat Utama</h2>

                        <div className="space-y-12">
                            {pejabat.length === 0 ? (
                                <p className="text-center text-gray-500">Belum ada data pejabat.</p>
                            ) : (
                                (() => {
                                    // Define hierarchy structure: [count]
                                    const hierarchy = [2, 4, 8, 8, 6];
                                    let currentIndex = 0;

                                    return hierarchy.map((count, bIdx) => {
                                        const group = pejabat.slice(currentIndex, currentIndex + count);
                                        currentIndex += count;

                                        if (group.length === 0) return null;

                                        return (
                                            <div key={bIdx} className="flex flex-wrap justify-center gap-6">
                                                {group.map((item, idx) => (
                                                    <div
                                                        key={item.id || idx}
                                                        className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] bg-gray-50 dark:bg-zinc-800 rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1"
                                                    >
                                                        <img
                                                            src={item.foto ? `${STORAGE_URL}/${item.foto}` : `https://placehold.co/400x500/313647/FFF?text=${encodeURIComponent(item.jabatan || 'Pejabat')}`}
                                                            alt={item.nama}
                                                            className="w-full h-64 object-cover object-top"
                                                        />
                                                        <div className="p-4 text-center">
                                                            <h3 className="font-bold text-lg text-polres-dark dark:text-white leading-tight mb-1">{item.pangkat ? `${item.pangkat} ` : ''}{item.nama}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.jabatan}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    });
                                })()
                            )}

                            {/* Render remaining if any */}
                            {(() => {
                                const totalStructured = 2 + 4 + 8 + 8 + 6;
                                if (pejabat.length > totalStructured) {
                                    const remaining = pejabat.slice(totalStructured);
                                    return (
                                        <div className="flex flex-wrap justify-center gap-6 border-t pt-8">
                                            {remaining.map((item, idx) => (
                                                <div
                                                    key={item.id || `rem-${idx}`}
                                                    className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] bg-gray-50 dark:bg-zinc-800 rounded-lg overflow-hidden shadow transition-transform hover:-translate-y-1"
                                                >
                                                    <img
                                                        src={item.foto ? `${STORAGE_URL}/${item.foto}` : `https://placehold.co/400x500/313647/FFF?text=${encodeURIComponent(item.jabatan || 'Pejabat')}`}
                                                        alt={item.nama}
                                                        className="w-full h-64 object-cover object-top"
                                                    />
                                                    <div className="p-4 text-center">
                                                        <h3 className="font-bold text-lg text-polres-dark dark:text-white leading-tight mb-1">{item.pangkat ? `${item.pangkat} ` : ''}{item.nama}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.jabatan}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                    </TabsContent>

                    <TabsContent value="visimisi" className="bg-white dark:bg-card p-6 rounded-lg shadow-md border-t-4 border-polres-gold">
                        <h2 className="text-2xl font-bold mb-6 text-polres-dark dark:text-white">Visi & Misi</h2>
                        <div className="space-y-8">
                            <div className="bg-polres-cream/30 dark:bg-zinc-800 p-6 rounded-xl border border-polres-gold/20">
                                <h3 className="text-xl font-bold text-polres-gold mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-polres-gold text-white flex items-center justify-center">V</span>
                                    Visi
                                </h3>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 italic">
                                    {profil.visi || '"Terwujudnya Polresta Sorong Kota di wilayah Kota Sorong yang aman, tertib, dan terkendali serta menjadi Kota Sorong yang makmur, adil dan sejahtera."'}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-gray-100 dark:border-white/10">
                                <h3 className="text-xl font-bold text-polres-dark dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-polres-dark dark:bg-zinc-700 text-white flex items-center justify-center">M</span>
                                    Misi
                                </h3>
                                <div className="prose max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{
                                    __html: profil.misi || `<ul class="space-y-3">
                                        <li>Mewujudkan Polresta Sorong Kota yang profesional, modern, dan dipercaya oleh masyarakat di wilayah Kota Sorong.</li>
                                        <li>Melindungi, mengayomi dan melayani masyarakat dengan hati serta menjunjung tinggi negara persatuan dan kesatuan berdasarkan Pancasila dan UUD 1945</li>
                                    </ul>`
                                }} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="sejarah" className="bg-white dark:bg-card p-6 rounded-lg shadow-md border-t-4 border-polres-gold">
                        <h2 className="text-2xl font-bold mb-4 text-polres-dark dark:text-white">Sejarah Pembentukan</h2>
                        <div className="prose max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{
                            __html: profil.sejarah || `<p>
                                Kepolisian Resor Kota Sorong sebelumnya berstatus sebagai Polres Sorong Kota. Peningkatan status ini seiring dengan perkembangan Kota Sorong sebagai pusat pertumbuhan ekonomi dan pemerintahan di wilayah Papua Barat Daya.
                            </p>
                            <p class="mt-4">
                                Perkembangan dinamika masyarakat dan tantangan keamanan yang semakin kompleks menuntut kehadiran institusi kepolisian yang lebih kuat dan responsif. Polresta Sorong Kota terus berbenah diri, meningkatkan sarana dan prasarana, serta kualitas sumber daya manusia untuk memberikan pelayanan terbaik bagi masyarakat.
                            </p>`
                        }} />
                    </TabsContent>

                    <TabsContent value="gallery" className="bg-white dark:bg-card p-6 rounded-lg shadow-md border-t-4 border-polres-gold">
                        <GallerySection showPagination={true} itemsPerPage={8} />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
};
export default Tentang;
