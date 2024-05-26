import { View } from 'react-native';
import { scale, verticalScale, moderateScale, ms } from 'react-native-size-matters';

type SpacerProps = {
    space?: any
    row?: any
}

export const ResponsivePadding = (padding: number) => {
    return moderateScale(padding)
}

export const ResponsiveHeight = (height: number) => {
    return ms(height)
}

export const ResponsiveWidth = (width: number) => {
    return ms(width)
}

export const Spacer = (props: SpacerProps) => {
    const { space, row } = props;
    return (
        <View
            style={{
                marginVertical: space && ms(space),
                marginHorizontal: row && ms(row),
            }}
        />
    );
};