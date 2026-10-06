export const membershipFamilies = [
  { id: "supporter", title: "Torcedor" },
  { id: "council", title: "Conselheiro" },
  { id: "community", title: "Família / Comunidade" },
  { id: "special", title: "Categorias especiais" },
] as const;

export type MembershipPlan = {
  id: string;
  name: string;
  monthlyPrice: number;
  family: (typeof membershipFamilies)[number]["id"];
  tone:
    | "jalde"
    | "premium"
    | "gold"
    | "silver"
    | "bronze"
    | "ivory"
    | "olive"
    | "slate";
  demoBenefits: readonly string[];
};

// Modalidades e valores fornecidos pelo responsável. Benefícios NÃO oficiais.
export const membershipPlans: readonly MembershipPlan[] = [
  {
    id: "torcedor",
    name: "Sócio Torcedor",
    monthlyPrice: 60,
    family: "supporter",
    tone: "jalde",
    demoBenefits: [
      "Condições especiais para ingressos",
      "Descontos em produtos do clube",
      "Comunicações para associados",
    ],
  },
  {
    id: "torcedor-premium",
    name: "Sócio Torcedor Premium",
    monthlyPrice: 75,
    family: "supporter",
    tone: "premium",
    demoBenefits: [
      "Prioridade em ações para associados",
      "Descontos em produtos do clube",
      "Participação em encontros especiais",
    ],
  },
  {
    id: "conselheiro-ouro",
    name: "Sócio Conselheiro Ouro",
    monthlyPrice: 150,
    family: "council",
    tone: "gold",
    demoBenefits: [
      "Convites para encontros com o clube",
      "Prioridade em ações institucionais",
      "Condições especiais em eventos",
    ],
  },
  {
    id: "conselheiro-prata",
    name: "Sócio Conselheiro Prata",
    monthlyPrice: 140,
    family: "council",
    tone: "silver",
    demoBenefits: [
      "Participação em encontros com o clube",
      "Comunicações institucionais",
      "Condições especiais em eventos",
    ],
  },
  {
    id: "conselheiro-bronze",
    name: "Sócio Conselheiro Bronze",
    monthlyPrice: 120,
    family: "council",
    tone: "bronze",
    demoBenefits: [
      "Comunicações institucionais",
      "Participação em ações do clube",
      "Descontos com parceiros",
    ],
  },
  {
    id: "dependente",
    name: "Sócio Dependente",
    monthlyPrice: 30,
    family: "community",
    tone: "ivory",
    demoBenefits: [
      "Condições para atividades em família",
      "Comunicações para associados",
      "Descontos com parceiros",
    ],
  },
  {
    id: "furia",
    name: "Sócio Fúria",
    monthlyPrice: 30,
    family: "special",
    tone: "jalde",
    demoBenefits: [
      "Condições especiais para ingressos",
      "Participação em ações da torcida",
      "Comunicações para associados",
    ],
  },
  {
    id: "infantil",
    name: "Sócio Infantil",
    monthlyPrice: 10,
    family: "special",
    tone: "ivory",
    demoBenefits: [
      "Participação em atividades infantis",
      "Condições para eventos em família",
      "Comunicações aos responsáveis",
    ],
  },
  {
    id: "parceiro-social",
    name: "Sócio Parceiro Social",
    monthlyPrice: 10,
    family: "community",
    tone: "olive",
    demoBenefits: [
      "Participação em ações comunitárias",
      "Comunicações sobre projetos sociais",
      "Condições especiais em eventos",
    ],
  },
  {
    id: "juvenil",
    name: "Sócio Juvenil",
    monthlyPrice: 20,
    family: "special",
    tone: "olive",
    demoBenefits: [
      "Participação em atividades juvenis",
      "Condições especiais para ingressos",
      "Comunicações para associados",
    ],
  },
  {
    id: "escolinha",
    name: "Sócio Escolinha",
    monthlyPrice: 50,
    family: "special",
    tone: "jalde",
    demoBenefits: [
      "Participação em ações da escolinha",
      "Condições em atividades esportivas",
      "Comunicações aos responsáveis",
    ],
  },
  {
    id: "familia-jalde-negra",
    name: "Sócio Família Jalde-negra",
    monthlyPrice: 30,
    family: "community",
    tone: "jalde",
    demoBenefits: [
      "Condições para atividades em família",
      "Descontos com parceiros",
      "Participação em encontros familiares",
    ],
  },
  {
    id: "sem-fronteiras",
    name: "Sócio Sem Fronteiras",
    monthlyPrice: 30,
    family: "community",
    tone: "slate",
    demoBenefits: [
      "Comunicações digitais do clube",
      "Participação em ações à distância",
      "Condições em produtos do clube",
    ],
  },
  {
    id: "seguranca-publica",
    name: "Sócio Segurança Pública",
    monthlyPrice: 40,
    family: "special",
    tone: "slate",
    demoBenefits: [
      "Condições especiais para ingressos",
      "Participação em ações para a categoria",
      "Descontos com parceiros",
    ],
  },
  {
    id: "educacao",
    name: "Sócio Educação",
    monthlyPrice: 40,
    family: "special",
    tone: "olive",
    demoBenefits: [
      "Participação em ações educativas",
      "Condições especiais para ingressos",
      "Descontos com parceiros",
    ],
  },
];
