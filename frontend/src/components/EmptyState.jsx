function EmptyState({ title = "No data", description = "Nothing to display yet." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-2 text-sm font-medium text-slate-600">{title}</div>
      <p className="max-w-md text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;

