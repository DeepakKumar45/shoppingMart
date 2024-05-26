import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { responsiveFontSize } from '../../utils/FontSizes';
import Fonts from '../../utils/FontFamily';
import { Colors } from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ResponsiveHeight, ResponsivePadding, ResponsiveWidth } from '../../utils/SizesHelper';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import { logOut, setIsLoggedIn } from '../../redux/slices/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
AntDesign.loadFont()
type HeaderType = {
    title?: string;
    onButtonPress?: any
};

const Header = ({ title, onButtonPress }: HeaderType) => {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const dispatch = useDispatch()
    const onLogoutPress = () => {
        Alert.alert(
            "Logout",
            `${userInfo.name} Are you sure you want to logout?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        dispatch(clearCart())
                        dispatch(logOut())
                        GoogleSignin.signOut();
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.main}>
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    onPress={() => onButtonPress()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={responsiveFontSize(20)}
                        color={Colors.lightBlack}

                    />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>

            </View>
            <TouchableOpacity
                onPress={() => onLogoutPress()}
            >
                <AntDesign
                    name="logout"
                    size={responsiveFontSize(20)}
                    color={Colors.lightBlack}

                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: ResponsiveWidth(343),
        height: ResponsiveHeight(50),
        alignItems: "center",
        alignSelf: "center"
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
    },
    title: {
        fontSize: responsiveFontSize(20),
        fontFamily: Fonts.SatoshiBold,
        color: Colors.lightBlack,
        paddingHorizontal: ResponsivePadding(20),
    },
});

export default Header;