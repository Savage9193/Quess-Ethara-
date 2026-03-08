function ErrorMessage({ error }) {
  if (!error) return null;

  const message =
    typeof error === "string"
      ? error
      : error?.data?.detail ||
        "Something went wrong. Please try again or contact support.";

  return (
    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
      {message}
    </div>
  );
}

export default ErrorMessage;

