/**
 * file that works with browser storage apis to get and set user locations and other user preferences
 */
export interface SyncStorage {
  userLocations?: UserLocationItems;
  isExtensionEnabled?: boolean;
}
export interface UserLocationItems extends Array<UserLocationItem> {}
export interface UserLocationItem {
  userLocation: string;
  locationTitle: string;
}

export type SyncStorageKeys = keyof SyncStorage;

export function setUserLocationsInStorage(
  userLocations: UserLocationItems
): Promise<void> {
  const vals: SyncStorage = {
    userLocations
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getUserLocationsInStorage(): Promise<UserLocationItems> {
  const keys: SyncStorageKeys[] = ['userLocations'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: SyncStorage) => {
      resolve(res.userLocations ?? []);
    });
  });
}
export function setIsExtensionEnabledInStorage(
  isExtensionEnabled: boolean
): Promise<void> {
  const vals: SyncStorage = {
    isExtensionEnabled
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
export function getIsExtensionEnabledInStorage(): Promise<boolean> {
  const key: SyncStorageKeys[] = ['isExtensionEnabled'];
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (res: SyncStorage) => {
      resolve(res.isExtensionEnabled ?? true);
    });
  });
}
