export function getFromLocalStorage(key) {
  if (!key) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
