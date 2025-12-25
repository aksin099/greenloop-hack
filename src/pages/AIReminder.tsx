import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Bell, Sparkles, CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIReminder = () => {
  const [request, setRequest] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!request.trim() || !email.trim()) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa istəyinizi və e-poçt ünvanınızı daxil edin",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Xəta",
        description: "Düzgün e-poçt ünvanı daxil edin",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Uğurla qeydə alındı!",
      description: "Uyğun elan paylaşıldıqda sizə bildiriş göndəriləcək",
    });
  };

  const handleNewRequest = () => {
    setIsSubmitted(false);
    setRequest("");
    setEmail("");
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
                        Salam! 👋 Hansı tikinti materialına ehtiyacınız var? 
                        İstəyinizi sərbəst şəkildə yazın - miqdar, qiymət aralığı, müddət və digər tələblərinizi qeyd edin. 
                        Uyğun elan paylaşıldıqda sizə dərhal xəbər verəcəyəm.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Request Text Area */}
                    <div className="relative">
                      <Textarea
                        placeholder="Məsələn: 3 ay ərzində 500 ədəd beton blok lazımdır, maksimum qiymət 2 AZN olsun..."
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        className="min-h-[120px] resize-none pr-4 text-base"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="E-poçt ünvanınız"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-base"
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2">
                      <Send className="h-4 w-4" />
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
                    İstəyiniz qeydə alındı. Uyğun elan paylaşıldıqda <strong className="text-foreground">{email}</strong> ünvanına bildiriş göndəriləcək.
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
