import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Delete, X } from "lucide-react";

interface NumericKeypadProps {
    onKeyPress: (key: string) => void;
    onDelete: () => void;
    onClear: () => void;
}

export default function NumericKeypad({
    onKeyPress,
    onDelete,
    onClear,
}: NumericKeypadProps) {
    const keys: string[][] = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["clear", "0", "delete"],
    ];

    const handleKeyPress = (key: string) => {
        if (key === "delete") {
            onDelete();
        } else if (key === "clear") {
            onClear();
        } else {
            onKeyPress(key);
        }
    };

    return (
        <div className="gap-3 md:gap-4 grid grid-cols-3 mx-auto max-w-xs">
            {keys.flat().map((key, index) => (
                <Button
                    key={index}
                    variant={key === "delete" || key === "clear" ? "outline" : "secondary"}
                    onClick={() => handleKeyPress(key)}
                    className={cn(
                        "rounded-xl h-14 md:h-16 font-semibold text-lg md:text-xl transition-all duration-150",
                        "active:scale-95 active:bg-primary active:text-primary-foreground",
                        "hover:bg-primary/10 hover:border-primary/30",
                        key === "delete" && "text-destructive hover:bg-destructive/10 hover:border-destructive/30",
                        key === "clear" && "text-muted-foreground hover:bg-muted",
                        key !== "delete" && key !== "clear" && "bg-card border border-border shadow-sm"
                    )}
                >
                    {key === "delete" ? (
                        <Delete className="w-5 md:w-6 h-5 md:h-6" />
                    ) : key === "clear" ? (
                        <X className="w-5 md:w-6 h-5 md:h-6" />
                    ) : (
                        key
                    )}
                </Button>
            ))}
        </div>
    );
}
