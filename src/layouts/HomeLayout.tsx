// Components
import HomeNav from "@/components/HomeNav";
import Footer from "@/components/Footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="overflow-x-hidden">
            <HomeNav />
            <section className="pt-20">
                {children}
            </section>
            <Footer />
        </main>
    );
}

export default HomeLayout;