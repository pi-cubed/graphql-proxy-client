import { VALID, renderEquals } from './utils';

describe('ProxyProvider', () => {
  it('works', renderEquals(`query Q { ${VALID} }`, VALID)).timeout(5000);
});
