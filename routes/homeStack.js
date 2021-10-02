import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ARScreen from '../app/screens/ARScreen';
import FriendsListScreen from '../app/screens/FriendsListScreen';

const screens = {
    ARScreen: {
        screen: ARScreen
    },

    FriendsListScreen: {
        screen: FriendsListScreen
    }

}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);