import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Phone, 
  Building2, 
  User, 
  Package,
  ShoppingCart,
  Truck,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Header } from "@/components/Header";
import { categories } from "@/data/announcements";

type PurchaseStep = "details" | "logistics" | "confirm" | "success";

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getAnnouncementById, toggleFavorite, isFavorite } = useAnnouncements();

  const [purchaseStep, setPurchaseStep] = useState<PurchaseStep>("details");
  const [selfManageLogistics, setSelfManageLogistics] = useState(true);

  const announcement = getAnnouncementById(id || "");

  if (!announcement) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Elan tapılmadı</h1>
          <Button onClick={() => navigate("/")}>Ana səhifəyə qayıt</Button>
        </main>
      </div>
    );
  }

  const favorite = isFavorite(announcement.id);
  const categoryLabel = categories.find((c) => c.id === announcement.category)?.label || announcement.category;

  const handleBuyClick = () => {
    setPurchaseStep("logistics");
  };

  const handleLogisticsConfirm = () => {
    setPurchaseStep("confirm");
  };

  const handleFinalConfirm = () => {
    setPurchaseStep("success");
    toast({
      title: "Alış təsdiqləndi!",
      description: selfManageLogistics 
        ? "Sifarişiniz uğurla tamamlandı. Satıcı ilə əlaqə saxlayın."
        : "Sifarişiniz logistika bölməsinə əlavə edildi.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
            <img
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(announcement.id)}
              className={`absolute top-4 right-4 h-11 w-11 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card ${
                favorite ? "text-secondary" : "text-muted-foreground"
              }`}
            >
              <Heart className={`h-6 w-6 ${favorite ? "fill-current" : ""}`} />
            </Button>
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium">
                <Package className="h-4 w-4" />
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-3">
                {announcement.title}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-primary">
                  {announcement.pricePerUnit.toLocaleString("az-AZ")} ₼
                </span>
                <span className="text-lg text-muted-foreground">/ {announcement.unit}</span>
              </div>
            </div>

            {/* Location & Quantity */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{announcement.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {announcement.quantity.toLocaleString("az-AZ")} {announcement.unit}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Təsvir</h2>
              <p className="text-muted-foreground leading-relaxed">{announcement.description}</p>
            </div>

            {/* Seller Info */}
            <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border">
              <h2 className="text-lg font-semibold text-foreground">Satıcı Məlumatları</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{announcement.seller.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <span>{announcement.seller.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{announcement.seller.phone}</span>
                </div>
              </div>
            </div>

            {/* Purchase Flow */}
            {purchaseStep === "details" && (
              <Button 
                onClick={handleBuyClick} 
                size="lg" 
                className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground text-lg h-14 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Satın Al
              </Button>
            )}

            {purchaseStep === "logistics" && (
              <div className="space-y-6 p-6 rounded-xl bg-card border border-border shadow-card scale-in">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Logistika İdarəetməsi
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="logistics-switch" className="text-base font-medium">
                      Yük daşıma prosesini siz idarə edəcəksiniz?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {selfManageLogistics 
                        ? "Siz özünüz logistikanı təşkil edəcəksiniz"
                        : "Logistika bölməsi sizə kömək edəcək"}
                    </p>
                  </div>
                  <Switch
                    id="logistics-switch"
                    checked={selfManageLogistics}
                    onCheckedChange={setSelfManageLogistics}
                  />
                </div>
                <Button 
                  onClick={handleLogisticsConfirm}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary-hover"
                >
                  Davam et
                </Button>
              </div>
            )}

            {purchaseStep === "confirm" && (
              <div className="space-y-6 p-6 rounded-xl bg-card border border-border shadow-card scale-in">
                <h3 className="text-lg font-semibold text-foreground">Sifarişi Təsdiqləyin</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Material:</span>
                    <span className="font-medium">{announcement.title}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Miqdar:</span>
                    <span className="font-medium">{announcement.quantity} {announcement.unit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Vahid qiyməti:</span>
                    <span className="font-medium">{announcement.pricePerUnit} ₼</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Logistika:</span>
                    <span className="font-medium">{selfManageLogistics ? "Özünüz idarə edirsiniz" : "Logistika bölməsi"}</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg font-bold">
                    <span>Cəmi:</span>
                    <span className="text-primary">
                      {(announcement.pricePerUnit * announcement.quantity).toLocaleString("az-AZ")} ₼
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handleFinalConfirm}
                  size="lg" 
                  className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Alışı Təsdiqlə
                </Button>
              </div>
            )}

            {purchaseStep === "success" && (
              <div className="space-y-6 p-6 rounded-xl bg-primary-light border border-primary/20 text-center scale-in">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Təbriklər!</h3>
                  <p className="text-muted-foreground">
                    {selfManageLogistics 
                      ? "Sifarişiniz uğurla qeydə alındı. Satıcı ilə əlaqə saxlayın."
                      : "Sifarişiniz logistika bölməsinə göndərildi."}
                  </p>
                </div>
                <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Ana səhifəyə qayıt
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
