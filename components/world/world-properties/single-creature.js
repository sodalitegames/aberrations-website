import CreatureCard from '../../elements/cards/creature-card';

const SingleCreature = ({ creature }) => {
  return (
    <>
      <h2 className="heading">{creature.name} Info</h2>
      <CreatureCard creature={creature} />
    </>
  );
};

export default SingleCreature;
