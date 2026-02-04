import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Verify from "./Verify";
import { Skeleton } from "@/components/ui/skeleton";
import PassphraseWord from "@/pages/Auth/Passphrase/PassphraseWord";

// Icons
import { PasswordCheck, CloseSquare } from "iconsax-reactjs";

const Passphrase = ({ passCode, passphrase }: { passCode: string, passphrase: string[] }) => {

    const [enterPasscode, setEnterPasscode] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    // Functions
    const toggleEnterPasscode = () => setEnterPasscode((prev) => !prev);

    const update = () => {
        toggleEnterPasscode();
        setShow((prev) => !prev);
    }

    return (
        <>
            {enterPasscode ?
                <Verify code={passCode} update={update} cancel={toggleEnterPasscode} />
                :
                <main className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-sm md:text-base xl:text-lg">Passphrase</h2>
                        {show ?
                            <CloseSquare className="size-6 text-destructive cursor-pointer" onClick={() => setShow((prev) => !prev)} />
                            : <PasswordCheck className="size-6 text-primary cursor-pointer" onClick={toggleEnterPasscode} />
                        }
                    </div>
                    <section>
                        {show ? (
                            <div className="gap-3 grid grid-cols-2 md:grid-cols-3 my-4 transition-all duration-300">
                                {passphrase.map((word, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.05 }}>
                                        <PassphraseWord index={index + 1} word={word} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 mt-4 rounded-lg">
                                    {[...Array(12)].map((_, i) => (
                                        <Skeleton key={i} className="w-32 md:w-36 2xl:w-40 h-10" />
                                    ))}
                                </div>
                            </>

                        )}
                    </section>
                </main>
            }
        </>
    );
}

export default Passphrase;