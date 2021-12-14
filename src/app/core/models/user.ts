export interface User {
    id: number,
    userName: string,
    walletAddress: string,
    logoImageName: string,
    logoImage?: File | null,
    favoriteNFTs: string[],
}
