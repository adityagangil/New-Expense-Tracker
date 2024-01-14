const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                counter: state.counter + 1,
            };

        case "DECREMENT":
            return {
                counter: state.counter - 1,
            };

        case "INCREMENTBY2":
            return {
                counter: state.counter + 2,
            };

        case "DECREMENTBY2":
            return {
                counter: state.counter - 2,
            };

        default:
            return {
                counter: state.counter,
            };
    }
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

// New actions
store.dispatch({ type: "INCREMENTBY2" });
store.dispatch({ type: "DECREMENTBY2" });
