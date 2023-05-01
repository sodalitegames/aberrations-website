import RollDice from 'components/tools/roll-dice';

const DigitalTool = ({ data }) => {
  return <>{data.tool === 'ROLL_DICE' ? <RollDice /> : `DIGITAL TOOL TYPE: ${data.tool}`}</>;
};

export default DigitalTool;
