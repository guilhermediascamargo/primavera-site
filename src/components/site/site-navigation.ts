type SiteNavigationItem = {
  readonly label: string;
  readonly href: string;
};

export const siteNavigation = [
  { label: "Início", href: "/" },
  { label: "Notícias", href: "/noticias" },
  { label: "Jogos", href: "/jogos" },
  { label: "Elenco", href: "/elenco" },
  { label: "Sócios", href: "/socios" },
  { label: "História", href: "/historia" },
  { label: "Clube", href: "/clube" },
] as const satisfies readonly SiteNavigationItem[];
