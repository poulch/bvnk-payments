export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[460px]">{children}</div>
    </main>
  );
}
