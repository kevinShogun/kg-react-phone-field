import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SelectPhoneNumber } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SelectPhoneNumber
        listOfProperties={['label']}
        defaultCountryNumber={505}
      />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
