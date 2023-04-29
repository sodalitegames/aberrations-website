import Section from 'components/dashboard/components/Section';
import Action from 'components/dashboard/components/Action';

export default function Resources({ resources }) {
  return (
    <>
      <Section heading="PDF Resources" description="We currently have the latest versions of the Character and Campaign Sheets available." ariaTag="resources">
        <div className="space-x-2 overflow-hidden divide-y divide-gray-200 rounded-lg sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
          {resources.map((resource, index) => (
            <Action
              key={index}
              heading={resource.name}
              description={resource.description}
              iconRef={resource.iconRef}
              href={`/${resource.resource}`}
              index={index}
              length={resources.length}
              externalLink
            />
          ))}
        </div>
      </Section>
    </>
  );
}
