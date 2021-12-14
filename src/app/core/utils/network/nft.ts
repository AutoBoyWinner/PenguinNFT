import { environment } from '../../../../environment';
import { NFT } from '../../models/nft';

export function uploadNft(token: string, nft: NFT) {
    if(nft.logoImage == null || nft.nftFile == null) {
        return;
    }
    const data = new FormData()
    data.append('id', (nft.id).toString());
    data.append( 'nftName', nft.nftName );
    data.append( 'creator', nft.creator );
    data.append( 'owner', nft.owner );
    data.append( 'category', nft.category );
    data.append( 'royalty', (nft.royalty).toString() );
    data.append( 'description', nft.description );
    data.append( 'price', (nft.price).toString() );
    data.append( 'logoImage', nft.logoImage );
    data.append( 'logoImage', nft.nftFile );
    return fetch(`${ environment.serverUrl }/nft/singleUpload`, {
        headers: {
            // 'Content-Type': 'application/json',
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: data,
    }).then(handleResponse)
}

export function getMaxId() {
    return fetch(`${ environment.serverUrl }/nft/id/getMaxId`, {
        headers: {
            'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}