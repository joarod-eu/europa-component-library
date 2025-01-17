import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';

import demoContent from '@ecl/specs-component-page-header/demo/data';
import demoBreadcrumbLong from '@ecl/specs-component-breadcrumb/demo/data--long';

import pageHeader from './page-header.html.twig';
import notes from './README.md';

const getArgs = (data) => {
  const args = {
    show_breadcrumb: true,
    show_thumbnail: false,
    hide_title: false,
  };

  if (data.title) {
    args.title = data.title;
  }
  if (data.meta) {
    args.meta = data.meta;
  }
  if (data.description) {
    args.description = data.description;
  }
  if (data.picture_background.img.src) {
    args.background_image_url = data.picture_background.img.src;
  }

  return args;
};

const getArgTypes = (data) => {
  const argTypes = {};

  argTypes.show_breadcrumb = {
    name: 'breadcrumb',
    type: 'boolean',
    description: 'Toggle breadcrumb visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
      category: 'Optional',
    },
  };

  argTypes.show_thumbnail = {
    name: 'thumbnail',
    type: 'boolean',
    description: 'Toggle thumbnail visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
      category: 'Optional',
    },
  };

  argTypes.title = {
    type: { name: 'string', required: true },
    description: 'The page title',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Content',
    },
  };

  argTypes.hide_title = {
    name: 'hide title',
    type: 'boolean',
    description: 'Toggle title visibility, for screen reader only',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
      category: 'Optional',
    },
  };

  if (data.description) {
    argTypes.description = {
      type: 'string',
      description: 'The page introduction',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    };
  }

  if (data.meta) {
    argTypes.meta = {
      type: 'array',
      description: 'The page meta',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
        category: 'Content',
      },
    };
  }

  if (data.picture_background.img.src) {
    argTypes.background_image_url = {
      name: 'background image',
      type: 'string',
      description: 'The background image url',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    };
  }

  return argTypes;
};

const prepareData = (data, args) => {
  const clone = JSON.parse(JSON.stringify(data));

  if (!args.show_breadcrumb) {
    delete clone.breadcrumb;
  } else if (args.show_breadcrumb) {
    clone.breadcrumb = { ...demoBreadcrumbLong };
  }
  if (!args.show_thumbnail) {
    delete clone.picture_thumbnail;
  } else if (args.show_thumbnail && !clone.show_thumbnail) {
    clone.picture_thumbnail = demoContent.picture_thumbnail;
  }

  clone.title = args.title;
  clone.hide_title = args.hide_title;
  clone.description = args.description;
  clone.meta = args.meta;

  if (args.background_image_url) {
    clone.picture_background = {
      img: {
        src: args.background_image_url,
        alt: clone.picture_background.img.alt || '',
      },
    };
  } else {
    clone.picture_background = {};
  }

  correctPaths(clone);

  return clone;
};

export default {
  title: 'Components/Site-wide/Page headers',
  decorators: [withNotes, withCode],
  parameters: { layout: 'fullscreen' },
};

export const Default = (_, { loaded: { component } }) => component;

Default.render = async (args) => {
  const renderedCore = await pageHeader(prepareData(demoContent, args));
  return renderedCore;
};
Default.storyName = 'default';
Default.args = getArgs(demoContent);
Default.argTypes = getArgTypes(demoContent);
Default.parameters = {
  notes: { markdown: notes, json: demoContent },
};
