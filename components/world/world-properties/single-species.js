import RichText from '../../sections/rich-text';

import SpeciesCard from '../../elements/cards/species-card';

const SingleSpecies = ({ species }) => {
  return (
    <>
      <h2 className="heading">{species.name} Info</h2>
      <SpeciesCard species={species} />
      <h3 className="heading">{species.name} Lore</h3>
      {species.lore.map(({ world, current, history }) => (
        <div key={world.name}>
          <h4 className="heading">
            {species.name} Lore on {world.name}
          </h4>
          <h5 className="heading">Current</h5>
          <RichText data={{ content: current }} />
          <h5 className="heading">Historical</h5>
          <RichText data={{ content: history }} />
        </div>
      ))}
    </>
  );
};

export default SingleSpecies;
