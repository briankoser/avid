export const addPick = ({ dispatch, state }, pick) => dispatch('ADDPICK', pick)

export const addStateEntry = ({ dispatch, state }, entry) => dispatch('ADDSTATEENTRY', entry)

export const undoLastPick = ({ dispatch, state }) => dispatch('UNDOLASTPICK')

export const undoStateEntry = ({ dispatch, state }) => dispatch('UNDOSTATEENTRY')
