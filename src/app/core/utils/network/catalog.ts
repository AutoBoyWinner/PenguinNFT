import { environment } from '../../../../environment';
import { Filter } from '../../models/filter';

export function getMarketPlaceItems(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/penguin/getMarketPlaceItems`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyPenguinsNoListed(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/penguin/getMyPenguinsNoListed`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMintedPenguins(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/penguin/getMintedPenguins`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyPenguinsOnSale(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/penguin/getMyPenguinsOnSale`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

export function getMyPenguins(filterData: Filter) {
    return fetch(`${ environment.serverUrl }/penguin/getMyPenguins`, {
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(filterData),
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}