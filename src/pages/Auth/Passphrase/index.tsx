import { useEffect } from "react";

// Stores
import { userPassphraseFlow } from "@/stores/passPhraseFlow";

// Components
import PassphraseDisplay from "./PassphraseDisplay";

const Index = () => {

    const { setVerification } = userPassphraseFlow();

    useEffect(() => {
        setVerification(true);
    }, [])

    return <PassphraseDisplay />
}

export default Index;