import Link from 'next/link';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import Section from '../components/Section';
import Action from '../components/Action';

export default function DigitalTools({ user, digitalTools }) {
  return (
    <>
      <Section heading="Aberrations RPG Sheets (Alpha)" description="An online character and campaign management tool." ariaTag="aberrations-sheets" feature>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {!user.hasJoinedSheets ? (
            <div className="inline-flex rounded-md shadow">
              <a
                href="https://sheets.aberrations-rpg.com"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Go to Aberrations RPG Sheets <ExternalLinkIcon className="-ml-2 m1-2 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <>
              <div className="inline-flex rounded-md shadow">
                <Link href="/digital-tools/sheets">
                  <a className="btn-primary px-5 py-3">Learn more</a>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a href="https://sheets.aberrations-rpg.com" target="_blank" rel="noreferrer" className="btn-secondary">
                  <span className="mr-2">Get started</span> <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </>
          )}
        </div>
      </Section>

      <Section heading="More Digital Tools" description="We also provide many more tools to aid you in your gameplay." ariaTag="digital-tools">
        <div className="rounded-lg overflow-hidden space-x-2 divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
          {digitalTools.map((tool, index) => (
            <Action key={index} heading={tool.name} description={tool.description} iconRef={tool.iconRef} href={tool.href} index={index} length={digitalTools.length} />
          ))}
        </div>
      </Section>
    </>
  );
}
