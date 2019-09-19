'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import saber from './images/saber.png';

class Search extends React.Component {
  render() {
    return <div className="search-text">
      Fate
      <div>
        <img src={saber} />
        我问你，你就是我的 master 吗？
      </div>
      </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
);