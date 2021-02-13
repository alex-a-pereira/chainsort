export const getNestedValue = (obj, keyString = '') => {
  const keys = keyString.split('.');

  let val = { ...obj };
  for(const k of keys) {
    let v = val[k];
    if(typeof v === 'undefined') { return v; } // key doesn't exist, return undefined
    val = v; // move one level deeper for next iteration
  }

  return val;
};
