import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getKantorPolisi, getStatistikChartKriminal, getStatistikChartLalulintas } from '@/services/api';

// Fix for default marker icon in Leaflet React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Office Icon with MapPinHouse from Lucide
const OfficeIcon = L.divIcon({
    className: 'custom-office-icon',
    html: `<div style="
        background-color: #1F1F1F;
        border: 3px solid #B8860B;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8860B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
});

const Statistik = () => {
    const [offices, setOffices] = useState([]);
    const [loadingOffices, setLoadingOffices] = useState(true);

    const [crimeData, setCrimeData] = useState([]);
    const [trafficData, setTrafficData] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                setLoadingOffices(true);
                const response = await getKantorPolisi();
                const data = response.data.data || response.data;
                setOffices(data.map(item => ({
                    id: item.id,
                    lat: item.latitude,
                    lng: item.longitude,
                    title: item.nama,
                    type: item.tipe
                })));
            } catch (err) {
                console.error('Error fetching kantor polisi:', err);
                // Fallback to default data
                setOffices([
                    { id: 1, lat: -0.8834338450827762, lng: 131.2850239247147, title: "Polresta Sorong Kota", type: "Kantor Utama" },
                    { id: 2, lat: -0.8759317113896412, lng: 131.25593190997355, title: "Polsek Sorong Kota", type: "Kepolisian Sektor" },
                    { id: 3, lat: -0.9015793238132053, lng: 131.32256426492592, title: "Polsek Sorong Timur", type: "Kepolisian Sektor" },
                    { id: 4, lat: -0.8704584367642658, lng: 131.25262710396967, title: "Polsek Sorong Barat", type: "Kepolisian Sektor" },
                    { id: 5, lat: -0.8889206097756762, lng: 131.2360945402825, title: "Polsek Sorong Kepulauan", type: "Kepolisian Sektor" },
                    { id: 6, lat: -0.8883161243165886, lng: 131.29055415405904, title: "Polsek Kawasan Bandara", type: "Kepolisian Sektor" },
                    { id: 7, lat: -0.8769839002756842, lng: 131.24846481815067, title: "Polsek Kawasan Pelabuhan", type: "Kepolisian Sektor" },
                    { id: 8, lat: -0.8763685760192522, lng: 131.2426678299848, title: "Sat Polairud", type: "Satuan Polisi Air dan Udara" },
                    { id: 9, lat: -0.8795389822761227, lng: 131.2871649702064, title: "Sat Lantas", type: "Satuan Lalu Lintas" },
                ]);
            } finally {
                setLoadingOffices(false);
            }
        };

        const fetchStats = async () => {
            try {
                setLoadingStats(true);
                const [crimeRes, trafficRes] = await Promise.all([
                    getStatistikChartKriminal(),
                    getStatistikChartLalulintas()
                ]);

                setCrimeData(crimeRes.data);
                setTrafficData(trafficRes.data);

            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchOffices();
        fetchStats();
    }, []);

    // Data Kriminalitas (Bar Chart)
    const crimeOptions = {
        chart: {
            id: 'kriminalitas',
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif'
        },
        colors: ['#CF0F0F'],
        xaxis: {
            categories: crimeData.map(d => d.label)
        },
        plotOptions: {
            bar: { borderRadius: 4, horizontal: false }
        },
        dataLabels: { enabled: false },
        title: { text: 'Tren Kriminalitas 6 Bulan Terakhir', align: 'center' }
    };
    const crimeSeries = [{ name: 'Kasus', data: crimeData.map(d => d.count) }];

    // Data Lalu Lintas (Area Chart)
    const trafficOptions = {
        chart: {
            id: 'lalulintas',
            toolbar: { show: false },
            type: 'area',
            fontFamily: 'Inter, sans-serif'
        },
        colors: ['#FFC50F', '#313647'],
        stroke: { curve: 'smooth' },
        xaxis: { categories: trafficData.map(d => d.label) },
        title: { text: 'Pelanggaran & Kecelakaan 6 Bulan Terakhir', align: 'center' }
    };
    const trafficSeries = [
        { name: 'Pelanggaran', data: trafficData.map(d => d.pelanggaran) },
        { name: 'Kecelakaan', data: trafficData.map(d => d.kecelakaan) }
    ];

    // Map Center (Polresta Sorong Kota)
    const position = [-0.8834338450827762, 131.2850239247147];

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-bold mb-4 text-polres-dark dark:text-white">Statistik & Data Kamtibmas</h1>
                <div className="h-1 w-20 bg-polres-gold mx-auto"></div>
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="dark:bg-card">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Data Kriminalitas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Chart options={{ ...crimeOptions, theme: { mode: 'light' } }} series={crimeSeries} type="bar" height={350} />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="dark:bg-card">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Data Lalu Lintas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Chart options={{ ...trafficOptions, theme: { mode: 'light' } }} series={trafficSeries} type="area" height={350} />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-2xl border-2 border-white dark:border-white/20"
            >
                <div className="bg-polres-dark text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        🗺️ Peta Sebaran Kamtibmas
                    </h3>
                    <span className="text-xs bg-polres-red px-2 py-1 rounded">Update: Hari Ini</span>
                </div>
                <div className="h-[500px] w-full relative z-0">
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {offices.map(office => (
                            <Marker key={office.id} position={[office.lat, office.lng]} icon={OfficeIcon}>
                                <Popup>
                                    <div className="font-sans">
                                        <h4 className="font-bold text-polres-dark">{office.title}</h4>
                                        <span className="text-xs text-gray-600">{office.type}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>
                </div>
            </motion.div>
        </div>
    );
};
export default Statistik;
