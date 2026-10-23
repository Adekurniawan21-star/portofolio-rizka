// app/page.tsx — edit data di bagian atas saja, sesuaikan dengan isi file portofolio
const profile = {
  name: "Rizka Kamila",
  role: "Administrative & Customer Service | Finance",
  intro:
    "Profesional di bidang administrasi, layanan pelanggan, dan keuangan yang teliti, rapi, dan berorientasi pada hasil.",
  email: "email@contoh.com",
  phone: "08xx-xxxx-xxxx",
};

const skills = [
  "Administrasi Perkantoran",
  "Customer Service",
  "Pencatatan Keuangan",
  "Microsoft Excel",
  "Pelaporan & Dokumentasi",
  "Komunikasi Efektif",
];

const experiences = [
  { title: "Posisi / Pengalaman 1", place: "Nama Instansi", period: "2023 – 2024", desc: "Tuliskan tugas dan pencapaian utama." },
  { title: "Posisi / Pengalaman 2", place: "Nama Instansi", period: "2022 – 2023", desc: "Tuliskan tugas dan pencapaian utama." },
];

const inputStyle = { border: "1px solid var(--line)" };

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <nav className="flex items-center justify-between py-6 text-sm">
        <span className="font-semibold">
          {profile.name}
          <span className="text-gradient">.</span>
        </span>
        <div className="flex gap-6" style={{ color: "var(--muted)" }}>
          <a href="#tentang">Tentang</a>
          <a href="#skill">Keahlian</a>
          <a href="#pengalaman">Pengalaman</a>
          <a href="#kontak">Kontak</a>
        </div>
      </nav>

      <section className="py-24">
        <p className="mb-4 text-sm tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Portofolio
        </p>
        <h1 className="text-gradient text-5xl font-bold leading-tight md:text-6xl">{profile.name}</h1>
        <p className="mt-3 text-xl" style={{ color: "var(--muted)" }}>{profile.role}</p>
        <p className="mt-6 max-w-xl" style={{ color: "var(--muted)" }}>{profile.intro}</p>
        <div className="mt-8 flex gap-3">
          <a href="#kontak" className="btn btn-primary">Hubungi Saya</a>
          <a href="#pengalaman" className="btn btn-ghost">Lihat Pengalaman</a>
        </div>
      </section>

      <section id="tentang" className="py-12">
        <h2 className="mb-4 text-2xl font-semibold">Tentang Saya</h2>
        <div className="card p-6" style={{ color: "var(--muted)" }}>
          Isi dengan ringkasan profil, latar belakang pendidikan, dan nilai kerja Anda dari file portofolio.
        </div>
      </section>

      <section id="skill" className="py-12">
        <h2 className="mb-4 text-2xl font-semibold">Keahlian</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s} className="card p-5 text-sm">{s}</div>
          ))}
        </div>
      </section>

      <section id="pengalaman" className="py-12">
        <h2 className="mb-4 text-2xl font-semibold">Pengalaman</h2>
        <div className="grid gap-4">
          {experiences.map((e) => (
            <div key={e.title} className="card p-6">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="font-semibold">{e.title}</h3>
                <span className="text-sm" style={{ color: "var(--accent)" }}>{e.period}</span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{e.place}</p>
              <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kontak" className="py-12 pb-24">
        <h2 className="mb-4 text-2xl font-semibold">Kontak</h2>
        <form action="/api/contact" method="post" className="card grid gap-3 p-6">
          <input name="name" required placeholder="Nama" className="rounded-lg bg-transparent p-3 text-sm outline-none" style={inputStyle} />
          <input name="email" type="email" required placeholder="Email" className="rounded-lg bg-transparent p-3 text-sm outline-none" style={inputStyle} />
          <textarea name="message" required rows={4} placeholder="Pesan" className="rounded-lg bg-transparent p-3 text-sm outline-none" style={inputStyle} />
          <button className="btn btn-primary w-fit">Kirim Pesan</button>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{profile.email} · {profile.phone}</p>
        </form>
      </section>
    </main>
  );
}