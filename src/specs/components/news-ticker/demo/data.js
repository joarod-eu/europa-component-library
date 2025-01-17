// Simple content for demo
const publicUrl = process.env.PUBLIC_URL || '';
const exampleLink = `${publicUrl}/example`;

module.exports = {
  id: 'news-ticker-example',
  icon_path: '/icons.svg',
  counter_label: 'of',
  sr_external: 'Link to an external domain',
  sr_next: 'Next item',
  sr_previous: 'Previous item',
  sr_pause: 'Pause news ticker',
  items: [
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et finibus mi. Sed hendrerit velit id ex ornare interdum. Duis suscipit tortor vitae mi feugiat suscipit. Morbi consequat tortor magna, ac malesuada nunc placerat non. Vivamus pulvinar augue tristique lectus lobortis iaculis.',
      link: exampleLink,
      icon: {
        name: 'euro',
      },
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et finibus mi. Sed hendrerit velit id ex ornare interdum. Duis suscipit tortor vitae mi feugiat suscipit. Morbi consequat tortor magna, ac malesuada nunc placerat non. Vivamus pulvinar augue tristique lectus lobortis iaculis. Nam condimentum aliquam sem, a bibendum mauris faucibus id. In euismod semper ex et tincidunt. Donec eu augue posuere, feugiat enim ac, faucibus tortor.',
      link: exampleLink,
      external: true,
      icon: {
        name: 'global',
      },
    },
    {
      content:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      link: exampleLink,
      img: {
        path: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image4.jpg',
        alt: 'Alternative text for the image',
        title: 'title of the image',
      },
    },
    {
      content:
        'Excepteur sint occaecat cupidatat officia deserunt mollit anim id est laborum',
      link: exampleLink,
      icon: {
        name: 'information-outline',
      },
    },
    {
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
      link: exampleLink,
      icon: {
        name: 'livestreaming',
      },
    },
    {
      content:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores',
      link: exampleLink,
      icon: {
        name: 'euro',
      },
    },
  ],
};
