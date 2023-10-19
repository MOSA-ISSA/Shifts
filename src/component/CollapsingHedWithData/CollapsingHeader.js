import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
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
  data,
  RenderItem,
  style,
  CustomHeaderComponent,
  enableCustomHeader,
  children,
  AnimatedText
}) => {

  const [collapsed, setCollapsed] = useState(true);

  const HEADER_MAX_HEIGHT = headerMaxHeight||200;
  const HEADER_MIN_HEIGHT = headerMinHeight||50;
  const input_Range_Min= inputRangeMin||0
  const input_Range_Max= inputRangeMax||500
  const Title_Shown=titleShown||true
  const Text_MAX_Size = headerMaxHeight||25;
  const Text_MIN_Size = headerMinHeight||0;

  const scrollPosition = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollPosition.interpolate({
    inputRange: [input_Range_Min, input_Range_Max],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const fontSize =  scrollPosition.interpolate({
    inputRange: [input_Range_Min, input_Range_Max],
    outputRange: [Text_MAX_Size, Text_MIN_Size],
    extrapolate: 'clamp',
  });

  const marginB =  scrollPosition.interpolate({
    inputRange: [input_Range_Min, input_Range_Max],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  const collapsHeader = () => {
    console.log('collapsHeader');
    if (!collapsed) {
      setCollapsed(true);
      Animated.timing(scrollPosition, {
        toValue: input_Range_Min,
        duration: 300, // You can adjust the duration
        useNativeDriver: false,
      }).start();
    } else {
      setCollapsed(false);
      Animated.timing(scrollPosition, {
        toValue: input_Range_Max,
        duration: 300, // You can adjust the duration
        useNativeDriver: false,
      }).start();
    }
  }

  const inStart=()=>{
    setTimeout(() => {
      console.log("2 sec");
      setCollapsed(false);
      Animated.timing(scrollPosition, {
        toValue: input_Range_Max,
        duration: 1000, // You can adjust the duration
        useNativeDriver: false,
      }).start();
    }, (1000));
  }
  

  useEffect(() => {
    inStart()
  }, []);
  

  const RenderHeader=()=>(
    <Animated.View style={[headerStyles||styles.header, { height: headerHeight }]} onTouchEnd={()=>collapsHeader()}>
            {enableCustomHeader?
              <CustomHeaderComponent AnimatedStyle={{fontSize: fontSize, height: headerHeight}}/>/*how to do this*/
              :
              <>
              {AnimatedText?.map((item,i)=>

              <Animated.Text key={i} style={[styles.text,{fontSize: fontSize, marginBottom:marginB,}]}>{item||''}</Animated.Text>

              )}
              <Text style={[titleStyles||styles.title,{fontSize: 25,}]}>{title||"Collapsing Header"}</Text>
              </>
            }
    </Animated.View>
  )

  const renderData=(item)=>{
    // const x= RenderItem(item)
    return(
      RenderItem?
      RenderItem(item):
      <View style={styles.item}/>
    )
  }  

  return (
    <View style={{flex:1}||style}>
    <FlatList
        ListHeaderComponent={()=>RenderHeader()}
        stickyHeaderIndices={[0]}
        data={data||['a','b','c']}//||['a','b','c','a','b','c','a','b','c','a','b','c',]
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (renderData(item))}
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
    },
    text:{
      backgroundColor:'#fff',
      borderRadius:5,
      width: '50%',
      textAlign:'center',
      color:"#000"
    }
})