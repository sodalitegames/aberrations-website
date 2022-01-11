import RollDice from '../tools/roll-dice';

const DigitalTool = ({ data }) => {
  return <>{data.type === 'ROLL_DICE' ? <RollDice /> : `DIGITAL TOOL TYPE: ${data.type}`}</>;
};

export default DigitalTool;
