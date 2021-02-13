import { useContext, createContext, Component, useLayoutEffect } from 'react';
import { bindActionCreators } from './index';
import { useForceUpdate, useSetup } from '../hooks';

const StoreContext = createContext();

export function Provider({ store, children }) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// * 用hook写 + 满足判断是否传入了mapState然后才subscribe => hook里面判断
// * 用class：
// *   似乎在constructor拿不到this.context => ctor第二参
// *   若在render进行处理则一直会重复subscribe => sub/unsub放入生命周期，其他要写render里面不然更新不了
export function connect(mapStateToProps, mapDispatchToProps) {
  return function connectHOC(WrappedComponent) {
    return class ContainerComponent extends Component {
      static contextType = StoreContext;

      constructor(props, context) {
        super(props);
        console.log(context);
      }
      componentDidMount() {
        const { subscribe } = this.context;
        // 存在mapState才subscribe
        if (mapStateToProps) {
          this.unsubscribe = subscribe(this.forceUpdate.bind(this));
        }
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      getDispatchProps = () => {
        const { dispatch } = this.context;
        let dispatchProps = { dispatch };
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        }
        return dispatchProps;
      };
      render() {
        const { getState } = this.context;
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(getState())}
            {...this.getDispatchProps()}
          />
        );
      }
    };

    // * 函数版
    // return function ContainerComponent(props) {
    //   const { getState, dispatch, subscribe } = useContext(StoreContext);
    //   let innerProps = { ...props };

    //   if (typeof mapStateToProps === 'function') {
    //     innerProps = { ...innerProps, ...mapStateToProps(getState()) };
    //   }

    //   if (mapDispatchToProps === undefined) {
    //     innerProps.dispatch = dispatch;
    //   } else if (typeof mapDispatchToProps === 'object') {
    //     Object.keys(mapDispatchToProps).forEach((key) => {
    //       innerProps[key] = () => dispatch(mapDispatchToProps[key]());
    //     });
    //   }

    //   const forceUpdate = useForceUpdate();
    //   useSetup(() => {
    //     let unsubscribe = () => {};
    //     if (mapStateToProps !== undefined) {
    //       unsubscribe = subscribe(forceUpdate);
    //     }
    //     return unsubscribe;
    //   });

    //   return <WrappedComponent {...innerProps} />;
    // };
  };
}

//
export function useSelector(selector) {
  const { getState, subscribe } = useContext(StoreContext);
  const selectedState = selector(getState());

  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = subscribe(forceUpdate);
    return unsubscribe;
  }, []);

  return selectedState;
}

export function useDispatch() {
  const { dispatch } = useContext(StoreContext);
  return dispatch;
}

export function useStore() {
  const store = useContext(StoreContext);
  return store;
}
