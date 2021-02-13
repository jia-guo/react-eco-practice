import { connect } from '../redux/react-redux';
import { increCounter, decreCounter } from '../store/counter';

function Counter(props) {
  console.log('connect counter re-rendered', props);
  return (
    <div>
      <h1>{props.count}</h1>
      <button onClick={props.increCounter}>+1</button>
      <button onClick={props.decreCounter}>-1</button>
    </div>
  );
}

export default connect((state) => ({ count: state.count.count }), { increCounter, decreCounter })(
  Counter
);
