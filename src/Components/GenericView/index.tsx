import { SafeAreaView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Header from '../Header'
import { ResponsiveWidth } from '../../utils/SizesHelper'

interface AuxProp {
    children: React.ReactNode;
    ViewStyle?: StyleProp<ViewStyle>;
    HeaderTitle?: string;
    onButtonPress?: any
}
const GenericView = ({ children, ViewStyle, HeaderTitle, onButtonPress }: AuxProp) => {
    return (
        <SafeAreaView style={ViewStyle}>
            <View style={styles.container}>
                <Header onButtonPress={() => { onButtonPress() }} title={HeaderTitle} />
                {children}
            </View>
        </SafeAreaView>
    )
}

export default GenericView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center"
    },
})