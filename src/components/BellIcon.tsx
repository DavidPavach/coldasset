import { useState, } from 'react';
import { AnimatePresence, motion } from "framer-motion";

//Stores and Utils
import { useNotificationStore } from '@/stores/notification.store';
import { formatDate } from '@/utils/format';

//Components
import { Badge } from './ui/badge';

//Icons
import { Clock, MoneyRecive, MoneySend, NotificationBing, Setting2 } from 'iconsax-reactjs';
import { AlertTriangle, DollarSign, Info, X } from 'lucide-react';


export const BellIcon = () => {

    const [open, isOpen] = useState<boolean>(false);

    const { notifications, clearNotification } = useNotificationStore();

    const getNotificationIcon = (type: string, subtype?: string) => {
        switch (type.toLowerCase()) {
            case "transaction":
                switch (subtype?.toLowerCase()) {
                    case "debit":
                        return <MoneySend className="size-5 text-destructive" />
                    case "credit":
                        return <MoneyRecive className="size-5 text-green-600 dark:text-green-400" />
                    default:
                        return <DollarSign className="size-5 text-green-600 dark:text-green-400" />
                }
            case "system":
                return <Setting2 className="size-5 text-primary" />
            case "alert":
                return <AlertTriangle className="size-5 text-yellow-600 dark:text-yellow-400" />
            default:
                return <Info className="size-5 text-yellow-600 dark:text-yellow-400" />
        }
    }

    const getNotificationPriority = (type: string) => {
        if (type === "alert") return "high"
        if (type === "transaction") return "medium"
        return "low"
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "border-l-destructive"
            case "medium":
                return "border-l-yellow-500"
            default:
                return "border-l-primary"
        }
    }

    //Functions
    const toggleOpen = () => isOpen((prev) => !prev);

    return (
        <div className="relative">
            <button className="relative" onClick={toggleOpen}>
                <NotificationBing variant='Bold' className={`text-foreground size-5 md:size-6 xl:size-6 cursor-pointer ${notifications.length > 0 && "animate-shake"}`} />
                {notifications.length > 0 && (
                    <span className="-top-1 -right-1 absolute bg-destructive px-1 rounded-full text-xs">
                        {notifications.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="top-full -right-20 z-20 absolute bg-white dark:bg-black shadow-lg mt-2 p-4 lg:py-4 border border-border rounded-xl w-80 sm:w-96 md:w-md">

                        <h4 className="mb-4 font-bold text-base md:text-lg xl:text-xl">Notifications <sup><Badge className='rounded-2xl font-medium' variant="destructive">{notifications.length}</Badge></sup></h4>
                        {notifications.length === 0 ? (
                            <p className='text-muted-foreground'>No new notifications</p>
                        ) : (
                            <ul className="space-y-2 max-h-[75vh] overflow-y-auto">
                                {notifications.map((n) => {

                                    const priority = getNotificationPriority(n.type)
                                    const priorityColor = getPriorityColor(priority)
                                    const Icon = getNotificationIcon(n.type, n.subtype)

                                    return (
                                        <motion.li key={n._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className={`relative flex items-start gap-3 px-3 py-4 border-l-4 border rounded-md ${priorityColor}`}>
                                            <div className="pt-1 shrink-0">
                                                {Icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-sm md:text-base xl:text-lg capitalize">{n.title}</p>
                                                    <div className='flex items-center gap-x-0.5'>
                                                        <Clock className="size-3" />
                                                        <p className="text-[11px] md:text-xs xl:text-sm">{formatDate(n.createdAt)}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-sm">{n.message}</p>
                                            </div>
                                            <button onClick={() => clearNotification(n._id)} className="top-2 right-2 absolute text-muted-foreground hover:text-destructive duration-200">
                                                <X size={14} />
                                            </button>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
