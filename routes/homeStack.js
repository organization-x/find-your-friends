import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import ARScreen from '../app/screens/ARScreen'
import FriendsListScreen from '../app/screens/FriendsListScreen'
import {enableScreens} from 'react-native-screens'

const screens = {
  ARScreen: {
    screen: ARScreen
  },

  //This name below is what the screen navigates to
  FriendsListScreen: {
    screen: FriendsListScreen
  }

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
