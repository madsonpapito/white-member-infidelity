export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex-col items-center justify-center p-6 sm:p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome to the Member Area</h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          Select a lesson from the menu to get started.
        </p>
      </div>
    </div>
  );
}
