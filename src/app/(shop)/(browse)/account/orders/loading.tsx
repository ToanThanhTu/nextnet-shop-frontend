export default function Loading() {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-full h-8 my-2 bg-gray-200 animate-pulse" />
      ))}
    </div>
  )
}