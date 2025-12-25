import { Link } from "react-router-dom";
import { Truck, MapPin, Package, ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Logistics() {
  const { logisticsRequests } = useAnnouncements();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Logistika Elanları
              </h1>
              <p className="text-muted-foreground">
                Yük daşıma sorğuları və təkliflər
              </p>
            </div>
          </div>
        </div>

        {/* Logistics Requests */}
        {logisticsRequests.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Truck className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Hələ logistika elanı yoxdur
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Alıcılar sifarişlərində logistikanı özləri idarə etmədikdə, elanlar burada görünəcək.
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary-hover">
                Elanları Gözdən Keçir
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {logisticsRequests.map((request) => (
              <div
                key={request.id}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-card transition-all duration-200"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant={request.status === "open" ? "default" : "secondary"}
                    className={request.status === "open" ? "bg-primary" : ""}
                  >
                    {request.status === "open" ? "Açıq" : request.status === "accepted" ? "Qəbul edilib" : "Tamamlandı"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(request.createdAt).toLocaleDateString("az-AZ")}
                  </div>
                </div>

                {/* Material Info */}
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{request.material}</span>
                </div>

                {/* Quantity */}
                <div className="text-sm text-muted-foreground mb-3">
                  Miqdar: <span className="font-medium text-foreground">{request.quantity.toLocaleString("az-AZ")} {request.unit}</span>
                </div>

                {/* Route */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted mb-4">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{request.fromLocation}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />
                  <span className="text-sm font-medium">{request.toLocation}</span>
                </div>

                {/* Offered Price */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Təklif olunan qiymət:</span>
                  <span className="text-xl font-bold text-secondary">
                    {request.offeredPrice.toLocaleString("az-AZ")} ₼
                  </span>
                </div>

                {/* Action Button */}
                {request.status === "open" && (
                  <Button 
                    className="w-full mt-4 bg-primary hover:bg-primary-hover"
                    size="sm"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Təklif Ver
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
