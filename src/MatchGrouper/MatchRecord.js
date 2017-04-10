import constants from '../constants';
import { DragSource } from 'react-dnd';
import React, { Component, PropTypes } from 'react';
//import { Table } from 'react-bootstrap';

const matchRecordSpec = {
    beginDrag(props) {
        console.log('Dragging record #' + props.rec.id);
        return {
            id: props.rec.id
        }
    },

    // endDrag(props, monitor) {
    //     const recordBeingDragged = monitor.getItem();
    //     const dropResult = monitor.getDropResult(); // whatever drop() returned
    //     if(dropResult) {
    //         console.log('Item ' + recordBeingDragged.id + ' was dragged'); 
    //     }
    //}
}

let matchRecordCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
}

class MatchRecord extends Component {
    render() {
        const { connectDragSource } = this.props;
        
        let rows=[];
        let keys = Object.keys(this.props.rec);
        /* limit to 8 */
        let max = Math.min(keys.length - 1, 8);
        let width = (100 / max).toFixed(1)+"%";
        keys.forEach( (k) => {
            if(k !== 'group' /* && k !== 'id'*/) {
                rows.push( <td key={k} className="match-record" width={width} >{this.props.rec[k]}</td>);
                //rows.push(this.props.rec[k]);
            }
        });

        return connectDragSource(
            <div className='match-group-record left'>
                <table >
                    <tbody>
                    <tr>{rows}</tr>
                    </tbody>
                </table>
                {/*{rows.join(', ')}*/}
            </div>
        );
    }
}

MatchRecord.propTypes = {
    rec: PropTypes.object.isRequired
}

export default DragSource(constants.GROUP_RECORD, matchRecordSpec, matchRecordCollect )( MatchRecord );
