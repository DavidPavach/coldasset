import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_admin/users";

// Hooks
import { useAdminGetFullUser } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "./UserProfile";

// Icons
import { Loader2 } from "lucide-react";
import { formatDate } from "@/utils/format";
import UserBalance from "./UserBalance";
import Transaction from "./Transaction";
import { KYCSection } from "./KycSection";
import { UserSettings } from "./UserSettings";

const Profile = ({ accountId }: { accountId: string }) => {

    const navigate = useNavigate({ from: Route.fullPath });
    const { data, isLoading, isFetching, isError, refetch } = useAdminGetFullUser(accountId, "true");

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Profile</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const user = data?.data;
    if (!user) return null;

    // Functions
    const closeProfile = () => {
        navigate({
            search: (prev) => ({
                ...prev,
                profile: undefined
            })
        })
    }

    const getStatusBadge = (isVerified?: boolean, isSuspended?: boolean) => {
        if (isSuspended) {
            return <Badge className="bg-destructive text-red-100">Suspended</Badge>
        }
        if (isVerified) {
            return <Badge className="bg-green-100 text-green-800">Verified</Badge>
        }
        return <Badge className="bg-primary/20 text-primary">Unverified</Badge>
    }

    return (
        <main className="space-y-6">
            <Badge onClick={closeProfile} variant="destructive" className="cursor-pointer">Close Profile</Badge>
            <Card>
                <CardHeader className="border-border border-b">
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <Avatar className="border border-border size-12 md:size-14 xl:size-16">
                            <AvatarImage src={user.profilePicture} alt={user.userName} />
                            <AvatarFallback className="bg-primary/20 text-primary text-lg">
                                {user.userName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                                <div>
                                    <h2 className="font-bold text-base md:text-lg xl:text-xl capitalize">{user.userName}</h2>
                                    <p>{user.email}</p>
                                    <p>Account ID: {user.accountId}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {getStatusBadge(user.isVerified, user.isSuspended)}
                                    {user.kyc && (
                                        <Badge
                                            className={
                                                user.kyc.status === "accepted"
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : user.kyc.status === "rejected"
                                                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                                                        : "bg-primary/20 text-primary hover:bg-primary/20"
                                            }>
                                            KYC {user.kyc.status}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        <div>
                            <p>Member Since</p>
                            <p className="font-medium text-foreground text-sm md:text-base xl:text-lg">{formatDate(user.createdAt)}</p>
                        </div>
                        <div>
                            <p>Last Session</p>
                            <p className="font-medium text-foreground text-sm md:text-base xl:text-lg">
                                {user.lastSession ? formatDate(user.lastSession) : "Date Unavailable"}
                            </p>
                        </div>
                        <div>
                            <p>Country</p>
                            <p className="font-medium text-foreground text-sm md:text-base xl:text-lg">{user.country}</p>
                        </div>
                        <div>
                            <p>Phone</p>
                            <p className="font-medium text-foreground text-sm md:text-base xl:text-lg">{user.phoneNumber}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="balance">Balance</TabsTrigger>
                    <TabsTrigger value="transactions">Trans.</TabsTrigger>
                    <TabsTrigger value="kyc">KYC</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <UserProfile user={user} />
                </TabsContent>

                <TabsContent value="balance" className="mt-6">
                    <UserBalance userId={user._id} />
                </TabsContent>

                <TabsContent value="transactions" className="mt-6 p-2">
                    <Transaction userId={user._id} userName={user.userName} />
                </TabsContent>

                <TabsContent value="kyc" className="mt-6">
                    <KYCSection kyc={user.kyc} />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <UserSettings email={user.email} userName={user.userName} message={user.message ?? ""} currentMinimumTransfer={user.minimumTransfer} />
                </TabsContent>
            </Tabs>
        </main>
    );
}

export default Profile;