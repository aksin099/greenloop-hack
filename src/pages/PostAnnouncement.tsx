import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { categories, locations } from "@/data/announcements";
import { Header } from "@/components/Header";

// Default images for new announcements
import concreteBlocks from "@/assets/materials/concrete-blocks.jpg";
import steelRebar from "@/assets/materials/steel-rebar.jpg";
import lumber from "@/assets/materials/lumber.jpg";
import cementBags from "@/assets/materials/cement-bags.jpg";
import pvcPipes from "@/assets/materials/pvc-pipes.jpg";
import ceramicTiles from "@/assets/materials/ceramic-tiles.jpg";
import glassPanels from "@/assets/materials/glass-panels.jpg";
import electricalCables from "@/assets/materials/electrical-cables.jpg";

const categoryImages: Record<string, string> = {
  concrete: concreteBlocks,
  metal: steelRebar,
  wood: lumber,
  cement: cementBags,
  pipes: pvcPipes,
  tiles: ceramicTiles,
  glass: glassPanels,
  electrical: electricalCables,
};

export default function PostAnnouncement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addAnnouncement } = useAnnouncements();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    unit: "ədəd",
    pricePerUnit: "",
    location: "",
    description: "",
    sellerName: "",
    sellerCompany: "",
    sellerPhone: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.quantity || !formData.pricePerUnit || !formData.location) {
      toast({
        title: "Xəta",
        description: "Bütün vacib sahələri doldurun",
        variant: "destructive",
      });
      return;
    }

    // Use uploaded image or default category image
    const image = imagePreview || categoryImages[formData.category] || concreteBlocks;

    addAnnouncement({
      title: formData.title,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      pricePerUnit: parseFloat(formData.pricePerUnit),
      location: formData.location,
      description: formData.description,
      image,
      seller: {
        name: formData.sellerName || "Anonim Satıcı",
        company: formData.sellerCompany || "Fərdi Satıcı",
        phone: formData.sellerPhone || "+994 XX XXX XX XX",
      },
    });

    toast({
      title: "Uğurlu!",
      description: "Elanınız uğurla yerləşdirildi",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Elan Yerləşdir</h1>
            <p className="text-muted-foreground">
              Tikinti materiallarınızı satışa qoyun və potensial alıcılarla əlaqə yaradın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Şəkil</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 cursor-pointer
                  transition-all duration-200 text-center
                  ${imagePreview ? "border-primary bg-primary-light" : "border-border hover:border-primary hover:bg-muted"}
                `}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Şəkil yükləmək üçün klikləyin</p>
                      <p className="text-sm text-muted-foreground">və ya sürüşdürüb buraxın</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Material Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Material Detalları</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlıq *</Label>
                  <Input
                    id="title"
                    placeholder="Məs: Beton Bloklar M200"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kateqoriya *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kateqoriya seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c.id !== "all").map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Miqdar *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="500"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Vahid</Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) => setFormData({ ...formData, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ədəd">ədəd</SelectItem>
                        <SelectItem value="metr">metr</SelectItem>
                        <SelectItem value="m²">m²</SelectItem>
                        <SelectItem value="m³">m³</SelectItem>
                        <SelectItem value="kq">kq</SelectItem>
                        <SelectItem value="ton">ton</SelectItem>
                        <SelectItem value="kisə">kisə</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Təsvir</Label>
                  <Textarea
                    id="description"
                    placeholder="Materialın ətraflı təsviri..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Qiymətləndirmə</h2>
              <div className="space-y-2">
                <Label htmlFor="price">Vahid Qiyməti (AZN) *</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="10.00"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                    className="pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">₼</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Məkan</h2>
              <div className="space-y-2">
                <Label htmlFor="location">Tikinti Sahəsinin Yeri *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Məkan seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Seller Info (Optional) */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Satıcı Məlumatları (İstəyə bağlı)</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sellerName">Ad</Label>
                  <Input
                    id="sellerName"
                    placeholder="Adınız"
                    value={formData.sellerName}
                    onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerCompany">Şirkət</Label>
                  <Input
                    id="sellerCompany"
                    placeholder="Şirkət adı"
                    value={formData.sellerCompany}
                    onChange={(e) => setFormData({ ...formData, sellerCompany: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sellerPhone">Telefon</Label>
                  <Input
                    id="sellerPhone"
                    type="tel"
                    placeholder="+994 XX XXX XX XX"
                    value={formData.sellerPhone}
                    onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Ləğv et
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary-hover">
                <Upload className="h-4 w-4 mr-2" />
                Dərc et
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
