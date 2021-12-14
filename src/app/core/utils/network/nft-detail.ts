import { environment } from '../../../../environment';
import { NFT } from '../../models/nft';

export function getNftById(id: string) {
    return fetch(`${ environment.serverUrl }/nft/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    }).then(handleResponse)
}

export function updateSellTypeOfNFT(id: string, sellType: string) {
    const data = { sellType: sellType };
    return fetch(`${ environment.serverUrl }/nft/sell-type/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

export function updatePriceOfNFT(id: string, sellType: string, price: number) {
    const data = { sellType: sellType, price: price };
    return fetch(`${ environment.serverUrl }/nft/update/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

export function updateOwnerOfNFT(id: string, owner: string) {
    const data = { owner: owner };
    return fetch(`${ environment.serverUrl }/nft/owner/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

export function addOrRemoveFavorite(nftId: number, walletAddress: string, status: boolean) {
    const data = {
        nftId: nftId,
        walletAddress: walletAddress,
        status: status,
    };
    return fetch(`${ environment.serverUrl }/nft/favorites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}