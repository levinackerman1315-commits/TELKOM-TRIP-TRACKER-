
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToId = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo-telkom-akses.png"
              alt="Telkom Akses"
              className="h-10 w-auto bg-white/10 rounded px-2 py-1"
            />
            <h1 className="text-xl font-bold">Telkom Akses</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" onClick={(e) => scrollToId(e, "features")} className="hover:underline">Fitur</a>
            <a href="#about" onClick={(e) => scrollToId(e, "about")} className="hover:underline">Tentang</a>
            <a href="#flow" onClick={(e) => scrollToId(e, "flow")} className="hover:underline">Alur</a>
            <a href="#roles" onClick={(e) => scrollToId(e, "roles")} className="hover:underline">Peran</a>
            <a href="#terms" onClick={(e) => scrollToId(e, "terms")} className="hover:underline">S&K</a>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 px-4 py-2 bg-white text-red-600 rounded-md font-semibold hover:bg-white/90 transition"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
              Monitoring Administrasi Perjalanan Dinas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Ajukan, pantau, dan kelola perjalanan dinas, uang panjar, serta bukti pengeluaran
              secara terpusat dengan proses persetujuan berjenjang.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
              >
                Mulai Login
              </button>
              <a
                href="#features"
                onClick={(e) => scrollToId(e, "features")}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Lihat Fitur
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mt-12">
            <img
              src="/hero-telkom-team.jpg"
              alt="Telkom Akses Team"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Fitur Utama</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border shadow-sm text-center hover:shadow-md transition">
              <h4 className="text-lg font-semibold text-red-600 mb-2">Tracking Status</h4>
              <p className="text-gray-600">Pantau status real-time: Submitted, Area Review, Regional Review, Completed.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border shadow-sm text-center hover:shadow-md transition">
              <h4 className="text-lg font-semibold text-red-600 mb-2">Advance Request</h4>
              <p className="text-gray-600">Ajukan uang panjar dan permintaan tambahan disertai bukti pengeluaran.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border shadow-sm text-center hover:shadow-md transition">
              <h4 className="text-lg font-semibold text-red-600 mb-2">Approval Berjenjang</h4>
              <p className="text-gray-600">Finance Area review awal, Finance Regional verifikasi akhir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="text-2xl font-bold mb-4">Tentang Sistem</h3>
          <p className="text-gray-700">
            Platform internal Telkom Akses untuk mengelola administrasi perjalanan dinas:
            pengajuan perjalanan, uang panjar, upload bon/kwitansi, serta pelacakan status hingga selesai.
            Dirancang konsisten dengan identitas visual Telkom Akses (merah, putih, abu-abu).
          </p>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="text-2xl font-bold mb-8 text-center">Alur Singkat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-lg border hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 1</div>
              <div className="font-bold">Pengajuan Trip</div>
              <p className="text-sm text-gray-600 mt-2">Karyawan input tujuan, tanggal, keperluan, dan request panjar.</p>
            </div>
            <div className="p-5 bg-white rounded-lg border hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 2</div>
              <div className="font-bold">Finance Area Review</div>
              <p className="text-sm text-gray-600 mt-2">Validasi data & besaran panjar, approve/forward.</p>
            </div>
            <div className="p-5 bg-white rounded-lg border hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 3</div>
              <div className="font-bold">Finance Regional</div>
              <p className="text-sm text-gray-600 mt-2">Verifikasi akhir, update status, pencatatan pencairan.</p>
            </div>
            <div className="p-5 bg-white rounded-lg border hover:shadow-md transition">
              <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 4</div>
              <div className="font-bold">Upload Bukti</div>
              <p className="text-sm text-gray-600 mt-2">Karyawan unggah bon/kwitansi dan lihat riwayat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl font-bold text-center mb-8">Peran Pengguna</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border hover:shadow-md transition">
              <div className="font-bold text-red-600 mb-2">Karyawan</div>
              <ul className="text-gray-700 text-sm list-disc ml-5 space-y-1">
                <li>Ajukan perjalanan dinas & panjar</li>
                <li>Upload bukti pengeluaran</li>
                <li>Pantau status & riwayat</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg border hover:shadow-md transition">
              <div className="font-bold text-red-600 mb-2">Finance Area</div>
              <ul className="text-gray-700 text-sm list-disc ml-5 space-y-1">
                <li>Review awal & validasi</li>
                <li>Approve/forward ke regional</li>
                <li>Catat catatan/notes</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg border hover:shadow-md transition">
              <div className="font-bold text-red-600 mb-2">Finance Regional</div>
              <ul className="text-gray-700 text-sm list-disc ml-5 space-y-1">
                <li>Verifikasi akhir</li>
                <li>Tandai completed/reject</li>
                <li>Rekonsiliasi pencairan</li>
              </ul>
            </div>
          </div>
          {/* ✅ REMOVED: "Masuk ke Sistem" button - redundant with header login */}
        </div>
      </section>

      {/* Terms preview */}
      <section id="terms" className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="text-2xl font-bold mb-4">Ringkasan Syarat & Ketentuan</h3>
          <ul className="text-gray-700 list-disc ml-6 space-y-2">
            <li>Data dan dokumen hanya digunakan untuk keperluan internal Telkom Akses.</li>
            <li>Pengajuan wajib berisi data valid: tanggal, nominal, dan bukti pengeluaran.</li>
            <li>Akses fitur dibatasi berdasarkan peran (RBAC).</li>
            <li>Perubahan status akan tercatat sebagai log audit.</li>
          </ul>
          <p className="text-sm text-gray-500 mt-3">
            Versi lengkap S&K dan Kebijakan Privasi dapat ditambahkan di halaman terpisah (mis. /terms dan /privacy).
          </p>
        </div>
      </section>

      {/* ✅ IMPROVED FOOTER */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/logo-telkom-akses.png"
                  alt="Telkom Akses"
                  className="h-8 w-auto bg-white/10 rounded px-2 py-1"
                />
                <h3 className="text-lg font-bold">Telkom Akses</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Platform monitoring administrasi perjalanan dinas internal Telkom Akses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" onClick={(e) => scrollToId(e, "features")} className="text-gray-300 hover:text-white transition">
                    Fitur Utama
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => scrollToId(e, "about")} className="text-gray-300 hover:text-white transition">
                    Tentang Sistem
                  </a>
                </li>
                <li>
                  <a href="#flow" onClick={(e) => scrollToId(e, "flow")} className="text-gray-300 hover:text-white transition">
                    Alur Proses
                  </a>
                </li>
                <li>
                  <a href="#roles" onClick={(e) => scrollToId(e, "roles")} className="text-gray-300 hover:text-white transition">
                    Peran Pengguna
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#terms" onClick={(e) => scrollToId(e, "terms")} className="text-gray-300 hover:text-white transition">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <span className="text-gray-300">Email: support@telkomakses.co.id</span>
                </li>
                <li>
                  <span className="text-gray-300">Internal Help Desk</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Telkom Akses. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;