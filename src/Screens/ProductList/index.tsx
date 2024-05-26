import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ResponsiveHeight, ResponsivePadding, ResponsiveWidth, Spacer } from '../../utils/SizesHelper';
import Fonts from '../../utils/FontFamily';
import { FontSize, responsiveFontSize } from '../../utils/FontSizes';
import { Colors } from '../../utils/Colors';
import GenericView from '../../Components/GenericView';
import ProductItemCard from '../../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import FloatingView from '../../Components/FloatingCard';
import { addToCart, decrementQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { Routes } from '../../utils/Routes';
import { ImagePaths } from '../../utils/ImagePaths';
import SearchBar from '../../Components/SearchBar';
import EmptyData from '../../Components/EmptyData';

const localImages = [
    ImagePaths.Image1,
    ImagePaths.Image2,
    ImagePaths.Image3,
    ImagePaths.Image2,
];

const ProductList = ({ navigation }: any) => {
    const [productList, setProductList] = useState<any>([])
    const dispatch = useDispatch()
    const Products = useSelector((state: any) => state.products.products.data);
    const items = useSelector((state: any) => state.cart.items);
    const updatedArray: Array<{ [key: string]: any }> | undefined = Products?.map((item: any, index: number) =>
    ({
        ...item,
        image_src: localImages[index % localImages.length], // Use modulo to cycle through local images
        quantities: Object.keys(items).length > 0 && items[item.id]?.quantity || 0,
    }));

    useEffect(() => {
        setProductList(updatedArray)
    }, [Products, items])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleAddToBag = (item: any) => {
        dispatch(addToCart({ productId: item?.id, productName: item?.name, item }));
    }
    const handleRemoveFromBag = (item: any) => {
        dispatch(decrementQuantity(item?.id));
    }

    const sumQuantities = (obj: Record<string, { quantity: number }>): number => {
        return Object.values(obj).reduce((sum, item) => {
            return sum + item.quantity;
        }, 0);
    };
    const generateText = () => {
        let output = "";
        for (const key in items) {
            if (Object.keys(items).length > 1) {
                output += items[key].productName + ' and ' + (Object.keys(items).length - 1) + ' more ';
            } else {
                output += items[key].productName;
            }

            return output;
        }
    }

    const totalQuantity: any = useMemo(() => sumQuantities(items), [items]);

    const handleChange = (value: string) => {
        const filteredData = updatedArray?.filter(item => {
            // Check if name includes search query and sell_price matches or exceeds search query
            return (
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.sell_price.toLowerCase().includes(value.toLowerCase())
            );
        });
        setProductList(filteredData);
    }
    const debounce = <T extends (...args: any[]) => void>(func: T) => {
        let timer: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: Parameters<T>) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const optimizedFn = useCallback(debounce(handleChange), [productList])

    return (
        <GenericView onButtonPress={() => { }} HeaderTitle="Snacks" ViewStyle={styles.genericView}>
            <View style={{ width: ResponsiveWidth(343), }}>
                <Spacer space={10} />
                <SearchBar onTextChange={optimizedFn} />
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={({ item }) => (
                        <ProductItemCard
                            item={item}
                            title={item.title}
                            price={item.price}
                            navigation={navigation}
                            handleAddToBag={handleAddToBag}
                            handleRemoveFromBag={handleRemoveFromBag}
                            onCardPress={() => navigation.navigate(Routes.ProductDetail, { item, updatedArray })}
                        />
                    )}
                    ListEmptyComponent={() => <EmptyData />}
                />
            </View>
            {totalQuantity > 0 &&
                <FloatingView
                    totalQuantity={totalQuantity}
                    text={generateText()}
                    item={items}
                    placeOrderPress={() => navigation.navigate(Routes.MyBag)}
                />
            }
        </GenericView>
    );
};

export const styles = StyleSheet.create({
    genericView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    searchBarContainer: {
        height: ResponsiveHeight(52),
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    searchBarInnerContainer: {
        paddingLeft: ResponsivePadding(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBarInput: {
        fontFamily: Fonts.SatoshiRegular,
        paddingHorizontal: ResponsivePadding(20),
        fontSize: responsiveFontSize(14),
        color: Colors.lightBlack
    },
    flatListContent: {
        paddingBottom: ResponsiveHeight(200)
    },
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
});

export default ProductList;