import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { APP_REGISTRY_NAME } from './src/constants/appInfo';

AppRegistry.registerComponent(APP_REGISTRY_NAME, () => App);
