import { FerrisWheel } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 top-0 flex items-center justify-center h-screen w-screen bg-black opacity-50 z-50">
      <FerrisWheel color="white" size={60} className="animate-spin z-20" />
    </div>
  )
}
