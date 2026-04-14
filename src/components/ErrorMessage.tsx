interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
      {message}
    </div>
  );
}