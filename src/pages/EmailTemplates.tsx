import { Layout } from "@/components/layout/Layout";
import { Mail, Copy, Check, Search, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const emailTemplates = [
  {
    id: 1,
    title: "Request Confirmation",
    category: "General",
    subject: {
      es: "Confirmación de Solicitud - [Número de Ticket]",
      en: "Request Confirmation - [Ticket Number]",
      pt: "Confirmação de Solicitação - [Número do Ticket]",
    },
    body: {
      es: "Estimado/a [Nombre],\n\nHemos recibido su solicitud y ha sido registrada con el número [Ticket]. Nuestro equipo revisará su caso en las próximas 24-48 horas hábiles.\n\nSaludos cordiales,\nPeople Services",
      en: "Dear [Name],\n\nWe have received your request and it has been registered with number [Ticket]. Our team will review your case within the next 24-48 business hours.\n\nBest regards,\nPeople Services",
      pt: "Prezado/a [Nome],\n\nRecebemos sua solicitação e ela foi registrada com o número [Ticket]. Nossa equipe analisará seu caso nas próximas 24-48 horas úteis.\n\nAtenciosamente,\nPeople Services",
    },
  },
  {
    id: 2,
    title: "Missing Information Request",
    category: "Follow-up",
    subject: {
      es: "Información Adicional Requerida - [Número de Ticket]",
      en: "Additional Information Required - [Ticket Number]",
      pt: "Informações Adicionais Necessárias - [Número do Ticket]",
    },
    body: {
      es: "Estimado/a [Nombre],\n\nPara procesar su solicitud [Ticket], necesitamos la siguiente información:\n\n- [Documento 1]\n- [Documento 2]\n\nPor favor, envíe esta información a la brevedad.\n\nSaludos cordiales,\nPeople Services",
      en: "Dear [Name],\n\nTo process your request [Ticket], we need the following information:\n\n- [Document 1]\n- [Document 2]\n\nPlease send this information at your earliest convenience.\n\nBest regards,\nPeople Services",
      pt: "Prezado/a [Nome],\n\nPara processar sua solicitação [Ticket], precisamos das seguintes informações:\n\n- [Documento 1]\n- [Documento 2]\n\nPor favor, envie essas informações o mais rápido possível.\n\nAtenciosamente,\nPeople Services",
    },
  },
  {
    id: 3,
    title: "Request Completed",
    category: "Resolution",
    subject: {
      es: "Solicitud Completada - [Número de Ticket]",
      en: "Request Completed - [Ticket Number]",
      pt: "Solicitação Concluída - [Número do Ticket]",
    },
    body: {
      es: "Estimado/a [Nombre],\n\nNos complace informarle que su solicitud [Ticket] ha sido procesada exitosamente.\n\n[Detalles de la resolución]\n\nSi tiene alguna pregunta, no dude en contactarnos.\n\nSaludos cordiales,\nPeople Services",
      en: "Dear [Name],\n\nWe are pleased to inform you that your request [Ticket] has been successfully processed.\n\n[Resolution details]\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nPeople Services",
      pt: "Prezado/a [Nome],\n\nTemos o prazer de informar que sua solicitação [Ticket] foi processada com sucesso.\n\n[Detalhes da resolução]\n\nSe você tiver alguma dúvida, não hesite em nos contatar.\n\nAtenciosamente,\nPeople Services",
    },
  },
];

type Language = "es" | "en" | "pt";

const languageLabels: Record<Language, string> = {
  es: "🇪🇸 Spanish",
  en: "🇬🇧 English",
  pt: "🇧🇷 Portuguese",
};

const EmailTemplates = () => {
  const location = useLocation();
  const { from, fromLabel } = location.state || { from: "/hr-topics", fromLabel: "HR Topics" };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredTemplates = emailTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (id: number, subject: string, body: string) => {
    const text = `Subject: ${subject}\n\n${body}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        textArea.remove();
        if (!successful) throw new Error("Copy failed");
      }
      setCopiedId(id);
      toast({ title: "Copied!", description: "Email template copied to clipboard" });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({ title: "Copy Failed", description: "Could not copy to clipboard.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <Link to={from} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {fromLabel}
      </Link>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-success-light p-3 rounded-full">
            <Mail className="h-6 w-6 text-success" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground">Pre-approved email responses for common scenarios</p>
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
              placeholder="Search templates..."
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

      {/* Templates Grid */}
      <div className="grid gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow animate-fade-in"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{template.title}</h3>
                <span className="text-sm text-muted-foreground">{template.category}</span>
              </div>
              <button
                onClick={() =>
                  handleCopy(template.id, template.subject[selectedLang], template.body[selectedLang])
                }
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  copiedId === template.id
                    ? "bg-success-light text-success"
                    : "bg-info hover:bg-info/90 text-primary-foreground"
                )}
              >
                {copiedId === template.id ? (
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
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">Subject:</span>
                <p className="text-foreground font-medium">{template.subject[selectedLang]}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">Body:</span>
                <pre className="text-foreground whitespace-pre-wrap font-sans text-sm mt-1">
                  {template.body[selectedLang]}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found matching your search.</p>
        </div>
      )}
    </Layout>
  );
};

export default EmailTemplates;
