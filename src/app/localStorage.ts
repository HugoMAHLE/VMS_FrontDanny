export class LocalStorage {

  public static saveToLocalStorage(key: string, data: any): void {
    const storedData = this.getLocalStorageData(key) || [];
    storedData.push(data);
    localStorage.setItem(key, JSON.stringify(storedData));
  }

  public static getLocalStorageData(key: string): any[] | null {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  public static clearLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage
