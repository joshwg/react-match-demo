
import {Button, ButtonGroup, Col, Well} from 'react-bootstrap';
import MatchGroup from './MatchGroup';
import React, { Component } from 'react';

class MatchGrouper extends Component {

    constructor() {
        super(...arguments);
        // preserve the current custom groups
        // Not sure this is a good practice
        let groups = [];
        this.props.state.records.forEach( (r) => {
            groups.push(r.group[2]);
        });

        this.state = {
            oldGroups: groups
        }

        console.log('Grouper Created');
    }

    makeNewGroupId = () => {
        // find the highest custom group
        let max = -Infinity;
        this.props.state.records.forEach((r) => {
            if(r.group[2] > max) max = r.group[2];
        });
        return max + 1;
    }

    moveRecord = (recordId, toGroupId) => {
        let oldGroupIds = this.props.state.groupIds;
        let newGroupId = ((toGroupId === "new") ? this.makeNewGroupId() : oldGroupIds[toGroupId].$group);
        this.props.fns.setRecordCustomGroup(recordId, newGroupId);
    }

    accept = () => {
        this.props.fns.acceptCustomFn();
    }

    cancel = () => {
        this.props.fns.revertCustomFn(this.state.oldGroups);
    }

    render() {

        //let groupCount = Object.keys(this.state.groupIds).length;
        let groups = [];
        let counter = 0;
        let groupKey = undefined;

        // not enough browsers support this
        //Object.values(this.props.state.groupIds).forEach( (group) => {
        Object.keys(this.props.state.groupIds).forEach(  (key) => {
            let group = this.props.state.groupIds[key];
            groupKey = 'groupKey' + counter;
            groups.push(<MatchGroup counter={counter} key={groupKey} id={group.$group} group={ group } moveFn={this.moveRecord} /> );
            ++counter;
        });
        groupKey = "groupKey" + counter;
        groups.push( <MatchGroup counter={counter} key={groupKey} id="new" moveFn={this.moveRecord} /> );

        let buttons = (
            <ButtonGroup className="match-group-btns">
                <Button onClick={this.accept}>Accept</Button>
                <Button onClick={this.cancel}>Cancel</Button>
            </ButtonGroup>
        )
        return (
           
                <Col xs={12} >
                    <Well>
                        <h3 className="match-group-header">Drag Records Between Groups</h3>
                        {buttons}
                        {groups}
                        {buttons}
                    </Well>
                </Col>
        );
    }
}

export default MatchGrouper;
