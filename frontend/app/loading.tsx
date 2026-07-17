export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

        <h2 className="mt-6 text-2xl font-semibold">
          Processing Paper...
        </h2>

        <p className="mt-2 text-gray-500">
          Parsing PDF, creating embeddings and generating AI summary.
        </p>

      </div>
    </main>
  );
}