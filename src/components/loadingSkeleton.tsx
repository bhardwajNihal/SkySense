import { Skeleton } from "./ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="h-screen w-full">
        
        <div className="flex justify-around px-2">
        <Skeleton className="h-24 w-48"/>
        <Skeleton className="h-24 w-48"/>
        <Skeleton className="h-24 w-48"/>
        <Skeleton className="h-24 w-48"/>
        <Skeleton className="h-24 w-48"/>
        </div>

        <div className="flex p-6 gap-8">
        <Skeleton className="h-80 w-2/5"/>
        <Skeleton className="h-80 w-3/5"/>
        </div>
    </div>
  )
}
