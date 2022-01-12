import classNames from '../../utils/functions/classnames';
import RenderHtml from '../utility/render-html';

const HtmlContent = ({ data }) => {
  return (
    <div className={classNames('rich-content-container')}>
      <RenderHtml html={data.content} />
    </div>
  );
};

export default HtmlContent;
