import { Phone, Mail, MapPin, Smartphone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Hubungi = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pesan terkirim (Simulasi). Terima kasih atas laporan Anda.");
    };

    return (
        <div className="container mx-auto px-4 py-12 transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-polres-dark dark:text-white">Hubungi Kami</h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Kami siap melayani Anda 24 Jam. Jangan ragu untuk menghubungi kami jika Anda membutuhkan bantuan atau memiliki informasi terkait keamanan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-polres-dark text-white p-6 rounded-xl shadow-lg">
                            <Phone size={32} className="text-polres-gold mb-4" />
                            <h3 className="text-xl font-bold mb-1">Call Center</h3>
                            <p className="text-4xl font-bold text-polres-gold">110</p>
                            <p className="text-sm text-gray-400 mt-2">24 Jam - Bebas Pulsa</p>
                        </div>
                        <div className="bg-white dark:bg-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-white/10">
                            <Smartphone size={32} className="text-polres-dark dark:text-white mb-4" />
                            <h3 className="text-xl font-bold mb-2 dark:text-white">Aplikasi Polri Presisi</h3>
                            <Button className="w-full bg-polres-dark text-white hover:bg-polres-dark/90 dark:bg-white dark:text-polres-dark dark:hover:bg-gray-200">Download App</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white dark:bg-card rounded-lg shadow-sm border dark:border-white/10">
                            <MapPin className="text-polres-red mt-1" />
                            <div>
                                <h4 className="font-bold text-polres-dark dark:text-white">Alamat Kantor</h4>
                                <p className="text-gray-600 dark:text-gray-300">Jl. Jend. Ahmad Yani No. 1, Kota Sorong, Papua Barat Daya.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-white dark:bg-card rounded-lg shadow-sm border dark:border-white/10">
                            <Mail className="text-polres-dark dark:text-white mt-1" />
                            <div>
                                <h4 className="font-bold text-polres-dark dark:text-white">Email Resmi</h4>
                                <p className="text-gray-600 dark:text-gray-300">humas@polrestasorongkota.go.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-xl border-t-8 border-polres-gold">
                    <h2 className="text-2xl font-bold mb-6 text-polres-dark dark:text-white">Kirim Pesan / Pengaduan</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-gray-300">Nama Lengkap</label>
                                <Input placeholder="Nama Anda" required className="dark:bg-zinc-800 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-gray-300">No. Telepon / WA</label>
                                <Input placeholder="08..." required className="dark:bg-zinc-800 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium dark:text-gray-300">Subjek</label>
                            <Input placeholder="Contoh: Laporan Kehilangan, Kritik & Saran" required className="dark:bg-zinc-800 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium dark:text-gray-300">Pesan</label>
                            <Textarea placeholder="Tuliskan pesan atau laporan Anda secara detail..." className="min-h-[150px] dark:bg-zinc-800 dark:border-gray-600 dark:text-white" required />
                        </div>

                        <Button type="submit" className="w-full bg-polres-gold text-polres-dark font-bold hover:bg-yellow-400 h-12 text-lg">
                            Kirim Pesan
                        </Button>
                    </form>
                </div>
            </div>

            {/* Map Embed Simulation */}
            <div className="mt-16 rounded-xl overflow-hidden h-[400px] shadow-lg border-2 border-white dark:border-white/20">
                {/* This would be a Google Maps iframe */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.313463375836!2d131.25439707584105!3d-0.9115200353272421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5951d451480e0d%3A0x6e7887556950222b!2sPolresta%20Sorong%20Kota!5e0!3m2!1sen!2sid!4v1709971200000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};
export default Hubungi;
