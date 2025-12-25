import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, locations } from "@/data/announcements";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  minPrice: string;
  onMinPriceChange: (price: string) => void;
  maxPrice: string;
  onMaxPriceChange: (price: string) => void;
  onClearFilters: () => void;
}

export function Filters({
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onClearFilters,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== "all" || selectedLocation !== "" || minPrice !== "" || maxPrice !== "";

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`category-chip ${selectedCategory === cat.id ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters Collapsible */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex justify-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Genişləndirilmiş Filtrlər
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-destructive">
              <X className="h-4 w-4 mr-1" />
              Təmizlə
            </Button>
          )}
        </div>

        <CollapsibleContent className="mt-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card scale-in">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Location */}
              <div className="space-y-2">
                <Label>Məkan</Label>
                <Select value={selectedLocation} onValueChange={onLocationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bütün məkanlar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Bütün məkanlar</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Minimum Qiymət (AZN)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Maksimum Qiymət (AZN)</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
