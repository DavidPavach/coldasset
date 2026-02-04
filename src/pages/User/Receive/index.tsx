import { Route } from "@/routes/_user/receive";

// Components
import AssetList from "@/components/AssetList";
import ReceiveType from "./ReceiveType";
import Internal from "./Internal";
import External from "./External";

const Index = () => {

    const search = Route.useSearch();
    const coin = search.coin;
    const type = search.type;

    return (
        <main>
            {!coin && <AssetList route="/receive" />}

            {coin && !type && <ReceiveType />}

            {coin && type && (
                type === "internal" ? <Internal coin={coin} /> : <External coin={coin} />
            )}
        </main>
    );
}

export default Index;