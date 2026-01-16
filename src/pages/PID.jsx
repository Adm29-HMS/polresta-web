import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const PID = () => {
    // Mock Data Generator
    const generateDocs = (count, category) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i + 1,
            title: `Dokumen ${category} - ${2023 + (i % 3)} - No. ${100 + i}`,
            date: `1${i} Jan 202${3 + (i % 3)}`,
            size: `${(i + 1) * 1.5} MB`,
            category: category
        }));
    };

    const categories = [
        { id: 'serta-merta', label: 'Informasi Serta Merta', data: generateDocs(5, 'Serta Merta') },
        { id: 'setiap-saat', label: 'Informasi Setiap Saat', data: generateDocs(8, 'Setiap Saat') },
        { id: 'berkala', label: 'Informasi Berkala', data: generateDocs(6, 'Berkala') },
        { id: 'dikecualikan', label: 'Informasi Dikecualikan', data: generateDocs(3, 'Dikecualikan') },
        { id: 'uu', label: 'UU dan Peraturan', data: generateDocs(10, 'Undang-Undang') },
    ];

    return (
        <div className="container mx-auto px-4 py-12 transition-colors duration-300">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4 text-polres-dark dark:text-white">Pejabat Pengelola Informasi dan Dokumentasi (PID)</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Transparansi informasi publik adalah komitmen kami. Temukan berbagai dokumen dan informasi resmi Polresta Sorong Kota di sini.
                </p>
            </div>

            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-white/10">
                <Tabs defaultValue={categories[0].id} className="w-full">
                    <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                        <TabsList className="bg-polres-cream dark:bg-zinc-800 border border-polres-gold/20 h-auto p-1">
                            {categories.map((cat) => (
                                <TabsTrigger key={cat.id} value={cat.id} className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-polres-gold data-[state=active]:text-polres-dark dark:data-[state=active]:text-white data-[state=active]:shadow-sm dark:text-gray-400">
                                    {cat.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.id}>
                            <div className="rounded-md border dark:border-white/10">
                                <Table>
                                    <TableHeader className="bg-gray-50 dark:bg-zinc-800">
                                        <TableRow className="dark:border-white/10">
                                            <TableHead className="w-[50px] text-center dark:text-gray-300">No</TableHead>
                                            <TableHead className="dark:text-gray-300">Judul Dokumen</TableHead>
                                            <TableHead className="dark:text-gray-300">Tanggal</TableHead>
                                            <TableHead className="hidden md:table-cell dark:text-gray-300">Ukuran</TableHead>
                                            <TableHead className="text-right dark:text-gray-300">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cat.data.map((doc, idx) => (
                                            <TableRow key={idx} className="dark:border-white/10 dark:hover:bg-zinc-800/50">
                                                <TableCell className="text-center dark:text-gray-300">{idx + 1}</TableCell>
                                                <TableCell className="font-medium flex items-center gap-2 dark:text-gray-200">
                                                    <FileText size={16} className="text-blue-500 dark:text-blue-400" />
                                                    {doc.title}
                                                </TableCell>
                                                <TableCell className="dark:text-gray-400">{doc.date}</TableCell>
                                                <TableCell className="hidden md:table-cell text-gray-500 dark:text-gray-500">{doc.size}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 dark:bg-zinc-800 dark:border-white/20 dark:text-white">
                                                            <Eye size={16} />
                                                        </Button>
                                                        <Button size="sm" className="h-8 w-8 p-0 bg-polres-gold text-polres-dark hover:bg-yellow-400">
                                                            <Download size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    ))}

                </Tabs>
            </div>
        </div>
    );
};
export default PID;
