import { useEffect } from "react";

// Stores
import { useAuthFlow } from "@/stores/authFlow";

// Components
import Form from "./Form";

// Images
import logo from "/logo1.png";

const Index = () => {

    const { isVerifying } = useAuthFlow();

    useEffect(() => {
        if (!isVerifying) {
            // Redirect to create page if not in verification flow
            window.location.href = '/create';
        }
    }, [isVerifying]);

    return (
        <main className="z-5 relative drop-shadow-md p-4 md:p-6 xl:p-8 rounded-2xl w-full max-w-xl overflow-hidden">
            <div className="mx-auto mb-10 w-fit">
                <img src={logo} alt="logo" className="w-10 md:w-12 xl:w-14" />
            </div>
            <div className="my-8 text-center">
                <h1 className="mb-2 font-bold text-xl md:text-2xl xl:text-3xl">KYC</h1>
                <p className="text-muted-foreground">
                    Complete your KYC to Continue
                </p>
            </div>
            <Form />

        </main>
    );
}

export default Index;