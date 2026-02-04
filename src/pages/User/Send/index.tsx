import { Route } from "@/routes/_user/send";

// Components
import AssetList from "@/components/AssetList";
import TransferType from "./TransferType";
import Internal from "./Internal";
import External from "./External";

const Index = () => {
  const search = Route.useSearch();
  const coin = search.coin;
  const type = search.type;

  return (
    <main>
      {!coin && <AssetList route="/send" />}

      {coin && !type && <TransferType />}
      
      {coin && type && (
        type === "internal" ? <Internal coin={coin} /> : <External coin={coin} />
      )}
    </main>
  );
};

export default Index;
