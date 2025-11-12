export default function EmptyState({ title="Nothing here yet", subtitle="Add your first item" }) {
  return (
    <div className="text-center text-gray-500 py-10">
      <div className="text-lg">{title}</div>
      <div className="text-sm">{subtitle}</div>
    </div>
  );
}
