import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import  BucketHeader  from "../components/Bucket/BucketHeader"; 
import  BucketDetails  from "../components/Bucket/BucketDetails";
import FieldCustomization from "../components/Bucket/FieldCustomization";
import type { Field } from "../components/Bucket/FieldCard" 
import { postBucket } from "../utils/hooks";
export default function CreateBucket() {
  const navigate = useNavigate();
  const [bucketName, setBucketName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Folder");
  const [fields, setFields] = useState<Field[]>([]);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = () => {
    console.log("Cancel bucket creation");
    setBucketName("");
    setSelectedIcon("Folder");
    setFields([]);
  };

  const bucketMutation = postBucket();

  const handleCreate = () => {
    const bucket = {
      name: bucketName,
      icon: selectedIcon,
      description: description,
      fieldSchema: {  
        fields: fields
      },
      updatedAt: new Date()
    };
    
    bucketMutation.mutate(bucket, {
      onSuccess: () => {
        setTimeout(() => navigate('/dashboard'), 50)
      },
      onError: (err) => {
        console.error('Network error:', err)
        setErrorMessage(err.message)
      }
    });
    
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
        <BucketHeader />

        <div className="flex-1 flex flex-col">
          {errorMessage && (
              <div className="mt-4 text-center w-2xl mx-auto bg-red-100 text-red-800 p-3 rounded mb-4">
                  {errorMessage}
              </div>
          )}
          <div className="flex-none">
              <BucketDetails bucketName={bucketName} setBucketName={setBucketName} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} bucketDescription={description} setBucketDescription={setDescription}/>
          </div>

          <FieldCustomization
            bucketName={bucketName}
            fields={fields}
            setFields={setFields}
          />

          <div className="flex-none">
           <div className="bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border px-4 py-2 text-sm font-medium rounded-xl hover:bg-gray-200" onClick={handleCancel}>Cancel</button>
                <button className="flex-1 sm:flex-none border px-4 py-2 text-sm font-medium rounded-xl bg-[#030213] hover:bg-[#1f1f46] text-white" onClick={handleCreate} disabled={!bucketName.trim() || fields.length === 0}>Create Bucket</button>
              </div>
            </div>
          </div> 
          </div>

        </div>
    </div>
  );
}