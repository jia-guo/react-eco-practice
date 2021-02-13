import { useDispatch, useSelector } from '../redux/react-redux';
import { increCounter, decreCounter } from '../store/counter';

export default function ReactReduxHookCounter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increCounter())}>+1</button>
      <button onClick={() => dispatch(decreCounter())}>-1</button>
    </div>
  );
}
