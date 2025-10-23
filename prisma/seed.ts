// prisma/seed.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL.substring(0, 30) + "..."
    : "Not defined",
);

// 1. Import PrismaClient untuk berinteraksi dengan database
import {
  PrismaClient,
  UserRole,
  JobType,
  WorkStyle,
  ApplicationStatus,
} from "@prisma/client";

// Buat instance dari PrismaClient
const prisma = new PrismaClient();

// 2. Full database backup data
const backupData = {
  User: [
    {
      id: "2380f69f-adaf-48b9-b456-06befcfbfb6f",
      name: "mint",
      email: "mins527@gmail.com",
      role: UserRole.COMPANY,
      phone: "+6285704442857",
      address: "Jl. Miaw Miaw Barat no 6",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      createdAt: new Date("2025-10-06T18:22:56.165Z"),
      twoFactorEnabled: false,
    },
    {
      id: "6aff0c56-82f8-468e-b5ea-d2d9fe81983f",
      name: "Miaw",
      email: "anyacans527@gmail.com",
      role: UserRole.SOCIETY,
      phone: "+6285704347857",
      address: "JL. Miaw",
      date_of_birth: new Date("2025-09-03T17:00:00.000Z"),
      createdAt: new Date("2025-09-16T00:39:29.203Z"),
      twoFactorEnabled: false,
    },
    {
      id: "99b66474-e816-4e5c-8606-9cb8be1f5862",
      name: "Company",
      email: "azrilw0rky@gmail.com",
      role: UserRole.COMPANY,
      phone: "+6285704347850",
      address: "Jl. Semangat",
      date_of_birth: new Date("2025-09-05T17:00:00.000Z"),
      createdAt: new Date("2025-09-07T20:31:50.550Z"),
      twoFactorEnabled: false,
    },
    {
      id: "1fc91245-1ad8-427b-97c7-b70894e8a99b",
      name: "Emily",
      email: "emily.wdwajohnson@x.dummyjson.com",
      role: UserRole.SOCIETY,
      phone: "+6285704447857",
      address: "Jl. A Yani 133",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      createdAt: new Date("2025-10-06T06:51:27.554Z"),
      twoFactorEnabled: false,
    },
    {
      id: "13e13cff-7c8b-4c43-9123-d040a2b92803",
      name: "Fajri",
      email: "fajrifajri@gmail.com",
      role: UserRole.HRD,
      phone: "+6285704447857",
      address: "Jl. A Yani no 125",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      createdAt: new Date("2025-10-06T07:48:23.879Z"),
      twoFactorEnabled: false,
    },
    {
      id: "6bf56ec2-e99e-4fa1-9960-96d6c5aec2cf",
      name: "SMB",
      email: "azril.al1433@smk.belajar.id",
      role: UserRole.SOCIETY,
      phone: "+6285704337857",
      address: "Jl. Ahmad Yani no 133",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      createdAt: new Date("2025-10-06T17:58:21.057Z"),
      twoFactorEnabled: false,
    },
    {
      id: "27972f8e-0f0b-447b-92a7-52fdfe0d0fbd",
      name: "Bernald",
      email: "alfajriazril1@gmail.com",
      role: UserRole.ADMIN,
      phone: "+6285704347850",
      address: "Jl. malas malas",
      date_of_birth: new Date("2007-11-14T17:00:00.000Z"),
      createdAt: new Date("2025-08-22T06:41:18.557Z"),
      twoFactorEnabled: true,
    },
    {
      id: "b7d7c489-bf26-4db4-aca8-5d962628b0f9",
      name: "MIAWMANS",
      email: "alfajwdadriazril1@gmail.com",
      role: UserRole.COMPANY,
      phone: "+6285704347890",
      address: "Jl. Miaw Danau no 9",
      date_of_birth: new Date("2000-11-23T17:00:00.000Z"),
      createdAt: new Date("2025-10-19T01:38:22.470Z"),
      twoFactorEnabled: false,
    },
    {
      id: "ffcb5131-e0f5-436b-8421-b223c545bca8",
      name: "NO 1",
      email: "fujikagiNO1@gmail.com",
      role: UserRole.COMPANY,
      phone: "+6285704347810",
      address: "Jl. Pertama no 1",
      date_of_birth: new Date("2000-12-31T17:00:00.000Z"),
      createdAt: new Date("2025-10-19T01:58:19.483Z"),
      twoFactorEnabled: false,
    },
    {
      id: "577e5953-5efb-47e4-8277-ebe866592754",
      name: "Pen",
      email: "CodePen@gmail.com",
      role: UserRole.COMPANY,
      phone: "+6285704447809",
      address: "Jl. Darat Codex no 9",
      date_of_birth: new Date("1999-12-30T17:00:00.000Z"),
      createdAt: new Date("2025-10-19T02:10:11.046Z"),
      twoFactorEnabled: false,
    },
  ],
  HRD: [
    {
      id: 1,
      user_id: "13e13cff-7c8b-4c43-9123-d040a2b92803",
      company_id: 1,
    },
  ],
  Society: [
    {
      id: 1,
      name: "SocietyTest1",
      address: "Jl.awawr hyuga - malang",
      phone: "+6285704347850",
      date_of_birth: new Date("1969-12-31T17:00:00.000Z"),
      gender: "Male",
      user_id: "27972f8e-0f0b-447b-92a7-52fdfe0d0fbd",
      location: null,
      headline: null,
      about: null,
      profile_picture: null,
      available_dates: [],
      occupation: null,
      social_media_url: null,
      working_papers_url: null,
      most_memorable_tip: null,
    },
    {
      id: 5,
      name: "Emily",
      address: "Jl. A Yani 133",
      phone: "+6285704447857",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      gender: null,
      user_id: "1fc91245-1ad8-427b-97c7-b70894e8a99b",
      location: null,
      headline: null,
      about: null,
      profile_picture: null,
      available_dates: [],
      occupation: null,
      social_media_url: null,
      working_papers_url: null,
      most_memorable_tip: null,
    },
    {
      id: 6,
      name: "SMB",
      address: "Jl. Ahmad Yani no 133",
      phone: "+6285704337857",
      date_of_birth: new Date("2007-11-23T17:00:00.000Z"),
      gender: null,
      user_id: "6bf56ec2-e99e-4fa1-9960-96d6c5aec2cf",
      location: null,
      headline: null,
      about: null,
      profile_picture: null,
      available_dates: [],
      occupation: null,
      social_media_url: null,
      working_papers_url: null,
      most_memorable_tip: null,
    },
    {
      id: 3,
      name: "Waguri",
      address: "JL. Miaw barat no 67",
      phone: "+6285704347857",
      date_of_birth: new Date("2025-09-03T17:00:00.000Z"),
      gender: null,
      user_id: "6aff0c56-82f8-468e-b5ea-d2d9fe81983f",
      location: "Malang, Malang City, East Java, Indonesia",
      headline: "Senior Frontend Developer - Innovate. Build. Inspire.",
      about:
        "\"At EchoStream Media, we believe in the power of great user experience to drive our mission forward. We're on the hunt for a Senior Frontend Developer who is eager to Innovate, Build, and Inspire within a supportive and ambitious environment. You'll architect robust frontend solutions, champion best practices, and play a crucial role in bringing our product vision to life. Beyond just coding, you'll inspire your peers, foster a culture of technical excellence, and contribute directly to products used by a global audience consuming engaging content.\"",
      profile_picture:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/profile-pictures/6aff0c56-82f8-468e-b5ea-d2d9fe81983f/1760598137191-WhatsApp Image 2025-09-14 at 14.11.02.jpeg",
      available_dates: [
        new Date("2025-10-22T17:00:00.000Z"),
        new Date("2025-10-29T17:00:00.000Z"),
        new Date("2025-10-20T17:00:00.000Z"),
      ],
      occupation: "IT Support",
      social_media_url:
        "linkedin.com/in/azril-al-fajri-4a2b61292/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      working_papers_url: "cv-3-d-models.vercel.app",
      most_memorable_tip: null,
    },
  ],
  Company: [
    {
      id: 14,
      name: "CodePen",
      address: "Jl. Code darat no 1",
      phone: "+62856742428632",
      description: "Code Pen is company that help you with visible your code.",
      user_id: "577e5953-5efb-47e4-8277-ebe866592754",
      logo: "https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1761179200853.png",
    },
    {
      id: 12,
      name: "MIAW COPS",
      address: "Jl. Danau MIAW no 9",
      phone: "+62856742428992",
      description: "MIAW COPS is a corporation for the sake of humanity",
      user_id: "b7d7c489-bf26-4db4-aca8-5d962628b0f9",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Seal_of_the_Miami_Police_Department.png",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1761179235424.pdf",
    },
    {
      id: 2,
      name: "DORS",
      address: "Jl. Danau Ranau no 5 ",
      phone: "+62856742428672",
      description:
        "DORS is a company that gives opportunities to job seekers who have skills in IT infrastructure.",
      user_id: "2380f69f-adaf-48b9-b456-06befcfbfb6f",
      logo: "https://systemgroup.com.ua/sites/default/files/dors.jpg",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1760142289590.png",
    },
    {
      id: 1,
      name: "Stark",
      address: "jl. ahmad yani no 6",
      phone: "+6285704347856",
      description: "Stark are good ",
      user_id: "27972f8e-0f0b-447b-92a7-52fdfe0d0fbd",
      logo: "https://stark.co.uk/wp-content/uploads/2022/12/Stark-Logo-Corporate-Blue.svg",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1760142341639.pdf",
    },
    {
      id: 13,
      name: "NO 1 CORPS",
      address: "Jl. Danau Ranau no 1",
      phone: "+62856742428611",
      description: "The company that stand beyond cloud",
      user_id: "ffcb5131-e0f5-436b-8421-b223c545bca8",
      logo: "https://png.pngtree.com/png-clipart/20221110/original/pngtree-number-1-rough-logo-picture-image_3619854.png",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1761179436241.png",
    },
    {
      id: 11,
      name: "SKINTIFIC",
      address: "jl. ahmad yani no 654",
      phone: "+6285704347823",
      description:
        "Skintific adalah merek perawatan kulit yang dikenal dengan formulanya yang menggabungkan bahan-bahan aktif teruji secara ilmiah dengan teknologi mutakhir. Berasal dari Kanada, merek ini populer di Indonesia karena produk-produknya yang efektif mengatasi berbagai masalah kulit, seperti memperbaiki skin barrier, mencerahkan, melembapkan, dan mengatasi jerawat.",
      user_id: "99b66474-e816-4e5c-8606-9cb8be1f5862",
      logo: "https://s3.ap-southeast-1.amazonaws.com/buckets.epicareer.com/employer/logo/20240921173331-tchortvfxowmfxiudcrb.jpg.jpg",
      companyCertificateUrl:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/company-certificates/1760164093908.png",
    },
  ],
  CompanyMonthlyStats: [
    {
      id: 6,
      companyId: 2,
      month: 1,
      year: 2025,
      successRate: 0.12,
    },
    {
      id: 7,
      companyId: 2,
      month: 2,
      year: 2025,
      successRate: 0.2,
    },
    {
      id: 8,
      companyId: 2,
      month: 3,
      year: 2025,
      successRate: 0.25,
    },
    {
      id: 9,
      companyId: 2,
      month: 4,
      year: 2025,
      successRate: 0.03,
    },
    {
      id: 10,
      companyId: 2,
      month: 5,
      year: 2025,
      successRate: 0.34,
    },
    {
      id: 11,
      companyId: 2,
      month: 6,
      year: 2025,
      successRate: 0.4,
    },
    {
      id: 12,
      companyId: 2,
      month: 7,
      year: 2025,
      successRate: 0.2,
    },
    {
      id: 13,
      companyId: 2,
      month: 8,
      year: 2025,
      successRate: 0.3,
    },
    {
      id: 14,
      companyId: 2,
      month: 9,
      year: 2025,
      successRate: 0.32,
    },
    {
      id: 15,
      companyId: 2,
      month: 10,
      year: 2025,
      successRate: 0.5,
    },
    {
      id: 16,
      companyId: 1,
      month: 1,
      year: 2025,
      successRate: 0,
    },
    {
      id: 17,
      companyId: 1,
      month: 2,
      year: 2025,
      successRate: 0.1,
    },
    {
      id: 18,
      companyId: 1,
      month: 3,
      year: 2025,
      successRate: 0.04,
    },
    {
      id: 19,
      companyId: 1,
      month: 4,
      year: 2025,
      successRate: 0.2,
    },
    {
      id: 20,
      companyId: 1,
      month: 5,
      year: 2025,
      successRate: 0.26,
    },
    {
      id: 21,
      companyId: 1,
      month: 6,
      year: 2025,
      successRate: 0.45,
    },
    {
      id: 22,
      companyId: 1,
      month: 7,
      year: 2025,
      successRate: 0.65,
    },
    {
      id: 23,
      companyId: 1,
      month: 8,
      year: 2025,
      successRate: 1.25,
    },
    {
      id: 24,
      companyId: 1,
      month: 9,
      year: 2025,
      successRate: 0.9,
    },
    {
      id: 25,
      companyId: 1,
      month: 10,
      year: 2025,
      successRate: 0.5,
    },
    {
      id: 26,
      companyId: 1,
      month: 11,
      year: 2025,
      successRate: 0.3,
    },
    {
      id: 27,
      companyId: 1,
      month: 12,
      year: 2025,
      successRate: 0.35,
    },
    {
      id: 28,
      companyId: 11,
      month: 8,
      year: 2025,
      successRate: 0.12,
    },
    {
      id: 29,
      companyId: 11,
      month: 9,
      year: 2025,
      successRate: 0.25,
    },
    {
      id: 30,
      companyId: 11,
      month: 10,
      year: 2025,
      successRate: 0.27,
    },
    {
      id: 31,
      companyId: 11,
      month: 11,
      year: 2025,
      successRate: 0.25,
    },
    {
      id: 32,
      companyId: 11,
      month: 12,
      year: 2025,
      successRate: 0.29,
    },
  ],
  AvailablePosition: [
    {
      id: 1,
      position_name: "IT Support",
      capacity: 3,
      description:
        "The IT Support Specialist is responsible for providing technical assistance and support to employees for hardware, software, and network-related issues. The role involves diagnosing problems, implementing effective solutions, and ensuring the smooth and efficient operation of the company's IT infrastructure to maximize user productivity.",
      submission_start_date: new Date("2025-10-09T17:00:00.000Z"),
      submission_end_date: new Date("2035-10-09T17:00:00.000Z"),
      company_id: 1,
      jobType: JobType.CONTRACT,
      salaryMax: 3399,
      salaryMin: 2300,
      workStyle: WorkStyle.REMOTE,
    },
    {
      id: 3,
      position_name: "AI Engineer",
      capacity: 2,
      description:
        "Seorang AI Engineer bertanggung jawab untuk merancang, mengembangkan, dan mengimplementasikan solusi berbasis kecerdasan buatan (AI) untuk memecahkan masalah bisnis yang kompleks. Peran ini berfokus pada pembangunan, pelatihan, dan penerapan model machine learning dan deep learning, serta mengintegrasikannya ke dalam produk dan layanan yang ada. Kandidat yang ideal memiliki keahlian gabungan dalam pengembangan perangkat lunak, ilmu data, dan rekayasa data.",
      submission_start_date: new Date("2025-10-08T17:00:00.000Z"),
      submission_end_date: new Date("2030-11-08T17:00:00.000Z"),
      company_id: 1,
      jobType: JobType.FULL_TIME,
      salaryMax: 3600,
      salaryMin: 2800,
      workStyle: WorkStyle.ON_SITE,
    },
    {
      id: 2,
      position_name: "Senior Software Engineering",
      capacity: 4,
      description:
        'Design and architect systems: You outline the overall structure of a software system before writing code. This ensures the application is scalable, reliable, and performs well under a variety of conditions.\nDevelop and write code: You write clean, efficient, and well-designed code using various programming languages and frameworks. This involves not just writing new code, but also updating, optimizing, and integrating it into existing applications.\nTest and debug software: You test new programs and applications to find and fix errors, or "bugs". This is a crucial part of the development lifecycle to ensure high-quality software delivery.\nMaintain and upgrade systems: After software is released, you continue to support, troubleshoot, and enhance existing systems. This can involve fixing defects, applying security patches, and adding new features based on user feedback.\nDocument functionality: You create technical documentation and user manuals to guide future development and help users understand the software. This makes it easier for new engineers to join a project and for users to get the most out of a product.\nCollaborate with teams: You often work with cross-functional teams, including product managers, designers, and other engineers. Effective communication is essential for gathering requirements, reporting progress, and providing technical guidance.',
      submission_start_date: new Date("2025-10-07T17:00:00.000Z"),
      submission_end_date: new Date("2030-11-29T17:00:00.000Z"),
      company_id: 2,
      jobType: JobType.INTERNSHIP,
      salaryMax: 2499,
      salaryMin: 2000,
      workStyle: WorkStyle.HYBRID,
    },
    {
      id: 4,
      position_name: "Marketing",
      capacity: 3,
      description:
        "Tanggung jawab:\n\nDesain UX/UI Komprehensif: Merancang, mengembangkan, dan menguji alur pengguna, wireframe, prototipe, dan mockup untuk berbagai platform digital kami (aplikasi mobile, situs web, platform e-commerce) dengan fokus pada industri kecantikan.\nRiset Pengguna & Persona: Melakukan riset pengguna untuk memahami kebutuhan, keinginan, dan tantangan audiens target kami di industri kecantikan. Mengembangkan persona pengguna dan skenario penggunaan untuk memandu keputusan desain.\nKolaborasi Lintas Fungsi: Bekerja sama dengan tim produk, pengembangan, pemasaran, dan konten untuk memastikan pengalaman pengguna yang mulus dan sesuai dengan tujuan bisnis.\nBranding & Estetika Kecantikan: Memastikan bahwa semua desain tidak hanya fungsional tetapi juga selaras dengan citra merek kecantikan kami, menciptakan pengalaman visual yang menarik dan kohesif.\nOptimasi & Iterasi: Menganalisis data pengguna, melakukan uji A/B, dan mengidentifikasi area untuk perbaikan guna terus mengoptimalkan pengalaman pengguna.\nTrend & Inovasi: Tetap up-to-date dengan tren desain terbaru, teknologi, dan inovasi dalam industri kecantikan digital.\n\nKualifikasi:\nPengalaman Desain UI/UX: Pengalaman kerja yang terbukti sebagai Desainer UX/UI, dengan portofolio yang kuat menunjukkan proyek-proyek yang relevan.\nKeahlian Figma: Kemahiran tingkat lanjut dalam menggunakan Figma untuk membuat wireframe, prototipe interaktif, dan sistem desain yang komprehensif.\nPemahaman UI/UX: Pemahaman mendalam tentang prinsip-prinsip desain UI/UX, usability testing, dan user-centered design.\nNetwork Connection (Jaringan Profesional): Kemampuan untuk membangun dan memelihara jaringan profesional di industri kecantikan dan/atau teknologi, yang dapat digunakan untuk riset pasar, kolaborasi, atau peluang lainnya.\nPassion untuk Kecantikan: Minat yang tulus dan pemahaman tentang industri kecantikan (produk perawatan kulit, makeup, gaya rambut, tren kecantikan) adalah nilai tambah yang besar.\nKeterampilan Berkomunikasi: Keterampilan komunikasi visual dan verbal yang sangat baik untuk mempresentasikan ide-ide desain kepada pemangku kepentingan.\nKeterampilan Pemecahan Masalah: Berpikir analitis dan kemampuan untuk memecahkan masalah desain yang kompleks.\nPendidikan: Gelar Sarjana di bidang Desain Interaksi, Desain Grafis, Ilmu Komputer, atau bidang terkait.\n\nMengapa Bergabung dengan Kami?\nPeluang untuk membentuk masa depan kecantikan digital.\nLingkungan kerja yang kolaboratif dan inovatif.\nKesempatan untuk bekerja dengan teknologi terkini dan mengembangkan keterampilan Anda.\nPaket kompensasi dan tunjangan yang kompetitif.",
      submission_start_date: new Date("2025-10-13T17:00:00.000Z"),
      submission_end_date: new Date("2033-12-13T17:00:00.000Z"),
      company_id: 11,
      jobType: JobType.FULL_TIME,
      salaryMax: 1000,
      salaryMin: 600,
      workStyle: WorkStyle.HYBRID,
    },
    {
      id: 5,
      position_name: "IT Support",
      capacity: 2,
      description:
        "Tanggung Jawab Utama:\nManajemen Infrastruktur AWS: Mengelola dan memelihara infrastruktur cloud kami di Amazon Web Services (AWS), termasuk EC2, S3, RDS, VPC, IAM, dan layanan lainnya. Memastikan performa, keamanan, dan ketersediaan sistem.\nAdministrasi Jaringan (Network Administration): Mengelola, mengkonfigurasi, dan memelihara jaringan lokal (LAN/WAN) dan nirkabel, firewall, VPN, dan perangkat jaringan lainnya. Memastikan konektivitas yang stabil dan aman untuk seluruh operasi.\nDukungan IT (IT Support): Memberikan dukungan teknis tingkat 1 dan 2 kepada seluruh karyawan, termasuk pemecahan masalah perangkat keras, perangkat lunak, sistem operasi (Windows/macOS/Linux), dan konektivitas jaringan. Mendokumentasikan solusi dan prosedur.\nKontrol Versi dengan Git: Mengelola repositori kode menggunakan Git, membantu tim pengembang dalam masalah terkait kontrol versi, dan memastikan praktik terbaik dalam manajemen kode.\nKeamanan Sistem: Mengimplementasikan dan memelihara langkah-langkah keamanan IT, melakukan audit keamanan, dan memastikan kepatuhan terhadap kebijakan keamanan data.\nMonitoring & Pemecahan Masalah: Memantau sistem dan jaringan untuk mengidentifikasi potensi masalah, merespons insiden secara cepat, dan melakukan pemecahan masalah proaktif.\nDokumentasi: Membuat dan memelihara dokumentasi teknis yang akurat mengenai konfigurasi sistem, prosedur operasional standar, dan panduan pengguna.\nKualifikasi yang Dibutuhkan:\nAWS: Pengalaman praktis yang kuat dalam mengelola layanan AWS utama. Sertifikasi AWS (misal: AWS Certified Solutions Architect – Associate atau SysOps Administrator – Associate) adalah nilai tambah yang signifikan.\nGit: Pengalaman dalam menggunakan Git untuk kontrol versi, termasuk dasar-dasar perintah Git, branching, merging, dan resolving conflicts.\nNetwork Administration: Pemahaman mendalam tentang konsep jaringan TCP/IP, DNS, DHCP, VLAN, routing, switching, dan firewall. Pengalaman dalam mengkonfigurasi dan memecahkan masalah perangkat jaringan.\nIT Support: Pengalaman terbukti dalam memberikan dukungan IT yang responsif dan efektif, dengan kemampuan memecahkan masalah perangkat keras/lunak secara efisien.\nSistem Operasi: Keahlian dalam administrasi dan pemecahan masalah di lingkungan Windows, macOS, dan/atau Linux.\nKeterampilan Komunikasi: Kemampuan komunikasi yang sangat baik, baik lisan maupun tulisan, untuk menjelaskan masalah teknis kepada pengguna non-teknis.\nOrientasi pada Pemecahan Masalah: Kemampuan analitis yang kuat dan pendekatan sistematis untuk mengidentifikasi dan menyelesaikan masalah teknis.\nPengalaman: Minimal [misal: 2-3] tahun pengalaman di peran terkait IT Support, Network Administration, atau Cloud Operations.\nPendidikan: Gelar Sarjana di bidang Ilmu Komputer, Teknik Informatika, atau bidang terkait.\nMengapa Bergabung dengan Kami?\nPeluang untuk bekerja dengan teknologi cloud terbaru dalam industri yang menarik.\nLingkungan kerja yang dinamis dan mendukung pertumbuhan profesional.\nKesempatan untuk membuat dampak nyata pada infrastruktur teknologi perusahaan.\nPaket kompensasi dan tunjangan yang kompetitif.",
      submission_start_date: new Date("2024-11-13T17:00:00.000Z"),
      submission_end_date: new Date("2024-12-31T17:00:00.000Z"),
      company_id: 11,
      jobType: JobType.CONTRACT,
      salaryMax: 1200,
      salaryMin: 700,
      workStyle: WorkStyle.ON_SITE,
    },
    {
      id: 6,
      position_name: "Data Analyst",
      capacity: 4,
      description:
        "Tanggung Jawab Utama:\n\nAnalisis Data Komprehensif: Melakukan analisis data ad-hoc dan mendalam untuk mengidentifikasi tren, pola, dan wawasan yang dapat ditindaklanjuti untuk mendukung berbagai departemen (pemasaran, produk, operasi, dll.).\n\nPipa Data di GCP: Merancang, mengembangkan, dan memelihara pipa data otomatis menggunakan layanan Google Cloud Platform (GCP) seperti BigQuery, Dataflow, Cloud Storage, dan Pub/Sub untuk memastikan ketersediaan dan kualitas data.\n\nIntegrasi Data melalui API: Mengembangkan dan mengelola integrasi data menggunakan REST APIs dan GraphQL untuk menarik data dari berbagai sumber internal dan eksternal.\n\nOtomatisasi & CI/CD: Mengimplementasikan prinsip-prinsip Continuous Integration/Continuous Deployment (CI/CD) untuk deployment pipa data dan alat analisis, memastikan proses yang efisien dan andal.\n\nPemodelan & Visualisasi Data: Membangun model data yang efisien dan membuat dashboard serta laporan yang informatif dan mudah dipahami menggunakan alat visualisasi data (misal: Looker Studio, Tableau, Power BI).\n\nKualitas Data & Tata Kelola: Memastikan integritas, akurasi, dan kualitas data di seluruh sistem. Mengembangkan dan menerapkan praktik tata kelola data.\n\nKolaborasi Teknis: Bekerja sama dengan tim engineering, produk, dan bisnis untuk memahami kebutuhan data, menyediakan dukungan teknis, dan mengimplementasikan solusi data.\n\nKualifikasi yang Dibutuhkan:\n\nData Analyst: Pengalaman yang terbukti sebagai Data Analyst, dengan rekam jejak dalam memberikan wawasan yang berdampak.\n\nGoogle Cloud Platform (GCP): Pengalaman langsung dan kuat dengan layanan GCP, khususnya yang berkaitan dengan data (BigQuery, Dataflow, Cloud Storage, Compute Engine). Sertifikasi GCP adalah nilai tambah.\n\nCI/CD: Pemahaman dan pengalaman praktis dalam menerapkan alur CI/CD untuk proyek data atau perangkat lunak (misal: menggunakan GitLab CI/CD, GitHub Actions, Jenkins).\n\nREST APIs & GraphQL: Kemampuan untuk berinteraksi dan mengkonsumsi data dari REST APIs dan GraphQL. Pengalaman dalam menulis skrip atau kode untuk mengintegrasikan data dari API.\n\nSQL: Kemahiran tingkat lanjut dalam SQL untuk kueri data yang kompleks dan manipulasi data.\n\nBahasa Pemrograman: Kemampuan yang kuat dalam setidaknya satu bahasa pemrograman (misal: Python, R) untuk analisis data, skrip, dan pengembangan pipa data.\n\nAlat Visualisasi Data: Pengalaman dengan alat visualisasi data seperti Looker Studio (Google Data Studio), Tableau, Power BI, atau sejenisnya.\n\nKeterampikan Analitis: Kemampuan analitis dan pemecahan masalah yang luar biasa, dengan perhatian terhadap detail.\n\nKomunikasi: Keterampilan komunikasi yang efektif untuk menyampaikan temuan data kepada audiens teknis dan non-teknis.\n\nPengalaman: Minimal [misal: 3-5] tahun pengalaman di peran terkait Data Analyst atau Data Engineer.\n\nPendidikan: Gelar Sarjana di bidang Ilmu Komputer, Statistik, Matematika, Ekonomi, atau bidang kuantitatif terkait.\n\nMengapa Bergabung dengan Kami?\n\nPeluang untuk bekerja dengan tumpukan teknologi modern di lingkungan cloud.\n\nPeran strategis dengan dampak langsung pada keputusan bisnis.\n\nLingkungan kerja yang dinamis, kolaboratif, dan berorientasi pada data.\n\nKesempatan untuk terus belajar dan mengembangkan keahlian teknis Anda.",
      submission_start_date: new Date("2035-11-13T17:00:00.000Z"),
      submission_end_date: new Date("2050-11-13T17:00:00.000Z"),
      company_id: 11,
      jobType: JobType.CONTRACT,
      salaryMax: 1599,
      salaryMin: 900,
      workStyle: WorkStyle.REMOTE,
    },
    {
      id: 7,
      position_name: "Data Analyst",
      capacity: 4,
      description: "Data Analyst............................ miawmiaw",
      submission_start_date: new Date("2024-11-22T17:00:00.000Z"),
      submission_end_date: new Date("2031-11-22T17:00:00.000Z"),
      company_id: 13,
      jobType: JobType.FULL_TIME,
      salaryMax: 3200,
      salaryMin: 2999,
      workStyle: WorkStyle.ON_SITE,
    },
  ],
  Portofolio: [
    {
      id: 1,
      skill: "Type Script",
      description: "GAME MAKE",
      file: "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/wondrjob/portfolios/6aff0c56-82f8-468e-b5ea-d2d9fe81983f/1758248300512-image_2025-09-19_091815808.png",
      society_id: 3,
    },
  ],
  PositionApplied: [
    {
      id: 1,
      available_position_id: 1,
      society_id: 3,
      apply_date: new Date("2025-09-17T08:10:41.826Z"),
      status: ApplicationStatus.ACCEPTED,
      resume:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/wondrjob/resumes/6aff0c56-82f8-468e-b5ea-d2d9fe81983f/1-WhatsApp%20Image%202025-09-14%20at%2014.11.02.jpeg",
      coverLetter:
        "https://wvhyhbvcupzysysalhdg.supabase.co/storage/v1/object/public/wondrjob/cover-letters/6aff0c56-82f8-468e-b5ea-d2d9fe81983f/1-cover-letter-WhatsApp%20Image%202025-09-16%20at%2007.17.26.jpeg",
      earliestStartDate: new Date("2025-09-16T00:39:29.203Z"),
      expectedSalary: 13500,
      referral: "MIAW",
      workPermit: true,
    },
  ],
  Skill: [
    {
      id: 1,
      name: "JavaScript",
      category: "Language",
      aliases: ["js", "frontend", "backend"],
    },
    {
      id: 2,
      name: "TypeScript",
      category: "Language",
      aliases: ["ts", "javascript", "frontend", "backend"],
    },
    {
      id: 3,
      name: "Python",
      category: "Language",
      aliases: ["py", "backend", "data science", "ai"],
    },
    {
      id: 4,
      name: "Java",
      category: "Language",
      aliases: ["backend", "android", "enterprise"],
    },
    {
      id: 5,
      name: "C#",
      category: "Language",
      aliases: ["csharp", "dotnet", ".net", "backend", "game dev"],
    },
    {
      id: 6,
      name: "Go",
      category: "Language",
      aliases: ["golang", "backend", "system"],
    },
    {
      id: 7,
      name: "Rust",
      category: "Language",
      aliases: ["backend", "system", "performance"],
    },
    {
      id: 8,
      name: "PHP",
      category: "Language",
      aliases: ["backend", "web"],
    },
    {
      id: 9,
      name: "SQL",
      category: "Language",
      aliases: ["database", "query", "data"],
    },
    {
      id: 10,
      name: "HTML",
      category: "Language",
      aliases: ["frontend", "web", "markup"],
    },
    {
      id: 11,
      name: "CSS",
      category: "Language",
      aliases: ["frontend", "web", "styling", "design"],
    },
    {
      id: 12,
      name: "React",
      category: "Frontend",
      aliases: ["reactjs", "frontend", "javascript", "ui"],
    },
    {
      id: 13,
      name: "Next.js",
      category: "Frontend",
      aliases: ["nextjs", "react", "frontend", "ssr"],
    },
    {
      id: 14,
      name: "Angular",
      category: "Frontend",
      aliases: ["angularjs", "frontend", "javascript"],
    },
    {
      id: 15,
      name: "Vue.js",
      category: "Frontend",
      aliases: ["vue", "frontend", "javascript"],
    },
    {
      id: 16,
      name: "Svelte",
      category: "Frontend",
      aliases: ["frontend", "javascript"],
    },
    {
      id: 17,
      name: "Tailwind CSS",
      category: "Frontend",
      aliases: ["css", "utility-first", "styling"],
    },
    {
      id: 18,
      name: "Figma",
      category: "Frontend",
      aliases: ["design", "ui/ux", "prototyping"],
    },
  ],
};

// 3. Fungsi utama untuk seeding data
async function main() {
  console.log("Seeding database...");

  // Seed User
  for (const user of backupData.User) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Seed Company
  for (const company of backupData.Company) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: {},
      create: company,
    });
  }

  // Seed HRD
  for (const hrd of backupData.HRD) {
    await prisma.hRD.upsert({
      where: { id: hrd.id },
      update: {},
      create: hrd,
    });
  }

  // Seed Society
  for (const society of backupData.Society) {
    await prisma.society.upsert({
      where: { id: society.id },
      update: {},
      create: society,
    });
  }

  // Seed CompanyMonthlyStats
  for (const stats of backupData.CompanyMonthlyStats) {
    await prisma.companyMonthlyStats.upsert({
      where: { id: stats.id },
      update: {},
      create: stats,
    });
  }

  // Seed AvailablePosition
  for (const position of backupData.AvailablePosition) {
    await prisma.availablePosition.upsert({
      where: { id: position.id },
      update: {},
      create: position,
    });
  }

  // Seed Portofolio
  for (const portfolio of backupData.Portofolio) {
    await prisma.portofolio.upsert({
      where: { id: portfolio.id },
      update: {},
      create: portfolio,
    });
  }

  // Seed PositionApplied
  for (const application of backupData.PositionApplied) {
    await prisma.positionApplied.upsert({
      where: { id: application.id },
      update: {},
      create: application,
    });
  }

  // Seed Skill
  for (const skill of backupData.Skill) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {},
      create: skill,
    });
  }

  console.log("Seeding completed.");
}

// Jalankan fungsi main dan handle error
main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
