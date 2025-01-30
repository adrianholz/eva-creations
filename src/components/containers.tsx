
export function PageContainer({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full min-h-screen min-w-screen bg-gray-100 min-custom-h-screen pt-20 justify-center">
      <div className="h-full w-full max-w-7xl">
        {children}
      </div>
    </div>
  );
}

export function PageContentContainer({ children }: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full h-full px-8 py-8 gap-4">{children}</div>;
}