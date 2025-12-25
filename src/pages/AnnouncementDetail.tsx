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
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Header } from "@/components/Header";
import { categories } from "@/data/announcements";

type PurchaseStep = "details" | "logistics" | "confirm" | "success";

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getAnnouncementById, toggleFavorite, isFavorite, addLogisticsRequest } = useAnnouncements();

  const [purchaseStep, setPurchaseStep] = useState<PurchaseStep>("details");
  const [selfManageLogistics, setSelfManageLogistics] = useState(true);
  const [logisticsPrice, setLogisticsPrice] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");

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
    if (!selfManageLogistics && !destinationLocation.trim()) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa çatdırılma yerini daxil edin.",
        variant: "destructive",
      });
      return;
    }
    setPurchaseStep("confirm");
  };

  const handleFinalConfirm = () => {
    // If not managing logistics, create a logistics request
    if (!selfManageLogistics) {
      addLogisticsRequest({
        announcementId: announcement.id,
        material: announcement.title,
        quantity: announcement.quantity,
        unit: announcement.unit,
        fromLocation: announcement.location,
        toLocation: destinationLocation,
        offeredPrice: parseFloat(logisticsPrice) || 0,
      });
    }

    setPurchaseStep("success");
    toast({
      title: "Alış təsdiqləndi!",
      description: selfManageLogistics 
        ? "Sifarişiniz uğurla tamamlandı. Satıcı ilə əlaqə saxlayın."
        : "Sifarişiniz və logistika elanı uğurla yaradıldı.",
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
                        : "Logistika bölməsində elan yaradılacaq"}
                    </p>
                  </div>
                  <Switch
                    id="logistics-switch"
                    checked={selfManageLogistics}
                    onCheckedChange={setSelfManageLogistics}
                  />
                </div>

                {/* Logistics Form - shown when switch is OFF */}
                {!selfManageLogistics && (
                  <div className="space-y-4 p-4 rounded-lg bg-muted/50 border border-border animate-in slide-in-from-top-2 duration-200">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Logistika Elanı Detalları
                    </h4>
                    
                    {/* Auto-filled fields */}
                    <div className="grid gap-3">
                      <div className="flex justify-between py-2 px-3 rounded-md bg-background border border-border">
                        <span className="text-sm text-muted-foreground">Material:</span>
                        <span className="text-sm font-medium">{announcement.title}</span>
                      </div>
                      <div className="flex justify-between py-2 px-3 rounded-md bg-background border border-border">
                        <span className="text-sm text-muted-foreground">Miqdar:</span>
                        <span className="text-sm font-medium">{announcement.quantity} {announcement.unit}</span>
                      </div>
                      
                      {/* Route */}
                      <div className="p-3 rounded-md bg-background border border-border">
                        <span className="text-sm text-muted-foreground block mb-2">Məkan (Haradan → Haraya):</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 flex-1">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium">{announcement.location}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="flex-1">
                            <Input
                              placeholder="Çatdırılma yeri..."
                              value={destinationLocation}
                              onChange={(e) => setDestinationLocation(e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User-entered price field */}
                    <div className="space-y-2">
                      <Label htmlFor="logistics-price" className="text-sm font-medium">
                        Logistika üçün təklif etdiyiniz qiymət (₼)
                      </Label>
                      <Input
                        id="logistics-price"
                        type="number"
                        placeholder="Məsələn: 500"
                        value={logisticsPrice}
                        onChange={(e) => setLogisticsPrice(e.target.value)}
                        className="text-lg font-medium"
                      />
                      <p className="text-xs text-muted-foreground">
                        Bu qiymət logistika elanında göstəriləcək
                      </p>
                    </div>
                  </div>
                )}

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
                  {!selfManageLogistics && (
                    <>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Marşrut:</span>
                        <span className="font-medium">{announcement.location} → {destinationLocation}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Logistika təklifi:</span>
                        <span className="font-medium text-secondary">{logisticsPrice || 0} ₼</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between py-3 text-lg font-bold">
                    <span>Material məbləği:</span>
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
                      : "Sifarişiniz qeydə alındı və logistika elanı yaradıldı."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Ana səhifə
                  </Button>
                  {!selfManageLogistics && (
                    <Button onClick={() => navigate("/logistics")} className="gap-2 bg-primary hover:bg-primary-hover">
                      <Truck className="h-4 w-4" />
                      Logistika Bölməsi
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
