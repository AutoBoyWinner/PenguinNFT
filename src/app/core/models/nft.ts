export interface NFT {
    id: string,
    nftName: string,
    creator: string,
    owner: string,
    category: string,
    royalty: number,
    description: string,
    sellType: string,
    price: number,
    logoImageName?: string,
    nftFileName?: string,
    logoImage?: File | null,
    nftFile?: File | null,
    countOfFavorites: number,
}
