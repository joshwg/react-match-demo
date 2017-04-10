
import MatchBody from './MatchBody';
import MatchHead from './MatchHead';
import React, { Component, PropTypes } from 'react';
import {Button, ButtonToolbar, Col, DropdownButton, MenuItem, Table, Well} from 'react-bootstrap';


class MatchTable extends Component {

    submitAction = (e) => {
        e.preventDefault();
        alert('Submit pressed');
    };

    render() {
        let dropDownTitle = this.props.state.sortBy.charAt(0).toUpperCase() +
            this.props.state.sortBy.slice(1);

        let dropdownStyle = { minWidth: "100px" };
        return (
            <Col xs={12}>
                <Well>
                    <div id="match-group-buttons">
                        <ButtonToolbar>
                            <DropdownButton id="match-group-choice" title={dropDownTitle} style={dropdownStyle}>
                                <MenuItem eventKey="accepted" onSelect={this.props.fns.setGroupFn} >Accepted</MenuItem>
                                <MenuItem eventKey="proposed" onSelect={this.props.fns.setGroupFn} >Proposed</MenuItem>
                                <MenuItem eventKey="custom" onSelect={this.props.fns.setCustomFn} >Custom</MenuItem>
                            </DropdownButton>
                            <Button bsStyle="primary" onClick={this.submitAction}>Submit</Button>
                        </ButtonToolbar>
                    </div>

                    <Table bordered id="MatchTable" >
                        <MatchHead fns={this.props.fns} state={this.props.state} />
                        <MatchBody fns={this.props.fns} state={this.props.state} />
                    </Table>
                </Well>
            </Col>
        );
    }
}

MatchTable.propTypes = {
    fns: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
}

export default MatchTable;
