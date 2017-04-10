import { Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';

class MatchHead extends Component {

    render() {
        let columns = [];
        // columns.push( <th key="oldbtn" className="center w60">
        //     <Button bsSize="xsmall" onClick={this.props.oldFn}>Accepted</Button></th> );
        // columns.push( <th key="newbtn" className="center w60">
        //     <Button bsSize="xsmall" onClick={this.props.newFn}>Proposed</Button> </th> );
        // columns.push( <th id="match-custom-btn" key="custbtn" className="center w60">
        //     <Button bsSize="xsmall" onClick={this.props.customFn} >Custom</Button></th> );

        // you get a glyph as appropriate
        let oldGlyph = null;
        let newGlyph = null;
        let customGlyph = null;
        
        let glyph = (this.props.state.sortDirection === "asc") ?
            <span><Glyphicon glyph="sort-by-attributes"/></span> :
            <span><Glyphicon glyph="sort-by-attributes-alt" /></span>;
        switch(this.props.state.sortBy) {
            case "accepted": oldGlyph = glyph; break;
            case "proposed": newGlyph = glyph; break;
            case "custom": customGlyph = glyph; break;
            default: break;
        }

        columns.push( <th key="oldbtn" className="match-btn"><a onClick={this.props.fns.oldFn}>Accepted {oldGlyph}</a></th>);
        columns.push( <th key="newbtn" className="match-btn"><a onClick={this.props.fns.newFn}>Proposed {newGlyph}</a></th>);
        columns.push( <th key="custbtn" className="match-btn"><a onClick={this.props.fns.customFn}>Custom {customGlyph}</a></th>);

        // debug - remove
        //columns.push( <th key="groupcol">Group</th> );

        let x = 1;
        let keys = this.props.state.records[0];
        Object.keys(keys).forEach( (k) => {
            if(k !== 'group' && k !== 'id') {
                let key = "head" + x;
                columns.push(<th key={key} className="capitalize " >{k}</th>);
                ++x;
            }
        });
        return (
            <thead>
                <tr>
                    {columns}
                </tr>
            </thead>
        );
    }
}

export default MatchHead;
