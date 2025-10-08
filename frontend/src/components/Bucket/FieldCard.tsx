import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { Card } from "../../ui/card";

export interface Field {
  id: string;
  fieldName: string;
  fieldType: "text" | "date" | "number" | "url";
}

interface FieldCardProps {
  field: Field;
  onUpdate: (field: Field) => void;
  onDelete: (id: string) => void; 
  isDragging?: boolean;
  dragHandleProps?: any; 
}

const FIELD_TYPE_OPTIONS = [
  { value: "text", label: "Text", icon: "T" },
  { value: "date", label: "Date", icon: "📅" },
  { value: "number", label: "Number", icon: "#" },
  { value: "url", label: "URL", icon: "🔗" },
];

export function FieldCard({ field, onUpdate, onDelete, isDragging, dragHandleProps  }: FieldCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Card className={`p-4 transition-all duration-200 hover:shadow-md ${isDragging ? 'opacity-50 shadow-lg' : ''}`}>
            <div className="flex items-start gap-3">
                <div {...dragHandleProps} className="mt-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-500">
                    <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="field-name" className="text-sm font-medium text-gray-900">Field Name</label>
                            {isEditing ? (
                                <input type="text" id="field-name" value={field.fieldName} onChange={(e) => onUpdate({ ...field, fieldName: e.target.value })} onBlur={() => setIsEditing(false)} onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)} autoFocus className="text-md p-1 bg-gray-100 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-transparent"/>
                            ): (
                                <div onClick={() => setIsEditing(true)}
                                        className="px-3 py-2 border border-transparent rounded-md hover:border-border hover:bg-accent cursor-text"
                                    >
                                    {field.fieldName || "Untitled Field"}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <label htmlFor="field-type" className="text-sm font-medium text-gray-900">Field Type</label>
                            <select id="field-type" value={field.fieldType} onChange={(e) => onUpdate({ 
                                ...field, 
                                fieldType: e.target.value as Field['fieldType'] 
                            })}
                            >
                                {FIELD_TYPE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>{option.icon}{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <Trash2 onClick={(e) => {e.stopPropagation(); onDelete(field.id)}} className="h-4 w-4 text-red-400 hover:text-red-500 cursor-pointer" />
            </div>
        </Card>
    )
}