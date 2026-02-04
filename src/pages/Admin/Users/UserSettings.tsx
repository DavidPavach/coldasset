import { useState } from "react";
import { toast } from "react-fox-toast";

//Services and Hooks
import { useAdminUpdateUser } from "@/services/mutations.service";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//Icons
import { Save, Eye, EyeClosed } from "lucide-react";

interface UserSettingsProps {
    email: string;
    userName: string;
    message?: string;
    currentMinimumTransfer: number | null;
}

export function UserSettings({ email, userName, message, currentMinimumTransfer }: UserSettingsProps) {

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        message: message || "",
        minimumTransfer: currentMinimumTransfer?.toString() || "",
        passcode: "",
        confirmPasscode: "",
    })

    const [see, setSee] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const resetForm = () => {
        setIsLoading((prev) => !prev);
        setFormData({
            password: "",
            confirmPassword: "",
            message: message || "",
            minimumTransfer: currentMinimumTransfer?.toString() || "",
            passcode: "",
            confirmPasscode: "",
        })
    }

    const patchUser = useAdminUpdateUser();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Validation
        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (formData.passcode && formData.passcode !== formData.confirmPasscode) {
            toast.error("Passcode do not match")
            setIsLoading(false)
            return
        }

        const filteredData = Object.fromEntries(
            Object.entries({
                password: formData.password,
                message: formData.message,
                minimumTransfer: formData.minimumTransfer,
                passcode: formData.passcode,
            }).filter(([_, value]) => value !== "")
        );

        // Handle form submission
        patchUser.mutate({ ...filteredData, email }, {
            onSuccess: (response) => {
                toast.success(response.data.message || `${userName} profile was updated successfully!`);
                resetForm();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update ${userName} profile, kindly try again.`;
                toast.error(message);
                resetForm();
            }
        })
    }

    return (
        <Card className="shadow-sm border-border">
            <CardHeader>
                <CardTitle className="font-medium text-sm md:text-base xl:text-lg">User Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-4">
                        <h3 className="font-medium text-sm md:text-base xl:text-lg">Password Settings</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type={see ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter new password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type={see ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm new password" />
                            </div>
                            <div className="flex justify-end cursor-pointer">
                                {see ? <Eye onClick={() => setSee(!see)} size={18} /> : <EyeClosed onClick={() => setSee(!see)} size={18} />}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-sm md:text-base xl:text-lg">Passcode</h3>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="passcode">New Passcode</Label>
                                <Input id="passcode" type="text" maxLength={6} value={formData.passcode} onChange={(e) => setFormData({ ...formData, passcode: e.target.value })} placeholder="Enter 6 digit passcode" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPasscode">Confirm Passcode</Label>
                                <Input id="confirmPasscode" type="text" maxLength={6} value={formData.confirmPasscode} onChange={(e) => setFormData({ ...formData, confirmPasscode: e.target.value })} placeholder="Confirm passcode" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-sm md:text-base xl:text-lg">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="message">Deposit Message</Label>
                                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Enter custom deposit message for user" rows={3} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minimumTransfer">Minimum Transfer Amount ($)</Label>
                                <Input id="minimumTransfer" type="number" min="0" step="0.01" value={formData.minimumTransfer} onChange={(e) => setFormData({ ...formData, minimumTransfer: e.target.value })} placeholder="Enter minimum transfer amount"
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-black">
                        <Save className="mr-2 w-4 h-4" />
                        {isLoading ? "Updating..." : "Update Settings"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
