import { Route } from "@/routes/_user/coin";

// Components
import Details from "./Details";
import AssetList from "../../../components/AssetList";


const Index = () => {

    const search = Route.useSearch();
    const coin = search.coin;
    console.log("The coin", coin)

    return (
        <main>
            {(coin && coin !== "undefined") && <Details coin={coin} />}
            {(!coin || coin === "undefined") && <AssetList route="/coin" />}
        </main>
    );
}

export default Index;