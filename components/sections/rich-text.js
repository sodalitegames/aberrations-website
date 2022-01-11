import MarkdownText from '../utility/markdown-text';

import classNames from '../../utils/functions/classnames';

const RichText = ({ data }) => {
  return (
    <div className={classNames('rich-content-container')}>
      <MarkdownText markdown={data.content} />
    </div>
  );
};

export default RichText;
