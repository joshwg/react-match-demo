
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MatchGrouper from './MatchGrouper/MatchGrouper';
import MatchTable from './MatchTable/MatchTable';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './App.css';

// Data should come from the server via a redux store.
// with reducers and actions and such but for simplicity we just 
import * as Store from './Store';

class App extends Component {
    constructor() {
        super(...arguments);

        let groupIds = this.makeGroupIds(Store.recordList);

        this.state = {
            grouperShowing: false,
            records: Store.recordList,
            sortBy: "accepted",
            sortDirection: "asc",
            groupIds: groupIds,
        };

        this.fns = {
            oldFn: this.oldFn,
            newFn: this.newFn,
            customFn: this.customFn,
            setGroupFn: this.setGroupFn,
            setCustomFn: this.setCustomFn,
            setRecordCustomGroup: this.setRecordCustomGroup,
            acceptCustomFn: this.acceptCustomFn,
            revertCustomFn: this.revertCustomFn,
        }
    }

    makeGroupIds = (records) => {
        let groupIds = {};
        
        records.forEach( (rec) => {
            let custGroup = rec.group[2];
            groupIds[custGroup] = groupIds[custGroup] || { '$group': custGroup };
            groupIds[custGroup][rec.id] = rec;
        });

        return groupIds;
    }

    // MatchTable heading functions.
    oldFn = () => {
        let newState = { 
            sortBy: "accepted",
            sortDirection: "asc",
            grouperShowing: false,
        };
        if( this.state.sortBy === "accepted" ) {
            newState.sortDirection = (this.state.sortDirection === "asc") ? "desc" : "asc";
        }
        this.setState( newState );
    }
    newFn = () => {
        let newState = { 
            sortBy: "proposed",
            sortDirection: "asc",
            grouperShowing: false,
        };
        if( this.state.sortBy === "proposed" ) {
            newState.sortDirection = (this.state.sortDirection === "asc") ? "desc" : "asc";
        }
        this.setState( newState );
    }
    customFn = () => {
        let newState = { sortBy: "custom", sortDirection: "asc", grouperShowing: true };
        // You can no longer sort descending this column
        // if( this.state.sortBy === "custom" ) {
        //     newState.sortDirection = (this.state.sortDirection === "asc") ? "desc" : "asc";
        // }
        this.setState( newState );
    }

    // Pulldown functions
    setGroupFn = (newGroup) => {
        let newState = {
            sortBy: newGroup,
            sortDirection: "asc",
            grouperShowing: false
        };
        this.setState( newState );
    }

    setCustomFn = () => {
        let newState = {
            sortBy: "custom",
            sortDirection: "asc",
            grouperShowing: true
        };
        this.setState( newState );
    }

    setRecordCustomGroup = (recordId, newGroupId) => {
        let recs = this.state.records;
        let rec = this.state.records.find( (r) => { return r.id === recordId; });

        //console.log('Move record ' + recordId + ' from ' + rec.group[2] + ' to ' + newGroupId );

        rec.group[2] = newGroupId;
        let groupIds = this.makeGroupIds(recs);        
        this.setState({ groupIds: groupIds, records: recs });
    }

    acceptCustomFn = () => {
        let newState = { sortBy: "custom", sortDirection: "asc", grouperShowing: false };
        this.setState(newState);
    }

    // currently we update the records one by one as the user changes them
    // This is a mass update
    revertCustomFn = (groups) => {
        let recs = this.state.records;
        recs.forEach( (r, i) => {
            r.group[2] = groups[i];
        });
        let groupIds = this.makeGroupIds(recs);        
        this.setState({ groupIds: groupIds, records: recs,grouperShowing: false });
    }

    render() {
       
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Auto Match Demo</h2>
                </div>
                   
                    { this.state.grouperShowing ?
                        <ReactCSSTransitionGroup transitionName="grouper"
                            transitionEnter={false}
                            transitionLeave={false}
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            >
                            <MatchGrouper fns={this.fns} state={this.state} />
                        </ReactCSSTransitionGroup>
                                :
                        <ReactCSSTransitionGroup transitionName="grouper"
                            transitionEnter={false}
                            transitionLeave={false}
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            >
                            <MatchTable fns={this.fns} state={this.state} />
                        </ReactCSSTransitionGroup>
                    }
            </div>
        );
    }
}

//export default App;
export default DragDropContext(HTML5Backend)(App);
