import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-primary/20 py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
                <img src="/logo.png" alt="NewPath Logo" className="h-12 w-auto mb-2" />
                <p className="text-sm text-center text-foreground/70">
                    © {new Date().getFullYear()} NewPath. Perjalanan Anda bersifat pribadi dan rahasia.
                </p>
                <p className="text-xs text-center text-foreground/50 max-w-lg">
                    Tetap aman. Cari bantuan jika Anda membutuhkannya. Layanan bantuan kecanduan nasional atau hubungi psikolog terdekat untuk dukungan profesional.
                </p>
                <div className="flex items-center gap-6 mt-2">
                    <Link href="#" className="text-xs text-foreground/60 hover:text-accent transition-colors">
                        Kebijakan Privasi
                    </Link>
                    <Link href="#" className="text-xs text-foreground/60 hover:text-accent transition-colors">
                        Ketentuan Layanan
                    </Link>
                    <Link href="#" className="text-xs text-foreground/60 hover:text-accent transition-colors">
                        Kontak Bantuan
                    </Link>
                </div>
            </div>
        </footer>
    );
}
