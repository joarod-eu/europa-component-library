import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';

import iconsAll from '@ecl/resources-icons/dist/lists/all.json';
import iconsFlag from '@ecl/resources-flag-icons/dist/lists/members/all.json';
import dataListIllustrationImage from '@ecl/specs-component-list-illustration/demo/data--image';
import dataListIllustrationIcon from '@ecl/specs-component-list-illustration/demo/data--icon';

import listIllustration from './list-illustration.html.twig';
import notes from './README.md';

const imgDefault = dataListIllustrationImage.items[0].picture;
const iconDefault = dataListIllustrationIcon.items[0].icon;
const descDefault = dataListIllustrationIcon.items[0].description;
const valueDefault = dataListIllustrationIcon.items[0].value;

// Create 'none' option.
iconsAll.unshift('none');

const iconMapping = iconsAll.reduce((mapping, icon) => {
  mapping[icon] = icon;
  return mapping;
}, {});

const flagMapping = iconsFlag.reduce((mapping, icon) => {
  mapping[icon] = icon;
  return mapping;
}, {});

const getArgs = (data, variant) => {
  const args = {
    show_description: true,
    show_value: true,
    font_size: 'l',
  };
  if (variant.includes('image')) {
    args.show_image = true;
  }
  if (variant.includes('icon')) {
    args.show_icon = true;
  }
  if (data.items[0].value) {
    args.value = data.items[0].value;
  }
  if (data.items[0].title) {
    args.title = data.items[0].title;
  }
  args.description = data.items[0].description;
  if (
    data.items[0].picture &&
    data.items[0].picture.img &&
    data.items[0].picture.img.src
  ) {
    args.picture = data.items[0].picture.img.src;
    args.image_squared = false;
    args.image_size = 'm';
  }
  if (data.items[0].icon) {
    args.icon = data.items[0].icon.name;
    args.icon_size = 'l';
  }

  if (variant.includes('horizontal')) {
    args.column = 2;
  }
  if (variant !== 'vertical-image') {
    args.centered = false;
  }
  if (variant.includes('vertical')) {
    args.zebra = true;
  }

  return args;
};

const getArgTypes = (data, variant) => {
  const argTypes = {
    show_description: {
      name: 'description',
      type: { name: 'boolean' },
      description: 'Show the description',
      table: {
        category: 'Optional',
      },
    },
    show_value: {
      name: 'value',
      type: { name: 'boolean' },
      description: 'Show the value',
      table: {
        category: 'Optional',
      },
    },
  };
  if (variant.includes('image')) {
    argTypes.show_image = {
      name: 'image',
      type: { name: 'boolean' },
      description: 'Show image',
      table: {
        category: 'Optional',
      },
    };
  }
  if (variant.includes('icon')) {
    argTypes.show_icon = {
      name: 'icon',
      type: { name: 'boolean' },
      description: 'Show icon',
      table: {
        category: 'Optional',
      },
    };
  }

  if (variant.includes('horizontal')) {
    argTypes.column = {
      name: 'number of columns',
      control: { type: 'range', min: 2, max: 4, step: 1 },
      description: 'The number of column for the list (between 2 and 4)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 2 },
        category: 'Layout',
      },
    };
  }

  if (variant !== 'vertical-image') {
    argTypes.centered = {
      name: 'centered',
      type: { name: 'boolean' },
      description: 'Center the content of list items',
      mapping: {
        0: false,
        1: true,
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Layout',
      },
    };
  }

  if (variant.includes('vertical')) {
    argTypes.zebra = {
      name: 'zebra',
      type: { name: 'boolean' },
      description: 'Differentiate lines using zebra display',
      mapping: {
        0: false,
        1: true,
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Layout',
      },
    };
  }

  argTypes.font_size = {
    name: 'font size',
    type: 'select',
    description: 'Change font size',
    options: ['m', 'l'],
    control: {
      labels: {
        m: 'medium',
        l: 'large',
      },
    },
    mapping: {
      medium: 'm',
      large: 'l',
    },
    table: {
      type: 'string',
      defaultValue: { summary: 'l' },
      category: 'Display',
    },
  };

  argTypes.value = {
    name: 'value',
    type: { name: 'string' },
    description: 'The value of the list item (first item)',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Content (first-item)',
    },
    if: { arg: 'show_value' },
  };
  argTypes.title = {
    name: 'title',
    type: { name: 'string', required: true },
    description: 'The title of the list item (first item)',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Content (first-item)',
    },
  };
  argTypes.description = {
    name: 'description',
    type: { name: 'string' },
    description: 'The description of the list item (first item)',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Content (first-item)',
    },
    if: { arg: 'show_description' },
  };

  if (
    data.items[0].picture &&
    data.items[0].picture.img &&
    data.items[0].picture.img.src
  ) {
    argTypes.picture = {
      name: 'image',
      type: { name: 'string' },
      description: 'The url of the of the list item image (first item)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Image',
      },
      if: { arg: 'show_image' },
    };
    argTypes.image_squared = {
      name: 'image squared',
      type: { name: 'boolean' },
      description: 'Is the image squared? (default ratio is 3:2)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Image',
      },
      if: { arg: 'show_image' },
    };
  }

  argTypes.image_size = {
    name: 'image size',
    type: { name: 'select' },
    description: 'Possible image sizes (square image only)',
    options: ['s', 'm', 'l'],
    control: {
      labels: {
        s: 'small',
        m: 'medium',
        l: 'large',
      },
    },
    mapping: {
      small: 's',
      medium: 'm',
      large: 'l',
    },
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Image',
    },
    if: { arg: 'image_squared' },
  };

  if (data.items[0].icon) {
    argTypes.icon = {
      name: 'icon (generic)',
      description: 'The generic icon used in the list item (first item)',
      type: { name: 'select' },
      options: iconsAll,
      mapping: iconMapping,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Icon',
      },
      if: { arg: 'show_icon' },
    };
    argTypes.icon_flag = {
      name: 'icon (flag)',
      description: 'The flag icon used in the list item (first item)',
      type: { name: 'select' },
      options: iconsFlag,
      mapping: flagMapping,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Icon',
      },
      if: { arg: 'show_icon' },
    };
    argTypes.icon_size = {
      name: 'icon size',
      type: { name: 'select' },
      description: 'Possible icon sizes',
      options: ['s', 'l'],
      control: {
        labels: {
          s: 'small',
          l: 'large',
        },
      },
      mapping: {
        small: 's',
        medium: 'm',
        large: 'l',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Icon',
      },
      if: { arg: 'show_icon' },
    };
  }

  return argTypes;
};

const prepareDataItem = (data, args) => {
  data.title = args.title;
  if (!args.show_value) {
    data.value = '';
  } else {
    data.value = args.value;
  }
  if (!args.show_description) {
    data.description = '';
  } else {
    data.description = args.description;
  }
  if (!args.show_image) {
    data.picture = {};
  } else {
    data.picture = imgDefault;
    data.picture.img.src = args.picture;
    data.square = args.image_squared;
    data.media_size = args.image_size;
  }
  if (!args.show_icon) {
    delete data.icon;
  } else {
    data.icon = {};
    data.icon.name = args.icon;
    data.icon.path = 'icon.svg';
    data.media_size = args.icon_size;
    if (args.icon_flag && args.icon_flag !== 'none') {
      data.icon.name = args.icon_flag;
      data.icon.path = 'icon-flag.svg';
    }
    if (args.icon === 'none') {
      delete data.icon;
    }
  }

  correctPaths(data);

  return data;
};

const prepareDataList = (data, args) => {
  data.font_size = args.font_size;
  data.items[0] = prepareDataItem(data.items[0], args);
  if (args.show_image) {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].picture = imgDefault;
      data.items[i].square = args.image_squared;
      data.items[i].media_size = args.image_size;
    }
  } else {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].picture = {};
    }
  }

  if (args.show_icon) {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].icon = iconDefault;
      data.items[i].media_size = args.icon_size;
    }
  } else {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].icon = {};
    }
  }

  if (args.show_description) {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].description = descDefault;
    }
  } else {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].description = '';
    }
  }

  if (args.show_value) {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].value = valueDefault;
    }
  } else {
    for (let i = 1; i < data.items.length; i += 1) {
      data.items[i].value = '';
    }
  }

  data.zebra = args.zebra;
  data.centered = args.centered;
  data.column = args.column;

  correctPaths(data);

  return data;
};

export default {
  title: 'Components/List with illustration',
  decorators: [withNotes, withCode],
};

export const HorizontalImage = (_, { loaded: { component } }) => component;

HorizontalImage.render = async (args) => {
  const renderedList = await listIllustration(
    prepareDataList(dataListIllustrationImage, args),
  );
  return renderedList;
};
HorizontalImage.storyName = 'horizontal (images)';
HorizontalImage.args = getArgs(dataListIllustrationImage, 'horizontal-image');
HorizontalImage.argTypes = getArgTypes(
  dataListIllustrationImage,
  'horizontal-image',
);
HorizontalImage.parameters = {
  notes: { markdown: notes, json: dataListIllustrationImage },
};

export const HorizontalIcon = (_, { loaded: { component } }) => component;

HorizontalIcon.render = async (args) => {
  const renderedListIcon = await listIllustration(
    prepareDataList(dataListIllustrationIcon, args),
  );
  return renderedListIcon;
};
HorizontalIcon.storyName = 'horizontal (icons)';
HorizontalIcon.args = getArgs(dataListIllustrationIcon, 'horizontal-icon');
HorizontalIcon.argTypes = getArgTypes(
  dataListIllustrationIcon,
  'horizontal-icon',
);
HorizontalIcon.parameters = {
  notes: { markdown: notes, json: dataListIllustrationIcon },
};

export const VerticalImage = (_, { loaded: { component } }) => component;

VerticalImage.render = async (args) => {
  const renderedListImageVertical = await listIllustration(
    prepareDataList(dataListIllustrationImage, args),
  );
  return renderedListImageVertical;
};
VerticalImage.storyName = 'vertical (images)';
VerticalImage.args = getArgs(dataListIllustrationImage, 'vertical-image');
VerticalImage.argTypes = getArgTypes(
  dataListIllustrationImage,
  'vertical-image',
);
VerticalImage.parameters = {
  notes: { markdown: notes, json: dataListIllustrationImage },
};

export const VerticalIcon = (_, { loaded: { component } }) => component;

VerticalIcon.render = async (args) => {
  const renderedListIconVertical = await listIllustration(
    prepareDataList(dataListIllustrationIcon, args),
  );
  return renderedListIconVertical;
};
VerticalIcon.storyName = 'vertical (icons)';
VerticalIcon.args = getArgs(dataListIllustrationIcon, 'vertical-icon');
VerticalIcon.argTypes = getArgTypes(dataListIllustrationIcon, 'vertical-icon');
VerticalIcon.parameters = {
  notes: { markdown: notes, json: dataListIllustrationIcon },
};
