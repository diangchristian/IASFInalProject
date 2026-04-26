
export const getTokenFromLocalStorage = (): string | null => {
    const storage = localStorage.getItem('auth-storage');

    if(storage){
        const parsedStorage = JSON.parse(storage);
        return parsedStorage.state.token; 
    }

    return null;
}

