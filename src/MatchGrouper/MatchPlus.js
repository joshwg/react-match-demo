import { Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';

class plusDiv extends Component {
    render() {
        return (<div className="match-group-plus"><Glyphicon glyph="plus" /></div>);
    }
}

//export default DropTarget(MATCH_DROP, matchGroupSpec, matchGroupCollect )(plusDiv) ;
export default plusDiv;

