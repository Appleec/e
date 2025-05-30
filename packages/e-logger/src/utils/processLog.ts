import c from 'ansis';
// import { paint } from './paint';

export function paintSlot(slot) {
  if (!slot) return '';
  if (Array.isArray(slot)) {
    return slot
      .map((eachArrItem) => {
        switch (typeof eachArrItem) {
          case 'string':
            return `'${c.yellow(eachArrItem)}'`;
          case 'number':
          case 'boolean':
            return c.blue(eachArrItem);
          default:
            return eachArrItem;
        }
      })
      .join(c.gray(', '));
  } else {
    return slot;
  }
}

export function processLog(strings, slots) {
  let message = '';

  if (Array.isArray(strings)) {
    for (let i = 0; i < strings.length; i++) {
      message += paintSlot(strings[i]) + paintSlot(slots[i])
    }
  } else {
    message = [strings, ...slots]
      .filter(Boolean)
      .map((eachStr) => paintSlot(eachStr))
      .join(' ')
  }

  // return paint(message);
  return message;
}
