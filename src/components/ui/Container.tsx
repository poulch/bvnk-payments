export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="mt-32 w-full max-w-[460px]">{children}</div>
    </main>
  );
}
