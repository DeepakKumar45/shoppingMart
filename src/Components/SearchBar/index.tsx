import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "../../Screens/ProductList";
import { Colors } from "../../utils/Colors";
import { responsiveFontSize } from "../../utils/FontSizes";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type SearchBarProps = {
    onTextChange: any
}

const SearchBar = React.memo((props: SearchBarProps) => {
    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchBarInnerContainer}>
                <FontAwesome5
                    name="search"
                    size={responsiveFontSize(18)}
                    color={Colors.lightBlack}
                />
                <TextInput
                    placeholder="Search Anything"
                    style={styles.searchBarInput}
                    onChangeText={props.onTextChange}
                    placeholderTextColor={Colors.lightBlack}
                />
            </View>
        </View>
    )
});

export default SearchBar