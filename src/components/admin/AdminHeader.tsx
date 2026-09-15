export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl text-noir">{title}</h1>
      {description && <p className="mt-1 text-sm text-noir/50">{description}</p>}
    </div>
  );
}
