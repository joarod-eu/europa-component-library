import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';

// Import data for demos
import bannerDataPlainBackground from '@ecl/specs-component-banner/demo/data--plain-background';
import bannerDataTextBox from '@ecl/specs-component-banner/demo/data--text-box';
import bannerDataImageOverlay from '@ecl/specs-component-banner/demo/data--image-overlay';
import bannerDataTextHighlight from '@ecl/specs-component-banner/demo/data--text-highlight';
import banner from './banner.html.twig';
import notes from './README.md';

const cta = { ...bannerDataPlainBackground.link };
const getArgs = (data) => {
  const args = {
    show_title: true,
    show_description: true,
    show_button: true,
    size: 'm',
    title: data.title,
    description: data.description,
    label: data.link.link.label,
    centered: data.centered,
    width: 'outside',
    gridContent: false,
  };
  if (data.image) {
    args.image = data.image || '';
  }
  if (data.credit) {
    args.show_credit = true;
    args.credit = data.credit || '';
  }

  return args;
};

const getArgTypes = (data) => {
  const argTypes = {
    show_title: {
      name: 'title',
      type: { name: 'boolean' },
      description: 'Show the title',
      table: {
        category: 'Optional',
      },
    },
    show_description: {
      name: 'description',
      type: { name: 'boolean' },
      description: 'Show the description',
      table: {
        category: 'Optional',
      },
    },
    show_button: {
      name: 'button',
      type: { name: 'boolean' },
      description: 'Show the cta button',
      table: {
        category: 'Optional',
      },
    },

    size: {
      name: 'banner size',
      type: 'select',
      description: "Possible banner sizes ('small', 'medium' or 'large')",
      options: ['s', 'm', 'l'],
      control: {
        labels: {
          s: 'small',
          m: 'medium',
          l: 'large',
        },
      },
      table: {
        type: 'string',
        defaultValue: { summary: 'm' },
        category: 'Display',
      },
    },
    centered: {
      type: 'boolean',
      description: 'Whether the content of the banner is centered or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Display',
      },
    },
    width: {
      name: 'width',
      type: 'radio',
      description: `The media container extends to the whole viewport by default when outside the grid,
        if it's inside it can still be extended by adding class .ecl-banner--full-width`,
      options: ['outside', 'container', 'inside'],
      control: {
        labels: {
          outside: 'outside the grid container',
          container: 'inside the grid container',
          inside: 'inside the grid container, with fullwidth class',
        },
      },
      table: {
        type: { summary: 'radio' },
        defaultValue: { summary: 'outside the grid container' },
        category: 'Display',
      },
    },
    title: {
      type: 'string',
      description: 'Heading of the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    description: {
      type: 'string',
      description: 'Sub-heading of the banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    label: {
      type: 'string',
      description: 'Label of the call to action link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    gridContent: {
      name: 'demo grid content',
      type: { name: 'boolean' },
      description:
        'Inject a test content block displayed on the grid, to see the alignment',
      table: {
        category: 'Test content',
      },
      control: {
        type: 'boolean',
      },
    },
  };

  if (data.image) {
    argTypes.show_credit = {
      name: 'credit',
      type: { name: 'boolean' },
      description: 'Show the credit',
      table: {
        category: 'Optional',
      },
    };
    argTypes.image = {
      type: 'string',
      description: 'Path or Url of the background image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    };
    argTypes.credit = {
      type: 'string',
      description: 'Credit of the image',
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
  data.size = args.size;
  data.title = args.title;
  data.description = args.description;
  data.centered = args.centered;
  data.full_width = args.width === 'inside';

  if (data.image) {
    data.image = args.image;
    data.credit = args.credit;
  }
  if (!args.show_credit) {
    data.credit = '';
  }
  if (!args.show_title) {
    data.title = '';
  }
  if (!args.show_description) {
    data.description = '';
  }
  if (!args.show_button) {
    data.link = false;
  } else {
    data.link = cta;
    data.link.link.label = args.label;
  }

  return data;
};

const renderStory = (data, args) => {
  let story = banner(prepareData(correctPaths(data), args));
  if (args.width === 'container' || args.width === 'inside') {
    story = `<div class="ecl-container">${story}</div>`;
  }
  if (args.gridContent) {
    story +=
      '<div class="ecl-container"><p class="ecl-u-type-paragraph">Content inside the grid</p></div>';
  }

  return story;
};

export default {
  title: 'Components/Banner',
  decorators: [withNotes, withCode],
  parameters: { layout: 'fullscreen' },
};

export const PlainBackground = (args) =>
  renderStory(bannerDataPlainBackground, args);

PlainBackground.storyName = 'plain background';
PlainBackground.args = getArgs(bannerDataPlainBackground);
PlainBackground.argTypes = getArgTypes(bannerDataPlainBackground);
PlainBackground.parameters = {
  notes: { markdown: notes, json: bannerDataPlainBackground },
};

export const TextBox = (args) => renderStory(bannerDataTextBox, args);

TextBox.storyName = 'text box';
TextBox.args = getArgs(bannerDataTextBox);
TextBox.argTypes = getArgTypes(bannerDataTextBox);
TextBox.parameters = { notes: { markdown: notes, json: bannerDataTextBox } };

export const TextHighlight = (args) =>
  renderStory(bannerDataTextHighlight, args);

TextHighlight.storyName = 'text highlight';
TextHighlight.args = getArgs(bannerDataTextHighlight);
TextHighlight.argTypes = getArgTypes(bannerDataTextHighlight);
TextHighlight.parameters = {
  notes: { markdown: notes, json: bannerDataTextHighlight },
};

export const ImageOverlay = (args) => renderStory(bannerDataImageOverlay, args);

ImageOverlay.storyName = 'image overlay';
ImageOverlay.args = getArgs(bannerDataImageOverlay);
ImageOverlay.argTypes = getArgTypes(bannerDataImageOverlay);
ImageOverlay.parameters = {
  notes: { markdown: notes, json: bannerDataImageOverlay },
};