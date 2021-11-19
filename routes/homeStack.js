import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import ARScreen from '../app/screens/ARScreen'
import FriendsListScreen from '../app/screens/FriendsListScreen'
import LoginScreen from '../app/screens/LoginScreen'
import LoadingScreen from '../app/screens/LoadingScreen'
import MapScreen from '../app/screens/MapScreen'

const screens = {
  // This name below is what the screen navigates to
  LoadingScreen: {
    screen: LoadingScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  FriendsListScreen: {
    screen: FriendsListScreen
  },
  ARScreen: {
    screen: ARScreen
  },
  MapScreen: {
    screen: MapScreen
  }

}

const HomeStack = createSwitchNavigator(screens)

export default createAppContainer(HomeStack)
