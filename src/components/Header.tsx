import { Link } from "react-router-dom";
import { Heart, Plus, Search, User, Recycle, Truck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnnouncements } from "@/context/AnnouncementContext";

export function Header() {
  const { favorites, logisticsRequests } = useAnnouncements();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Recycle className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Green<span className="text-primary">Loop</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4 mr-2" />
              Göz gəzdir
            </Button>
          </Link>
          <Link to="/logistics">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground relative">
              <Truck className="h-4 w-4 mr-2" />
              Logistika
              {logisticsRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium flex items-center justify-center">
                  {logisticsRequests.length}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/ai-reminder">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Bot className="h-4 w-4 mr-2" />
              AI Xatırlatma
            </Button>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Logistics Link */}
          <Link to="/logistics" className="md:hidden">
            <Button variant="ghost" size="icon" className="relative">
              <Truck className="h-5 w-5" />
              {logisticsRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium flex items-center justify-center">
                  {logisticsRequests.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/post">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Elan Yerləşdir</span>
            </Button>
          </Link>

          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Daxil ol</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
