import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// Stores
import { userPassphraseFlow } from "@/stores/passPhraseFlow";

// Components
import PasscodeEntry from "./Entry";

const Index = () => {

    const navigate = useNavigate();
    const { verification } = userPassphraseFlow();

    useEffect(() => {
        if (!verification) {
            navigate({ to: "/login", replace: true });
        }
    }, [verification, navigate]);

    return <PasscodeEntry />;
}

export default Index;