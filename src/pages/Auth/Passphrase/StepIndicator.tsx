import React from 'react';

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Check } from 'lucide-react';

export default function StepIndicator({ currentStep, totalSteps = 3 }: { currentStep: number, totalSteps?: number }) {

    const steps = [
        { label: 'Save', number: 1 },
        { label: 'Verify', number: 2 },
        { label: 'Secure', number: 3 }
    ];

    return (
        <div className="flex justify-center items-center gap-2 md:gap-4">
            {steps.slice(0, totalSteps).map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center gap-1">
                        <div className={cn(
                            "flex justify-center items-center rounded-full size-8 md:size-10 font-semibold text-xs md:text-sm transition-all duration-300",
                            currentStep > step.number && "bg-primary text-primary-foreground",
                            currentStep === step.number && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                            currentStep < step.number && "bg-muted text-muted-foreground"
                        )}>
                            {currentStep > step.number ? (
                                <Check className="size-4 md:size-" />
                            ) : (
                                step.number
                            )}
                        </div>
                        <span className={cn(
                            "font-medium text-[10px] md:text-xs",
                            currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                        )}>
                            {step.label}
                        </span>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className={cn(
                            "mb-5 rounded-full w-8 md:w-16 h-0.5 transition-all duration-500",
                            currentStep > step.number ? "bg-primary" : "bg-border"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}