import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
};
export default config;
