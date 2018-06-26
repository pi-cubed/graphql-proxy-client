import { VALID, INVALID, renderEquals, dataEquals, errorEquals } from './utils';
import https from 'https';

describe('Action', () => {
  before(done => https.get('https://proxy-graphql.herokuapp.com', () => done()));
  
  it(
    'renders data from a valid query',
    renderEquals(`query Q { ${VALID} }`, VALID)
  ).timeout(5000);
  it(
    'calls onLoad from an valid query',
    dataEquals(`query Q { ${VALID} }`, VALID)
  );
  it(
    'renders data from a valid mutation',
    renderEquals(`mutation Q { ${VALID} }`, VALID)
  );
  it(
    'calls onLoad from a valid mutation',
    dataEquals(`mutation Q { ${VALID} }`, VALID)
  );
  it(
    'renders errors from an invalid query',
    renderEquals(`query Q { ${INVALID} }`, `Action not found: ${INVALID}`)
  );
  it(
    'calls onError from an invalid query',
    errorEquals(`query Q { ${INVALID} }`, `Action not found: ${INVALID}`)
  );
  it(
    'renders errors from an invalid mutation',
    renderEquals(`mutation Q { ${INVALID} }`, `Action not found: ${INVALID}`)
  );
  it(
    'calls onError from an invalid mutation',
    errorEquals(`mutation Q { ${INVALID} }`, `Action not found: ${INVALID}`)
  );
});
