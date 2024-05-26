import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GenericView from '../../Components/GenericView';
import { ResponsiveHeight, ResponsiveWidth, Spacer } from '../../utils/SizesHelper';
import { Colors } from '../../utils/Colors';
import { fetchProductDetail } from '../../redux/slices/productDetailsSlice';
import { ImagePaths } from '../../utils/ImagePaths';
import { FontSize } from '../../utils/FontSizes';
import Fonts from '../../utils/FontFamily';
import CustomButton from '../../Components/CustomButton';
import { addToCart } from '../../redux/slices/cartSlice';
import ListCard from '../../Components/ListCard';

const ProductDetail = (props: any) => {
    const { route } = props;
    const _id = route.params.item.id;
    const updatedArray = route.params.updatedArray
    const dispatch = useDispatch();
    const ProductDetail = useSelector((state: any) => state.productDetail?.categories?.data?.product_detail[0]);
    const items = useSelector((state: any) => state.cart.items);
    const [image, setImage] = useState(route.params.item.image_src)
    const [prodDetails, setProdDetails] = useState<any>(ProductDetail)
    const [products, setProducts] = useState<any[]>([])
    const flatListRef = useRef(null)
    useEffect(() => {
        const data = updatedArray.map((item: any, index: number) => {
            return {
                ...item,
                isSelected: index == 0 ? true : false
            }
        })
        const data1 = { ...ProductDetail, quantities: items[ProductDetail?.id]?.quantity || 0 };
        setProdDetails(data1)
        setProducts(data)
    }, [])

    useEffect(() => {
        dispatch(fetchProductDetail({ productId: _id }));
    }, [dispatch]);

    const onPressImage = useCallback((index: number) => {
        const tempArray = products.map((item, i) => ({
            ...item,
            isSelected: i === index
        }));
        const selected = tempArray.find(item => item.isSelected);
        setImage(selected?.image_src || '');
        setProducts(tempArray);
    }, [products]);


    const Card = React.memo(({ imageSrc, onImagePress, index }: any) => (
        <TouchableOpacity onPress={() => onImagePress(index)}>
            <Image
                style={styles.cardImage(products[index]?.isSelected)}
                source={imageSrc}
            />
        </TouchableOpacity>
    ));

    const onAddToBagPress = () => {
        const data1 = { ...prodDetails, image_src: image, quantities: prodDetails?.quantities + 1 };
        dispatch(addToCart({ productId: ProductDetail?.id, productName: ProductDetail?.name, item: data1 }));
        props.navigation.goBack()
    }

    return (
        <GenericView HeaderTitle="Product Detail"
            onButtonPress={() => props.navigation.goBack()}
            ViewStyle={styles.genericView}>
            <FlatList
                ref={flatListRef}
                data={updatedArray}
                contentContainerStyle={styles.flatListContent}
                ListHeaderComponent={(
                    <View style={styles.headerContainer}>
                        <Spacer space={10} />
                        <View style={styles.container}>
                            <View style={styles.shadowContainer}>
                                <Image
                                    source={image}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                        <Spacer space={20} />
                        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
                            {updatedArray?.map((item: any, index: number) => (
                                <>
                                    <Card
                                        key={index}
                                        onImagePress={(index: number) => {
                                            onPressImage(index)
                                        }}
                                        imageSrc={item?.image_src}
                                        index={index} />
                                    <Spacer row={10} />
                                </>
                            ))}
                        </ScrollView>
                        <Spacer space={12} />
                        <Text style={styles.productTitle}>{ProductDetail?.name}</Text>
                        <Spacer space={10} />
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{ProductDetail?.quantity ? ProductDetail?.quantity : "0"} KG</Text>
                            <Text style={[styles.price, { color: Colors.Green }]}>₹{ProductDetail?.sell_price ? ProductDetail?.sell_price : ""}</Text>
                        </View>
                        <Spacer space={10} />
                        <Text style={styles.description}>
                            {ProductDetail?.description}
                        </Text>
                        <Spacer space={20} />
                        <Text style={styles.relatedItemsTitle}>
                            You can also check this items
                        </Text>
                    </View>
                )}
                ListFooterComponent={(
                    <View style={{ marginTop: 20 }}>
                        <CustomButton
                            title={"Add To Bag"}
                            BGColor={Colors.Green}
                            height={ResponsiveHeight(48)}
                            width={ResponsiveWidth(343)}
                            BorderRadius={ResponsiveWidth(7)}
                            onButtonPress={() => { onAddToBagPress() }}
                        />
                        <Spacer space={10} />
                    </View>

                )}
                renderItem={({ item }) => <ListCard item={item} />}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </GenericView>
    );
};

export default ProductDetail;

export const styles = StyleSheet.create({
    genericView: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadowContainer: {
        backgroundColor: 'white',
        height: ResponsiveHeight(308),
        width: ResponsiveWidth(294),
        borderRadius: ResponsiveHeight(9),
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        height: ResponsiveHeight(308),
        width: ResponsiveWidth(294),
        borderRadius: 10, // Adjust this value based on your preference
        overflow: 'hidden', // Ensure image stays within the rounded corners
    },
    cardImage: (border: boolean) => ({
        height: ResponsiveHeight(66),
        width: ResponsiveWidth(66),
        backgroundColor: Colors.white,
        borderRadius: ResponsiveHeight(7),
        borderWidth: border ? ResponsiveHeight(2) : 0,
        borderColor: Colors.Green,
    }),
    listCardContainer: {
        height: ResponsiveHeight(164),
        borderBottomWidth: 1,
        width: ResponsiveWidth(376),
        borderColor: Colors.lightGrey,
        alignItems: 'center',
        flexDirection: 'row',
    },
    listCardImage: {
        height: ResponsiveHeight(121),
        width: ResponsiveWidth(115),
        backgroundColor: Colors.white,
        borderRadius: ResponsiveHeight(9),
    },
    listCardTextContainer: {
        width: ResponsiveWidth(203),
    },
    listCardTitle: {
        fontSize: FontSize.Font16,
        fontFamily: Fonts.SatoshiMedium,
        color: Colors.lightBlack,
        lineHeight: ResponsiveHeight(21.6),
        height: ResponsiveHeight(55),
    },
    oldPrice: {
        fontSize: FontSize.Font14,
        fontFamily: Fonts.SatoshiBlack,
        color: Colors.lightBlack,
        opacity: 0.54,
        textDecorationLine: 'line-through',
        lineHeight: ResponsiveHeight(18.9),
    },
    newPrice: {
        fontSize: FontSize.Font20,
        fontFamily: Fonts.SatoshiBlack,
        color: Colors.orange,
        lineHeight: ResponsiveHeight(27),
        marginTop: ResponsiveHeight(4),
    },
    productTitle: {
        fontSize: FontSize.Font18,
        fontFamily: Fonts.SatoshiMedium,
        color: Colors.lightBlack,
        width: ResponsiveWidth(320),
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: FontSize.Font29,
        fontFamily: Fonts.SatoshiBlack,
        lineHeight: ResponsiveHeight(39.15),
        color: Colors.lightBlack,
    },
    description: {
        fontSize: FontSize.Font14,
        fontFamily: Fonts.SatoshiLight,
        lineHeight: ResponsiveHeight(18.9),
        color: Colors.mediumBlack,
    },
    relatedItemsTitle: {
        fontSize: FontSize.Font16,
        fontFamily: Fonts.SatoshiBold,
        lineHeight: ResponsiveHeight(21.6),
        color: Colors.lightBlack,
    },
    flatListContent: {
        alignItems: 'center',
    },
    headerContainer: {
        width: ResponsiveWidth(343),
    },
});