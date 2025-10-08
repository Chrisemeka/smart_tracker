import { useState } from 'react'
import { Header } from "../components/Dashboard/Header";
// import { Sidebar } from '../components/Dashboard/Sidebar'; 
import { BucketList } from "../components/Dashboard/BucketList";
import { DatabaseView } from "../components/Dashboard/DatabaseView";
import type { Bucket } from '../utils/types'

export default function Dashboard() {
  const [selectedBucket, setSelectedBucket] = useState<Bucket | null>(null)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectBucket = (bucket: Bucket) => {
    setSelectedBucket(bucket)
  }

  const handleBackToBuckets = () => {
    setSelectedBucket(null)
  }

  return (

    <div className="min-h-screen bg-[#f9fafb]">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedBucket ? (
              <DatabaseView bucket={selectedBucket} onBack={handleBackToBuckets} />
            ) : ( 
              <div>
                {/* Welcome Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Dashboard
                  </h2>
                  <p className="text-gray-600">
                    Organize and track anything with custom buckets and AI-powered fields
                  </p>
                </div>

                <BucketList onSelectBucket={handleSelectBucket} />
              </div>
            )}
          </div>
    
          {/* Sidebar */}
          {/* <div className="lg:col-span-1">
            <Sidebar />
          </div> */}
        </div>
      </main>
    </div>
  )
    
}