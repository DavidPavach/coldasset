//Component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UserProfile({ user }: { user: UserData }) {
    return (
        <Card className="shadow-sm border-border">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl xl:text-3xl">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Username</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg capitalize montserrat">{user.userName}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Email</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.email}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Password</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.decryptedPassword}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Country</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.country}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Phone Number</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.phoneNumber}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Gender</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg capitalize montserrat">{user.gender || "Not specified"}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Account ID</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.accountId}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Address</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.address || "Not provided"}</p>
                    </div>
                </div>

                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Deposit Message</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.message || "No custom message yet"}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Passcode</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.passcode || "No Pin Yet"}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Minimum Transfer</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.minimumTransfer || "No stipulated amount"}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Passphrase</Label>
                        <p className="font-medium text-sm md:text-base xl:text-lg montserrat">{user.passPhrase.join(" ")}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}