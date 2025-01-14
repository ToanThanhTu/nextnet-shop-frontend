function Error({ error }: { error: string }) {
  return (
    <div className="text-red-500 text-center p-4 border border-red-500">
      {error}
    </div>
  );
}

export default Error;