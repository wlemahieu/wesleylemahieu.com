/**
 * App entry point, load css & render App component on root
 */
import './reset.css';
import './index.css';
import { render } from 'solid-js/web';
import App from '@components/App';

render(() => <App />, document.getElementById('root') as HTMLElement);
