import { Link } from '@tanstack/react-router';

// Hooks & Utils
import { useCoinDetails } from '@/Hooks/useCoinDetails';
import { formatCurrency } from '@/utils/format';

// Components
import { ErrorScreen } from '@/components/ErrorComponents';
import { Skeleton } from '@/components/ui/skeleton';
import CoinGeckoChart from './CoinGeckoChart';
import Transactions from './Transactions';

// Icons
import { DirectboxSend, DirectDown, BitcoinConvert } from 'iconsax-reactjs';

const DetailsSkeleton = () => (
    <div className="space-y-8 mx-auto px-4 max-w-5xl">
        <Skeleton className="mx-auto rounded-full size-12" />
        <Skeleton className="mx-auto w-48 h-10" />

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="rounded-2xl h-24" />
            ))}
        </div>

        <Skeleton className="rounded-2xl h-75" />
    </div>
);


const Details = ({ coin }: { coin: string }) => {

    const { getCoinDetails, loading, fetching, isError, refetch } = useCoinDetails();

    const isLoading = loading || fetching;

    if (isLoading) {
        return <DetailsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorScreen
                variant="fullscreen"
                type="500"
                title={`Couldn't fetch ${coin.toUpperCase()} details`}
                onRetry={refetch}
            />
        );
    }

    const meta = getCoinDetails(coin);

    const stats = [
        { label: 'Current Price', value: `${formatCurrency(meta.price)} USD` },
        { label: '24h Volume', value: `${formatCurrency(meta.tradingVolume)} USD` },
        { label: 'Market Cap', value: `${formatCurrency(meta.marketCap)} USD` },
    ];


    const actions = [
        {
            label: 'Send',
            url: `/send?coin=${coin}`,
            icon: <DirectboxSend size={20} variant="Bold" />
        },
        {
            label: 'Receive',
            url: `/receive?coin=${coin}`,
            icon: <DirectDown size={20} variant="Bold" />
        },
        {
            label: 'Swap',
            url: `/swap`,
            icon: <BitcoinConvert size={20} variant="Bold" />
        }
    ];

    return (
        <main className="space-y-8 mx-auto px-4 max-w-5xl">
            {/* Header */}
            <section className="flex flex-col justify-center items-center gap-3 mt-6">
                <div className='flex items-center gap-x-2'>
                    <img src={meta.logo} alt={`${meta.name} logo`} className="size-9" />
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        ({meta.symbol})
                    </p>
                </div>
                <h1 className="font-semibold text-base md:text-lg xl:text-xl">
                    {meta.name}
                </h1>
            </section>

            {/* Balance */}
            <section className="text-center">
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Your Balance</p>
                <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl tracking-tight montserrat">
                    {formatCurrency(meta.value)}
                </h2>
            </section>

            {/* Actions */}
            <section className="flex justify-center gap-6">
                {actions.map(action => (
                    <Link key={action.label} to={action.url} className="flex flex-col items-center gap-2 hover:bg-primary/30 px-4 py-3 rounded-xl active:scale-95 transition">
                        <div className="flex justify-center items-center bg-muted rounded-full size-11 text-foreground">
                            {action.icon}
                        </div>

                        <span className="font-medium text-muted-foreground text-xs">
                            {action.label}
                        </span>
                    </Link>
                ))}
            </section>


            {/* Stats */}
            <section className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-card p-5 border border-border rounded-2xl text-center">
                        <p className="text-muted-foreground text-xs">
                            {stat.label}
                        </p>
                        <p className="mt-1 font-semibold montserrat">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Chart */}
            <section className="bg-card p-4 border border-border rounded-2xl">
                <CoinGeckoChart />
            </section>

            {/* Transactions */}
            <Transactions coin={coin} />
        </main>
    );
};

export default Details;