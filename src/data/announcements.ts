import concreteBlocks from "@/assets/materials/concrete-blocks.jpg";
import steelRebar from "@/assets/materials/steel-rebar.jpg";
import lumber from "@/assets/materials/lumber.jpg";
import cementBags from "@/assets/materials/cement-bags.jpg";
import pvcPipes from "@/assets/materials/pvc-pipes.jpg";
import ceramicTiles from "@/assets/materials/ceramic-tiles.jpg";
import glassPanels from "@/assets/materials/glass-panels.jpg";
import electricalCables from "@/assets/materials/electrical-cables.jpg";

export interface Announcement {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  location: string;
  image: string;
  description: string;
  seller: {
    name: string;
    company: string;
    phone: string;
  };
  createdAt: Date;
}

export const categories = [
  { id: "all", label: "Hamısı", icon: "Package" },
  { id: "concrete", label: "Beton & Kərpic", icon: "Layers" },
  { id: "metal", label: "Metal & Polad", icon: "Hammer" },
  { id: "wood", label: "Ağac & Taxta", icon: "Trees" },
  { id: "cement", label: "Sement", icon: "Package" },
  { id: "pipes", label: "Borular", icon: "Cylinder" },
  { id: "tiles", label: "Kafel & Plitələr", icon: "LayoutGrid" },
  { id: "glass", label: "Şüşə", icon: "Square" },
  { id: "electrical", label: "Elektrik", icon: "Zap" },
] as const;

export const locations = [
  "Bakı",
  "Gəncə",
  "Sumqayıt",
  "Ağdam",
  "Şəki",
  "Lənkəran",
  "Mingəçevir",
  "Şirvan",
  "Naxçıvan",
  "Quba",
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Beton Bloklar M200",
    category: "concrete",
    quantity: 500,
    unit: "ədəd",
    pricePerUnit: 2.5,
    location: "Ağdam",
    image: concreteBlocks,
    description: "Yüksək keyfiyyətli M200 markalı beton bloklar. Tikinti layihələri üçün ideal. Ölçülər: 390x190x190mm. Soyuğa və rütubətə davamlı.",
    seller: {
      name: "Əli Məmmədov",
      company: "AzBeton MMC",
      phone: "+994 50 123 45 67",
    },
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "2",
    title: "Armatur Polad 12mm",
    category: "metal",
    quantity: 2000,
    unit: "metr",
    pricePerUnit: 8.9,
    location: "Bakı",
    image: steelRebar,
    description: "A400C sinfli armatur polad. Diametri 12mm. Betonun möhkəmləndirilməsi üçün əla seçim. Sertifikatlı məhsul.",
    seller: {
      name: "Rəşad Həsənov",
      company: "SteelAz Group",
      phone: "+994 55 234 56 78",
    },
    createdAt: new Date("2024-12-21"),
  },
  {
    id: "3",
    title: "Şam Ağacı Taxtası",
    category: "wood",
    quantity: 300,
    unit: "m³",
    pricePerUnit: 450,
    location: "Şəki",
    image: lumber,
    description: "Birinci sort şam ağacı taxtası. Qurudulmuş, emal olunmuş. Dam örtüyü və döşəmə işləri üçün uyğundur.",
    seller: {
      name: "Vüqar İsmayılov",
      company: "Şəki Taxta",
      phone: "+994 70 345 67 89",
    },
    createdAt: new Date("2024-12-22"),
  },
  {
    id: "4",
    title: "Portland Sement M400",
    category: "cement",
    quantity: 1500,
    unit: "kisə",
    pricePerUnit: 7.2,
    location: "Sumqayıt",
    image: cementBags,
    description: "Portland sement M400 markası. 50 kq-lıq kisələrdə. Tikinti və beton qarışıqları üçün ideal. Saxlama müddəti: 6 ay.",
    seller: {
      name: "Kamran Əliyev",
      company: "Caspian Cement",
      phone: "+994 51 456 78 90",
    },
    createdAt: new Date("2024-12-23"),
  },
  {
    id: "5",
    title: "PVC Kanalizasiya Borusu",
    category: "pipes",
    quantity: 800,
    unit: "metr",
    pricePerUnit: 12.5,
    location: "Gəncə",
    image: pvcPipes,
    description: "PVC kanalizasiya borusu 110mm diametrli. Yüksək təzyiqə davamlı. Montaj asanlığı ilə seçilir.",
    seller: {
      name: "Tural Nəsibov",
      company: "PlastPro MMC",
      phone: "+994 77 567 89 01",
    },
    createdAt: new Date("2024-12-24"),
  },
  {
    id: "6",
    title: "Keramik Döşəmə Kafelləri",
    category: "tiles",
    quantity: 1200,
    unit: "m²",
    pricePerUnit: 18.9,
    location: "Bakı",
    image: ceramicTiles,
    description: "İtalyan istehsalı keramik döşəmə kafelləri. 60x60 sm. Sürüşməyə davamlı. Müxtəlif rənglər mövcuddur.",
    seller: {
      name: "Nigar Hüseynova",
      company: "Ceramica Baku",
      phone: "+994 50 678 90 12",
    },
    createdAt: new Date("2024-12-24"),
  },
  {
    id: "7",
    title: "İzolyasiyalı Pəncərə Şüşəsi",
    category: "glass",
    quantity: 200,
    unit: "m²",
    pricePerUnit: 85,
    location: "Bakı",
    image: glassPanels,
    description: "İki qatlı izolyasiyalı pəncərə şüşəsi. Enerji qənaəti təmin edir. 4-16-4 mm qalınlıq. Soyuq və istilikdən qoruyur.",
    seller: {
      name: "Orxan Quliyev",
      company: "AzGlass Pro",
      phone: "+994 55 789 01 23",
    },
    createdAt: new Date("2024-12-25"),
  },
  {
    id: "8",
    title: "Elektrik Kabeli NYM 3x2.5",
    category: "electrical",
    quantity: 5000,
    unit: "metr",
    pricePerUnit: 3.2,
    location: "Mingəçevir",
    image: electricalCables,
    description: "NYM 3x2.5 mm² elektrik kabeli. Mis nüvəli, izolyasiyalı. Daxili elektrik şəbəkəsi üçün uyğundur. GOST standartlarına uyğun.",
    seller: {
      name: "Elçin Rəhimov",
      company: "ElektroAz",
      phone: "+994 70 890 12 34",
    },
    createdAt: new Date("2024-12-25"),
  },
];
