import { Link } from "@tanstack/react-router";

export default function Index() {
    return (
        <main className="flex justify-center items-center bg-background px-6 min-h-dvh">
            <div className="space-y-6 mx-auto max-w-md text-center">
                <p className="font-semibold text-primary tracking-widest montserrat">
                    404
                </p>

                {/* Headline */}
                <h1 className="font-heading text-foreground text-2xl md:text-3xl xl:text-4xl">
                    Page not found
                </h1>

                {/* Description */}
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
                    moved.
                </p>

                {/* Actions */}
                <div className="flex justify-center items-center gap-3 pt-4">
                    <Link to="/" className="inline-flex items-center bg-primary hover:opacity-90 px-5 py-2.5 rounded-xl font-medium text-primary-foreground transition">
                        Go home
                    </Link>

                    <button onClick={() => window.history.back()} className="font-medium text-primary hover:underline">
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
}
