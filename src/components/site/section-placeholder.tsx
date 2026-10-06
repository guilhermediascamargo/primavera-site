export default function SectionPlaceholder({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="font-display text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-foreground-secondary">
        Esta página está em desenvolvimento.
      </p>
    </main>
  );
}
