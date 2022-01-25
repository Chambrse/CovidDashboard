import React from 'react';


class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card bg-light h-100">
            <div className="card-header">
              {this.props.title}
            </div>
            <div className="card-body text-center align-middle d-block">
                {this.props.children}
            </div>
          </div>
        );
    }
}


export default Card;


        