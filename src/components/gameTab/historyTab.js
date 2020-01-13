import React from 'react';

export default class HistoryTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let historyP = this.props.history.map((text,index) => {
      if (text.includes('hit')) {
        return <p className="hit" key={index}>{text}</p>
      } else {
        return <p className="miss" key={index}>{text}</p>
      }
    })
    return (
      <div className='history-tab'>
        {historyP}
      </div>
    )
  }
}
