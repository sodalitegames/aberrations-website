import MarkdownContent from '../../sections/markdown-content';

import WeaponsSection from '../belonging-sections/weapons';
import WearablesSection from '../belonging-sections/wearables';
import ConsumablesSection from '../belonging-sections/consumables';
import UsablesSection from '../belonging-sections/usables';

const SingleBelonging = ({ belonging, world }) => {
  return (
    <>
      <h2 className="heading">About {belonging.metadata.title}</h2>
      <MarkdownContent data={{ content: belonging.overview }} />
      <h2 className="heading">List of {belonging.metadata.title}</h2>
      {belonging.subType === 'weapons' ? <WeaponsSection weapons={belonging} world={world} /> : null}
      {belonging.subType === 'wearables' ? <WearablesSection wearables={belonging} world={world} /> : null}
      {belonging.subType === 'consumables' ? <ConsumablesSection consumables={belonging} world={world} /> : null}
      {belonging.subType === 'usables' ? <UsablesSection usables={belonging} world={world} /> : null}
    </>
  );
};

export default SingleBelonging;
