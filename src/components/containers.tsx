export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full min-h-screen min-w-screen min-custom-h-screen pt-20 px-8 justify-center">
      <div className="h-full w-full max-w-7xl space-y-[200px]">{children}</div>
    </div>
  );
}
