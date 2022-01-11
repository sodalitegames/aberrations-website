import RichText from '../../sections/rich-text';

import WeaponsSection from '../belonging-sections/weapons';
import WearablesSection from '../belonging-sections/wearables';
import ConsumablesSection from '../belonging-sections/consumables';
import UsablesSection from '../belonging-sections/usables';

const SingleBelonging = ({ belonging, world }) => {
  return (
    <>
      <h2 className="heading">About {belonging.title}</h2>
      <RichText data={{ content: belonging.overview }} />
      <h2 className="heading">List of {belonging.title}</h2>
      {belonging.subType === 'WEAPONS' ? (
        <WeaponsSection weapons={belonging} world={world} />
      ) : belonging.subType === 'WEARABLES' ? (
        <WearablesSection wearables={belonging} world={world} />
      ) : belonging.subType === 'CONSUMABLES' ? (
        <ConsumablesSection consumables={belonging} world={world} />
      ) : belonging.subType === 'USABLES' ? (
        <UsablesSection usables={belonging} world={world} />
      ) : null}
    </>
  );
};

export default SingleBelonging;
