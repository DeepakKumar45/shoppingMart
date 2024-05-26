import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GenericView from '../../Components/GenericView';
import { Colors } from '../../utils/Colors';
import ListCard from '../../Components/ListCard';
import { FontSize, responsiveFontSize } from '../../utils/FontSizes';
import Fonts from '../../utils/FontFamily';
import { ResponsiveHeight, ResponsivePadding, ResponsiveWidth, Spacer } from '../../utils/SizesHelper';
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from '../../Components/CustomButton';
import { useSelector } from 'react-redux';
import EmptyData from '../../Components/EmptyData';

const MyBag = (props: any) => {
    const items = useSelector((state: any) => state.cart.items);
    console.log("items here", items)
    const LocationCard = () => {
        return (
            <View style={styles.locationCardContainer}>
                <View style={styles.locationIconContainer}>
                    <Octicons name="location" size={ResponsiveHeight(20)} color={Colors.lightBlack} />
                </View>
                <Spacer row={5} />
                <Text style={styles.locationText}>Floor 4, Wakil Tower, Ta 131 Gulshan Badda Link Road</Text>
            </View>
        );
    };

    const subTotal = Object.values(items)?.map(i => Number(i?.item?.sell_price ? i?.item?.sell_price : 0) * Number(i.quantity ? i.quantity : 0)).reduce((a, b) => Number(a) + Number(b), 0)
    const deliveryCharges = subTotal != 0 ? 50 : 0
    const Total = subTotal + deliveryCharges
    const AmountCard = ({
        label = "",
        amount = "",
        fontFamily = Fonts.SatoshiMedium
    }) => {
        return (
            <>
                <View>
                    <View style={styles.amountRow}>
                        <Text style={[styles.amountText, styles.boldText, { fontFamily: fontFamily }]}>{label}</Text>
                        <Text style={[styles.amountText, styles.boldText]}>₹{amount}</Text>
                    </View>
                    <Spacer space={10} />
                </View>
            </>
        );
    };

    const PaymentMethod = () => {
        return (
            <>
                <Text style={styles.paymentMethodTitle}>Payment Method</Text>
                <Spacer space={10} />
                <TouchableOpacity style={styles.paymentMethodButton}>
                    <View style={styles.paymentMethodIcon}>
                        <Text style={styles.currencySymbol}>₹</Text>
                    </View>
                    <Spacer row={5} />
                    <Text style={styles.paymentMethodText}>Tap Here to select your Payment Method</Text>
                    <Feather name="chevron-right" size={ResponsiveHeight(24)} color={Colors.lightBlack} />
                </TouchableOpacity>
            </>
        );
    };

    return (
        <GenericView HeaderTitle="My Bag"
            onButtonPress={() => props.navigation.goBack()}
            ViewStyle={styles.genericView}>
            <View>
                <FlatList
                    data={Object.values(items)}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <Spacer space={15} />
                            <Text style={styles.headerText}>Products</Text>
                        </>
                    )}
                    ListFooterComponent={() => (
                        <View style={styles.footerContainer}>
                            <Spacer space={10} />
                            <Text style={styles.additionalInstructionsTitle}>Additional Instructions</Text>
                            <Spacer space={5} />
                            <View style={styles.additionalInstructionsBox} />
                            <Spacer space={15} />
                            <View style={styles.deliveryLocationContainer}>
                                <Text style={styles.deliveryLocationText}>Delivery Location</Text>
                                <Text style={styles.changeText}>Change</Text>
                            </View>
                            <Spacer space={10} />
                            <LocationCard />
                            <Spacer space={15} />
                            <AmountCard label='Subtotal' fontFamily={Fonts.SatoshiMedium} amount={subTotal} />
                            <AmountCard label={"Delivery Charge"} fontFamily={Fonts.SatoshiMedium} amount={deliveryCharges} />
                            <AmountCard label='Total' amount={Total} fontFamily={Fonts.SatoshiBold} />
                            <Spacer space={20} />
                            <PaymentMethod />
                            <Spacer space={20} />
                            <CustomButton
                                BGColor={Colors.Green}
                                height={ResponsiveHeight(48)}
                                width="100%"
                                BorderRadius={ResponsivePadding(7)}
                                title="Place Order"
                                onButtonPress={() => props.navigation.goBack()}
                                disabled={Total == 0}
                            />
                            <Spacer space={30} />
                        </View>
                    )}
                    ListEmptyComponent={<EmptyData height={120} text={"Your cart is empty"} />}
                    renderItem={({ item }) => <ListCard added={true} item={item?.item} quantity={item?.quantity} />}
                />
            </View>
        </GenericView>
    );
};

export default MyBag;

const styles = StyleSheet.create({
    genericView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    locationCardContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationIconContainer: {
        height: ResponsiveHeight(43),
        width: ResponsiveHeight(43),
        backgroundColor: "rgb(228,237,250)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ResponsivePadding(30),
    },
    locationText: {
        width: ResponsiveWidth(251),
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(14),
        fontFamily: Fonts.SatoshiRegular,
        lineHeight: ResponsiveHeight(18.9),
    },
    amountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    amountText: {
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(15),
        fontFamily: Fonts.SatoshiMedium,
        lineHeight: ResponsiveHeight(20.25),
    },
    boldText: {
        fontFamily: Fonts.SatoshiBold,
    },
    paymentMethodTitle: {
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(15),
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(20.25),
    },
    paymentMethodButton: {
        height: ResponsiveHeight(85),
        backgroundColor: "rgb(227,244,237)",
        borderRadius: ResponsiveHeight(12),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: ResponsivePadding(15),
    },
    paymentMethodIcon: {
        height: ResponsiveHeight(42),
        width: ResponsiveWidth(42),
        backgroundColor: Colors.Green,
        borderRadius: ResponsiveHeight(30),
        justifyContent: "center",
        alignItems: "center",
    },
    currencySymbol: {
        color: Colors.white,
        fontSize: FontSize.Font18,
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(20.25),
    },
    paymentMethodText: {
        color: Colors.lightBlack,
        fontSize: FontSize.Font14,
        fontFamily: Fonts.SatoshiMedium,
        lineHeight: ResponsiveHeight(18.9),
        width: ResponsiveWidth(229),
    },
    headerText: {
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(16),
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(21.6),
        width: ResponsiveWidth(343),
        alignSelf: "center",
    },
    footerContainer: {
        width: ResponsiveWidth(343),
        alignSelf: "center",
    },
    additionalInstructionsTitle: {
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(16),
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(21.6),
    },
    additionalInstructionsBox: {
        height: ResponsiveHeight(80),
        borderRadius: ResponsiveHeight(8),
        backgroundColor: Colors.gray,
    },
    deliveryLocationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    deliveryLocationText: {
        color: Colors.lightBlack,
        fontSize: responsiveFontSize(16),
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(21.6),
    },
    changeText: {
        color: Colors.Green,
        fontSize: responsiveFontSize(16),
        fontFamily: Fonts.SatoshiMedium,
        lineHeight: ResponsiveHeight(21.6),
    },
});