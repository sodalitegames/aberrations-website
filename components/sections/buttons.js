import Link from 'next/link';

import classNames from '../../utils/functions/classnames';

const Buttons = ({ data }) => {
  return (
    <div className="mt-4 space-x-2">
      {data.buttons.map((button, index) => {
        if (button.config !== 'STANDARD') {
          return <p>Not set up yet</p>;
        }

        if (button.externalLink) {
          return (
            <a
              key={index}
              href={button.href}
              className={classNames(button.theme === 'PRIMARY' ? 'btn-primary' : '', button.theme === 'SECONDARY' ? 'btn-secondary' : '', button.theme === 'TERTIARY' ? 'btn-tertiary' : '')}
            >
              {button.text}
            </a>
          );
        }

        return (
          <Link key={index} href={button.href}>
            <a className={classNames(button.theme === 'PRIMARY' ? 'btn-primary' : '', button.theme === 'SECONDARY' ? 'btn-secondary' : '', button.theme === 'TERTIARY' ? 'btn-tertiary' : '')}>
              {button.text}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Buttons;
