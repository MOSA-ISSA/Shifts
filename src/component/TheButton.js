import React from "react"
import { View, Text, TouchableOpacity, } from 'react-native';

const TheButton = ({buttonName,buttonNameStyle,onPress,buttonStyle,children}) => {// need improve

    return(
        <TouchableOpacity style={[{alignItems: 'center',justifyContent:"center"},buttonStyle]} onPress={onPress}>
                {children?children:
                    <Text style={[{fontSize:15,color:'#fff'},buttonNameStyle]} >
                        {buttonName}
                    </Text>
                }
        </TouchableOpacity>
    )
}

export default TheButton