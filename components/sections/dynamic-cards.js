import { attributes as navigation } from '../../content/settings/navigation.md';

import NavItemCards from '../elements/nav-item-cards';

const generateNavCards = (navigation, slug) => {
  const navItem = navigation.find(navItem => navItem.path === slug);
  return navItem.children;
};

const DynamicCards = ({ data }) => {
  const { headerNavigation } = navigation;
  return (
    <>
      {/* {data.cardData === 'GET_STARTED' ? (
        <NavItemCards cards={generateNavCards(headerNavigation, 'get-started')} parent="get-started" />
      ) : data.cardData === 'DIGITAL_TOOLS' ? (
        <NavItemCards cards={generateNavCards(headerNavigation, 'digital-tools')} parent="digital-tools" />
      ) : data.cardData === 'COMMUNITY' ? (
        <NavItemCards cards={generateNavCards(headerNavigation, 'community')} parent="community" />
      ) : data.cardData === 'WORLDS' ? (
        <NavItemCards cards={generateNavCards(headerNavigation, 'worlds')} parent="worlds" />
      ) : null} */}
    </>
  );
};

export default DynamicCards;
