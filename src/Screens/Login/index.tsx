import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn, setUserInfo } from '../../redux/slices/userSlice';
import { googleLogin } from '../Authentication';
import CustomButton from '../../Components/CustomButton';
import { ResponsiveHeight, ResponsivePadding, ResponsiveWidth } from '../../utils/SizesHelper';
import { Colors } from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from '../../utils/FontSizes';

const Login = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const AuthLogin = (data: any) => {
        dispatch(setUserInfo(data));
        dispatch(setIsLoggedIn(true));
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.direction}>
                <CustomButton
                    title='Login with Google'
                    onButtonPress={() => googleLogin(AuthLogin)}
                    BGColor={Colors.Green}
                    height={ResponsiveHeight(50)}
                    width={ResponsiveWidth(180)}
                    BorderRadius={ResponsivePadding(7)}
                />
                <AntDesign
                    name="googleplus"
                    size={responsiveFontSize(50)}
                    style={{ paddingHorizontal: ResponsivePadding(10) }}
                    color={Colors.Red}

                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonText: {
        color: '#222222',
        fontWeight: '500',
        fontSize: 18,
    },
    direction: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export default Login;