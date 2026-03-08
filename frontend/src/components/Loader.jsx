function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-slate-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-primary-500 mb-3" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Loader;

