import React, { useState } from 'react';

import Popup from './Popup';

function App() {
  const [visible, setVisible] = useState(false);

  const togglePopup = () => {
    setVisible(!visible);
  };

  return (
    <div className="wrapper">
      <div className="present_block">
        <div className="present">
          <h4>Наша работа</h4>
          <div className="present_line"></div>
          <p className="present_text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem fugiat sequi
            rem hic mollitia, id maiores nisi quam ipsa nobis! Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
          <button className="present_btn" onClick={togglePopup}></button>
          {visible && <Popup togglePopup={togglePopup} />}
        </div>
      </div>
    </div>
  );
}

export default App;
