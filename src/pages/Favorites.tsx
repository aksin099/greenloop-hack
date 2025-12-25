import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Header } from "@/components/Header";
import { AnnouncementCard } from "@/components/AnnouncementCard";

export default function Favorites() {
  const { getFavoriteAnnouncements, favorites } = useAnnouncements();
  const favoriteAnnouncements = getFavoriteAnnouncements();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Sevimlilər
            </h1>
            <p className="text-muted-foreground">
              {favorites.length} elan saxlanılıb
            </p>
          </div>
        </div>

        {/* Content */}
        {favoriteAnnouncements.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sevimli elanınız yoxdur
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Bəyəndiyiniz elanları ürək işarəsinə tıklayaraq sevimlilərə əlavə edin
            </p>
            <Link to="/">
              <Button className="gap-2">
                <Package className="h-4 w-4" />
                Elanları kəşf edin
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
