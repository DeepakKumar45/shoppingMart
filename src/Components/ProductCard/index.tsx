import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import { ResponsiveHeight, ResponsivePadding, ResponsiveWidth } from "../../utils/SizesHelper";
import { Colors } from "../../utils/Colors";
import { FontSize, responsiveFontSize } from "../../utils/FontSizes";
import Fonts from "../../utils/FontFamily";
import { Routes } from "../../utils/Routes";
import { ImagePaths } from "../../utils/ImagePaths";

type ProductItemProps = {
    title?: string;
    price?: string | number;
    navigation?: any;
    item?: any;
    handleAddToBag?: any;
    onCardPress?: any;
    handleRemoveFromBag?: any
}

const ProductItemCard = ({ title, price, navigation, item, handleAddToBag, onCardPress, handleRemoveFromBag }: ProductItemProps) => {
    return (
        <TouchableOpacity
            onPress={onCardPress}
            style={styles.productCard}>
            <View style={styles.productImageContainer} >
                <Image
                    source={item.image_src}
                    style={styles.productImage}
                />
            </View>
            <View style={styles.productDetails}>
                <Text numberOfLines={2} style={styles.productTitle}>
                    {item?.name}
                </Text>
                <Text style={styles.productPrice}>{"₹" + item?.sell_price}</Text>
                <CustomButton
                    BGColor={Colors.Green}
                    height={ResponsiveHeight(35)}
                    width="100%"
                    BorderRadius={ResponsivePadding(7)}
                    title="Add To Bag"
                    quantity={item?.quantities}
                    onButtonPress={(type: string) => {
                        if (type == "Add") {
                            handleAddToBag(item)
                        } else {
                            handleRemoveFromBag(item)
                        }
                        // navigation.navigate(Routes.ProductDetail)
                    }}
                />
            </View>
        </TouchableOpacity>
    )
};

export default ProductItemCard

const styles = StyleSheet.create({
    productCard: {
        height: ResponsiveHeight(272),
        width: ResponsiveWidth(164),
        marginEnd: ResponsivePadding(15),
        marginVertical: 20
    },
    productImageContainer: {
        height: ResponsiveHeight(135),
        width: '100%',
        backgroundColor: Colors.gray,
        borderRadius: ResponsivePadding(9),
        marginBottom: ResponsivePadding(10),
        justifyContent: "center",
        alignItems: "center"
    },
    productDetails: {
        justifyContent: 'space-around',
        height: ResponsiveHeight(137),
    },
    productTitle: {
        fontSize: FontSize.Font14,
        lineHeight: ResponsiveHeight(18.9),
        color: Colors.lightBlack,
        fontFamily: Fonts.SatoshiMedium,
        marginBottom: ResponsivePadding(5),
    },
    productPrice: {
        fontSize: FontSize.Font16,
        lineHeight: ResponsiveHeight(21.6),
        color: Colors.orange,
        fontFamily: Fonts.SatoshiBold,
        marginBottom: ResponsivePadding(10),
    },
    productImage: {
        height: ResponsiveHeight(121),
        width: ResponsiveWidth(115)
    }
});