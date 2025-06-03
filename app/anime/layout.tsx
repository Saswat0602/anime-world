export default function AnimeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 py-10">{children}</main>
      </div>
    );
  }
  