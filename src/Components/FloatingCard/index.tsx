import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResponsiveHeight, ResponsiveWidth, ResponsivePadding } from '../../utils/SizesHelper';
import { Colors } from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../CustomButton';
import Fonts from '../../utils/FontFamily';

type FloatingViewProps = {
    totalQuantity?: number;
    placeOrderPress?: () => void;
    text?: string;
    item?: object
};

const FloatingView: React.FC<FloatingViewProps> = ({ totalQuantity, placeOrderPress, text, item }) => {

    return (
        <LinearGradient
            colors={['#FFEFC5', '#FFF8E7']}
            start={{ x: 0.98, y: 0.5 }}
            style={styles.floatingView}
        >
            <View style={styles.container}>
                <View>
                    <Text numberOfLines={1} style={styles.floatingText}>
                        {text}
                    </Text>
                    <Text style={styles.floatingText1}>
                        Quantity - <Text style={styles.boldText}>{totalQuantity}</Text>
                    </Text>
                </View>
                <CustomButton
                    BGColor={Colors.Green}
                    height={ResponsiveHeight(32)}
                    width={ResponsiveWidth(104)}
                    BorderRadius={ResponsivePadding(7)}
                    title="Place Order"
                    onButtonPress={placeOrderPress}
                />
            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    floatingView: {
        position: 'absolute',
        bottom: ResponsiveHeight(20),
        height: ResponsiveHeight(60),
        width: ResponsiveWidth(343),
        backgroundColor: "rgb(255,244,218)",
        borderRadius: ResponsivePadding(10),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center"
    },
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: ResponsivePadding(20),
        justifyContent: "space-between"
    },
    floatingText: {
        color: Colors.lightBlack,
        fontSize: ResponsiveHeight(12),
        fontFamily: Fonts.SatoshiMedium,
        marginBottom: ResponsivePadding(5),
        maxWidth: ResponsiveWidth(164)
    },
    floatingText1: {
        color: Colors.lightBlack,
        fontSize: ResponsiveHeight(10),
        fontFamily: Fonts.SatoshiMedium,
        marginBottom: ResponsivePadding(5),
        maxWidth: ResponsiveWidth(164)
    },
    boldText: {
        fontFamily: Fonts.SatoshiBold
    }
});

export default FloatingView;