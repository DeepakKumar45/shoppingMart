import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResponsiveHeight } from '../../utils/SizesHelper';
import { styles as ProductListStyles } from '../../Screens/ProductList';

const EmptyData = ({ height = 500, text = "No product found" }) => {
    return (
        <View style={emptyDataStyles.container(height)}>
            <Text style={ProductListStyles.productTitle}>{text}</Text>
        </View>
    );
};

const emptyDataStyles = StyleSheet.create({
    container: (height: any) => ({
        justifyContent: 'center',
        height: ResponsiveHeight(height),
        alignItems: 'center',
    }),
});

export default EmptyData;