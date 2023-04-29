import Link from 'next/link';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { useAuth } from '../../../contexts/auth';

import Section from '../components/Section';
import Action from '../components/Action';

export const AberrationsSheets = ({ hasJoined }) => {
  return (
    <Section heading="Aberrations RPG Sheets (Alpha)" description="An online character and campaign management tool" ariaTag="aberrations-sheets" feature>
      <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
        {hasJoined ? (
          <div className="inline-flex rounded-md shadow">
            <a href="https://sheets.aberrations-rpg.com" target="_blank" rel="noreferrer" className="btn-secondary">
              <span className="mr-2">Go to Aberrations RPG Sheets</span> <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <>
            <div className="inline-flex rounded-md shadow">
              <Link href="/digital-tools/sheets">
                <a className="px-5 py-3 btn-primary">Learn more</a>
              </Link>
            </div>
            <div className="inline-flex ml-3 rounded-md shadow">
              <a href="https://sheets.aberrations-rpg.com" target="_blank" rel="noreferrer" className="btn-secondary">
                <span className="mr-2">Get started</span> <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

export default function DigitalTools({ digitalTools }) {
  const { data } = useAuth();

  return (
    <>
      <AberrationsSheets hasJoined={data.has_joined_sheets} />

      <Section heading="More Digital Tools" description="We also provide many more tools to aid you in your gameplay." ariaTag="digital-tools">
        <div className="space-x-2 overflow-hidden divide-y divide-gray-200 rounded-lg sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
          {digitalTools.map((tool, index) => (
            <Action key={index} heading={tool.name} description={tool.description} iconRef={tool.iconRef} href={tool.href} index={index} length={digitalTools.length} />
          ))}
        </div>
      </Section>
    </>
  );
}
