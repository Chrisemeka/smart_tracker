import { Plus, Clock, Trash2, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { Bucket } from '../../utils/types'
import { getBuckets, deleteBucket } from '../../utils/hooks';
import { formatDistanceToNow } from 'date-fns';
import { HashLoader } from "react-spinners";  

export function BucketList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

    const { data: bucketData = [], error, isLoading  } = useQuery<Bucket[]>({
      queryKey:   ['getBuckets'],
      queryFn: getBuckets,
      retry: false,
      refetchOnWindowFocus: false
    })

    const deleteMutation = useMutation({
      mutationFn: deleteBucket,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['getBuckets']});
      },
    })

    const handleDeleteBucket =  (e: React.MouseEvent, bucketId: string) => {
      e.stopPropagation();
      deleteMutation.mutate(bucketId)
    };

    const handleSelectBucket = (bucket: Bucket) => {
      navigate(`/bucket/${bucket.id}/records`)  
    }
    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Create your first bucket to start tracking</h3>
            <p className="text-gray-600 mb-6">Organize job applications, learning resources, personal goals, or anything else</p>
            <div className='justify-center'>
                <button onClick={() => navigate('/dashboard/create-bucket')} className="bg-[#030213] text-white py-2 px-4 rounded-md hover:bg-[#030213]/80">
                    <span className="flex items-center gap-2">  
                        <Plus className="h-4 w-4" />
                        Create Bucket
                    </span>
                </button>
            </div>
        </div>
    )

    if (isLoading){
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <HashLoader color="#030213" size={50} />
          <p className="text-gray-600 mt-4 text-sm font-medium">Loading your buckets...</p>
        </div>
      )
    }

    if(error){
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            {error?.message || "We couldn't load your buckets. Please try again."}
          </p>
          <button 
            className="flex items-center gap-2 bg-[#030213] hover:bg-[#1f1f46] text-white font-semibold py-2 px-6 rounded transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )
    } 

    if (!bucketData || bucketData.length === 0) {
      return <EmptyState />
    }

    return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Your Buckets</h2>
        <p className="text-sm text-gray-600">Select a bucket to view and manage items</p>
      </div>
      <button className="flex items-center justify-center gap-2 bg-[#030213] hover:bg-[#1f1f46] sm:text-sm text-white font-semibold py-2 px-4 rounded-xl whitespace-nowrap" onClick={() => navigate('/dashboard/create-bucket')}>
        <Plus className="h-4 w-4" />
        New Bucket
      </button>
    </div>

      <div className="space-y-3">
        {bucketData.map((bucket) => (
          <Card 
            key={bucket.id} 
            className="transition-all hover:shadow-md cursor-pointer border-l-4 hover:border-l-gray-500"
            onClick={() => handleSelectBucket(bucket)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img alt="Bucket Icon" className="w-8 h-8 rounded-full bg-transparent" src={bucket.icon} />
                  <h3 className="font-medium text-gray-900">{bucket.name}</h3>
                </div>
                <Trash2 onClick={(e) => handleDeleteBucket(e, bucket.id)} className="h-4 w-4 text-red-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Recent Items</p>
                  <div className="space-y-1">
                      <p className="text-sm text-gray-700 truncate">{bucket.description}</p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Updated {formatDistanceToNow(bucket.updatedAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}