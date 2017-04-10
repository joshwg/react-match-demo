import React, { Component } from 'react';

//let rnd = 0;

class MatchBody extends Component {

    acceptedSort(a,b) { return a.group[0] - b.group[0]; }
    proposedSort(a,b) { return a.group[1] - b.group[1]; }
    customSort(a,b) { return a.group[2] - b.group[2]; }

    AddPseudoGroups(row, cols, map, groupOffset) {
        let groupId = undefined;
        // my real groups
        let realAcceptedGroup = row.group[0];
        let realProposedGroup = row.group[1];
        let realCustomGroup = row.group[2];

        // find my psuedo groups
        let acceptedGroup = map.acceptedMap[realAcceptedGroup];
        let proposedGroup = map.proposedMap[realProposedGroup];
        let customGroup = map.customMap[realCustomGroup];

        if(!acceptedGroup) {
            ++map.acceptedCount;
            map.acceptedMap[realAcceptedGroup] = map.acceptedCount;
            acceptedGroup = map.acceptedCount;
        }
        if(groupOffset === 0) {
            groupId = acceptedGroup;
        }

        if(!proposedGroup) {
            ++map.proposedCount;
            map.proposedMap[realProposedGroup] = map.proposedCount;
            proposedGroup = map.proposedCount;
        }
        if(groupOffset === 1) {
            groupId = proposedGroup;
        }


        if(!customGroup) {
            ++map.customCount;
            map.customMap[realCustomGroup] = map.customCount;
            customGroup = map.customCount;
        }
        if(groupOffset === 2) {
            groupId = customGroup;
        }


        cols.push( <td key="{colKey}Accepted">{acceptedGroup}</td> );
        cols.push( <td key="{colKey}Proposed" >{proposedGroup}</td> );
        cols.push( <td key="{colKey}Custom" >{customGroup}</td> );

        return groupId;
    }
    
    render() {
        let rows = [];
    
        let source = this.props.state.records;
        let sortFn = this.acceptedSort;
        let groupOffset = 0;
        if(this.props.state.sortBy === "proposed") {
            sortFn = this.proposedSort;
            groupOffset = 1;
        }
        else if(this.props.state.sortBy === "custom") {
            sortFn = this.customSort;
            groupOffset = 2;
        }


        let records = source.sort( sortFn );
        //rnd = rnd + 2;

        let rowCount = 0;
        let map = {
            acceptedCount: 0,
            proposedCount: 0,
            customCount: 0,
            acceptedMap: {},
            proposedMap: {},
            customMap: {}
        }

        source.forEach( (row) => {
            // Get an pseudo accepted, proposed and custom group
            let rowKey = "row" + rowCount;
            let colCount = 3;
            let cols = [];

            let groupId = this.AddPseudoGroups(row, cols, map, groupOffset);

            // just exercise colors for the moment
            let rowClass="group" + (((groupId+19) % 20) + 1);
            //cols.push(<td key="group">{rowClass}</td>);

            Object.keys(row).forEach( (k) => {
                if(k !== 'group' && k !== 'id') {
                    let colKey = rowKey + "c" + colCount;

                    cols.push( <td className="left" key={colKey} >{ records[rowCount][k]}</td>);
                    ++colCount;
                }
            });
            
            rows.push( <tr className={rowClass} key={rowKey} >{cols}</tr>);
            ++rowCount;
        });

        if(this.props.state.sortDirection === "desc") {
           rows = rows.reverse();
        }


        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}

export default MatchBody;
