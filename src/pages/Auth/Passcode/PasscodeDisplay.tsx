import { cn } from "@/lib/utils";

export default function PasscodeDisplay({ maxLength = 6, value }: { maxLength: number, value: string }) {
    return (
        <div className="flex justify-center items-center gap-2 md:gap-3">
            {Array.from({ length: maxLength }).map((_, index) => (
                <div key={index} className={cn("flex justify-center items-center border-2 border-border rounded-xl w-10 md:w-12 h-12 md:h-14 transition-all duration-300",
                    "bg-card", index < value.length ? "border-primary bg-primary/5" : "border-border")}>
                    {index < value.length ? (
                        <div className={cn(
                            "bg-primary rounded-full md:w-4 md:h-4 size-3 transition-all duration-200",
                            "animate-in zoom-in-50 duration-200"
                        )} />
                    ) : null}
                </div>
            ))}
        </div>
    );
}