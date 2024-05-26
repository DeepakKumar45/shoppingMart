import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddIcon from "react-native-vector-icons/MaterialIcons";
import { Colors } from '../../utils/Colors';
import { ResponsiveHeight, ResponsiveWidth } from '../../utils/SizesHelper';
import { FontSize, responsiveFontSize } from '../../utils/FontSizes';
import Fonts from '../../utils/FontFamily';

type ButtonProps = {
    width?: number,
    height?: number,
    BGColor?: string,
    BorderRadius?: number,
    title?: string,
    onButtonPress?: (type: string) => void,
    quantity?: number;
    disabled?: boolean
};

const CustomButton: React.FC<ButtonProps> = ({
    width = 100,
    height = 50,
    BGColor = 'blue',
    BorderRadius = 10,
    title = "",
    onButtonPress = (type: any) => { },
    quantity = 0,
    disabled = false
}) => {
    return (
        <>
            {quantity > 0 ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            onButtonPress("Remove")
                        }}
                        style={[styles.actionButton, { backgroundColor: Colors.Red }]}
                    >
                        <AddIcon name="remove" size={18} color={Colors.white} />
                    </TouchableOpacity>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => onButtonPress("Add")}
                        style={[styles.actionButton, { backgroundColor: Colors.Green }]}
                    >
                        <AddIcon name="add" size={18} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    disabled={disabled}
                    onPress={() => onButtonPress("Add")}
                    style={[styles.button, {
                        width,
                        height, opacity: disabled ? 0.5 : 1,
                        backgroundColor: BGColor,
                        borderRadius: BorderRadius
                    }]}
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: ResponsiveWidth(121),
        height: ResponsiveHeight(35),
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center"
    },
    actionButton: {
        width: ResponsiveWidth(35),
        height: ResponsiveHeight(35),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ResponsiveHeight(7)
    },
    quantityContainer: {
        width: ResponsiveWidth(35),
        height: ResponsiveHeight(35),
        justifyContent: "center",
        alignItems: "center"
    },
    quantityText: {
        fontSize: responsiveFontSize(14),
        color: Colors.lightBlack,
        fontFamily: Fonts.SatoshiBold
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: FontSize.Font12,
        fontFamily: Fonts.SatoshiBlack,
        color: Colors.white
    }
});

export default CustomButton;