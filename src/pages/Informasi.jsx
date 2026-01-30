import { useState, useEffect } from "react";
import { AlertTriangle, UserX, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Will need to create Input or just use HTML input
import { Card, CardContent } from "@/components/ui/card";
import { getDpo, getOrangHilang, getPeringatanDarurat, STORAGE_URL } from "@/services/api";

const Informasi = () => {
    const [dpo, setDpo] = useState([]);
    const [orangHilang, setOrangHilang] = useState([]);
    const [peringatan, setPeringatan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [dpoRes, ohRes, peringatanRes] = await Promise.all([
                    getDpo({ status: 'aktif' }),
                    getOrangHilang({ status: 'dicari' }),
                    getPeringatanDarurat({ is_active: true })
                ]);

                setDpo(dpoRes.data.data || dpoRes.data || []);
                setOrangHilang(ohRes.data.data || ohRes.data || []);

                const peringatanData = peringatanRes.data.data || peringatanRes.data || [];
                setPeringatan(peringatanData.length > 0 ? peringatanData[0] : null);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredDpo = dpo.filter(item =>
        item.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kasus?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-polres-gold" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 transition-colors duration-300">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-4 text-polres-dark dark:text-white">Pusat Informasi & Peringatan</h1>
            </div>

            <div className="space-y-12">
                {/* Peringatan Darurat */}
                {peringatan ? (
                    <div className={`border-l-8 rounded-r-xl p-8 flex items-start gap-4 shadow-sm ${peringatan.level === 'bahaya'
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-600 animate-pulse'
                            : peringatan.level === 'waspada'
                                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600'
                                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-600'
                        }`}>
                        <div className={`p-3 rounded-full ${peringatan.level === 'bahaya'
                                ? 'bg-red-200 dark:bg-red-800 text-red-600 dark:text-red-200'
                                : peringatan.level === 'waspada'
                                    ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200'
                                    : 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-200'
                            }`}>
                            <AlertTriangle size={32} />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold mb-2 ${peringatan.level === 'bahaya' ? 'text-red-700 dark:text-red-300'
                                    : peringatan.level === 'waspada' ? 'text-yellow-700 dark:text-yellow-300'
                                        : 'text-blue-700 dark:text-blue-300'
                                }`}>
                                {peringatan.judul}
                            </h2>
                            <div 
                                className={`prose prose-sm max-w-none mb-4 ${peringatan.level === 'bahaya' ? 'text-red-900 dark:text-red-200'
                                        : peringatan.level === 'waspada' ? 'text-yellow-900 dark:text-yellow-200'
                                            : 'text-blue-900 dark:text-blue-200'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: peringatan.deskripsi }}
                            />
                            {peringatan.lokasi && (
                                <span className={`text-xs font-bold px-2 py-1 rounded ${peringatan.level === 'bahaya'
                                        ? 'text-red-500 dark:text-red-300 bg-red-100 dark:bg-red-900/40'
                                        : peringatan.level === 'waspada'
                                            ? 'text-yellow-500 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40'
                                            : 'text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40'
                                    }`}>
                                    Lokasi: {peringatan.lokasi}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 border-l-8 border-green-600 rounded-r-xl p-8 flex items-center gap-4">
                        <div className="bg-green-200 dark:bg-green-800 p-3 rounded-full text-green-600 dark:text-green-200">
                            <AlertTriangle size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-green-700 dark:text-green-300">Tidak Ada Peringatan Aktif</h2>
                            <p className="text-green-600 dark:text-green-400">Saat ini tidak ada peringatan darurat yang berlaku.</p>
                        </div>
                    </div>
                )}

                {/* DPO Section */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-polres-dark dark:text-white flex items-center gap-2">
                            <UserX className="text-polres-red" /> Daftar Pencarian Orang (DPO)
                        </h2>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Cari Nama / Kasus..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 dark:bg-zinc-800 dark:text-white rounded px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-polres-gold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredDpo.length === 0 ? (
                            <div className="col-span-4 text-center py-10 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    {dpo.length === 0 ? 'Tidak ada DPO aktif saat ini.' : 'Tidak ditemukan hasil pencarian.'}
                                </p>
                            </div>
                        ) : (
                            filteredDpo.map((item) => (
                                <Card key={item.id} className="overflow-hidden bg-white dark:bg-card border-2 border-transparent hover:border-polres-red transition-all">
                                    <div className="relative">
                                        <img
                                            src={item.foto ? `${STORAGE_URL}/${item.foto}` : `https://placehold.co/300x300/313647/FFF?text=${encodeURIComponent(item.nama?.charAt(0) || 'DPO')}`}
                                            alt={item.nama}
                                            className="w-full h-64 object-cover filter grayscale hover:grayscale-0 transition-all"
                                        />
                                        <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-1 text-xs">DI CARI</div>
                                    </div>
                                    <CardContent className="p-4 text-center">
                                        <h3 className="font-bold text-lg mb-1 text-red-700 dark:text-red-400">{item.nama}</h3>
                                        {item.alias && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">alias: {item.alias}</p>}
                                        <p className="text-xs font-bold bg-gray-100 dark:bg-zinc-800 dark:text-gray-300 inline-block px-2 py-1 rounded mb-2">{item.kasus}</p>
                                        {item.ciri_fisik && (
                                            <div 
                                                className="prose prose-sm max-w-none text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: item.ciri_fisik }}
                                            />
                                        )}
                                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">Lapor Polisi</Button>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Orang Hilang Section */}
                <div>
                    <div className="flex justify-between items-center mb-6 mt-12 bg-polres-cream dark:bg-zinc-800 p-4 rounded-lg">
                        <h2 className="text-2xl font-bold text-polres-dark dark:text-white flex items-center gap-2">
                            <Search className="text-polres-gold" /> Daftar Orang Hilang
                        </h2>
                        <Button variant="ghost" className="text-polres-dark dark:text-white hover:text-polres-gold dark:hover:text-polres-gold">Lihat Semua</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {orangHilang.length === 0 ? (
                            <div className="col-span-3 text-center py-10 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Tidak ada laporan orang hilang aktif saat ini.</p>
                            </div>
                        ) : (
                            orangHilang.map((item) => (
                                <Card key={item.id} className="overflow-hidden bg-white dark:bg-card border-2 border-transparent hover:border-polres-gold transition-all">
                                    <div className="relative">
                                        <img
                                            src={item.foto ? `${STORAGE_URL}/${item.foto}` : `https://placehold.co/300x300/B8860B/FFF?text=${encodeURIComponent(item.nama?.charAt(0) || '?')}`}
                                            alt={item.nama}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-0 right-0 bg-polres-gold text-white font-bold px-3 py-1 text-xs">DICARI</div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-1 text-polres-dark dark:text-white">{item.nama}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.jenis_kelamin}, {item.usia} tahun</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Terakhir terlihat: {item.lokasi_terakhir}</p>
                                        {item.ciri && (
                                            <div 
                                                className="prose prose-sm max-w-none text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: `Ciri: ${item.ciri}` }}
                                            />
                                        )}
                                        <p className="text-xs font-bold text-polres-gold">Hubungi: {item.kontak}</p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Informasi;
