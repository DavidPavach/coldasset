import { Skeleton } from "@/components/ui/skeleton";

export default function PassphraseLoader() {
    return (
        <div className="mx-auto px-4 py-10 max-w-3xl">
            {/* Header */}
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="rounded-full w-12 h-12" />
                <Skeleton className="w-56 h-6" />
                <Skeleton className="w-80 h-4" />
            </div>

            {/* Stepper */}
            <div className="flex justify-center items-center gap-8 mt-8">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <Skeleton className="rounded-full w-8 h-8" />
                        <Skeleton className="w-12 h-3" />
                    </div>
                ))}
            </div>

            {/* Warning Box */}
            <div className="space-y-3 mt-8 p-4 border border-border rounded-lg">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-5/6 h-3" />
                <Skeleton className="w-4/6 h-3" />
            </div>

            {/* Recovery Phrase Card */}
            <div className="mt-8 p-6 border border-border rounded-xl">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-2">
                        <Skeleton className="w-40 h-4" />
                        <Skeleton className="w-28 h-3" />
                    </div>
                    <Skeleton className="w-12 h-4" />
                </div>

                {/* Grid of words */}
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-md">
                            <Skeleton className="rounded-full size-6" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex sm:flex-row flex-col gap-4 mt-6">
                    <Skeleton className="w-full sm:w-1/2 h-10" />
                    <Skeleton className="w-full sm:w-1/2 h-10" />
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
                <Skeleton className="rounded-lg w-full h-12" />
            </div>

            {/* Footer text */}
            <div className="flex justify-center mt-4">
                <Skeleton className="w-64 h-3" />
            </div>
        </div>
    )
}
