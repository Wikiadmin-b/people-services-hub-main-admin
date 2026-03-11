import { Layout } from "@/components/layout/Layout";
import { BookOpen, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import { glossaryTerms, GlossaryTerm } from "@/data/content";
import { cn } from "@/lib/utils";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Glossary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filter and group terms
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    
    const query = searchQuery.toLowerCase();
    return glossaryTerms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.category.toLowerCase().includes(query) ||
        term.relatedTerms?.some((rt) => rt.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    
    filteredTerms.forEach((term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });

    // Sort each group
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term));
    });

    return groups;
  }, [filteredTerms]);

  // Available letters (those with content)
  const availableLetters = useMemo(() => {
    return alphabet.filter((letter) => groupedTerms[letter]?.length > 0);
  }, [groupedTerms]);

  // Scroll to section
  const scrollToSection = (letter: string) => {
    const element = sectionRefs.current[letter];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Layout>
      <Link to="/hr-topics" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to HR Topics
      </Link>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">HR Glossary</h1>
            <p className="text-muted-foreground">
              Common HR terms and definitions used in People Services
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* A-Z Jump Bar */}
      <div className="sticky top-[57px] z-30 bg-background/95 backdrop-blur-sm py-3 mb-6 border-b border-border">
        <div className="flex flex-wrap gap-1 justify-center">
          {alphabet.map((letter) => {
            const isAvailable = availableLetters.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => isAvailable && scrollToSection(letter)}
                disabled={!isAvailable}
                className={cn(
                  "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200",
                  isAvailable
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                )}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-8">
        {alphabet.map((letter) => {
          const terms = groupedTerms[letter];
          if (!terms || terms.length === 0) return null;

          return (
            <div
              key={letter}
              ref={(el) => (sectionRefs.current[letter] = el)}
              className="scroll-mt-32"
            >
              {/* Letter Header */}
              <div className="sticky top-[120px] z-20 bg-background py-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">
                    {terms.length} {terms.length === 1 ? "term" : "terms"}
                  </span>
                </div>
              </div>

              {/* Terms Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 animate-fade-in border border-transparent hover:border-primary/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-card-foreground">
                        {highlightMatch(term.term, searchQuery)}
                      </h3>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlightMatch(term.definition, searchQuery)}
                    </p>
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Related:</span>
                        {term.relatedTerms.map((related) => (
                          <span
                            key={related}
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            No Terms Found
          </h2>
          <p className="text-muted-foreground">
            Try searching with different keywords.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Glossary;
