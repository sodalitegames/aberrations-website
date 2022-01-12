/* eslint-disable @next/next/no-img-element */
import { CameraIcon } from '@heroicons/react/solid';

import MarkdownContent from '../markdown-content';

import classNames from '../../../utils/functions/classnames';

export default function ColumnContentWithImage({ data }) {
  return (
    <>
      {data.imageType === 'CONTAINED' ? (
        <div className="overflow-hidden">
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
              <div>
                <h2 className="text-base text-primary-light font-semibold tracking-wide uppercase">{data.subheading}</h2>
                <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">{data.heading}</h3>
              </div>
            </div>
            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
              {/* IMAGE CONTENT */}
              <div className={classNames('relative lg:row-start-1', data.imageSide === 'RIGHT' ? 'lg:col-start-2' : 'lg:col-start-1')}>
                <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <img className="rounded-lg shadow-lg object-cover object-center" src={data.image.url} alt="" width={1184} height={1376} />
                    </div>
                    <figcaption className="mt-3 flex text-sm text-gray-500">
                      <CameraIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2">Photograph by Marcus O’Leary</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              {/* END IMAGE CONTENT */}
              {/* TEXT CONTENT */}
              <div className="mt-8 lg:mt-0">
                <MarkdownContent data={{ content: data.content }} />
              </div>
              {/* END TEXT CONTENT */}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="lg:absolute lg:inset-0">
            <div className={classNames('lg:absolute lg:inset-y-0', data.imageSide === 'RIGHT' ? 'lg:right-0' : 'lg:left-0', 'lg:w-1/2')}>
              <img className="h-56 w-full object-cover lg:absolute lg:h-full" src={data.image.url} alt="" />
            </div>
          </div>
          <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
            <div className={classNames(data.imageSide === 'RIGHT' ? 'lg:col-start-1' : 'lg:col-start-2', 'lg:pl-8')}>
              <div className="text-base max-w-prose mx-auto lg:ml-auto lg:mr-0">
                <h2 className="leading-6 text-primary-light font-semibold tracking-wide uppercase">{data.subheading}</h2>
                <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">{data.heading}</h3>
                <div className={classNames('mt-8', data.imageSide === 'RIGHT' ? 'mr-12' : '')}>
                  <MarkdownContent data={{ content: data.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
