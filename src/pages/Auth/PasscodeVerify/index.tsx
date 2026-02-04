import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// Utils
import { getAccessToken } from "@/lib/token";

// Components
import Verify from "./Verify";

const index = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            navigate({ to: "/login" })
        }
    }, [])

    return <Verify />
}

export default index;