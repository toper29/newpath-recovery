import { prisma } from '../src/lib/db';

const features = [
    {
        title: "Emergency Anti-Deposit (Reality Call)",
        description: "Intervensi psikologis instan untuk mematahkan impuls deposit saat keinginan berjudi muncul.",
        iconName: "PhoneCall",
        order: 1
    },
    {
        title: "Slot Trap Simulator",
        description: "Dekonstruksi visual terhadap mekanisme 'near-miss' dan algoritma RTP yang memanipulasi otak Anda.",
        iconName: "BrainCircuit",
        order: 2
    },
    {
        title: "Program Dopamine Reset 14 Hari",
        description: "Panduan neuro-recalibration terstruktur untuk mengembalikan sensitivitas reward alami otak Anda.",
        iconName: "Zap",
        order: 3
    },
    {
        title: "Financial Reality Audit",
        description: "Alat visualisasi untuk melihat dampak nyata kerugian judi terhadap tujuan hidup jangka panjang Anda.",
        iconName: "BarChart3",
        order: 4
    },
    {
        title: "Anonymity Vault",
        description: "Enkripsi tingkat tinggi yang menjamin kerahasiaan perjalanan pemulihan Anda 100% aman.",
        iconName: "ShieldCheck",
        order: 5
    },
    {
        title: "24/7 Crisis Hotline",
        description: "Akses langsung ke konselor profesional dan pendamping pemulihan yang berpengalaman.",
        iconName: "Heart",
        order: 6
    },
    {
        title: "Smart Site Blocking Support",
        description: "Bantuan teknis untuk mengimplementasikan pemblokiran situs judi secara efektif di semua perangkat Anda.",
        iconName: "Lock",
        order: 7
    },
    {
        title: "XP-Based Progression System",
        description: "Sistem gamifikasi yang memberikan reward atas setiap tonggak sejarah (milestone) pemulihan Anda.",
        iconName: "Trophy",
        order: 8
    },
    {
        title: "Cognitive Reframing Articles",
        description: "Konten edukasi harian untuk membantu Anda mengenali dan mengubah pola pikir pecandu.",
        iconName: "BookOpen",
        order: 9
    },
    {
        title: "Community Success Stories",
        description: "Bukti nyata dari ribuan orang yang telah berhasil keluar dari jeratan judi online.",
        iconName: "Users",
        order: 10
    },
    {
        title: "Risk Awareness Assessment",
        description: "Tes diagnosis klinis untuk memantau tingkat risiko dan kemajuan pemulihan psikologis Anda.",
        iconName: "Target",
        order: 11
    },
    {
        title: "Daily Micro-Journaling",
        description: "Check-in harian untuk mengidentifikasi pemicu (triggers) dan merayakan kemenangan kecil setiap hari.",
        iconName: "CheckCircle2",
        order: 12
    },
    {
        title: "Relapse Prevention Toolkit",
        description: "Penyusun strategi personal untuk menghadapi situasi berisiko tinggi tanpa kembali berjudi.",
        iconName: "ShieldAlert",
        order: 13
    },
    {
        title: "Family Restoration Guide",
        description: "Panduan praktis untuk membantu memperbaiki hubungan dan membangun kembali kepercayaan keluarga.",
        iconName: "Users2",
        order: 14
    }
];

async function seed() {
    console.log("Seeding features...");
    for (const f of features) {
        await prisma.feature.upsert({
            where: { id: `feat-${f.order}` }, // Using fixed ID for seeding
            update: f,
            create: {
                id: `feat-${f.order}`,
                ...f
            }
        });
    }
    
    // Also update Landing Page Content
    await prisma.landingPageContent.upsert({
        where: { id: 'singleton' },
        update: {
            heroTitle: "Hentikan Siklusnya, Rebut Kembali Kendali Hidup Anda.",
            heroSub: "Platform pemulihan kecanduan judi pertama di Indonesia yang menggunakan pendekatan neurosains dan psikologi perilaku. Pulihkan kesehatan mental dan finansial Anda secara anonim hari ini.",
            stats_users: "12.400+",
            stats_rate: "85%"
        },
        create: {
            id: 'singleton',
            heroTitle: "Hentikan Siklusnya, Rebut Kembali Kendali Hidup Anda.",
            heroSub: "Platform pemulihan kecanduan judi pertama di Indonesia yang menggunakan pendekatan neurosains dan psikologi perilaku. Pulihkan kesehatan mental dan finansial Anda secara anonim hari ini.",
            stats_users: "12.400+",
            stats_rate: "85%"
        }
    });
    
    console.log("Seeding completed!");
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(() => process.exit());
