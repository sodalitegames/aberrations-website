import Markdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
// import rehypeRaw from 'rehype-raw';
// import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const MarkdownText = ({ markdown }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
      {markdown}
    </Markdown>
  );
};

export default MarkdownText;
