type Props = {
  message?: string;
};

function ErrorMessage({
  message = "Something went wrong.",
}: Props) {
  return (
    <div className="bg-red-900/30 border border-red-500 rounded-xl p-6">

      <h2 className="text-red-400 text-xl font-bold">
        ⚠ Error
      </h2>

      <p className="text-red-300 mt-2">
        {message}
      </p>

    </div>
  );
}

export default ErrorMessage;