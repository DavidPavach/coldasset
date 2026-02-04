import { cn } from "@/lib/utils";

export default function PassphraseWord({ index, word }: { index: number, word: string }) {
    return (
        <div className={cn("flex items-center gap-3 p-3 md:p-4 border rounded-lg transition-all duration-200",
            "bg-card border-border hover:border-primary/30 hover:shadow-sm"
        )}>
            <span className={cn(
                "flex justify-center items-center rounded-full size-6 md:size-7 xl:size-8 font-semibold text-xs",
                "bg-primary/10 text-primary"
            )}>
                {index}
            </span>
            <span className="font-medium text-foreground tracking-wide">
                {word}
            </span>
        </div>
    );
}