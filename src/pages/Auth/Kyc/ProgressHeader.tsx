export default function ProgressHeader({ step }: { step: number }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="bg-muted rounded w-full h-2 overflow-hidden">
                <div className="bg-primary h-full transition-all" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
        </div>
    )
}
