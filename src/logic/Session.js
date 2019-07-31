const KEY = 'connected';

export function setStorage(data) {
  window.sessionStorage.setItem(KEY, JSON.stringify(data))
}

export function clearStorage() {
  window.sessionStorage.clear(KEY)
}

function getStorage() {
  try {
    const item = window.sessionStorage.getItem(KEY);
    return JSON.parse(item);
  } catch (e) {
    return false;
  }
}

export function userExists() {
  const user = getStorage();
  return !!user;
}

export function getUser() {
  return getStorage();
}