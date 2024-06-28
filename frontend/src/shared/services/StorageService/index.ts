export const enum STORAGE_KEYS {
    REFRESH_TOKEN = 'refresh_token',
    TOKEN = 'access_token',
    USER = 'user',
}

class StorageService {
    public readonly VERSION = '1.0.0-SNAPSHOT';
    public setToken = (token: string): void => {
        window.localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    };

    public setRefreshToken = (token: string): void => {
        window.localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    };

    public deleteToken = (): void => {
        window.localStorage.removeItem(STORAGE_KEYS.TOKEN);
    };

    public getToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(STORAGE_KEYS.TOKEN);
        }
        return null;
    };

    public getRefreshToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        }
        return null;
    };

    public clear = (): void => {
        window.localStorage.clear();
    };
}

export const STORAGE = new StorageService();
