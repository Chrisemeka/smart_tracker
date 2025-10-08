import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BucketHeader() {
  const navigate = useNavigate();
  return (
    <div className="bg-background border-b border-gray-300">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <button className='hover:bg-gray-200 px-3 py-2 rounded-lg' onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm text-gray-400">
            Dashboard <span className="mx-2">&gt;</span> Create Bucket
          </div>
        </div>
        <h1 className="text-3xl font-bold">Create New Bucket</h1>
      </div>
    </div>
  );
}