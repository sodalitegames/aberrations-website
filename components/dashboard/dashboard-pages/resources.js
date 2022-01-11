import Section from '../components/Section';
import Action from '../components/Action';

export default function Resources({ user, resources }) {
  return (
    <>
      <Section heading="PDF Resources" description="We currently have the latest versions of the Character and Campaign Sheets available." ariaTag="resources">
        <div className="rounded-lg overflow-hidden space-x-2 divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
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
