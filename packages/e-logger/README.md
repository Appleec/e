# @elinzy/e-logger

## Install

```shell
npm install @elinzy/e-logger
```

## Usage

```js
import * as L from '@elinzy/e-logger'; // or, use '@elinzy/e-logger/compact' to replace

// compact
L.info('Item-1');
L.success('Item-1');
L.error('Item-1');
L.warn('Item-1');

// complex - suppurt `options` parameter
L.info({ timestamp: true }, 'Item-1');
L.success({ fit: true }, 'Item-1');
L.error({ chip: true, text: 'ERROR' }, 'Item-1');
L.warn({ fit: true, chip: true, text: 'WARNING' }, 'Item-1');
```

## API

### info(strings?, ...slots)

#### strings

- Type: `String|Object`
- Default: 

#### slots

- Type: `Array[]`
- Default: 

### success(strings?, ...slots)

### error(strings?, ...slots)

### warn(strings?, ...slots)

## License

[MIT]()

## Related
