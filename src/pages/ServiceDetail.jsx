
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/servicesData';
import {
    FileText,
    CreditCard,
    Users,
    ShieldAlert,
    FileSearch,
    Megaphone,
    Car,
    Building,
    ArrowLeft, CheckCircle2, AlertCircle
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const iconMap = {
    'Building': Building,
    'FileText': FileText,
    'CreditCard': CreditCard,
    'Users': Users,
    'ShieldAlert': ShieldAlert,
    'FileSearch': FileSearch,
    'Megaphone': Megaphone,
    'Car': Car,
};

const ServiceDetail = () => {
    const { slug } = useParams();
    // Debugging
    console.log("Current Slug:", slug);

    const service = servicesData[slug];

    if (!service) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Layanan Tidak Ditemukan</h2>
                <Link to="/layanan">
                    <Button>Kembali ke Layanan</Button>
                </Link>
            </div>
        );
    }

    const Icon = iconMap[service.icon] || AlertCircle;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 pb-20 transition-colors duration-300">
            {/* Header Section */}
            <div className="bg-polres-dark text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-polres-gold/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/layanan" className="inline-flex items-center text-polres-gold hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Layanan
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                            <Icon className="w-12 h-12 text-polres-gold" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">{service.title}</h1>
                            <p className="text-lg text-gray-300 max-w-2xl">{service.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <Card className="shadow-xl border-none dark:bg-card dark:text-gray-100">
                    <CardContent className="p-6 md:p-8">
                        <Tabs defaultValue="persyaratan" className="w-full">
                            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto p-1 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                                <TabsTrigger value="persyaratan" className="py-3 text-base data-[state=active]:bg-white dark:data-[state=active]:bg-polres-gold/20 data-[state=active]:text-polres-dark dark:data-[state=active]:text-polres-gold data-[state=active]:shadow-sm dark:text-gray-400">Persyaratan</TabsTrigger>
                                <TabsTrigger value="prosedur" className="py-3 text-base data-[state=active]:bg-white dark:data-[state=active]:bg-polres-gold/20 data-[state=active]:text-polres-dark dark:data-[state=active]:text-polres-gold data-[state=active]:shadow-sm dark:text-gray-400">Prosedur</TabsTrigger>
                                <TabsTrigger value="biaya" className="py-3 text-base data-[state=active]:bg-white dark:data-[state=active]:bg-polres-gold/20 data-[state=active]:text-polres-dark dark:data-[state=active]:text-polres-gold data-[state=active]:shadow-sm dark:text-gray-400">Biaya & Waktu</TabsTrigger>
                            </TabsList>

                            <TabsContent value="persyaratan" className="mt-0 space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-polres-dark dark:text-blue-100 mb-6 flex items-center">
                                        <CheckCircle2 className="mr-2 text-polres-gold" /> Dokumen yang Harus Dibawa
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.persyaratan.map((item, index) => (
                                            <li key={index} className="flex items-start bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-white/10">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-polres-gold/20 text-polres-gold flex items-center justify-center font-bold text-sm mr-3 mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="prosedur" className="mt-0">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                                    <h3 className="text-xl font-bold text-polres-dark dark:text-white p-6 border-b dark:border-white/10 bg-gray-50 dark:bg-zinc-800">Langkah - Langkah Agensi</h3>
                                    <div className="divide-y divide-gray-100 dark:divide-white/5">
                                        {service.prosedur.map((step, index) => (
                                            <div key={index} className="p-6 flex gap-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <div className="flex-shrink-0 flex flex-col items-center">
                                                    <div className="w-10 h-10 rounded-full bg-polres-dark dark:bg-polres-gold text-white dark:text-polres-dark flex items-center justify-center font-bold text-lg shadow-lg relative z-10">
                                                        {index + 1}
                                                    </div>
                                                    {index !== service.prosedur.length - 1 && (
                                                        <div className="h-full w-0.5 bg-gray-200 dark:bg-white/10 mt-0 -mb-6"></div>
                                                    )}
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{step}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="biaya" className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CreditCard className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 mb-2">Biaya PNBP</h3>
                                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">{service.biaya}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">*Sesuai Peraturan Pemerintah yang berlaku</p>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 mb-2">Estimasi Waktu</h3>
                                        <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{service.waktu}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">*Jika persyaratan lengkap dan sistem normal</p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-200 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm">
                                        <strong>Catatan Penting:</strong> Hindari Calo! Uruslah keperluan administrasi Anda sendiri. Petugas kami siap melayani Anda dengan profesional. Jika ada pungutan liar, segera laporkan ke Sipropam.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ServiceDetail;
