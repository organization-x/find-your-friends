import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ARScreen from '../app/screens/ARScreen'
import FriendsListScreen from '../app/screens/FriendsListScreen'
import { enableScreens } from 'react-native-screens'
import LoginScreen from '../app/screens/LoginScreen'
import LoadingScreen from '../app/screens/LoadingScreen'

const screens = {
  // This name below is what the screen navigates to
  LoginScreen: {
    screen: LoginScreen
  },

  LoadingScreen:{
    screen: LoadingScreen
  },

  FriendsListScreen: {
    screen: FriendsListScreen
  },

  ARScreen: {
    screen: ARScreen
  }

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
