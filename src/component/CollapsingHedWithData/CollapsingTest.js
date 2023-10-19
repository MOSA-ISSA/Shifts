import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useRef} from 'react'
import AnimatedScrollView from './AnimatedScrollView';

const CollapsingHeader = ({
  headerMaxHeight,
  headerMinHeight,
  inputRangeMin,
  inputRangeMax,
  headerStyles,
  title,
  titleStyles,
  titleShown,
  customHeaderComponent,
  data,
  RenderItem,
  style,
  CustomHeaderComponent,
  children
}) => {

  const HEADER_MAX_HEIGHT = headerMaxHeight||200;
  const HEADER_MIN_HEIGHT = headerMinHeight||50;
  const input_Range_Min= inputRangeMin||0
  const input_Range_Max= inputRangeMax||500
  const Title_Shown=titleShown||true

  const scrollPosition = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollPosition.interpolate({
    inputRange: [input_Range_Min, input_Range_Max],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const RenderHeader=()=>(
    <Animated.View style={[headerStyles||styles.header, { height: headerHeight }]}>
            {customHeaderComponent?
              <CustomHeaderComponent/>
              :
              <Text style={titleStyles||styles.title}>{title||Title_Shown?"Collapsing Header":""}</Text>
            }
    </Animated.View>
  )
  const RenderData=()=>(
    RenderItem?<RenderItem/>:<View style={styles.item}/>
  )

  return (
    <View style={{flex:1}||style}>
    <FlatList
        ListHeaderComponent={()=>RenderHeader()}
        stickyHeaderIndices={[0]}
        data={data||['a','b','c','a','b','c','a','b','c','a','b','c',]}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (RenderData(item))}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: false },
        )}
    />
      {children}
    </View>
  )
}

export default CollapsingHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4545',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:"black",
        borderWidth:5,
    },
    title: {
        fontSize: 24,
        color: '#fff',
    },
    item:{
        height: 200,
        width: 200,
        padding:10,
        margin:10,
        backgroundColor:"#252525",
        alignSelf:'center',
      }
})