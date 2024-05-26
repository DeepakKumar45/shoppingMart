import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../utils/Routes';
import { Login, MyBag, ProductDetail, ProductList } from '../Screens';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const LoggedInPath = () => (
    <>
      <Stack.Screen name={Routes.ProductList} component={ProductList} />
      <Stack.Screen name={Routes.ProductDetail} component={ProductDetail} />
      <Stack.Screen name={Routes.MyBag} component={MyBag} />
    </>
  );

  const OnBoardingPath = () => (
    <>
      <Stack.Screen name={Routes.Login} component={Login} />
    </>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? LoggedInPath() : OnBoardingPath()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;