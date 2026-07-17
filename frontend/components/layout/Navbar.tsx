import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          📚 PaperLens
        </Link>

        <nav className="flex gap-6">

          <Link href="/upload">
            Upload
          </Link>

          <Link href="/library">
            Library
          </Link>

        </nav>

      </div>
    </header>
  );
}