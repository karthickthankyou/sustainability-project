import { ApolloProvider } from './config/apollo'

import { NavigationContainer } from '@react-navigation/native'
import { TransactionsScreen } from './screens/Home'
import { ManufacturersScreen } from './screens/Manufacturers'
import { ProductsScreen } from './screens/Products'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <ApolloProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = 'ios-information-circle-outline'

              if (route.name === 'Transactions') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline'
              } else if (route.name === 'Products') {
                iconName = focused ? 'folder-open' : 'ios-folder-outline'
              } else if (route.name === 'Manufacturers') {
                iconName = focused ? 'ios-build' : 'ios-build-outline'
              }

              // You can return any component that you like here!
              // @ts-ignore
              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
        >
          <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="Manufacturers" component={ManufacturersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}
