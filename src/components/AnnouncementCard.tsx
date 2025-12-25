import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { Announcement } from "@/data/announcements";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Button } from "@/components/ui/button";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { toggleFavorite, isFavorite } = useAnnouncements();
  const favorite = isFavorite(announcement.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(announcement.id);
  };

  return (
    <Link to={`/announcement/${announcement.id}`} className="block">
      <article className="bg-card rounded-xl border border-border overflow-hidden card-hover fade-in">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card ${
              favorite ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Price */}
          <div className="price-tag text-xl">
            {announcement.pricePerUnit.toLocaleString("az-AZ")} ₼
            <span className="text-sm font-normal text-muted-foreground">/{announcement.unit}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
            {announcement.title}
          </h3>

          {/* Location & Quantity */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{announcement.location}</span>
            </div>
            <span>
              {announcement.quantity.toLocaleString("az-AZ")} {announcement.unit}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
