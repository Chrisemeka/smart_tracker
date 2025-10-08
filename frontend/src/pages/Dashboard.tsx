import { useState } from 'react'
import { Header } from "../components/Dashboard/Header";
// import { Sidebar } from '../components/Dashboard/Sidebar'; 
import { BucketList } from "../components/Dashboard/BucketList";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');


  return (

    <div className="min-h-screen bg-[#f9fafb]">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Organize and track anything with custom buckets and AI-powered fields
          </p>
        </div>
        
        <BucketList />
      </main>
    </div>
  )
    
}