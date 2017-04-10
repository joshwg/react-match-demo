import constants from '../constants';
import { DropTarget } from 'react-dnd';
import MatchPlus from './MatchPlus';
import MatchRecord from './MatchRecord';
import React, { Component, PropTypes } from 'react';


let matchGroupSpec = {
    drop(props, monitor) {
        let record = monitor.getItem();

        let groupId = props.id
        props.moveFn(record.id, groupId);
        return { name: "Group" };
    }
};


let matchGroupCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
};

class MatchGroup extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;

        let otherClass = '';
        if(canDrop && isOver) {
            otherClass = 'match-group-hover';
        }
        else if(!this.props.group) {
            otherClass = 'match-group-addon';
        } else {
            otherClass = "group" + ((this.props.counter % 20) + 1);
        }
        let key = "match-group-" + this.props.counter;

        let records = [];
        if(this.props.group) {

            Object.keys( this.props.group).forEach( (key) => {
                if(key !== '$group') {
                    let rec = this.props.group[key];
                    let recordKey = 'rec-key-' + key;
                    records.push(
                        <MatchRecord key={recordKey} rec={rec} />
                    )
                }
            });

        }

       
        //let plusTarget =plusDiv ;

        // <div className="match-group-plus">more<Glyphicon glyph="plus" /></div>
        let classes = "match-group " + otherClass;
        return connectDropTarget(
            <div className={classes} key={key} >
                <h4>Group ID {this.props.counter + 1}</h4>
                {records}
                <MatchPlus />
            </div>
        );
    }
}

MatchGroup.propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    group: PropTypes.object,
    id: PropTypes.any.isRequired,
    isOver: PropTypes.bool.isRequired,
};

let MatchGroupTarget =  DropTarget(constants.GROUP_RECORD, matchGroupSpec, matchGroupCollect)(MatchGroup);
export default MatchGroupTarget;
