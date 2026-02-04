import { useState } from 'react';
import { cn } from "@/lib/utils";

// Components
import { Input } from "@/components/ui/input";

// Icons
import { Check, X } from 'lucide-react';

type VerificationProps = {
    index: number,
    correctWord: string,
    value: string,
    onChange: (e: string) => void;
    disabled?: boolean
}

export default function VerificationInput({ index, correctWord, value, onChange, disabled = false }: VerificationProps) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const isCorrect = value.toLowerCase().trim() === correctWord.toLowerCase();
    const hasValue = value.length > 0;
    const showStatus = hasValue && !isFocused;

    return (
        <div className="relative">
            <div className={cn(
                "flex items-center gap-2 p-2 md:p-3 border-2 rounded-lg transition-all duration-300",
                "bg-card",
                isFocused && "border-primary ring-2 ring-primary/20",
                !isFocused && !hasValue && "border-border",
                showStatus && isCorrect && "border-green-500 bg-green-50/50 dark:bg-green-950/20",
                showStatus && !isCorrect && "border-destructive bg-red-50/50 dark:bg-red-950/20"
            )}>
                <span className={cn(
                    "flex justify-center items-center rounded-full size-5 md:size-6 xl:size-7 text-[10px] md:text-xs ont-bold shrink-0",
                    showStatus && isCorrect && "bg-green-500 text-white",
                    showStatus && !isCorrect && "bg-destructive text-white",
                    !showStatus && "bg-muted text-muted-foreground"
                )}>
                    {index}
                </span>
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    placeholder="Enter word"
                    className={cn(
                        "bg-transparent p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto font-medium",
                        "placeholder:text-muted-foreground/50"
                    )}
                />
                {showStatus && (
                    <div className={cn(
                        "flex justify-center items-center rounded-full size-5 shrink-0",
                        isCorrect ? "bg-green-500" : "bg-destructive"
                    )}>
                        {isCorrect ? (
                            <Check className="size-3 text-white" />
                        ) : (
                            <X className="size-3 text-white" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}