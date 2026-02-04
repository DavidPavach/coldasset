import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

// Hooks and Utils
import { useUpdateUserProfile } from "@/services/mutations.service";
import { getUpdatedFields } from "@/utils/format";

// Components
import Header from "./Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Kyc from "./Kyc";

// Icons
import { CircleCheckBig, Loader, } from "lucide-react";
import Passphrase from "./Passphrase";

const Profile = ({ user }: { user: UserData }) => {

    const [form, setForm] = useState({
        userName: user.userName || "",
        password: "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",

    });
    const reset = () => {
        setForm({
            userName: "",
            password: "",
            phoneNumber: "",
            country: ""
        })
    }

    const updateProfile = useUpdateUserProfile();
    const handleUpdate = () => {

        const oldData = {
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            country: user.country,
            password: user.decryptedPassword,
        }
        const formData = getUpdatedFields(oldData, form);

        // Throw an error if there is no new value
        if (!formData || Object.keys(formData).length === 0) {
            return toast.error("No new details detected, kindly update a value to continue.");
        }
        updateProfile.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || "Your profile was updated successfully!");
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to update your profile, try again later.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8 mx-auto max-w-6xl">
            {/* Header */}
            <Header profilePicture={user.profilePicture} userName={user.userName} accountId={user.accountId} email={user.email} />

            {/* Basic Info */}
            <section className="space-y-4 bg-card p-4 md:p-5 xl:p-6 border border-border rounded-xl">
                <h2 className="font-semibold text-sm md:text-base xl:text-lg">Basic Information</h2>

                <div className="gap-4 grid md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Username</Label>
                        <Input disabled={updateProfile.isPending} type="text" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} placeholder={user.userName || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input disabled={updateProfile.isPending} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter a new Password" />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input disabled={updateProfile.isPending} type="tel" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} placeholder={user.phoneNumber || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label>Country</Label>
                        <Input disabled={updateProfile.isPending} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder={user.country || ""} />
                    </div>
                </div>
            </section>

            {/* Account Status */}
            <section className="space-y-2 bg-card p-4 md:p-5 xl:p-6 border border-border rounded-xl">
                <h2 className="font-semibold text-sm md:text-base xl:text-lg">Account Status</h2>

                <div className="flex justify-between mt-4 text-[11px] md:text-xs xl:text-sm">
                    <span>Email Verified</span>
                    <span className={user.isVerified ? "text-green-500" : "text-destructive"}>
                        {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </div>

                <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                    <span>Account Status</span>
                    <span className={user.isSuspended ? "text-destructive" : "text-green-500"}>
                        {user.isSuspended ? "Suspended" : <span>Active <CircleCheckBig className="inline size-4" /></span>}
                    </span>
                </div>
            </section>

            {/* KYC Section */}
            {user.kyc &&
                <section className="space-y-4 bg-card p-4 md:p-5 xl:p-6 border border-border rounded-xl">
                    <h2 className="font-semibold text-sm md:text-base xl:text-lg">Identity Verification (KYC)</h2>

                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                        <span>Status</span>
                        <span className={`${user.kyc.status === "pending" ? "text-yellow-500" : user.kyc.status === "accepted" ? "text-green-500" : "text-destructive"} capitalize`}>{user.kyc.status}</span>
                    </div>

                    {user.kyc.status === "rejected" && (
                        <Kyc />
                    )}
                </section>
            }

            {user.passcode &&
                <Passphrase passCode={user.passcode} passphrase={user.passPhrase} />
            }

            {/* Save */}
            <div className="flex justify-end">
                <Button size="lg" className="h-8 md:h-10 xl:h-12" disabled={updateProfile.isPending} onClick={handleUpdate}>
                    {updateProfile.isPending ? <Loader className="animate-spin" /> : "Save Changes"}
                </Button>
            </div>
        </motion.div>
    );
}

export default Profile;