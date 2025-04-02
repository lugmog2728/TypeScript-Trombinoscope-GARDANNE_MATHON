import {Person} from "./Person";
export const init = ()=> {
    let db!: IDBDatabase;

    const keys = {
        trombi: [{id: 'uuid', unique: true,autoIncrement: true},{id: 'name'},{id: 'photo'}],
        person: [{id: 'uuid', unique: true,autoIncrement: true},{id: 'trombiID'},{id: 'name'},{id: 'photo'},{id: 'category'}],
    };
    const request = indexedDB.open('data', 3);
    request.onerror = (err) => console.error(`IndexedDB error: ${request.error}`, err);
    request.onsuccess = () => (db = request.result);
    request.onupgradeneeded = () => {
        console.log('Création de la base');
        const db = request.result;
        const postsStore = db.createObjectStore('trombisStore', {keyPath: keys.trombi[0].id});
        const projectsStore = db.createObjectStore('peoplesStore', {keyPath: keys.person[0].id});
        keys.trombi.forEach((key) => postsStore.createIndex(key.id, key.id, {unique: key.unique}));
        keys.person.forEach((key) => projectsStore.createIndex(key.id, key.id, {unique: key.unique}));
    };

}

export const getElement = <T>(store: string, key: string) => {
    const open = indexedDB.open('data');
    return new Promise<T>((resolve, reject) => {
        open.onsuccess = () => {
            let request!: IDBRequest;
            let db = open.result;
            if ([...db.objectStoreNames].find((name) => name === store)) {
                const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);
                if (key === 'all') request = objectStore.getAll();
                else request = objectStore.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                transaction.oncomplete = () => db.close();
            } else {
                alert('Un problème est survenue avec la base de données.')
            }
        };
    });
};

export const getMaxId = (store: string): Promise<number> => {
    const open = indexedDB.open('data');
    return new Promise<number>((resolve, reject) => {
        open.onsuccess = () => {
            let request: IDBRequest;
            let db = open.result;
            if ([...db.objectStoreNames].find((name) => name === store)) {
                const transaction = db.transaction(store, 'readwrite');
                const objectStore = transaction.objectStore(store);
                request = objectStore.getAll();
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    let max = 0
                    request.result.forEach((element: any) => {
                        if (element.uuid > max) max = element.uuid;
                    })
                    resolve(max);
                };
                transaction.oncomplete = (e) => {db.close()};
            } else {
                alert('ERREUR')
            }
        };
    });
};


export const addElement = (store: string, payload: object): Promise<number> => {
    return new Promise((resolve, reject) => {
        const open = indexedDB.open('data');

        open.onsuccess = () => {
            let db = open.result;
            if ([...db.objectStoreNames].includes(store)) {
                const transaction = db.transaction(store, 'readwrite');
                const objectStore = transaction.objectStore(store);
                const serialized = JSON.parse(JSON.stringify(payload));
                const request = objectStore.add(serialized);

                request.onsuccess = () => {
                    console.log('Ajout réussi avec UUID:', request.result);
                    return(request.result); // Retourne l'ID généré
                };

                request.onerror = () => {
                    console.error(request.error);
                    reject(request.error);
                };

                transaction.oncomplete = () => db.close();
            } else {
                reject(new Error('Le store spécifié n\'existe pas'));
            }
        };

        open.onerror = () => reject(open.error);
    });
};


export const editElement = <T>(store: string, key: string, payload: object) => {
    const open = indexedDB.open('data');
    return new Promise<T>((resolve, reject) => {
        open.onsuccess = () => {
            let request: IDBRequest;
            let db = open.result;
            if ([...db.objectStoreNames].find((name) => name === store)) {
                const transaction = db.transaction(store, 'readwrite');
                const objectStore = transaction.objectStore(store);
                if (key === 'all') request = objectStore.getAll();
                else request = objectStore.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    const serialized = JSON.parse(JSON.stringify(payload));
                    const updateRequest = objectStore.put(serialized);
                    updateRequest.onsuccess = () => resolve(request.result);
                };
                transaction.oncomplete = () => db.close();
            } else {
                indexedDB.deleteDatabase('data');
            }
        };
    });
};
export const removeElement = (store: string, key: number) => {
    const open = indexedDB.open('data');
    open.onsuccess = () => {
        let request: IDBRequest;
        let db = open.result;
        if ([...db.objectStoreNames].find((name) => name === store)) {
            const transaction = db.transaction(store, 'readwrite');
            const objectStore = transaction.objectStore(store);
            request = objectStore.delete(key);
            request.onerror = () => console.error(request.error);
            transaction.oncomplete = () => db.close();
        } else {
            indexedDB.deleteDatabase('data');
        }
    };
};