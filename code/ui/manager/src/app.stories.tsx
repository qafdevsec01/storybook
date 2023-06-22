import React from 'react';

import type { API } from '@storybook/manager-api';
import { Consumer, Provider as ManagerProvider } from '@storybook/manager-api';
import { BaseLocationProvider } from '@storybook/router';
import { HelmetProvider } from 'react-helmet-async';
import { styled } from '@storybook/theming';
import App from './app';
import { PrettyFakeProvider, FakeProvider } from './FakeProvider';

export default {
  component: App,
  parameters: {
    layout: 'fullscreen',
    theme: 'light',
    viewport: {
      viewports: {
        tablet: {
          name: 'Tablet',
          styles: {
            height: '1112px',
            width: '834px',
          },
          type: 'tablet',
        },
      },
      defaultViewport: 'tablet',
      defaultOrientation: 'landscape',
    },
    chromatic: { viewports: [1112] },
  },
  decorators: [
    (StoryFn: any) => (
      <HelmetProvider key="helmet.Provider">
        <BaseLocationProvider location="/?path=/story/my-id" navigator={{} as any}>
          <Background>
            <StoryFn />
          </Background>
        </BaseLocationProvider>
      </HelmetProvider>
    ),
  ],
};

const Background = styled.div(
  {
    position: 'relative',
    minHeight: '100vh',
    height: '100vw',
  },
  ({ theme }) => ({
    background: theme.background.app,
    color: theme.color.defaultText,
  })
);

function setPreviewInitialized({ api }: { api: API }) {
  api.setPreviewInitialized();
  return {};
}

export const Default = () => {
  const provider = new FakeProvider();
  return (
    <ManagerProvider
      key="manager"
      provider={provider}
      path="/story/ui-app--loading-state"
      storyId="ui-app--loading-state"
      location={{ search: '' }}
      navigate={() => {}}
      docsOptions={{ docsMode: false }}
    >
      <Consumer filter={setPreviewInitialized}>{() => <></>}</Consumer>
      <App
        key="app"
        viewMode="story"
        layout={{
          initialActive: 'sidebar',
          isFullscreen: false,
          showToolbar: true,
          panelPosition: 'right',
          showNav: true,
          showPanel: true,
          showTabs: true,
        }}
        mains={[]}
        panelCount={0}
      />
    </ManagerProvider>
  );
};

export const LoadingState = () => (
  <ManagerProvider
    key="manager"
    provider={new PrettyFakeProvider()}
    path=""
    storyId="ui-app--loading-state"
    location={{ search: '' }}
    navigate={() => {}}
    docsOptions={{ docsMode: false }}
  >
    <App
      key="app"
      viewMode="story"
      layout={{
        initialActive: 'sidebar',
        isFullscreen: false,
        showToolbar: true,
        panelPosition: 'right',
        showNav: true,
        showPanel: true,
        showTabs: true,
      }}
      mains={[]}
      panelCount={0}
    />
  </ManagerProvider>
);

export const Dark = () => LoadingState();
Dark.parameters = {
  theme: 'dark',
};
export const Mobile = () => LoadingState();
Mobile.parameters = {
  theme: 'light',
  viewport: {
    viewports: {
      mobile1: {
        name: 'Small mobile',
        styles: {
          height: '568px',
          width: '320px',
        },
        type: 'mobile',
      },
    },
    defaultViewport: 'mobile1',
    defaultOrientation: 'portrait',
  },
  chromatic: { viewports: [320] },
};
