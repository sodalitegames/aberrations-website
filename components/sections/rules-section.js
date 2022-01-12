import RollDice from '../tools/roll-dice';

const RulesSection = ({ data }) => {
  return <>{data.rules === 'ROLL_DICE' ? <RollDice /> : `RULES TYPE: ${data.rules}`}</>;
};

export default RulesSection;
