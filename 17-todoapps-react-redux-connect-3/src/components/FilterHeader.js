import React, {Component} from 'react';
import FilterLink from "../containers/FilterLink";

class FilterHeader extends Component {

    render() {
        return (
            <div>
                <FilterLink filter='SHOW_ALL' {...this.props}>All</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_ACTIVE' {...this.props}>Active</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_COMPLETED' {...this.props}>Competed</FilterLink>
            </div>
        );
    }
}

export default FilterHeader;