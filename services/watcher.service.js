import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const WATCHER_KEY = 'watchersDB';
_createWatchers();

export const watcherService = {
  query,
  get,
  remove,
  save,
};

function query() {
  return storageService.query(WATCHER_KEY);
}

function get(watcherId) {
  return storageService.get(WATCHER_KEY, watcherId).then(watcher => {
    watcher = _setNextPrevCarId(watcher);
    return watcher;
  });
}

function remove(watcherId) {
  return storageService.remove(WATCHER_KEY, watcherId);
}

function save(watcher) {
  if (watcher.id) {
    return storageService.put(WATCHER_KEY, watcher);
  } else {
    return storageService.post(WATCHER_KEY, watcher);
  }
}

function _createWatchers() {
  let watchers = utilService.loadFromStorage(WATCHER_KEY);
  if (!watchers || !watchers.length) {
    watchers = [];
    const names = ['Puki Ba', 'Muki Da', 'Shuki Sa'];

    names.forEach(username => {
      watchers.push(_createWatcher(username));
    });
    utilService.saveToStorage(WATCHER_KEY, watchers);
  }
}

function _createWatcher(username) {
  const movies = [
    'Rocky',
    'Rambo',
    'Expendables',
    'Samaritan',
    'Creed',
    'Armor',
  ];
  const watcher = { fullname: username };
  watcher.id = utilService.makeId();
  watcher.movies = utilService.getRandomElements(movies, 3);
  return watcher;
}

function _setNextPrevCarId(watcher) {
  return storageService.query(WATCHER_KEY).then(watchers => {
    const carIdx = watchers.findIndex(currCar => currCar.id === watcher.id);
    const nextCar = watchers[carIdx + 1] ? watchers[carIdx + 1] : watchers[0];
    const prevCar = watchers[carIdx - 1]
      ? watchers[carIdx - 1]
      : watchers[watchers.length - 1];
    watcher.nextCarId = nextCar.id;
    watcher.prevCarId = prevCar.id;
    return watcher;
  });
}
