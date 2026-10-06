import type { Metadata } from "next";
import HistoryStory from "@/features/history/components/history-story";

export const metadata: Metadata = {
  title: "História | Grêmio Esportivo Bagé",
  description:
    "Percorra as origens, as conquistas e a memória jalde-negra do Grêmio Esportivo Bagé, de 1906 ao presente.",
};

export default function HistoryPage() {
  return <HistoryStory />;
}
