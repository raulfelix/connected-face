const KEY = 'token';

export function setStorage(data) {
  window.sessionStorage.setItem(KEY, JSON.stringify(data))
}

export function clearStorage() {
  window.sessionStorage.clear(KEY)
}

function getStorage() {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch (e) {
    return false;
  }
}

export function userExists() {
  const token = getStorage();
  return !!token;
}

export function getUser() {
  return getStorage();
}