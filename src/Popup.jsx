import React, { useState, useRef, useEffect } from 'react';

import './popup.scss';

const Popup = ({ togglePopup }) => {
  const [state, setState] = useState('');
  const ref = useRef();

  const handleClick = (event) => {
    if (!event.path.includes(ref.current)) {
      togglePopup();
    }
  };

  const generateURL = (id) => {
    let query = '?rel=0&showinfo=0&autoplay=1';
    return 'https://www.youtube.com/embed/' + id + query;
  };

  const parseURLMedia = (media) => {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  };

  const createFrame = (id) => {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    setState(parseURLMedia(ref.current.firstChild.children[1]));
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  const addIframe = () => {
    let iframe = createFrame(state);
    ref.current.firstChild.removeAttribute('href');
    console.log(ref.current.firstChild);
    ref.current.removeChild(ref.current.firstChild);
    ref.current.appendChild(iframe);
  };

  // ! https://youtu.be/neHA4MJwpnY

  return (
    <div className="popup">
      <div ref={ref} className="video" onClick={addIframe}>
        <a className="video__link" href="https://youtu.be/neHA4MJwpnY">
          <source
            srcSet="https://i.ytimg.com/vi_webp/neHA4MJwpnY/maxresdefault.webp"
            type="image/webp"
          />
          <img
            className="video__media"
            src="https://i.ytimg.com/vi/neHA4MJwpnY/maxresdefault.jpg"
            alt="1. Пилот, разборы, ответы и лайвы"
          />
          <button className="video__button" aria-label="Запустить видео">
            <svg width="68" height="48" viewBox="0 0 68 48">
              <path
                className="video__button-shape"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
              <path className="video__button-icon" d="M 45,24 27,14 27,34"></path>
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Popup;
