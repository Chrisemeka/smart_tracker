import { useState   } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import type { Field } from "./FieldCard" 
import { SortableFieldCard } from "./SortableFieldCard";
import { Plus, Sparkles, Loader2 } from "lucide-react";


interface FieldCustomizationProps {
  bucketName: string;
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

export default function FieldCustomization({ bucketName, fields, setFields }: FieldCustomizationProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setFields((items: Field[]) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const updateField = (updatedField: Field) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const addCustomField = () => {
    const newField: Field = {
      fieldName: "New Field",
      fieldType: "text",
      id: `field-${Date.now()}`
    };
    setFields([...fields, newField]);
  };

  const generateAIFields = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai/suggest-fields`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'bucketName': bucketName}),
      });
      const data = await response.json();
      setFields(data.fields);
    } catch (error) {
      console.error("Error generating fields:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 h-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-xl">Customize Fields</h2>
            <p className="py-1 px-2 text-xs font-medium bg-gray-200 rounded-lg">{fields.length} fields</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm bg-[#030213] hover:bg-[#1f1f46] text-white font-medium rounded-xl disabled:opacity-50 transition-colors w-full sm:w-auto" onClick={generateAIFields} disabled={isGenerating}>
                {isGenerating ? (
                    <Loader2 className="h-2 w-2 mr-2 animate-spin" />
                ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                )}
                Use AI Suggestions
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm bg-transparent hover:bg-gray-200 text-[#030213] border font-medium rounded-xl transition-colors w-full sm:w-auto" onClick={addCustomField}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Field
            </button>
          </div>
        </div>

        {/* Fields List */}
        <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
          {fields.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <div className="text-base sm:text-lg mb-2">No fields yet</div>
                <div className="text-xs sm:text-sm text-sm">Use AI suggestions or add a custom field to get started</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm bg-[#030213] hover:bg-[#1f1f46] text-white font-medium rounded-xl disabled:opacity-50 transition-colors w-full sm:w-auto" onClick={generateAIFields} disabled={isGenerating}>
                {isGenerating ? (
                    <Loader2 className="h-2 w-2 mr-2 animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Use AI Suggestions
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm bg-transparent hover:bg-gray-200 text-[#030213] border font-medium rounded-xl transition-colors w-full sm:w-auto" onClick={addCustomField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Field
                </button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg p-4 h-24 sm:h-32"></div>
                </div>
              ))}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                {fields.map((field) => (
                  <SortableFieldCard
                    key={field.id}
                    field={field}
                    onUpdate={updateField}
                    onDelete={deleteField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}