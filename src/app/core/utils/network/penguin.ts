import {environment} from "../../../../environment";

export function mintEvent() {
    return fetch(`${ environment.serverUrl }/penguin/mintEvent`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
}

export function uploadPenguin(penguin: any) {
    if(penguin === undefined) {
        return;
    }
    return fetch(`${ environment.serverUrl }/penguin/penguinUpload`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(penguin),
    }).then(handleResponse)
}

export function createCollections() {
    return fetch(`${ environment.serverUrl }/penguin/createCollections`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }).then(handleResponse)
}

export function getPenguinNotMinted() {
    return fetch(`${ environment.serverUrl }/penguin/getPenguinNotMinted`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }).then(handleResponse)
}

export function clearMinted() {
    return fetch(`${ environment.serverUrl }/penguin/clearMinted`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }).then(handleResponse)
}

export function getMultiPenguinNotMinted(size: number) {
    const data = { size: size };
    return fetch(`${ environment.serverUrl }/penguin/getMultiPenguinNotMinted`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

export function getMintedCount() {
    return fetch(`${ environment.serverUrl }/penguin/getMintedCount`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    }).then(handleResponse)
}

export function getPenguinByID(dbIndex: number) {
    if(dbIndex < 0) {
        return;
    }
    const data = {id: dbIndex};
    return fetch(`${ environment.serverUrl }/penguin/getPenguinByID`, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(handleResponse)
}

function handleResponse(response: any) {
    return response.json();
}