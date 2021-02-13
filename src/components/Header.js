import { memo } from 'react';
import { useSelector, useDispatch } from '../redux/react-redux';
import { updateHelloMessage } from '../store/hello';

// * 若不加memo，父组件重渲就会导致重渲
// * 但是兄弟节点重渲没关系
function Header() {
  console.log('header is re-rendered');
  const dispatch = useDispatch();
  const message = useSelector((state) => state.hello.message);
  return (
    <div>
      header {message}
      <button onClick={() => dispatch(updateHelloMessage(String(new Date())))}>
        change header
      </button>
    </div>
  );
}

export default memo(Header);
// export default Header;
