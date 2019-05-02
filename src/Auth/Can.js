import React, { PureComponent } from 'react';
import { Can } from '@casl/react';
import { Ability } from '@casl/ability';
import { connect } from 'react-redux';

class CanComponent extends PureComponent {

    state = {
        ability: CanComponent.genAbility([])
    };

    static genAbility(rules) {
        return new Ability(rules, { subjectName: CanComponent.subjectName });
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ability: CanComponent.genAbility(props.rules)
        };
    }

    static subjectName(item) {
        if (!item || typeof item === 'string') {
            return item
        }

        return item.__type
    }

    render() {
        const { ability } = this.state;
        const { rules, ...props } = this.props;

        return (
            <Can ability={ability} { ...props } />
        );
    }

    static mapState(state) {
        return {
            rules: state.auth.rules
        };
    }
}

export default connect(CanComponent.mapState)(CanComponent);