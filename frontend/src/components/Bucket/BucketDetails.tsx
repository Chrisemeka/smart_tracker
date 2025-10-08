// import { useState } from "react";
import { Folder, Briefcase, GraduationCap, Heart, Star, Target, Zap, Trophy } from "lucide-react";

const PRESET_ICONS = [
  { icon: Folder, name: "Folder", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1pY29uIGx1Y2lkZS1mb2xkZXIiPjxwYXRoIGQ9Ik0yMCAyMGEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtNy45YTIgMiAwIDAgMS0xLjY5LS45TDkuNiAzLjlBMiAyIDAgMCAwIDcuOTMgM0g0YTIgMiAwIDAgMC0yIDJ2MTNhMiAyIDAgMCAwIDIgMloiLz48L3N2Zz4=" },
  { icon: Briefcase, name: "Briefcase", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1pY29uIGx1Y2lkZS1icmllZmNhc2UiPjxwYXRoIGQ9Ik0xNiAyMFY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYxNiIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgeD0iMiIgeT0iNiIgcng9IjIiLz48L3N2Zz4=" },
  { icon: GraduationCap, name: "GraduationCap", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdyYWR1YXRpb24tY2FwLWljb24gbHVjaWRlLWdyYWR1YXRpb24tY2FwIj48cGF0aCBkPSJNMjEuNDIgMTAuOTIyYTEgMSAwIDAgMC0uMDE5LTEuODM4TDEyLjgzIDUuMThhMiAyIDAgMCAwLTEuNjYgMEwyLjYgOS4wOGExIDEgMCAwIDAgMCAxLjgzMmw4LjU3IDMuOTA4YTIgMiAwIDAgMCAxLjY2IDB6Ii8+PHBhdGggZD0iTTIyIDEwdjYiLz48cGF0aCBkPSJNNiAxMi41VjE2YTYgMyAwIDAgMCAxMiAwdi0zLjUiLz48L3N2Zz4=" },
  { icon: Heart, name: "Heart", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXJ0LWljb24gbHVjaWRlLWhlYXJ0Ij48cGF0aCBkPSJNMiA5LjVhNS41IDUuNSAwIDAgMSA5LjU5MS0zLjY3Ni41Ni41NiAwIDAgMCAuODE4IDBBNS40OSA1LjQ5IDAgMCAxIDIyIDkuNWMwIDIuMjktMS41IDQtMyA1LjVsLTUuNDkyIDUuMzEzYTIgMiAwIDAgMS0zIC4wMTlMNSAxNWMtMS41LTEuNS0zLTMuMi0zLTUuNSIvPjwvc3ZnPg==" },
  { icon: Star, name: "Star", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN0YXItaWNvbiBsdWNpZGUtc3RhciI+PHBhdGggZD0iTTExLjUyNSAyLjI5NWEuNTMuNTMgMCAwIDEgLjk1IDBsMi4zMSA0LjY3OWEyLjEyMyAyLjEyMyAwIDAgMCAxLjU5NSAxLjE2bDUuMTY2Ljc1NmEuNTMuNTMgMCAwIDEgLjI5NC45MDRsLTMuNzM2IDMuNjM4YTIuMTIzIDIuMTIzIDAgMCAwLS42MTEgMS44NzhsLjg4MiA1LjE0YS41My41MyAwIDAgMS0uNzcxLjU2bC00LjYxOC0yLjQyOGEyLjEyMiAyLjEyMiAwIDAgMC0xLjk3MyAwTDYuMzk2IDIxLjAxYS41My41MyAwIDAgMS0uNzctLjU2bC44ODEtNS4xMzlhMi4xMjIgMi4xMjIgMCAwIDAtLjYxMS0xLjg3OUwyLjE2IDkuNzk1YS41My41MyAwIDAgMSAuMjk0LS45MDZsNS4xNjUtLjc1NWEyLjEyMiAyLjEyMiAwIDAgMCAxLjU5Ny0xLjE2eiIvPjwvc3ZnPg==" },
  { icon: Target, name: "Target", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRhcmdldC1pY29uIGx1Y2lkZS10YXJnZXQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiLz48L3N2Zz4=" },
  { icon: Zap, name: "Zap", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXphcC1pY29uIGx1Y2lkZS16YXAiPjxwYXRoIGQ9Ik00IDE0YTEgMSAwIDAgMS0uNzgtMS42M2w5LjktMTAuMmEuNS41IDAgMCAxIC44Ni40NmwtMS45MiA2LjAyQTEgMSAwIDAgMCAxMyAxMGg3YTEgMSAwIDAgMSAuNzggMS42M2wtOS45IDEwLjJhLjUuNSAwIDAgMS0uODYtLjQ2bDEuOTItNi4wMkExIDEgMCAwIDAgMTEgMTR6Ii8+PC9zdmc+" },
  { icon: Trophy, name: "Trophy", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyb3BoeS1pY29uIGx1Y2lkZS10cm9waHkiPjxwYXRoIGQ9Ik0xMCAxNC42NnYxLjYyNmEyIDIgMCAwIDEtLjk3NiAxLjY5NkE1IDUgMCAwIDAgNyAyMS45NzgiLz48cGF0aCBkPSJNMTQgMTQuNjZ2MS42MjZhMiAyIDAgMCAwIC45NzYgMS42OTZBNSA1IDAgMCAxIDE3IDIxLjk3OCIvPjxwYXRoIGQ9Ik0xOCA5aDEuNWExIDEgMCAwIDAgMC01SDE4Ii8+PHBhdGggZD0iTTQgMjJoMTYiLz48cGF0aCBkPSJNNiA5YTYgNiAwIDAgMCAxMiAwVjNhMSAxIDAgMCAwLTEtMUg3YTEgMSAwIDAgMC0xIDF6Ii8+PHBhdGggZD0iTTYgOUg0LjVhMSAxIDAgMCAxIDAtNUg2Ii8+PC9zdmc+" }
];

interface BucketDetailsProps {
  bucketName: string;
  setBucketName: (name: string) => void;
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
  bucketDescription: string;
  setBucketDescription: (description: string) => void;
}

export default function BucketDetails({ bucketName, setBucketName, selectedIcon, setSelectedIcon, bucketDescription, setBucketDescription }: BucketDetailsProps) {

    return(
        <div className="bg-card border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Name and Description */}
                <div className="space-y-4">
                    <div className="space-y-2 flex flex-col">
                        <label htmlFor="bucket-name">Bucket Name</label>
                        <input type="text" required className="text-md p-1 bg-gray-100 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-transparent" name="bucketName" id="bucket-name" value={bucketName} onChange={(e) => setBucketName(e.target.value)} placeholder="e.g., Remote Software Jobs, Stock Portfolio" />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <div>
                           Add description 
                        </div>
                        <textarea required placeholder="Describe what this bucket is for..." value={bucketDescription} onChange={(e) => setBucketDescription(e.target.value)} className="min-h-[80px] p-1 resize-none bg-gray-100 rounded-md focus:outline-none focus:ring-4 required focus:ring-gray-300 focus:border-transparent" />
                    </div>
                </div>

                {/* Right Column - Icon */}
                <div className="space-y-6">
                    {/* Icon Selector */}
                    <div className="space-y-3">
                        <p>Icon</p>
                    <div className="grid grid-cols-4 gap-2">
                        {PRESET_ICONS.map(({ icon: Icon, name, url }) => (
                        <button
                            key={name}
                            onClick={() => setSelectedIcon(url)}
                            className={`p-3 rounded-lg border transition-all hover:bg-gray-300 ${
                            selectedIcon === url
                                ? 'bg-gray-300'
                                : 'border-gray-200'
                            }`}
                        >
                            <Icon className="h-5 w-5 mx-auto " />
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}