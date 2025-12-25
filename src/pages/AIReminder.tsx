import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Bell, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const materials = [
  "Beton Bloklar",
  "Armatur Polad",
  "Taxta Materiallar",
  "Portland Sement",
  "PVC Borular",
  "Keramik Kafellər",
  "Elektrik Kabelləri",
  "Şüşə Panellər",
  "Digər",
];

const durations = [
  { value: "1-week", label: "1 həftə" },
  { value: "2-weeks", label: "2 həftə" },
  { value: "1-month", label: "1 ay" },
  { value: "2-months", label: "2 ay" },
  { value: "3-months", label: "3 ay" },
  { value: "6-months", label: "6 ay" },
];

const AIReminder = () => {
  const [material, setMaterial] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");
  const [duration, setDuration] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!material || !duration) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa material və müddət seçin",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI processing
    setIsSubmitted(true);
    toast({
      title: "Uğurla qeydə alındı!",
      description: "Uyğun elan paylaşıldıqda sizə bildiriş göndəriləcək",
    });
  };

  const handleNewRequest = () => {
    setIsSubmitted(false);
    setMaterial("");
    setCustomMaterial("");
    setDuration("");
    setMinQuantity("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI Dəstəkli</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            AI <span className="text-primary">Xatırlatma</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Axtardığınız materialı tapa bilmirsinizsə, bizə bildirin. 
            Uyğun elan paylaşıldıqda sizə avtomatik xəbər verək.
          </p>
        </section>

        {/* AI Chat Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            {/* AI Header */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GreenLoop AI Köməkçi</h3>
                  <p className="text-sm text-muted-foreground">Həmişə aktiv</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  {/* AI Message */}
                  <div className="flex gap-3 mb-6">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                      <p className="text-foreground">
                        Salam! 👋 Hansı tikinti materialına ehtiyacınız var və nə qədər müddətə? 
                        Mən sizin üçün uyğun elanları izləyib, tapıldıqda dərhal xəbər verəcəyəm.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="material">Material növü *</Label>
                        <Select value={material} onValueChange={setMaterial}>
                          <SelectTrigger>
                            <SelectValue placeholder="Material seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {materials.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">İzləmə müddəti *</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Müddət seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((d) => (
                              <SelectItem key={d.value} value={d.value}>
                                {d.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {material === "Digər" && (
                      <div className="space-y-2">
                        <Label htmlFor="customMaterial">Material adı</Label>
                        <Input
                          id="customMaterial"
                          placeholder="Materialın adını daxil edin"
                          value={customMaterial}
                          onChange={(e) => setCustomMaterial(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="minQuantity">Minimum miqdar (istəyə bağlı)</Label>
                        <Input
                          id="minQuantity"
                          type="number"
                          placeholder="Məs: 100"
                          value={minQuantity}
                          onChange={(e) => setMinQuantity(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxPrice">Maksimum qiymət (istəyə bağlı)</Label>
                        <Input
                          id="maxPrice"
                          type="number"
                          placeholder="Məs: 50 AZN"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2">
                      <Bell className="h-4 w-4" />
                      Xatırlatma Yarat
                    </Button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Xatırlatma Aktivdir!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    <strong className="text-foreground">{material === "Digər" ? customMaterial : material}</strong> üçün 
                    xatırlatma yaradıldı. Növbəti <strong className="text-foreground">{durations.find(d => d.value === duration)?.label}</strong> ərzində 
                    uyğun elan paylaşıldıqda sizə bildiriş göndəriləcək.
                  </p>
                  <div className="flex gap-3 justify-center pt-4">
                    <Button variant="outline" onClick={handleNewRequest}>
                      Yeni Xatırlatma
                    </Button>
                    <Button asChild>
                      <a href="/">Elanlara Qayıt</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Footer */}
            <div className="px-6 py-3 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                🔒 Məlumatlarınız təhlükəsizdir və yalnız elan axtarışı üçün istifadə olunur
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIReminder;
