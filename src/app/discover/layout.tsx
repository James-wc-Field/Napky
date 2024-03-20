
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background-light dark:bg-background-dark">
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
