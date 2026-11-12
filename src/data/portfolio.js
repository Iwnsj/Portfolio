/* =========================================================================
   portfolio.js — ALL editable content lives here.
   Change names, links, skills, projects and timeline entries in this file;
   the components read from it automatically. No JSX knowledge required.
   ========================================================================= */
import {
  Activity,
  Briefcase,
  Calculator,
  CircuitBoard,
  Coffee,
  Cpu,
  GraduationCap,
  MapPin,
  Microchip,
  Rocket,
  Zap,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaXTwitter, FaFacebook, FaJava } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { TbBrandCSharp } from 'react-icons/tb'
import {
  SiArduino,
  SiCss,
  SiCplusplus,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiMariadb,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'

// 👉 Replace with your own photo: drop e.g. `profile.jpg` in src/assets and
//    change this import to `import profileImg from '../assets/profile.jpg'`.
import profileImg from '../assets/profile-placeholder.svg'

/* ---------------------------------------------------------------- */
/* Personal info                                                    */
/* ---------------------------------------------------------------- */
export const personal = {
  name: 'Hans Christopher Valentino',
  initials: 'HC',
  role: 'Aspiring Full-Stack Developer',
  // Words cycled by the typing animation in the hero
  typingRoles: ['Software Engineer', 'React Enthusiast', 'UI Craftsman', 'Lifelong Learner'],
  tagline:
    'Currently a 4th-year Computer Engineering student building fast, accessible and delightful web & embedded experiences — from pixel-perfect interfaces to the APIs and hardware that power them.',
  bio: [
    "Hi! I'm Hans, currently a 4th-year B.S. Computer Engineering student and aspiring full-stack developer who loves turning ideas into clean, performant products. I enjoy working across the stack with React, PHP, Node.js, C++ and modern engineering tooling.",
    "When I'm not coding or simulating circuits, you'll find me exploring new design trends, building interactive reviewers or competing in programming challenges. I'm currently looking for internship / OJT opportunities to grow with a passionate team.",
  ],
  email: 'hansvalentino10.lsr@gmail.com',
  location: 'Ramon, Isabela',
  availability: 'Open to internships/OJT',
  resumeUrl: '/resume.pdf', // put resume.pdf in /public, or set to null to hide the button
  photo: profileImg,
}

/* ---------------------------------------------------------------- */
/* Navigation — `id` must match each section's id attribute          */
/* ---------------------------------------------------------------- */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ---------------------------------------------------------------- */
/* Social links                                                     */
/* ---------------------------------------------------------------- */
export const socials = [
  { name: 'GitHub', url: 'https://github.com/Iwnsj', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hans-valentino-8b5666276/', icon: FaLinkedin },
  { name: 'Facebook', url: 'https://www.facebook.com/hanscristopher.valentino', icon: FaFacebook },
  { name: 'Email', url: `mailto:${personal.email}`, icon: HiOutlineMail },
]

/* ---------------------------------------------------------------- */
/* About — animated counters & quick facts                          */
/* ---------------------------------------------------------------- */
export const stats = [
  { label: 'Projects built', value: 4, suffix: '' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'Cups of coffee', value: 999, suffix: '' },
]

export const quickFacts = [
  { icon: MapPin, label: 'Based in', value: personal.location },
  { icon: GraduationCap, label: 'Studying', value: '4th-Year BS Computer Engineering' },
  { icon: Rocket, label: 'Focus', value: 'Full-stack & Embedded' },
  { icon: Coffee, label: 'Fuelled by', value: 'Coffee & curiosity' },
]

/* ---------------------------------------------------------------- */
/* Skills — icons come from react-icons/si (Simple Icons)           */
/* Browse more at https://react-icons.github.io/react-icons/icons/si */
/* ---------------------------------------------------------------- */
export const skillCategories = [
  {
    title: 'Frontend',
    description: 'Interfaces that feel fast and look sharp.',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#663399' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    description: 'APIs, databases and the plumbing in between.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: '', icon: TbBrandCSharp, color: '#512BD4' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Mariadb', icon: SiMariadb, color: '#4479A1' },
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'Shipping reliably, from design to deploy.',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
    ],
  },
  {
    title: 'Hardware & Engineering Tools',
    description: 'PCB design, VLSI layout, circuit simulation, HDL synthesis and numerical modelling.',
    skills: [
      { name: 'DipTrace', icon: CircuitBoard, color: '#007a78' },
      { name: 'Electric', icon: Microchip, color: '#d9381e' },
      { name: 'MATLAB', icon: Calculator, color: '#d9381e' },
      { name: 'MaxWin (VHDL)', icon: Cpu, color: '#002b7f' },
      { name: 'T-Spice', icon: Zap, color: '#f2b705' },
      { name: 'Multisim', icon: Activity, color: '#00878F' },
      { name: 'Arduino / ESP32', icon: SiArduino, color: '#00878F' },
    ],
  },
]

/* ---------------------------------------------------------------- */
/* Projects                                                          */
/* `projectCategories` keeps all filter tabs visible even when a     */
/* category is still in production.                                  */
/* ---------------------------------------------------------------- */
export const projectCategories = ['All', 'Full-Stack', 'Frontend', 'Backend']

export const projects = [
  {
    title: 'HydroSync',
    description:
      'Smart drip irrigation and fertigation monitoring dashboard built with React.js, featuring real-time soil moisture zones, EC/TDS nutrient tracking, tank levels, solenoid valve controls and rain preemption.',
    image: '/projects/hydrosync.png',
    tags: ['React.js', 'IoT Dashboard', 'ESP32 Telemetry'],
    category: 'Frontend',
    github: null,
    live: 'https://hydro-sync-pi.vercel.app/',
    featured: true,
  },
  {
    title: 'Barangay Management System',
    description:
      'Full-stack barangay information & management system built with PHP and MariaDB for tracking registered residents, households, certificate issuance, blotter records and population analytics by purok.',
    image: '/projects/barangay-management-system.png',
    tags: ['PHP', 'MariaDB', 'HTML5', 'CSS', 'JavaScript'],
    category: 'Full-Stack',
    github: null,
    live: null,
    liveStatus: 'Not supported yet',
    featured: true,
  },
  {
    title: 'Computer Architecture',
    description:
      'Circuit Notes — an interactive Computer Architecture study companion and midterm reviewer featuring structured lessons, 89 key-term flashcards, a searchable glossary and multi-mode practice quizzes.',
    image: '/projects/computer-architecture.png',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    category: 'Frontend',
    github: 'https://github.com/iwnsj/ComArchMidTermReviewer-',
    live: 'https://iwnsj.github.io/ComArchMidTermReviewer-/',
    featured: true,
  },
  {
    title: 'Embedded System',
    description:
      'Circuit Notes: The Arduino Study Lab — an interactive Embedded Systems reviewer with an Arduino Uno board explorer, hardware component guides, 32 review flashcards and a 64-question practice quiz.',
    image: '/projects/embedded-system.png',
    tags: ['HTML5', 'CSS', 'JavaScript', 'Arduino'],
    category: 'Frontend',
    github: 'https://github.com/iwnsj/EmbeddedArduinoQui',
    live: 'https://iwnsj.github.io/EmbeddedArduinoQui/',
    featured: false,
  },
]

/* ---------------------------------------------------------------- */
/* Certificates                                                      */
/* `featured: true` marks the 3 certificates shown on the main       */
/* portfolio page; all certificates appear on the /certificates page */
/* ---------------------------------------------------------------- */
export const certificates = [
  {
    id: 'fcc-responsive-web-design',
    title: 'Responsive Web Design Developer Certification',
    issuer: 'freeCodeCamp',
    date: 'Jul 31, 2026',
    category: 'Web & Programming',
    credentialId: 'responsive-web-design-v9',
    verifyUrl: 'https://freecodecamp.org/certification/hanschristphervalentino/responsive-web-design-v9',
    image: '/certificates/previews/freecodecamp-responsive-web-design.jpg',
    pdfUrl: '/certificates/files/freecodecamp-responsive-web-design.pdf',
    description:
      '300-hour developer certification covering semantic HTML5, modern CSS, Flexbox, CSS Grid, accessibility and responsive layout design.',
    tags: ['HTML5', 'CSS', 'Responsive Design', '300 Hours'],
    featured: true,
  },
  {
    id: 'icpep-regcon-cpp-2nd-runner-up',
    title: '2nd Runner Up — C++ Programming (9th CpE Challenge)',
    issuer: 'ICpEP Region 2 — REGCON 2025',
    date: 'Feb 5, 2026',
    category: 'Web & Programming',
    credentialId: 'ICpEP-R2-REGCON-2025',
    verifyUrl: null,
    image: '/certificates/previews/icpep-regcon-cpp-2nd-runner-up-p2.jpg',
    pdfUrl: '/certificates/files/icpep-regcon-cpp-2nd-runner-up.pdf#page=2',
    description:
      'Certificate of Recognition awarded to Hans Christopher D. Valentino as Second Runner Up in the C++ Programming competition of the 9th CpE Challenge at Saint Mary’s University.',
    tags: ['C++', '2nd Runner Up', '9th CpE Challenge', 'REGCON 2025'],
    featured: true,
  },
  {
    id: 'ched-mapua-asu-ai-literacy',
    title: 'Introduction to AI Literacy and Responsible Use',
    issuer: 'CHED × Mapúa University × Arizona State University',
    date: 'Sep 15, 2026',
    category: 'AI & Data',
    credentialId: 'L0LK7WOXJWOQO',
    verifyUrl: null,
    image: '/certificates/previews/ched-mapua-asu-ai-literacy.jpg',
    pdfUrl: '/certificates/files/ched-mapua-asu-ai-literacy.pdf',
    description:
      'Self-paced PQF Level 6 micro-credential completed under the Handog ng Pangulo Caravan: ACHIEVE-ing Future-Ready Skills through Micro-credentials.',
    tags: ['AI Literacy', 'Responsible AI', 'PQF Level 6', 'Micro-credential'],
    featured: true,
  },
  {
    id: 'codechum-cpp-1',
    title: 'C++ Programming 1 Competition (1314/1315)',
    issuer: 'CodeChum',
    date: 'Feb 2, 2026',
    category: 'Web & Programming',
    credentialId: '22036',
    verifyUrl: 'https://app.codechum.com/certificates/22036',
    image: '/certificates/previews/codechum-cpp-programming-1.jpg',
    pdfUrl: '/certificates/files/codechum-cpp-programming-1.pdf',
    description:
      'Certificate of Completion in the C++ Programming 1 Competition with a near-perfect total score of 1314 out of 1315.',
    tags: ['C++', 'Algorithms', 'Problem Solving', 'Score: 1314/1315'],
    featured: false,
  },
  {
    id: 'icpep-ml-dl',
    title: 'Machine Learning and Deep Learning Algorithms',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Oct 11, 2025',
    category: 'AI & Data',
    credentialId: 'ICpEP-R2-2025-P4',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p4.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=4',
    description:
      'Technical webinar on foundational machine learning models, neural network architectures and deep learning workflows.',
    tags: ['Machine Learning', 'Deep Learning', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-data-analytics-101',
    title: 'Data Analytics 101: Making Sense of Data',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Oct 4, 2025',
    category: 'AI & Data',
    credentialId: 'ICpEP-R2-2025-P3',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p3.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=3',
    description:
      'Technical webinar exploring data analysis pipelines, exploratory data interpretation and data-driven decision making.',
    tags: ['Data Analytics', 'Data Science', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-quantum-computing',
    title: 'Quantum Computing',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Oct 18, 2025',
    category: 'AI & Data',
    credentialId: 'ICpEP-R2-2025-P6',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p6.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=6',
    description:
      'Webinar on quantum bits (qubits), quantum gates and emerging applications of quantum computing in engineering.',
    tags: ['Quantum Computing', 'Emerging Tech', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-digital-mirror-ai-ethics',
    title: 'The Digital Mirror: Emotional Intelligence & Ethical Awareness in an AI-Driven World',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Nov 29, 2025',
    category: 'AI & Data',
    credentialId: 'ICpEP-R2-2025-P5',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p5.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=5',
    description:
      'Webinar focused on human-centered AI ethics, digital wellbeing and responsible engineering leadership.',
    tags: ['AI Ethics', 'Leadership', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-smart-cities',
    title: 'Digital Transformation in Smart Cities and E-Governance',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Dec 8, 2025',
    category: 'Engineering & Seminars',
    credentialId: 'ICpEP-R2-2025-P8',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p8.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=8',
    description:
      'Webinar examining connected urban infrastructure, IoT systems and digital public service delivery.',
    tags: ['Smart Cities', 'E-Governance', 'IoT', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-patent-ip',
    title: 'From Concept to Protection: Patent and IP Rights in Engineering & Technology',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Dec 8, 2025',
    category: 'Engineering & Seminars',
    credentialId: 'ICpEP-R2-2025-P7',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p7.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=7',
    description:
      'Seminar on intellectual property protection, patent filing and safeguarding engineering innovations.',
    tags: ['Patents', 'IP Rights', 'Engineering Law', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-research-writing',
    title: "Design. Develop. Deliver: The Engineer's Guide in Research Writing & Presentation",
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Dec 8, 2025',
    category: 'Engineering & Seminars',
    credentialId: 'ICpEP-R2-2025-P9',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p9.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=9',
    description:
      'Seminar on structuring technical research papers, experimental methodology and engineering presentations.',
    tags: ['Technical Writing', 'R&D', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-online-reputation',
    title: 'Engineering Your Online Reputation: Social Media and Professional Identity',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Sep 20, 2025',
    category: 'Engineering & Seminars',
    credentialId: 'ICpEP-R2-2025-P2',
    verifyUrl: null,
    image: '/certificates/previews/icpep-talaktech-p2.jpg',
    pdfUrl: '/certificates/files/icpep-talaktech.pdf#page=2',
    description:
      'Webinar on building a strong professional digital footprint and career portfolio for computer engineers.',
    tags: ['Career Growth', 'Professional Identity', 'ICpEP R2'],
    featured: false,
  },
  {
    id: 'icpep-mind-over-matter',
    title: 'Mind Over Matter: Time and Stress Management for Student Engineers',
    issuer: 'ICpEP Region 2 — TalakTech Series',
    date: 'Sep 20, 2025',
    category: 'Engineering & Seminars',
    credentialId: 'ICpEP-R2-2025-DAY1',
    verifyUrl: null,
    image: '/certificates/previews/icpep-day1-mind-over-matter.jpg',
    pdfUrl: '/certificates/files/icpep-day1-mind-over-matter.pdf',
    description:
      'Webinar on productivity systems, academic workload management and resilience for engineering students.',
    tags: ['Productivity', 'Student Engineering', 'ICpEP R2'],
    featured: false,
  },
]

/* ---------------------------------------------------------------- */
/* Experience & Education timeline (newest first)                    */
/* type: 'work' | 'education'                                        */
/* ---------------------------------------------------------------- */
export const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'Software Developer Intern',
    org: 'Unkown',
    period: '2027',
    description:
      '...',
    highlights: ['...'],
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.S. Computer Engineering',
    org: 'Saint Mary\'s University of Bayombong, Inc.',
    period: '2023 — 2027(sana)',
    description:
      'Coursework in data structures, algorithms, databases, software engineering, IoT, Embedded System and HCI.',
    highlights: ["Dean's Lister(Minsan)", 'Lead, Web Dev Society'],
  },
  {
    type: 'education',
    icon: Rocket,
    title: 'Full-Stack Web Development self-study',
    org: 'FreeCodeCamp, Youtube',
    period: '2023-present',
    description: 'Intensive, project-based programme covering the Laravel, React, and Node.js.',
    highlights: ['Capstone: portfolio'],
  },
]

/* ---------------------------------------------------------------- */
/* Contact form — Web3Forms key comes from the .env file             */
/* ---------------------------------------------------------------- */
export const contactConfig = {
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
  subject: 'New message from your portfolio',
}
