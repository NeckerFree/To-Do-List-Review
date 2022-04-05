/**
 * Class to access Local Storage
 */
const STORAGE_TYPE = 'localStorage';
export default class Storage {
    #jsonItems;

    #itemName;

    #itemsCollection = [];

    constructor(itemName) {
      this.#itemName = itemName;
    }

    getItemStorage=() => {
      this.#jsonItems = localStorage.getItem(this.#itemName);
      return (this.#jsonItems === null) ? null : JSON.parse(this.#jsonItems);
    }

    addItemStorage=(objectItem) => {
      this.#itemsCollection = this.getItemStorage();
      if (this.#itemsCollection === null) {
        this.#itemsCollection = [];
      }
      this.#itemsCollection.push(objectItem);
      this.#jsonItems = JSON.stringify(this.#itemsCollection);
      localStorage.setItem(this.#itemName, this.#jsonItems);
    }

    setCollectionStorage=(collection) => {
      this.#jsonItems = JSON.stringify(collection);
      localStorage.setItem(this.#itemName, this.#jsonItems);
    }

    updateItemStorage=(jsonItemsResult) => {
      if (jsonItemsResult.length === 0) {
        localStorage.removeItem(this.#itemName);
      } else {
        this.#jsonItems = JSON.stringify(jsonItemsResult);
        localStorage.setItem(this.#itemName, this.#jsonItems);
      }
    }

    storageAvailable=() => {
      let storage;
      try {
        storage = window[STORAGE_TYPE];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return e instanceof DOMException && (
          e.code === 22
          || e.code === 1014
          || e.name === 'QuotaExceededError'
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
          && (storage && storage.length !== 0);
      }
    }
}
