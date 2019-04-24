import { Ability } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';

const GLOBAL_ACTIONS = Object.freeze({
    PURGE_DATA: "PURGE_DATA"
});


function purgeData({ access = 'read', subject, data, rules }) {
    const ability = new Ability(rules, { subjectName });

    if (ability.can('read', subject)) {
        return Object.entries(data).reduce((acc, [dataKey, dataEntry]) => {
            const permittedFields = permittedFieldsOf(ability, access, dataEntry);
            if (typeof dataEntry === 'object') {
                acc[dataKey] = permittedFields.reduce((_acc, _key) => {
                    _acc[_key] = dataEntry[_key];
                    return _acc;
                },{});
            } else {
                acc[dataKey] = dataEntry;
            }
            return acc;
        },{});
    }
    return {};
}

function subjectName(item) {
    if (!item || typeof item === 'string') {
        return item
    }
    return item.__type
}

export {
    GLOBAL_ACTIONS,
    purgeData
};