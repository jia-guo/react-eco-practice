import { useForceUpdate, useMount, useUnmount, useSetup } from '../hooks';
import store from '../store';
import { increCounter, decreCounter } from '../store/counter';

export default function HookCounter() {
  const { getState, dispatch, subscribe } = store;

  // const forceUpdate = useForceUpdate();
  // let unsubscriber;
  // useMount(() => {
  //   unsubscriber = subscribe(forceUpdate, 1);
  // });
  // useUnmount(unsubscriber);

  const forceUpdate = useForceUpdate();
  useSetup(() => subscribe(forceUpdate));

  return (
    <div>
      <h1>{getState().count.count}</h1>
      <button onClick={() => dispatch(increCounter())}>+1</button>
      <button onClick={() => dispatch(decreCounter())}>-1</button>
    </div>
  );
}
