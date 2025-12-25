import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Material axtar... (məs: beton, armatur, taxta)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input pl-12 pr-4 w-full"
      />
    </div>
  );
}
