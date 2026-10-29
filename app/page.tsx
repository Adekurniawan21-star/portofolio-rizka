"use client";

import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Mail,
  ShieldCheck,
  Eye,
  Menu,
  X,
  FileText,
  ZoomIn,
  ZoomOut,
  CreditCard,
  Headphones,
  CheckCheck,
  Scale,
  Languages,
  Crown,
  MessageSquare,
  Target,
  Handshake,
  RefreshCw,
  Users,
  Clock,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  Search,
  Compass,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Lightbox with Gallery Navigation (Prev / Next / Esc / Outside)    */
/* ------------------------------------------------------------------ */
function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: { src: string; alt: string; title?: string }[];
  index: number;
  onClose: () => void;
  onIndexChange: (idx: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const current = items[index] || items[0];
  const hasMultiple = items.length > 1;

  const handlePrev = useCallback(() => {
    setZoom(1);
    onIndexChange(index > 0 ? index - 1 : items.length - 1);
  }, [index, items.length, onIndexChange]);

  const handleNext = useCallback(() => {
    setZoom(1);
    onIndexChange(index < items.length - 1 ? index + 1 : 0);
  }, [index, items.length, onIndexChange]);

  const toggleZoom = () => {
    setZoom((z) => (z === 1 ? 1.75 : 1));
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasMultiple) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, hasMultiple, handlePrev, handleNext]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-label="Lihat gambar"
    >
      <div
        style={{
          position: "relative",
          maxWidth: "92vw",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            overflow: zoom > 1 ? "auto" : "visible",
            maxWidth: "92vw",
            maxHeight: current.title ? "80vh" : "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            onClick={toggleZoom}
            style={{
              maxWidth: "92vw",
              maxHeight: current.title ? "80vh" : "85vh",
              borderRadius: 14,
              objectFit: "contain",
              boxShadow: "0 16px 48px rgba(0, 0, 0, 0.8)",
              border: "1px solid var(--line)",
              transform: `scale(${zoom})`,
              transition: "transform 0.25s ease",
              cursor: zoom > 1 ? "zoom-out" : "zoom-in",
            }}
          />
        </div>
        {current.title && (
          <div
            style={{
              marginTop: "0.85rem",
              textAlign: "center",
              color: "#FFFBF0",
              fontSize: "0.92rem",
              fontWeight: 500,
              padding: "0.4rem 1.2rem",
              background: "rgba(18, 38, 29, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 9999,
              backdropFilter: "blur(10px)",
            }}
          >
            {current.title}
            {hasMultiple && (
              <span style={{ marginLeft: "0.75rem", color: "#F6F1E4", opacity: 0.85, fontSize: "0.82rem", fontWeight: 600 }}>
                ({index + 1} / {items.length})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action buttons (Zoom + Close) */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 24,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10001,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            color: "var(--text)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          aria-label={zoom > 1 ? "Perkecil (Zoom Out)" : "Perbesar (Zoom In)"}
          title={zoom > 1 ? "Perkecil (Zoom Out)" : "Perbesar (Zoom In)"}
        >
          {zoom > 1 ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
        </button>
        <button
          onClick={onClose}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            color: "var(--text)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>
      </div>

      {/* Prev / Next buttons for gallery */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: 20,
              transform: "translateY(-50%)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              borderRadius: "50%",
              width: 48,
              height: 48,
              fontSize: "1.6rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            aria-label="Sebelumnya"
          >
            &#x2039;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            style={{
              position: "fixed",
              top: "50%",
              right: 20,
              transform: "translateY(-50%)",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              borderRadius: "50%",
              width: 48,
              height: 48,
              fontSize: "1.6rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            aria-label="Berikutnya"
          >
            &#x203A;
          </button>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Software & Social SVG Logos                                       */
/* ------------------------------------------------------------------ */
function ToolLogo({ brand }: { brand: string }) {
  switch (brand) {
    case "msoffice":
      return (
        <svg width="22" height="22" viewBox="0 0 21 21">
          <rect x="1" y="1" width="9" height="9" fill="#f25022" rx="1.5" />
          <rect x="11" y="1" width="9" height="9" fill="#7fba00" rx="1.5" />
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef" rx="1.5" />
          <rect x="11" y="11" width="9" height="9" fill="#ffb900" rx="1.5" />
        </svg>
      );
    case "google":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
        </svg>
      );
    case "canva":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c4cc" />
              <stop offset="100%" stopColor="#7d2ae8" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="11" fill="url(#canvaGrad)" />
          <path fill="#ffffff" d="M12.8 16.2c-2.4 0-4.1-1.8-4.1-4.4 0-2.8 1.9-4.5 4.3-4.5 1.7 0 2.9.8 3.5 1.8l-1.3 1c-.4-.7-1.2-1.3-2.2-1.3-1.5 0-2.6 1.1-2.6 3 0 1.9 1 3 2.5 3 1.1 0 1.9-.6 2.4-1.4l1.3.9c-.8 1.2-2.1 1.9-3.8 1.9z" />
        </svg>
      );
    case "capcut":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#111111" />
          <path fill="#ffffff" d="M4 6.5h5.5l3 5.5-3 5.5H4l3-5.5zm10.5 0H20l-3 5.5 3 5.5h-5.5l3-5.5z" />
        </svg>
      );
    case "snapseed":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path fill="#4CAF50" d="M12 2C6.5 2 2 6.5 2 12c0 3.3 1.6 6.3 4.1 8.1L12 12V2z" />
          <path fill="#8BC34A" d="M12 2v10l5.9 8.1C20.4 18.3 22 15.3 22 12c0-5.5-4.5-10-10-10z" />
          <path fill="#009688" d="M12 12l-5.9 8.1C7.6 21.3 9.7 22 12 22s4.4-.7 5.9-1.9L12 12z" />
        </svg>
      );
    case "lightroom":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#001e36" />
          <rect x="1" y="1" width="22" height="22" rx="4" fill="none" stroke="#31a8ff" strokeWidth="1.5" />
          <text x="4.2" y="16.5" fill="#31a8ff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12.5">Lr</text>
        </svg>
      );
    case "picsart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="picsartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#833ab4" />
              <stop offset="50%" stopColor="#fd1d1d" />
              <stop offset="100%" stopColor="#fcb045" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="11" fill="url(#picsartGrad)" />
          <circle cx="12" cy="12" r="4.5" fill="#ffffff" />
        </svg>
      );
    default:
      return null;
  }
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.59.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.17 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data for Kompetensi Rows                                   */
/* ------------------------------------------------------------------ */
const keahlianUtamaDanBahasa = [
  {
    name: "Document Administration & Filing",
    icon: <FileText size={20} />,
  },
  {
    name: "Financial Administration & Reporting",
    icon: <CreditCard size={20} />,
  },
  {
    name: "Customer Service & Transaction Handling",
    icon: <Headphones size={20} />,
  },
  {
    name: "Transaction Data Recapitulation & Validation",
    icon: <CheckCheck size={20} />,
  },
  {
    name: "Business Legal Administration & Documentation",
    icon: <Scale size={20} />,
  },
  {
    name: "Bahasa Indonesia (Native)",
    icon: <span style={{ fontSize: "1.25rem" }}>🇮🇩</span>,
  },
  {
    name: "English (Intermediate, TOEFL 543)",
    icon: <span style={{ fontSize: "1.25rem" }}>🇬🇧</span>,
  },
];

const softwareAndTools = [
  { name: "Microsoft Office", brand: "msoffice" },
  { name: "Google Workspace", brand: "google" },
  { name: "Canva", brand: "canva" },
  { name: "CapCut", brand: "capcut" },
  { name: "Snapseed", brand: "snapseed" },
  { name: "Lightroom", brand: "lightroom" },
  { name: "PicsArt", brand: "picsart" },
];

const softSkillsList = [
  { name: "Kepemimpinan", icon: <Crown size={18} /> },
  { name: "Komunikasi", icon: <MessageSquare size={18} /> },
  { name: "Persuasif", icon: <Target size={18} /> },
  { name: "Negosiasi", icon: <Handshake size={18} /> },
  { name: "Adaptabilitas", icon: <RefreshCw size={18} /> },
  { name: "Kerja Tim & Kolaborasi", icon: <Users size={18} /> },
  { name: "Manajemen Waktu", icon: <Clock size={18} /> },
  { name: "Pemecahan Masalah", icon: <Lightbulb size={18} /> },
  { name: "Ketelitian & Keakuratan", icon: <CheckCircle2 size={18} /> },
  { name: "Berpikir Analitis", icon: <BarChart3 size={18} /> },
  { name: "Kritis", icon: <Search size={18} /> },
  { name: "Strategis", icon: <Compass size={18} /> },
];

/* ------------------------------------------------------------------ */
/*  Sertifikasi & Pelatihan Data                                      */
/* ------------------------------------------------------------------ */
interface CertificateItem {
  id: string;
  category: string;
  year: string;
  title: string;
  issuer: string;
  date: string;
  summary: string;
  src: string;
}

const certificateList: CertificateItem[] = [
  {
    id: "sert-1",
    category: "Akuntansi & Keuangan",
    year: "2026",
    title: "Accounting, Finance and Tax",
    issuer: "MySkill (PT Linimuda Inspirasi Negeri)",
    date: "25 Oktober 2026",
    summary:
      "Full Learning Path Professional Skill 145 jam dan 145 kursus di bidang akuntansi, keuangan, dan perpajakan.",
    src: "/sertifikat/myskill-accounting-finance-tax.png",
  },
  {
    id: "sert-2",
    category: "Office & Administrasi",
    year: "2026",
    title: "Microsoft Excel, Word and PowerPoint",
    issuer: "MySkill (PT Linimuda Inspirasi Negeri)",
    date: "26 Oktober 2026",
    summary:
      "Full Learning Path 59 jam dan 59 kursus: pengolahan data Excel, penyusunan dokumen Word, dan presentasi PowerPoint.",
    src: "/sertifikat/myskill-excel-word-powerpoint.png",
  },
  {
    id: "sert-3",
    category: "Akuntansi & Keuangan",
    year: "2025",
    title: "Edukasi Publik Pasar Modal",
    issuer: "PT Bursa Efek Indonesia",
    date: "12 Maret 2025",
    summary:
      "Edukasi publik tentang pasar modal dari BEI Kantor Perwakilan Sumatera Selatan.",
    src: "/sertifikat/edukasi-pasar-modal.jpg",
  },
  {
    id: "sert-4",
    category: "Bahasa",
    year: "2026",
    title: "TOEFL Prediction Test",
    issuer: "Central Course Kampung Inggris Pare",
    date: "4 Juli 2026",
    summary:
      "Skor 543: Listening 37, Structure 65, Reading 61. Berlaku sampai 4 Juli 2028.",
    src: "/sertifikat/toefl-SENSOR-DULU.png",
  },
  {
    id: "sert-5",
    category: "Halal & Syariah",
    year: "2025",
    title: "Pelatihan Pendamping Proses Produk Halal (P3H)",
    issuer: "Halal Center UIN Sunan Kalijaga Yogyakarta",
    date: "14-15 Maret 2025",
    summary:
      "Pelatihan daring 20 jam tentang pendampingan proses produk halal bagi pelaku usaha mikro dan kecil. Hasil: Memuaskan.",
    src: "/sertifikat/p3h-SENSOR-DULU.png",
  },
];

const certCategories = [
  "Semua Kategori",
  "Akuntansi & Keuangan",
  "Office & Administrasi",
  "Bahasa",
  "Halal & Syariah",
];

/* ------------------------------------------------------------------ */
/*  Other Static Data (Experiences, Org, Works)                      */
/* ------------------------------------------------------------------ */
interface ExpItem {
  id: string;
  title: string;
  place: string;
  period: string;
  tag: string;
  photos: { src: string; alt: string; caption?: string }[];
  narrative: string;
}

const experiences: ExpItem[] = [
  {
    id: "pusri",
    title: "Staf Administrasi & Keuangan Aset",
    place: "PT Pupuk Sriwidjaja Palembang",
    period: "Juli 2024 – September 2024",
    tag: "Magang",
    photos: [
      { src: "/magang/pusri-1.jpg", alt: "Opening Cafe Bale (Aset PT Pusri Palembang)", caption: "Opening Cafe Bale (Aset PT Pusri Palembang)" },
      { src: "/magang/pusri-2.jpg", alt: "Pengelolaan & Rekapitulasi Dokumen Administrasi", caption: "Pengelolaan & Rekapitulasi Dokumen Administrasi" },
      { src: "/magang/kunjungan-aset.jpg", alt: "Kunjungan ke Salah Satu Aset Pusri", caption: "Kunjungan ke Salah Satu Aset Pusri" },
      { src: "/magang/makan-siang.jpg", alt: "Makan Siang Bersama", caption: "Makan Siang Bersama" },
    ],
    narrative:
      "Selama menjalani program magang sebagai Staf Administrasi & Keuangan Aset di PT Pupuk Sriwidjaja Palembang, peran utama saya berfokus pada pengelolaan administrasi dan pengarsipan 80–100 dokumen operasional perusahaan, melakukan rekapitulasi serta validasi 30–50 transaksi pengeluaran kas mingguan, menginput dan memverifikasi berkas pembayaran guna pemenuhan audit internal, hingga menyusun data Pajak Bumi dan Bangunan (PBB) dengan koordinasi lintas divisi terkait. Melalui inisiatif penataan sistem pengarsipan dan rekapitulasi data yang lebih terstruktur dan sistematis, inisiatif ini berhasil meningkatkan efisiensi pengelolaan dan kecepatan pencarian dokumen administrasi hingga 30%. Seluruh rangkaian tanggung jawab ini diselesaikan secara akurat menggunakan Microsoft Excel & Spreadsheets, Microsoft Office, Google Docs, serta sistem pengarsipan dokumen (Document Filing System) yang senantiasa mematuhi SOP Administrasi Perusahaan dan standar audit internal.",
  },
  {
    id: "asdos",
    title: "Asisten Dosen (Ekonomi Digital)",
    place: "Fakultas Ekonomi dan Bisnis Islam – UIN Raden Fatah Palembang",
    period: "Agustus 2025 – Desember 2025",
    tag: "Part-time",
    photos: [
      { src: "/asdos/asdos-1.jpg", alt: "Pendampingan Kuliah & Diskusi Kelas Ekonomi Digital", caption: "Pendampingan Perkuliahan & Diskusi Kelas" },
      { src: "/asdos/asdos-3.jpg", alt: "Evaluasi dan Rekapitulasi Nilai Akademik Mahasiswa", caption: "Pemeriksaan Tugas & Rekapitulasi Nilai" },
    ],
    narrative:
      "Sebagai Asisten Dosen pada mata kuliah Ekonomi Digital di Fakultas Ekonomi dan Bisnis Islam, tanggung jawab utama saya adalah mendampingi dosen pengampu dalam menyelenggarakan 14 pertemuan perkuliahan interaktif bagi 35–40 mahasiswa, memfasilitasi forum diskusi studi kasus, mengelola administrasi akademik mencakup presensi dan dokumentasi pembelajaran, serta memeriksa dan mengevaluasi 120–150 hasil tugas, kuis, dan latihan mahasiswa secara objektif berdasarkan rubrik penilaian. Melalui dedikasi ini, seluruh rangkaian perkuliahan berjalan lancar dengan tingkat keberhasilan 100% serta penyelesaian rekapitulasi presensi, tugas, dan nilai akhir secara tepat waktu dengan kelengkapan data mencapai 100% selama satu semester. Kelancaran proses belajar-mengajar dan manajemen data akademik tersebut didukung penuh oleh pemanfaatan Simak UIN, Google Drive, Google Forms, Google Meet, serta Microsoft Word, Excel, dan PowerPoint.",
  },
  {
    id: "cireng",
    title: "Sales & Customer Service",
    place: "Digital Business Project – Cireng Isi Ayam by Rizka Kamila",
    period: "April 2025 – Juni 2025",
    tag: "Project",
    photos: [
      { src: "/proyek/cireng.jpg", alt: "Produk & Pemasaran Cireng Isi Ayam by Rizka Kamila", caption: "Produk Kuliner Cireng Isi Ayam by Rizka Kamila" },
    ],
    narrative:
      "Dalam pelaksanaan proyek bisnis digital 'Cireng Isi Ayam by Rizka Kamila', saya memegang peranan menyeluruh dari hulu ke hilir, mencakup pengurusan administrasi legalitas usaha (penerbitan NIB resmi), pelayanan pelanggan langsung yang responsif, eksekusi strategi penjualan, kreasi konten promosi digital, hingga memastikan proses produksi higienis sesuai standar keamanan pangan. Melalui strategi promosi digital yang terarah dan pelayanan konsumen yang ramah serta solutif, proyek ini sukses mencatatkan penjualan langsung sebanyak 50 pcs hanya dalam 1 hari dan menghasilkan keuntungan bersih mencapai 67% dari modal awal. Seluruh operasional bisnis ini dijalankan secara mandiri dengan memanfaatkan Canva untuk kreasi media promosi visual, Microsoft Excel & Spreadsheets untuk pencatatan transaksi dan analisis laba-rugi finansial, sistem OSS untuk legalitas izin usaha (NIB), serta penerapan standar SOP Higienitas Makanan.",
  },
];

interface OrgItem {
  id: string;
  period: string;
  role: string;
  org: string;
  photo: string;
  skills: string;
  objectPosition?: string;
}

const organizations: OrgItem[] = [
  {
    id: "kkn",
    period: "Jan 2025 – Feb 2025",
    role: "Staf Publikasi & Dokumentasi",
    org: "Kuliah Kerja Nyata (KKN)",
    photo: "/organisasi/kkn-82.jpg",
    skills: "Event Documentation · Media Publication · Visual Content",
    objectPosition: "center 60%",
  },
  {
    id: "las",
    period: "Agust 2023 – Mei 2024",
    role: "Staf Publikasi & Dokumentasi",
    org: 'Talkshow "Muda Berkarya" – Lembaga Akuntansi & Syariah',
    photo: "/organisasi/las.jpg",
    skills: "Media Publication · Visual Content · Promosi Acara",
  },
  {
    id: "es2",
    period: "Maret 2024",
    role: "Staf Publikasi & Dokumentasi",
    org: "Sambut Ramadhan – Project Kelas Ekonomi Syariah 2",
    photo: "/organisasi/kelas-es2.jpg",
    skills: "Dokumentasi Acara · Administrasi Media Sosial · Publikasi",
  },
  {
    id: "hmps",
    period: "Juni 2023 – Feb 2024",
    role: "Staf Humas",
    org: "Tebar 1000 Takjil & Pesantren Ramadhan – HMPS",
    photo: "/organisasi/hmps.jpg",
    skills: "Public Relations · Hubungan Masyarakat · Komunikasi Publik",
  },
];

const orgSkills = [
  "Event Documentation", "Media Publication Management", "Social Media Administration",
  "Public Relations Coordination", "Community Engagement", "Visual Content Planning",
  "Event Promotion Support", "QRIS Marketing Research", "Stakeholder Communication",
  "Public Information Dissemination",
];

const karya = [
  {
    id: "k1",
    src: "/karya/poster-kkn-cup.png",
    title: "Poster Turnamen KKN Cup 2025",
    category: "Desain Publikasi & Acara",
    desc: "Publikasi resmi kegiatan turnamen olahraga KKN Cup Kelompok 110 di Desa Perambahan (22–23 Februari 2025), dirancang informatif dan atraktif untuk masyarakat desa.",
  },
  {
    id: "k-cup-tim",
    src: "/karya/kkn-cup-tim.jpg",
    title: "KKN Cup, Tim Pelaksana",
    category: "Publikasi & Dokumentasi",
    desc: "Publikasi & Dokumentasi KKN 82 Kelompok 110 Desa Perambahan.",
  },
  {
    id: "k2",
    src: "/karya/poster-nilai-asn.png",
    title: "Poster Edukasi Nilai-Nilai Dasar ASN",
    category: "Media Edukasi & Informasi",
    desc: "Media visual sosialisasi nilai-nilai BerAKHLAK aparatur sipil negara yang disusun secara rapi, jelas, dan edukatif dalam program KKN.",
  },
  {
    id: "k3",
    src: "/karya/poster-komunita.png",
    title: "Poster Komunita Goes to DJBC",
    category: "Publikasi Kunjungan Instansi",
    desc: "Desain poster publikasi kunjungan studi komunitas ke Direktorat Jenderal Bea dan Cukai (DJBC), menggabungkan estetika formal dan layout yang jelas.",
  },
  {
    id: "k4",
    src: "/karya/video-profil-kkn.png",
    title: "Video Profil KKN Angkatan 82",
    category: "Dokumentasi & Video Profil",
    desc: "Video profil dan dokumentasi sinematik pengabdian masyarakat KKN 82 Kelompok 110 di Desa Perambahan, merekam program kerja dan interaksi hangat bersama warga.",
  },
  {
    id: "k5",
    src: "/karya/kominfo.jpg",
    title: "Desain Kominfo",
    category: "Media Publikasi & Informasi",
    desc: "Desain poster publikasi dan profil media kreatif divisi Kominfo yang dirancang informatif, terstruktur, dan selaras dengan identitas visual organisasi.",
  },
];

const navMenuItems = [
  { id: "hero", label: "Beranda", href: "#hero" },
  { id: "tentang", label: "Tentang", href: "#tentang" },
  { id: "kompetensi", label: "Kompetensi", href: "#kompetensi" },
  { id: "pengalaman", label: "Pengalaman", href: "#pengalaman" },
  { id: "organisasi", label: "Organisasi", href: "#organisasi" },
  { id: "sertifikat", label: "Sertifikat", href: "#sertifikat" },
];

const contactLinks = [
  { id: "contact-email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=rizkakamila27@gmail.com&su=Halo%20Rizka%20Kamila", icon: <Mail size={18} />, label: "Email", val: "rizkakamila27@gmail.com", external: true },
  { id: "contact-wa", href: "https://wa.me/6289654706172", icon: <WhatsAppIcon size={18} />, label: "WhatsApp", val: "(+62) 896-5470-6172", external: true },
  { id: "contact-li", href: "https://www.linkedin.com/in/rizkakamila", icon: <LinkedInIcon size={18} />, label: "LinkedIn", val: "linkedin.com/in/rizkakamila", external: true },
];

/* ------------------------------------------------------------------ */
/*  Main Page Component                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  useReveal();

  const [lightbox, setLightbox] = useState<{
    items: { src: string; alt: string; title?: string }[];
    index: number;
  } | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedCertCategory, setSelectedCertCategory] = useState("Semua Kategori");
  const [showAllCerts, setShowAllCerts] = useState(false);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      const sectionIds = ["hero", "tentang", "pendidikan", "kompetensi", "pengalaman", "organisasi", "sertifikat", "karya", "kontak"];
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          if (["hero", "tentang", "kompetensi", "pengalaman", "organisasi", "sertifikat"].includes(id)) {
            setActiveSection(id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSingle = (src: string, alt: string, title?: string) => {
    setLightbox({ items: [{ src, alt, title }], index: 0 });
  };

  const openGallery = (items: { src: string; alt: string; title?: string }[], index = 0) => {
    setLightbox({ items, index });
  };

  // Filtered certificates logic
  const filteredCertificates = certificateList.filter((c) => {
    if (selectedCertCategory === "Semua Kategori") return true;
    return c.category.toLowerCase() === selectedCertCategory.toLowerCase();
  });

  const displayedCertificates =
    selectedCertCategory === "Semua Kategori" && !showAllCerts
      ? filteredCertificates.slice(0, 3)
      : filteredCertificates;

  const certGalleryItems = displayedCertificates.map((s) => ({
    src: s.src,
    alt: s.title,
    title: `${s.title} — ${s.issuer}, ${s.date}`,
  }));

  const orgGalleryItems = organizations.map((o) => ({
    src: o.photo,
    alt: o.org,
    title: `${o.role} — ${o.org}`,
  }));

  const karyaGalleryItems = karya.map((k) => ({
    src: k.src,
    alt: k.title,
    title: `${k.title} — ${k.category}`,
  }));

  return (
    <>
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndexChange={(idx) => setLightbox((prev) => (prev ? { ...prev, index: idx } : null))}
        />
      )}

      {/* ============================================================ */}
      {/*  NAVBAR (Floating Pill in Top Center)                         */}
      {/* ============================================================ */}
      <header
        style={{
          position: "sticky",
          top: "16px",
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            background: "rgba(255, 251, 240, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--line)",
            borderRadius: "9999px",
            padding: "0.45rem 0.6rem 0.45rem 1.15rem",
            boxShadow: "0 8px 30px rgba(18, 38, 29, 0.08), 0 0 1px 1px rgba(255, 255, 255, 0.5)",
            maxWidth: 820,
            width: "100%",
          }}
        >
          {/* Logo Brand */}
          <a
            href="#hero"
            style={{
              fontWeight: 800,
              fontSize: "1.05rem",
              textDecoration: "none",
              color: "var(--text)",
              letterSpacing: "0.02em",
              display: "flex",
              alignItems: "center",
              gap: 2,
              paddingLeft: "0.25rem",
            }}
          >
            Rizka<span className="text-gradient">.</span>
          </a>

          {/* Desktop Nav Items */}
          <nav
            id="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "rgba(239, 232, 213, 0.65)",
              padding: "0.25rem",
              borderRadius: "9999px",
              border: "1px solid var(--line)",
            }}
          >
            {navMenuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    padding: "0.45rem 0.95rem",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.22s ease",
                    color: isActive ? "#F6F1E4" : "var(--muted)",
                    background: isActive ? "var(--accent)" : "transparent",
                    boxShadow: isActive ? "0 2px 10px rgba(31, 77, 58, 0.25)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Deep Green Kontak Button & Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <a href="#kontak" className="btn-contact">
              <span>Kontak</span>
              <ArrowUpRight size={16} strokeWidth={2.5} color="#F6F1E4" />
            </a>

            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                borderRadius: "50%",
                color: "var(--text)",
                width: 38,
                height: 38,
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 76,
            left: "1rem",
            right: "1rem",
            zIndex: 99,
            background: "rgba(255, 251, 240, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--line)",
            borderRadius: 20,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            boxShadow: "0 16px 40px rgba(18, 38, 29, 0.12)",
          }}
        >
          {navMenuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: isActive ? "#F6F1E4" : "var(--text)",
                  background: isActive ? "var(--accent)" : "rgba(239, 232, 213, 0.5)",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* ============================================================ */}
        {/*  HERO SECTION (Centered, No Photo)                           */}
        {/* ============================================================ */}
        <section id="hero" className="hero-section">
          {/* 1. HALO, SAYA */}
          <p
            className="reveal"
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            HALO, SAYA
          </p>

          {/* 2. Nama Besar Rizka Kamila */}
          <h1
            className="reveal"
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ color: "var(--text)" }}>Rizka </span>
            <span className="text-gradient">Kamila</span>
          </h1>

          {/* 3. Tagline */}
          <p
            className="reveal"
            style={{
              fontSize: "clamp(1.02rem, 2.1vw, 1.3rem)",
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: "1.2rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "0.35rem",
              rowGap: "0.25rem",
              textAlign: "center",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Administration</span>
            <span style={{ color: "var(--accent-2)", fontSize: "0.8em", opacity: 0.75, userSelect: "none" }}>•</span>
            <span style={{ whiteSpace: "nowrap" }}>Customer Service</span>
            <span style={{ color: "var(--accent-2)", fontSize: "0.8em", opacity: 0.75, userSelect: "none" }}>•</span>
            <span style={{ whiteSpace: "nowrap" }}>Finance</span>
            <span style={{ color: "var(--accent-2)", fontSize: "0.8em", opacity: 0.75, userSelect: "none" }}>•</span>
            <span style={{ whiteSpace: "nowrap" }}>Data Recapitulation</span>
            <span style={{ color: "var(--accent-2)", fontSize: "0.8em", opacity: 0.75, userSelect: "none" }}>•</span>
            <span style={{ whiteSpace: "nowrap" }}>Document Management</span>
          </p>

          {/* 4. Kalimat Singkat */}
          <p
            className="reveal"
            style={{
              maxWidth: 600,
              lineHeight: 1.85,
              fontSize: "0.96rem",
              color: "var(--muted)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Lulusan S1 Ekonomi Syariah dengan pengalaman dalam administrasi, pengelolaan data dan keuangan serta pelayanan pelanggan melalui kegiatan magang serta proyek akademik.
          </p>

          {/* 5. Pil Lokasi */}
          <div
            className="reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1.15rem",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "9999px",
              fontSize: "0.85rem",
              color: "var(--text)",
              fontWeight: 500,
              marginBottom: "2rem",
              boxShadow: "0 2px 8px rgba(18, 38, 29, 0.04)",
            }}
          >
            <MapPin size={16} color="var(--accent)" />
            <span>Palembang, Sumatera Selatan, Indonesia</span>
          </div>

          {/* 6. Dua Tombol Utama */}
          <div
            className="reveal"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "2.25rem",
            }}
          >
            <a href="#kompetensi" className="btn btn-primary">
              <span>Jelajahi Portofolio</span>
              <ArrowRight size={17} />
            </a>
            <a href="#kontak" className="btn btn-ghost">
              <Sparkles size={16} color="var(--accent)" />
              <span>Hubungi Saya</span>
            </a>
          </div>

          {/* 7. Deretan Pil Tautan (Email, LinkedIn, WhatsApp) */}
          <div
            className="reveal"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Email Pill */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rizkakamila27@gmail.com&su=Halo%20Rizka%20Kamila"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--text)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              className="card-hover-green"
            >
              <Mail size={16} color="#B45309" />
              <span>Email</span>
            </a>

            {/* LinkedIn Pill */}
            <a
              href="https://www.linkedin.com/in/rizkakamila"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--text)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              className="card-hover-green"
            >
              <span style={{ color: "#0284C7", display: "flex", alignItems: "center" }}>
                <LinkedInIcon size={16} />
              </span>
              <span>LinkedIn</span>
            </a>

            {/* WhatsApp Pill */}
            <a
              href="https://wa.me/6289654706172"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--text)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              className="card-hover-green"
            >
              <span style={{ color: "#16A34A", display: "flex", alignItems: "center" }}>
                <WhatsAppIcon size={16} />
              </span>
              <span>WhatsApp</span>
            </a>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TENTANG SAYA                                                */}
        {/* ============================================================ */}
        <section id="tentang" className="page-section">
          <h2 className="section-title reveal">Tentang Saya</h2>
          <div
            id="about-grid"
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(260px, 320px) 1fr",
              gap: "2.5rem",
              alignItems: "stretch",
            }}
          >
            <div
              id="about-photo"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 320,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--line)",
                boxShadow: "0 8px 26px rgba(18, 38, 29, 0.08)",
                background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: 420,
                }}
              >
                <Image
                  src="/foto-rizka.jpg"
                  alt="Foto Rizka Kamila"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    padding: "16px 12px 0 12px",
                  }}
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  lang="id"
                  className="desc-justify"
                  style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.96rem", marginBottom: "12px", marginTop: 0 }}
                >
                Saya lulusan S1 Ekonomi Syariah dengan pengalaman pengelolaan dokumen, rekapitulasi dan validasi data transaksi, serta administrasi keuangan melalui magang dan proyek bisnis. Terampil menggunakan Microsoft Excel, Word, PowerPoint, dan Google Workspace untuk mengelola data, dokumen, serta menyusun laporan. Pengalaman organisasi dan kepanitiaan turut membentuk kemampuan saya dalam komunikasi, koordinasi, dan pelayanan kepada orang lain.
              </p>
              <p
                lang="id"
                className="desc-justify"
                style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.96rem", marginBottom: "1.5rem" }}
              >
                Didukung pelatihan Microsoft Excel, Word &amp; PowerPoint Specialist, Accounting, Finance and Tax serta Digital Marketing dengan AI, saya tertarik berkontribusi dalam administrasi, customer service, dan pengelolaan keuangan yang akurat, tertib, dan terstruktur.
              </p>
            </div>
            <div
              id="stats-grid"
              className="grid grid-cols-2"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}
            >
              {[
                { val: "3,73", label: "IPK" },
                { val: "2026", label: "Lulusan Tercepat" },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <p className="text-gradient" style={{ fontSize: "1.85rem", fontWeight: 800, margin: 0 }}>
                    {s.val}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "0.8rem", fontWeight: 600, marginTop: "0.25rem", marginBottom: 0 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PENDIDIKAN                                                  */}
        {/* ============================================================ */}
        <section id="pendidikan" className="page-section">
          <h2 className="section-title reveal">Pendidikan</h2>
          <div className="card reveal" style={{ overflow: "hidden" }}>
            <div id="edu-grid" style={{ display: "grid", gridTemplateColumns: "270px 1fr" }}>
              <div style={{ position: "relative", minHeight: 220 }}>
                <Image src="/kampus-uin.jpg" alt="Kampus UIN Raden Fatah" fill style={{ objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, transparent 50%, var(--surface))",
                  }}
                />
              </div>
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", margin: 0 }}>
                    UIN Raden Fatah Palembang
                  </h3>
                  <span className="chip">IPK 3.73 / 4.00</span>
                </div>
                <p style={{ color: "var(--accent-2)", fontSize: "0.92rem", fontWeight: 600, margin: "0.2rem 0" }}>
                  S1 Ekonomi Syariah
                </p>
                <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginTop: "0.25rem", marginBottom: "0.85rem" }}>
                  Agustus 2022 – Januari 2026
                </p>
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
                  <p
                    lang="id"
                    className="desc-justify"
                    style={{ color: "var(--muted)", fontSize: "0.86rem", marginBottom: "0.5rem" }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>Skripsi: </span>
                    &ldquo;Dampak Word of Mouth terhadap Daya Saing Lapak Pempek Tumpah Arsy 1 Pasar 16 Ilir di Kota Palembang.&rdquo;
                  </p>
                  <p
                    lang="id"
                    className="desc-justify"
                    style={{ color: "var(--muted)", fontSize: "0.86rem", marginBottom: "0.5rem" }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>Minat: </span>
                    Ekonomi Digital, Manajemen Keuangan, Analisis Laporan Keuangan.
                  </p>
                  <p
                    lang="id"
                    className="desc-justify"
                    style={{ color: "var(--muted)", fontSize: "0.86rem", margin: 0 }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>&#127942; Prestasi: </span>
                    Penerima Predikat Lulusan Tercepat Program Studi Ekonomi Syariah pada Yudisium ke-40 Tahun 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  KOMPETENSI & PERANGKAT KERJA (Marquee Animated Rows)        */}
        {/* ============================================================ */}
        <section id="kompetensi" className="page-section">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }} className="reveal">
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 0.95rem",
                borderRadius: "9999px",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(31, 77, 58, 0.10)",
                border: "1px solid rgba(31, 77, 58, 0.22)",
                color: "var(--accent)",
                marginBottom: "0.75rem",
              }}
            >
              KEAHLIAN &amp; KOMPETENSI
            </span>
            <h2
              style={{
                fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: "0 0 0.6rem 0",
              }}
            >
              Kompetensi &amp; Perangkat Kerja
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>
              Peralatan, keahlian fungsional, dan kapabilitas profesional yang saya kuasai untuk administrasi, operasional, dan pengelolaan keuangan.
            </p>
          </div>

          {/* 3 Marquee Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="reveal">
            {/* Baris 1: Keahlian Utama + Bahasa (Scroll Kiri) */}
            <div className="marquee-wrapper">
              <div className="marquee-track marquee-track-left">
                {/* Loop 1 */}
                {keahlianUtamaDanBahasa.map((item, idx) => (
                  <div key={`row1-a-${idx}`} className="marquee-card">
                    <div className="marquee-card-icon">{item.icon}</div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
                {/* Loop 2 (Duplicate for seamless continuous scrolling) */}
                {keahlianUtamaDanBahasa.map((item, idx) => (
                  <div key={`row1-b-${idx}`} className="marquee-card marquee-dup" aria-hidden="true">
                    <div className="marquee-card-icon">{item.icon}</div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baris 2: Software & Tools (Scroll Kanan) */}
            <div className="marquee-wrapper">
              <div className="marquee-track marquee-track-right">
                {/* Loop 1 */}
                {softwareAndTools.map((tool, idx) => (
                  <div key={`row2-a-${idx}`} className="marquee-card">
                    <div
                      className="marquee-card-icon"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      <ToolLogo brand={tool.brand} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
                {/* Loop 2 (Duplicate for seamless loop) */}
                {softwareAndTools.map((tool, idx) => (
                  <div key={`row2-b-${idx}`} className="marquee-card marquee-dup" aria-hidden="true">
                    <div
                      className="marquee-card-icon"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      <ToolLogo brand={tool.brand} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baris 3: 12 Soft Skills dengan Ikon Lucide (Scroll Kiri) */}
            <div className="marquee-wrapper">
              <div className="marquee-track marquee-track-left">
                {/* Loop 1 */}
                {softSkillsList.map((skill, idx) => (
                  <div key={`row3-a-${idx}`} className="marquee-card">
                    <div className="marquee-card-icon">{skill.icon}</div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
                {/* Loop 2 (Duplicate for seamless loop) */}
                {softSkillsList.map((skill, idx) => (
                  <div key={`row3-b-${idx}`} className="marquee-card marquee-dup" aria-hidden="true">
                    <div className="marquee-card-icon">{skill.icon}</div>
                    <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PENGALAMAN                                                  */}
        {/* ============================================================ */}
        <section id="pengalaman" className="page-section">
          <h2 className="section-title reveal">Pengalaman</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="reveal"
                style={{
                  position: "relative",
                  marginBottom: index === experiences.length - 1 ? 0 : "1.25rem",
                }}
              >
                <div className="timeline-dot" />
                <div className="card" style={{ padding: "1.75rem" }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--text)", margin: 0 }}>
                        {exp.title}
                      </h3>
                      <p style={{ color: "var(--accent-2)", fontSize: "0.92rem", marginTop: "0.25rem", marginBottom: 0, fontWeight: 600 }}>
                        {exp.place}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                      <span className="chip">{exp.tag}</span>
                      <span style={{ color: "var(--accent)", fontSize: "0.84rem", fontWeight: 700 }}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Enlarged Experience Photos */}
                  {exp.photos.length > 0 && (
                    <div className={`exp-photo-grid ${exp.photos.length === 1 ? "single-photo" : ""}`} style={{ marginBottom: "1.25rem" }}>
                      {exp.photos.map((ph, pIndex) => (
                        <button
                          key={ph.src}
                          onClick={() =>
                            openGallery(
                              exp.photos.map((p) => ({
                                src: p.src,
                                alt: p.alt,
                                title: p.caption || p.alt,
                              })),
                              pIndex
                            )
                          }
                          className="exp-photo-card"
                          style={{
                            background: "var(--surface-2)",
                            border: "1px solid var(--line)",
                            borderRadius: 16,
                            overflow: "hidden",
                            cursor: "zoom-in",
                            padding: 0,
                            position: "relative",
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            height: 250,
                            boxShadow: "0 3px 12px rgba(18, 38, 29, 0.05)",
                          }}
                          aria-label={`Lihat foto ${ph.alt}`}
                        >
                          <Image
                            src={ph.src}
                            alt={ph.alt}
                            fill
                            style={{ objectFit: "cover", transition: "transform 0.35s ease" }}
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(to top, rgba(18, 38, 29, 0.85) 0%, transparent 50%)",
                              pointerEvents: "none",
                            }}
                          />
                          {ph.caption && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: 12,
                                left: 14,
                                right: 14,
                              }}
                            >
                              <span style={{ color: "#FFFFFF", fontSize: "0.82rem", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                                {ph.caption}
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Unified Narrative */}
                  <div
                    style={{
                      background: "rgba(31, 77, 58, 0.05)",
                      border: "1px solid rgba(31, 77, 58, 0.18)",
                      borderRadius: 14,
                      padding: "1.25rem 1.4rem",
                    }}
                  >
                    <p
                      lang="id"
                      className="desc-justify"
                      style={{ color: "var(--text)", fontSize: "0.93rem", lineHeight: 1.85, margin: 0 }}
                    >
                      {exp.narrative}
                    </p>
                  </div>

                  {/* Bukti Surat Keterangan Kerja Praktik (khusus Pusri) */}
                  {exp.id === "pusri" && (
                    <div
                      style={{
                        marginTop: "1.15rem",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        borderRadius: 14,
                        padding: "0.85rem 1.15rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.85rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            background: "rgba(31, 77, 58, 0.10)",
                            border: "1px solid rgba(31, 77, 58, 0.20)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--accent)",
                            flexShrink: 0,
                          }}
                        >
                          <FileText size={18} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "var(--text)" }}>
                            Surat Keterangan Kerja Praktik, Nilai 9
                          </p>
                          <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)" }}>
                            Departemen Administrasi Umum Aset · PT Pupuk Sriwidjaja Palembang
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openSingle(
                            "/sertifikat/surat-keterangan-pusri.jpg",
                            "Surat Keterangan Kerja Praktik — PT Pupuk Sriwidjaja Palembang",
                            "Surat Keterangan Kerja Praktik — PT Pupuk Sriwidjaja Palembang (Nilai 9)"
                          )
                        }
                        className="btn-cert-evidence"
                        style={{
                          padding: "0.6rem 1.15rem",
                          borderRadius: 10,
                          background: "var(--surface-2)",
                          border: "1px solid var(--line)",
                          color: "var(--accent)",
                          fontWeight: 700,
                          fontSize: "0.84rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          cursor: "pointer",
                          transition: "all 0.22s ease",
                        }}
                      >
                        <FileText size={16} style={{ flexShrink: 0 }} />
                        <span>Lihat Surat Keterangan</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  ORGANISASI & KEPANITIAAN                                    */}
        {/* ============================================================ */}
        <section id="organisasi" className="page-section">
          <h2 className="section-title reveal">Organisasi &amp; Kepanitiaan</h2>
          <div id="org-grid" className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem", marginBottom: "1.25rem" }}>
            {organizations.map((org, index) => (
              <div key={org.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() => openGallery(orgGalleryItems, index)}
                  className="org-photo-btn"
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    border: "none",
                    borderBottom: "1px solid var(--line)",
                    padding: 0,
                    cursor: "zoom-in",
                    background: "var(--surface-2)",
                    display: "block",
                    textAlign: "left",
                  }}
                  aria-label={`Perbesar foto ${org.org}`}
                >
                  <Image
                    src={org.photo}
                    alt={org.org}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: org.objectPosition || "center",
                      transition: "transform 0.35s ease",
                    }}
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                </button>

                <div style={{ padding: "1.35rem 1.45rem", display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
                  <div>
                    <span className="chip" style={{ fontSize: "0.74rem", padding: "0.22rem 0.65rem" }}>
                      {org.period}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", margin: 0, lineHeight: 1.35 }}>
                    {org.role}
                  </h3>
                  <p
                    lang="id"
                    className="desc-justify"
                    style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}
                  >
                    {org.org}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.85rem", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--accent)", fontWeight: 700 }}>⚡ Skills:</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500 }}>{org.skills}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card reveal" style={{ padding: "1.5rem" }}>
            <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.85rem", marginTop: 0 }}>
              Skills yang dikembangkan
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
              {orgSkills.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SERTIFIKASI & PELATIHAN (Kartu Terpisah + Filter)          */}
        {/* ============================================================ */}
        <section id="sertifikat" className="page-section">
          {/* Header Row */}
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.75rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.32rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "rgba(31, 77, 58, 0.10)",
                  border: "1px solid rgba(31, 77, 58, 0.22)",
                  color: "var(--accent)",
                  marginBottom: "0.6rem",
                }}
              >
                KREDENSIAL &amp; LISENSI
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.85rem, 3.8vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  margin: "0 0 0.45rem 0",
                }}
              >
                Sertifikasi &amp; Pelatihan
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0, maxWidth: 640 }}>
                Sertifikat profesional dari MySkill, Bursa Efek Indonesia, Halal Center UIN Sunan Kalijaga, dan Central Course.
              </p>
            </div>

            {/* Tombol Lihat Semua di kanan atas */}
            {selectedCertCategory === "Semua Kategori" && (
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  color: "var(--text)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 8px rgba(18, 38, 29, 0.05)",
                }}
                className="card-hover-green"
              >
                <span>{showAllCerts ? "Tampilkan Lebih Sedikit" : `Lihat Semua (${certificateList.length})`}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills Row */}
          <div
            className="reveal"
            style={{
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            {certCategories.map((cat) => {
              const isActive = selectedCertCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCertCategory(cat);
                  }}
                  style={{
                    padding: "0.55rem 1.2rem",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    background: isActive ? "var(--accent)" : "var(--surface)",
                    color: isActive ? "#F6F1E4" : "var(--muted)",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                    boxShadow: isActive ? "0 4px 14px rgba(31, 77, 58, 0.25)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Cards Grid: 3 cols desktop, 2 tablet, 1 mobile */}
          <div id="cert-grid" className="reveal">
            {displayedCertificates.map((cert) => {
              const galleryIdx = displayedCertificates.findIndex((c) => c.id === cert.id);
              return (
                <div
                  key={cert.id}
                  className="card cert-card"
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {/* 1. Gambar Sertifikat di bagian atas kartu, bingkai rounded berlatar --surface-2, tinggi ~220px, object-fit contain utuh */}
                  <div
                    onClick={() => openGallery(certGalleryItems, galleryIdx >= 0 ? galleryIdx : 0)}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 220,
                      background: "var(--surface-2)",
                      borderRadius: 14,
                      overflow: "hidden",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                      boxSizing: "border-box",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                    }}
                    title="Klik untuk melihat detail sertifikat"
                  >
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={cert.src}
                        alt={cert.title}
                        fill
                        style={{ objectFit: "contain", objectPosition: "center" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* 2. Satu baris: Chip Tahun (kiri) + Nama Penerbit (kanan, ellipsis) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginTop: "1rem",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.22rem 0.75rem",
                        borderRadius: "9999px",
                        background: "rgba(31, 77, 58, 0.12)",
                        color: "var(--accent)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        flexShrink: 0,
                      }}
                    >
                      {cert.year}
                    </span>
                    <span
                      title={cert.issuer}
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "right",
                      }}
                    >
                      {cert.issuer}
                    </span>
                  </div>

                  {/* 3. Judul Sertifikat Tebal, maksimal 2 baris */}
                  <h3
                    title={cert.title}
                    style={{
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      margin: "0 0 0.5rem 0",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "2.85rem",
                    }}
                  >
                    {cert.title}
                  </h3>

                  {/* 4. Deskripsi Singkat 2-3 baris warna muted */}
                  <p
                    title={cert.summary}
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.84rem",
                      lineHeight: 1.55,
                      margin: "0 0 1rem 0",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "3.9rem",
                    }}
                  >
                    {cert.summary}
                  </p>

                  {/* 5. Garis Pemisah Tipis, lalu Tombol Penuh Selebar Kartu */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "0.95rem",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => openGallery(certGalleryItems, galleryIdx >= 0 ? galleryIdx : 0)}
                      className="btn-cert-evidence"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 12,
                        background: "var(--surface-2)",
                        border: "1px solid var(--line)",
                        color: "var(--accent)",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.55rem",
                        cursor: "pointer",
                        transition: "all 0.22s ease",
                      }}
                    >
                      <FileText size={17} style={{ flexShrink: 0 }} />
                      <span>Lihat Bukti / Sertifikat</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  KARYA & PROYEK                                              */}
        {/* ============================================================ */}
        <section id="karya" className="page-section">
          <h2 className="section-title reveal">Karya &amp; Proyek</h2>
          <p className="reveal" style={{ color: "var(--muted)", fontSize: "0.88rem", marginTop: "-0.25rem", marginBottom: "1.25rem" }}>
            Klik karya untuk melihat pratinjau resolusi tinggi
          </p>
          <div id="karya-grid" className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}>
            {karya.map((k, idx) => (
              <button
                key={k.id}
                onClick={() => openGallery(karyaGalleryItems, idx)}
                className="card karya-card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  cursor: "zoom-in",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 380,
                    background: "radial-gradient(ellipse at center, rgba(31, 77, 58, 0.05) 0%, rgba(246, 241, 228, 0.95) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <Image
                    src={k.src}
                    alt={k.title}
                    fill
                    style={{ objectFit: "contain", padding: "14px", transition: "transform 0.35s ease" }}
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(255, 251, 240, 0.92)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid var(--line)",
                      borderRadius: 9999,
                      padding: "4px 10px",
                      fontSize: "0.72rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      boxShadow: "0 2px 6px rgba(18, 38, 29, 0.08)",
                    }}
                  >
                    <span>&#128269; Zoom In</span>
                  </div>
                </div>

                <div style={{ padding: "1.35rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ marginBottom: "0.6rem" }}>
                      <span className="chip" style={{ fontSize: "0.72rem", padding: "0.2rem 0.65rem" }}>
                        {k.category}
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.4, marginBottom: "0.45rem" }}>
                      {k.title}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.86rem", lineHeight: 1.65, margin: 0 }}>
                      {k.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent)", fontSize: "0.82rem", fontWeight: 600 }}>
                    <span>Lihat detail desain</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  KONTAK                                                      */}
        {/* ============================================================ */}
        <section id="kontak" className="page-section">
          <h2 className="section-title reveal">Kontak</h2>
          <div id="contact-grid" className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
            {/* Info */}
            <div>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                Terbuka untuk peluang kerja, kolaborasi, atau diskusi. Jangan ragu menghubungi saya!
              </p>
              <div style={{ display: "grid", gap: "0.85rem" }}>
                {contactLinks.map((c) => (
                  <a
                    key={c.id}
                    id={c.id}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      textDecoration: "none",
                      color: "var(--text)",
                      padding: "0.95rem 1.15rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(31, 77, 58, 0.10)",
                        border: "1px solid rgba(31, 77, 58, 0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ color: "var(--muted)", fontSize: "0.74rem", margin: "0 0 0.15rem 0", fontWeight: 600 }}>
                        {c.label}
                      </p>
                      <p style={{ fontWeight: 600, margin: 0, color: "var(--text)" }}>{c.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Tombol Kontak Langsung */}
            <div
              className="card"
              style={{
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--text)" }}>
                Hubungi Langsung
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.65, margin: "0 0 1.5rem 0" }}>
                Pilih jalur komunikasi yang paling nyaman bagi Anda untuk mendiskusikan peluang kerja, kolaborasi, atau pertanyaan langsung.
              </p>
              <div
                id="contact-buttons-wrapper"
                style={{
                  display: "flex",
                  gap: "0.85rem",
                }}
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=rizkakamila27@gmail.com&su=Halo%20Rizka%20Kamila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    padding: "0.85rem 1.35rem",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    flex: 1,
                  }}
                >
                  <Mail size={18} />
                  <span>Kirim via Email</span>
                </a>
                <a
                  href="https://wa.me/6289654706172"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    padding: "0.85rem 1.35rem",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    flex: 1,
                  }}
                >
                  <span style={{ color: "#16A34A", display: "inline-flex", alignItems: "center" }}>
                    <WhatsAppIcon size={18} />
                  </span>
                  <span>Chat via WhatsApp</span>
                </a>
              </div>

              {/* Salin Alamat Email */}
              <CopyEmail />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1.5rem",
          color: "var(--muted)",
          fontSize: "0.85rem",
          fontWeight: 500,
          marginTop: "3rem",
        }}
      >
        Rizka Kamila
      </footer>

      {/* Global CSS Enhancements */}
      <style>{`
        /* Card hover green outline */
        .card-hover-green:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
          color: var(--accent) !important;
        }

        /* Certificate card and button styling */
        .cert-card {
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cert-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(18, 38, 29, 0.12) !important;
        }
        .btn-cert-evidence {
          background: var(--surface-2);
          border: 1px solid var(--line);
          color: var(--accent);
          transition: all 0.22s ease;
        }
        .btn-cert-evidence:hover {
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          color: #FFFBF0 !important;
          box-shadow: 0 4px 14px rgba(31, 77, 58, 0.28) !important;
          transform: translateY(-1px);
        }
        .btn-cert-evidence:hover svg {
          stroke: #FFFBF0 !important;
        }

        /* Certificate grid responsive */
        #cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1024px) {
          #cert-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          #cert-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Experience photo grid */
        .exp-photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .exp-photo-grid.single-photo {
          grid-template-columns: 1fr;
        }
        .exp-photo-card:hover img {
          transform: scale(1.03);
        }
        .org-photo-btn:hover img {
          transform: scale(1.03);
        }
        .karya-card:hover img {
          transform: scale(1.03);
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
          .exp-photo-grid { grid-template-columns: 1fr !important; }
          #about-grid  { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          #about-photo { width: 100% !important; max-width: 280px !important; margin: 0 auto 1.25rem !important; height: 380px !important; }
          #stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          #edu-grid    { grid-template-columns: 1fr !important; }
          #edu-grid > div:first-child { min-height: 180px !important; }
          #org-grid    { grid-template-columns: 1fr !important; }
          #karya-grid  { grid-template-columns: 1fr !important; }
          #contact-grid{ grid-template-columns: 1fr !important; }
          #contact-buttons-wrapper { flex-direction: column !important; }
        }

        input::placeholder, textarea::placeholder {
          color: var(--muted);
          opacity: 0.7;
        }
        input:focus, textarea:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(31, 77, 58, 0.2) !important;
        }
      `}</style>
    </>
  );
}
