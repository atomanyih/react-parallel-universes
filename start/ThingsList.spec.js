import VanillaThingsList from './Vanilla';
import ContainerViewThingsList from './ContainerView';
import HooksThingsList from './Hooks';

import React from 'react';
import {act, render} from 'react-testing-library'

const createAsyncMock = () => {
  let resolvePromise, rejectPromise;

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  return {
    resolve(val) {
      resolvePromise(val);

      return promise;
    },
    reject(val) {
      rejectPromise(val);

      return promise;
    },
    mock: jest.fn().mockReturnValue(promise)
  }
};

describe('ThingsList', () => {
  const itBehavesLikeAThingsList = Component => {
    describe('while loading things', () => {
      it('shows loading state', () => {
        const fetch = () => new Promise(() => {});

        const rendered = render(
          <Component {...{fetch}}/>
        );

        expect(rendered.container.textContent).toContain('Loading things');
      });
    });

    describe('when there are no things', () => {
      it('shows no things', async () => {
        const {mock, resolve} = createAsyncMock();


        const rendered = render(
          <Component {...{fetch: mock}}/>
        );

        await resolve([]);

        expect(rendered.container.textContent).toContain('No things');
      });
    });

    describe('when there are things', () => {
      it('shows names of things', async () => {
        const {mock, resolve} = createAsyncMock();


        const rendered = render(
          <Component {...{fetch: mock}}/>
        );

        await resolve([
          {name: 'thing 1'},
          {name: 'thing 2'},
        ]);

        expect(rendered.container.textContent).toContain('thing 1');
        expect(rendered.container.textContent).toContain('thing 2');
      });
    })

    // shared examples are bad mmkay
  };

  describe('Vanilla', () => {
    itBehavesLikeAThingsList(VanillaThingsList);
  });

  describe('ContainerView', () => {
    itBehavesLikeAThingsList(ContainerViewThingsList);
  });

  describe('Hooks', () => {
    itBehavesLikeAThingsList(HooksThingsList);
  });
});