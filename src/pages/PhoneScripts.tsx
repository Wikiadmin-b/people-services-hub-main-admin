import { Layout } from "@/components/layout/Layout";
import { Phone, Copy, Check, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const phoneScripts = [
  {
    id: 1,
    title: "Greeting - Standard Opening",
    category: "General",
    languages: ["es", "en", "pt"],
    content: {
      es: "Buenos días/tardes, gracias por llamar a People Services, mi nombre es [Nombre]. ¿En qué puedo ayudarle hoy?",
      en: "Good morning/afternoon, thank you for calling People Services, my name is [Name]. How may I help you today?",
      pt: "Bom dia/boa tarde, obrigado por ligar para People Services, meu nome é [Nome]. Como posso ajudá-lo hoje?",
    },
  },
  {
    id: 2,
    title: "Hold Request",
    category: "General",
    languages: ["es", "en", "pt"],
    content: {
      es: "¿Me permite un momento mientras verifico esta información en nuestro sistema?",
      en: "May I place you on a brief hold while I verify this information in our system?",
      pt: "Posso colocá-lo em espera por um momento enquanto verifico essas informações em nosso sistema?",
    },
  },
  {
    id: 3,
    title: "Transfer Announcement",
    category: "Transfer",
    languages: ["es", "en", "pt"],
    content: {
      es: "Voy a transferir su llamada al departamento de [Departamento]. Por favor, permanezca en línea.",
      en: "I'm going to transfer your call to the [Department] department. Please stay on the line.",
      pt: "Vou transferir sua chamada para o departamento de [Departamento]. Por favor, aguarde na linha.",
    },
  },
  {
    id: 4,
    title: "Closing - Standard",
    category: "Closing",
    languages: ["es", "en", "pt"],
    content: {
      es: "¿Hay algo más en lo que pueda ayudarle hoy? Gracias por llamar a People Services. Que tenga un excelente día.",
      en: "Is there anything else I can help you with today? Thank you for calling People Services. Have a great day.",
      pt: "Há mais alguma coisa em que eu possa ajudá-lo hoje? Obrigado por ligar para People Services. Tenha um ótimo dia.",
    },
  },
];

type Language = "es" | "en" | "pt";

const languageLabels: Record<Language, string> = {
  es: "🇪🇸 Spanish",
  en: "🇬🇧 English",
  pt: "🇧🇷 Portuguese",
};

const PhoneScripts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredScripts = phoneScripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (id: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied!", description: "Script copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <Link to="/hr-topics" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to HR Topics
      </Link>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-info-light p-3 rounded-full">
            <Phone className="h-6 w-6 text-info" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Phone Scripts</h1>
            <p className="text-muted-foreground">Standardized call responses for all regions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scripts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value as Language)}
            className="px-4 py-2 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(languageLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid gap-4">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow animate-fade-in"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{script.title}</h3>
                <span className="text-sm text-muted-foreground">{script.category}</span>
              </div>
              <button
                onClick={() => handleCopy(script.id, script.content[selectedLang])}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  copiedId === script.id
                    ? "bg-success-light text-success"
                    : "bg-info hover:bg-info/90 text-primary-foreground"
                )}
              >
                {copiedId === script.id ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">{script.content[selectedLang]}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredScripts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No scripts found matching your search.</p>
        </div>
      )}
    </Layout>
  );
};

export default PhoneScripts;
