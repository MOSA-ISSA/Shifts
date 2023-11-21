import { Animated, FlatList, PanResponder, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import AnimatedScrollView from './AnimatedScrollView';
import { globalHW } from '../../../Storge/global';

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

  const [collapsed, setCollapsed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const HEADER_MAX_HEIGHT = headerMaxHeight||200;
  const HEADER_MIN_HEIGHT = headerMinHeight||50;
  const input_Range_Min= inputRangeMin||0
  const input_Range_Max= inputRangeMax||globalHW.windowHeight*0.25//
  const Title_Shown=titleShown||true
  const Text_MAX_Size = headerMaxHeight||25;
  const Text_MIN_Size = headerMinHeight||0;



  const scrollPosition = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const panResponder = useRef(
    PanResponder.create({ // inhance
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {

        console.log(currentIndex)

        if (currentIndex==0 && gestureState.moveY > 60 ) {/////////////////////////////////
          // Dragged to the bottom
          scrollToTop()
          setCollapsed(false);
          collapsing(input_Range_Min);
          console.log('Dragged to the bottom',currentIndex);
        } 
        else if ( gestureState.moveY < 60  ) {  
          // Dragged to the top
          setCollapsed(true);
          collapsing(input_Range_Max);
          console.log('Dragged to the top',currentIndex);
        }
        console.log(gestureState.moveY);
      },
    })
  ).current;  // make function

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
  // chick if can collect

  const collapsing=(input_Range)=>{
    Animated.timing(scrollPosition, {
    toValue: input_Range,
    duration: 300, // You can adjust the duration
    useNativeDriver: false,
  }).start();}

  const collapsHeader = () => {
    if (collapsed) {
      setCollapsed(false);
      collapsing(input_Range_Min)
    } else {
      setCollapsed(true);
      collapsing(input_Range_Max)

    }
  } // not used

  const inStart=()=>{
    setTimeout(() => {
      console.log("2 sec");
      setCollapsed(true);
      Animated.timing(scrollPosition, {
        toValue: input_Range_Max,
        duration: 1000, // You can adjust the duration
        useNativeDriver: false,
      }).start(); // استقبل duration
    }, (1000));
  }

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true })
    // .then(()=>{
    //   setCollapsed(false)
    //   collapsing(input_Range_Min)
    // })
  };// hellp

  const onMomentumScrollEnd = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(contentOffsetY / (globalHW.windowHeight*0.25)); // Assuming ITEM_HEIGHT is known
    setCurrentIndex(index);
    console.log('Scrolled to index:', index);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: {
      contentOffset: collapsed ? null : { y: scrollPosition }
    }}],
  { useNativeDriver: false },
  )
  
  const RenderHeader=()=>( // export ?
    <Animated.View style={[headerStyles||styles.header, { height: headerHeight }]} onTouchEnd={()=>{scrollToTop()}} {...panResponder.panHandlers}>
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
      <View style={styles.item} />
    )
  }

  useEffect(() => {
    inStart()
  }, []);

  console.log('collapsHeader', collapsed);

  return (
    <View style={{flex:1}||style}>
    <FlatList
        ref={flatListRef}
        ListHeaderComponent={()=>RenderHeader()}
        stickyHeaderIndices={[0]}
        data={['a','b','c','a','b','c','a','b','c','a','b','c',]||['a','b','c']}//||['a','b','c','a','b','c','a','b','c','a','b','c',]
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (renderData(item))}
        // onScrollBeginDrag={(e)=>{
        //   var y=e.nativeEvent.contentOffset.y
        //   console.log(e.nativeEvent.contentOffset.y);
        //   // setCollapsed(true)
        //   console.log(collapsed);
        //   if(y<headerHeight.__getValue()/2&&collapsed){
        //     // setCollapsed(false)
        //     // collapsing(input_Range_Min)
        //   }
        // }}
        onScroll={onScroll}
        
        onScrollEndDrag={()=>{
          // console.log("onScrollEndDrag");
          if (headerHeight.__getValue()==HEADER_MIN_HEIGHT) {
            // console.log( scrollPosition,input_Range_Max,headerHeight.__getValue()+1);
            setCollapsed(true)
          }
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        // refreshing={true}
        // onRefresh={()=>log("top")}
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