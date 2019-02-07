import VanillaThingsList from './vanilla';
import React from 'react';
import ReactDOM from 'react-dom';

describe('ThingsList', () => {
  beforeEach(() => {
  });

  describe('Vanilla', () => {
    it('renders', () => {
      ReactDOM.render(
        <VanillaThingsList />,
        document.body
      )
    });
  });
});