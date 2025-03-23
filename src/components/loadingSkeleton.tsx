import { Skeleton } from "./ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="h-screen w-full">
        
        <div className="flex gap-4 px-2 overflow-hidden">
        <Skeleton className="h-24 w-1/4"/>
        <Skeleton className="h-24 w-1/4"/>
        <Skeleton className="h-24 w-1/4"/>
        <Skeleton className="h-24 w-1/4"/>
        </div>

        <div className="flex p-6 gap-8">
        <Skeleton className="h-80 w-2/5"/>
        <Skeleton className="h-80 w-3/5"/>
        </div>
        <div>
        <Skeleton className="h-28 w-full"/>
        </div>

    </div>
  )
}
