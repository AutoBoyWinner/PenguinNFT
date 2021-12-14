import { Penguin } from "./penguin";

export interface Filter {
    penguin?: Penguin,
    walletAddress?: string,
    offset: number,
    limit: number,
}
