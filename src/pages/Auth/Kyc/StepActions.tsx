// Components
import { Button } from "@/components/ui/button";

// Icons
import { Loader } from "lucide-react";

export default function StepActions({ step, onNext, onBack, onSubmit, loading }: { step: number, onNext: () => void, onBack: () => void, onSubmit: () => void, loading: boolean }) {
    return (
        <div className="flex justify-between mt-6 w-full duration-300">
            {step > 1 ? (
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
            ) : (
                <div />
            )}

            {step < 4 ? (
                <Button onClick={onNext} className="hover:bg-accent border border-primary hover:border-accent w-fit duration-300">Next</Button>
            ) : (
                <Button onClick={onSubmit} disabled={loading} className="hover:bg-accent border border-primary hover:border-accent w-fit duration-300">
                    {loading ? <span><Loader className="inline mr-0.5 size-4 md:size-5 xl:size-6 animate-spin" />Submitting</span> : "Submit"}
                </Button>
            )}
        </div>
    )
}
