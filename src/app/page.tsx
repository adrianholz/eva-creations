import { DefaultButton } from '@/components/buttons';

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
        <p className="text-lg mb-4">This is the home screen. Feel free to explore!</p>
        <div className="space-x-4">
          <DefaultButton type="link" href="/dashboard" text="Login" />
        </div>
      </div>
    </>
  );
}