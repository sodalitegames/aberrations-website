import dynamic from 'next/dynamic';

const CMS_CONFIG = {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'jakeprins/nextjs-netlify-cms',
    branch: 'main',
  },
  media_folder: 'public/img',
  public_folder: 'img',
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            {
              label: 'Hero Title',
              name: 'hero_title',
              widget: 'string',
            },
            {
              label: 'Hero Description',
              name: 'hero_description',
              widget: 'markdown',
            },
            {
              label: 'Hero Image',
              name: 'hero_image',
              widget: 'image',
            },
          ],
        },
      ],
    },
  ],
};

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500 font-semibold text-xl">Loading...</p>
  </div>
);

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then(CMS => {
      CMS.init({ CMS_CONFIG });
    }),
  { ssr: false, loading: Loading }
);

const Admin = () => <CMS />;

export default Admin;
