import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Header } from './Header'
import { DatabaseView } from './DatabaseView'
import { getBucketById } from '../../utils/hooks'
import { HashLoader } from 'react-spinners'

export default function BucketRecords() {
  const { bucketId } = useParams<{ bucketId: string }>()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: bucket, isLoading, error } = useQuery({
    queryKey: ['bucket', bucketId],
    queryFn: () => getBucketById(bucketId!),
    enabled: !!bucketId,
    retry: false,
    refetchOnWindowFocus: false
  })


  const handleBackToBuckets = () => {
    navigate('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <HashLoader color="#030213" size={50} />
          <p className="text-gray-600 mt-4 text-sm font-medium">Loading bucket...</p>
        </div>
      </div>
    )
  }

  if (error || !bucket) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Bucket not found</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-[#030213] text-white py-2 px-4 rounded-md hover:bg-[#030213]/80"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <DatabaseView bucket={bucket} onBack={handleBackToBuckets} />
      </main>
    </div>
  )
}