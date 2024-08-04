import './App.css';
import { Provider } from 'react-redux';
import {store }from './Redux/Store/store';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <ShoppingCart/>
     </div>
      </Provider>
  );
}
export default App;
