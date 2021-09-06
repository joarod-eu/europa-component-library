const publicUrl = process.env.PUBLIC_URL || '';
const exampleLink = `${publicUrl}/example`;

module.exports = {
  title: 'EU Budget for the future',
  description: 'Innovation, economy, environment and geopolitics',
  link: {
    link: {
      label: 'Subscribe',
      path: exampleLink,
      aria_label: 'Subscribe',
      icon_position: 'after',
    },
    icon: {
      path: '/icons.svg',
      name: 'corner-arrow',
      size: 'xs',
      transform: 'rotate-90',
    },
  },
  image: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
  variant: 'image',
  centered: true,
};
