import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../Screens/ProductDetail";
import { useDispatch } from "react-redux";
import { fetchProductDetail } from "../../redux/slices/productDetailsSlice";
import CustomButton from "../CustomButton";
import { ResponsiveWidth } from "../../utils/SizesHelper";
import { addToCart, decrementQuantity } from "../../redux/slices/cartSlice";

const ListCard = React.memo(({ item, added, quantity }: any) => {
    const dispatch = useDispatch()
    return (
        <TouchableOpacity
            key={item?.id}
            onPress={() => {
                dispatch(fetchProductDetail({ productId: item?.id }));
            }}
            style={styles.listCardContainer}>
            <Image
                style={styles.listCardImage}
                source={item?.image_src}
            />
            {!added ? <View style={[styles.listCardTextContainer]}>
                <Text numberOfLines={2} style={styles.listCardTitle}>
                    {item?.name}
                </Text>
                <Text style={styles.oldPrice}>{"₹" + (parseInt(item.sell_price) * 1.5).toFixed(2)}</Text>
                <Text style={styles.newPrice}>{"₹" + item.sell_price}</Text>
            </View>
                :
                <View style={[styles.listCardTextContainer]}>
                    <Text numberOfLines={2} style={styles.listCardTitle}>
                        {item?.name}
                    </Text>
                    <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                        <View >
                            <Text style={styles.oldPrice}>{"₹" + (parseInt(item.sell_price) * 1.5).toFixed(2)}</Text>
                            <View style={styles1.row}>
                                <Text style={styles.newPrice}>{"₹" + item.sell_price}</Text>
                                <CustomButton quantity={quantity} onButtonPress={(type: any) => {
                                    if (type == "Add") {
                                        dispatch(addToCart({ productId: item?.id, productName: item?.name, item }));
                                    } else {
                                        console.log("itemmm", item.id)
                                        dispatch(decrementQuantity(item?.id));
                                    }
                                }} />
                            </View>
                        </View>
                    </View>
                </View>}
        </TouchableOpacity>
    );
});

const styles1 = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: ResponsiveWidth(210),
        justifyContent: "space-between",
        alignItems: "flex-end"
    }
})

export default ListCard