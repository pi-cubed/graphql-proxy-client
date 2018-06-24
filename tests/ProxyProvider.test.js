import { INVALID, renderEquals } from './utils';

describe('ProxyProvider', () => {
  it(
    'works',
    renderEquals(`query Q { ${INVALID} }`, `Action not found: ${INVALID}`)
  );
});
