import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
export const STORAGE_URL = 'http://localhost:8000/storage';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Berita
export const getBerita = (params = {}) => api.get('/berita', { params });
export const getBeritaBySlug = (slug) => api.get(`/berita/${slug}`);

// Kategori Berita
export const getKategoriBerita = () => api.get('/kategori-berita');

// Pejabat
export const getPejabat = () => api.get('/pejabat');
export const getPejabatById = (id) => api.get(`/pejabat/${id}`);

// Profil
export const getProfil = () => api.get('/profil');
export const getProfilByKey = (key) => api.get(`/profil/${key}`);

// Layanan
export const getLayanan = () => api.get('/layanan');
export const getLayananBySlug = (slug) => api.get(`/layanan/${slug}`);

// Kantor Polisi
export const getKantorPolisi = () => api.get('/kantor-polisi');

// DPO
export const getDpo = (params = {}) => api.get('/dpo', { params });
export const getDpoById = (id) => api.get(`/dpo/${id}`);

// Orang Hilang
export const getOrangHilang = (params = {}) => api.get('/orang-hilang', { params });

// Peringatan Darurat
export const getPeringatanDarurat = (params = {}) => api.get('/peringatan-darurat', { params });

// Statistik Kriminal (Aggregated for Charts)
export const getStatistikChartKriminal = () => api.get('/statistik/kriminal');
export const getStatistikChartLalulintas = () => api.get('/statistik/lalulintas');

// Raw Kriminal Data (if needed)
export const getKriminalList = (params = {}) => api.get('/kriminal', { params });

// Media
export const getMedia = (params = {}) => api.get('/media', { params });

// Peraturan
export const getPeraturan = (params = {}) => api.get('/peraturan', { params });

// Prestasi
export const getPrestasi = () => api.get('/prestasi');

// Program
export const getPrograms = () => api.get('/programs');

export default api;
