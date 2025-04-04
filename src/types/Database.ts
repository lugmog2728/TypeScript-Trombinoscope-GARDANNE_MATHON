import {Person} from "./Person";
export const init = () => {
    const keys = {
        trombi: [
            { id: 'uuid', autoIncrement: true, unique: true },
            { id: 'name', unique: false },
            { id: 'photo', unique: false },
        ],
        person: [
            { id: 'uuid', autoIncrement: true, unique: true },
            { id: 'trombiID', unique: false },
            { id: 'name', unique: false },
            { id: 'photo', unique: false },
            { id: 'category', unique: false },
        ],
    };

    const request = indexedDB.open('data', 3);

    request.onerror = (event) => {
        console.error(`IndexedDB error: ${request.error}`, event);
    };

    request.onsuccess = () => {
        const db = request.result;
        console.log('Base ouverte avec succès');
    };

    request.onupgradeneeded = () => {
        console.log('Création de la base');
        const db = request.result;

        const stores = [
            { name: 'trombisStore', config: keys.trombi },
            { name: 'peoplesStore', config: keys.person },
        ];

        stores.forEach(({ name, config }) => {
            const store = db.createObjectStore(name, {
                keyPath: config[0].id,
                autoIncrement: config[0].autoIncrement,
            });

            config.forEach((field) => {
                // ne pas recréer l’index pour la clé primaire (déjà gérée par keyPath)
                if (field.id !== config[0].id) {
                    store.createIndex(field.id, field.id, { unique: field.unique ?? false });
                }
            });
        });
    };
};


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
                        if (element.id > max) max = element.id;
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
                    resolve(request.result as number); // ✅ Corrigé ici !
                };

                request.onerror = () => {
                    console.error('Erreur d’ajout :', request.error);
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

export const getElementsByField = <T>(store: string, field: string, value: any): Promise<T[]> => {
    const open = indexedDB.open('data');
    return new Promise<T[]>((resolve, reject) => {
        open.onerror = () => reject(open.error);

        open.onsuccess = () => {
            const db = open.result;
            if (![...db.objectStoreNames].includes(store)) {
                return reject(new Error(`Le store "${store}" n'existe pas.`));
            }

            const transaction = db.transaction(store, 'readonly');
            const objectStore = transaction.objectStore(store);

            let results: T[] = [];

            if (objectStore.indexNames.contains(field)) {
                const index = objectStore.index(field);
                const request = index.getAll(IDBKeyRange.only(value));

                request.onsuccess = () => {
                    results = request.result;
                    resolve(results);
                };

                request.onerror = () => reject(request.error);
            } else {
                // fallback : parcourir toutes les entrées (plus lent)
                const request = objectStore.openCursor();
                request.onsuccess = () => {
                    const cursor = request.result;
                    if (cursor) {
                        if (cursor.value[field] === value) {
                            results.push(cursor.value);
                        }
                        cursor.continue();
                    } else {
                        resolve(results);
                    }
                };
                request.onerror = () => reject(request.error);
            }

            transaction.oncomplete = () => db.close();
        };
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