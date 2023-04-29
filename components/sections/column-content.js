/* eslint-disable @next/next/no-img-element */
// import { CameraIcon } from '@heroicons/react/solid';

import MarkdownContent from 'components/sections/markdown-content';

import classNames from 'utils/functions/classnames';

const ColumnContent = ({ data }) => {
  return (
    <div className="py-4">
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <Column sections={data.leftColumn} />
        <Column sections={data.rightColumn} />
      </div>
    </div>
  );
};

const Column = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => {
        if (section.type === 'content') {
          return <MarkdownContent key={index} data={section} />;
        }

        if (section.type === 'image') {
          return (
            <figure key={index}>
              <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                <img className={classNames('object-cover object-center', section.config === 'CONTAINED' ? 'rounded-lg shadow-lg' : '')} src={section.image} alt="" width={1184} height={1376} />
              </div>
              {/* <figcaption className="flex mt-3 text-sm text-gray-500">
                <CameraIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-2">Photo by Marcus O'Leary</span>
              </figcaption> */}
            </figure>
          );
        }
      })}
    </>
  );
};

export default ColumnContent;
