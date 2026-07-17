type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {children}
    </div>
  );
}