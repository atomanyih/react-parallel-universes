import VanillaThingsList from './Vanilla';
import ContainerViewThingsList from './ContainerView';
import HooksThingsList from './Hooks';

import React from 'react';
import {render} from 'react-testing-library'

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
        const fetch = () => Promise.resolve([]);


        const rendered = render(
          <Component {...{fetch}}/>
        );

        await fetch();

        expect(rendered.container.textContent).toContain('No things');
      });
    });

    describe('when there are things', () => {
      it('shows names of things', async () => {
        const fetch = () => Promise.resolve([
          {name: 'thing 1'},
          {name: 'thing 2'},
        ]);


        const rendered = render(
          <Component {...{fetch}}/>
        );

        await fetch();

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