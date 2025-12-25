import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Package, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { announcements } = useAnnouncements();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          announcement.title.toLowerCase().includes(query) ||
          announcement.description.toLowerCase().includes(query) ||
          announcement.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "all" && announcement.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation && selectedLocation !== "all" && announcement.location !== selectedLocation) {
        return false;
      }

      // Price filter
      if (minPrice && announcement.pricePerUnit < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && announcement.pricePerUnit > parseFloat(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [announcements, searchQuery, selectedCategory, selectedLocation, minPrice, maxPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Tikinti Materialları <span className="text-primary">Bazarı</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artıq qalan tikinti materiallarınızı satın və ya lazım olanları uyğun qiymətə əldə edin
          </p>
        </section>

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filters */}
        <Filters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onClearFilters={handleClearFilters}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredAnnouncements.length}</span> elan tapıldı
          </p>
        </div>

        {/* Grid */}
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Elan tapılmadı</h2>
            <p className="text-muted-foreground mb-6">Axtarış kriteriyalarınızı dəyişdirməyi sınayın</p>
            
            {/* AI Reminder Suggestion */}
            <div className="max-w-md mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">
                    Axtardığınızı tapa bilmirsiniz?
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI Xatırlatma xidmətindən istifadə edin — istəklərinizə uyğun elan paylaşıldıqda sizə avtomatik bildiriş göndərilsin.
                  </p>
                  <Link to="/ai-reminder">
                    <Button size="sm" className="gap-2">
                      AI Xatırlatma
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container-custom text-center text-muted-foreground text-sm">
          <p>© 2024 GreenLoop. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
