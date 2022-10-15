import { useEffect } from 'react';

import classNames from 'utils/functions/classnames';

const MailerLiteForm: React.VFC<{ classes?: string; type?: 'primary' | 'secondary' }> = ({ type, classes }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.innerHTML = `
      (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
      var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
      f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
      var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
      _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');
      var ml_account = ml('accounts', '3705686', 'd2m1d8e0x9', 'load');
    `;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  if (process.env.NODE_ENV !== 'production') {
    return <p className="w-full mt-4 text-center text-gray-400">Subscription form hidden while in development mode.</p>;
  }

  if (type === 'secondary') {
    return <div className={classNames('ml-form-embed', classes)} data-account="3705686:d2m1d8e0x9" data-form="5513480:t6r0s5"></div>;
  }

  return <div className={classNames('ml-form-embed', classes)} data-account="3705686:d2m1d8e0x9" data-form="5225651:y8o3z3" />;
};

export default MailerLiteForm;
