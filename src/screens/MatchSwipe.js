import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Card from '../components/Card';

const MatchSwipe = () => {
  const colors = [
    "red",
    "yellow",
    "green",
    "pink",
    "blue",
    "orange",
    "purple",
    "brown",
    "cyan",
    "magenta",
    "teal",
    "lime",
    "indigo",
    "violet",
    "lavender",
    "maroon",
    "turquoise",
    "gold",
    "silver",
    "navy",
    "olive",
    "fuchsia",
    "salmon",
    "aquamarine",
    "coral",
    "peru",
    "tomato",
    "khaki",
    "plum",
    "orchid",
    "sienna",
    "slategray",
    "thistle",
    "burlywood",
    "cornflowerblue",
    "dodgerblue",
    "firebrick",
    "gainsboro",
    "honeydew",
    "ivory",
    "linen",
    "moccasin",
    "papayawhip",
    "rosybrown",
    "seagreen",
    "tan",
    "wheat",
  ];
  

  const getRandomColor=()=>
  {
    const color=colors[Math.floor(Math.random()*(colors.length-1))];
    // console.log(color)
    return color;
  }

  const [data, setData] = useState([
    {id: 1,bg:getRandomColor()},
    {id: 2,bg:getRandomColor()},
    {id: 3,bg:getRandomColor()},
    {id: 4,bg:getRandomColor()},
    {id: 5,bg:getRandomColor()},
    {id: 6,bg:getRandomColor()},
    {id: 7,bg:getRandomColor()},
    {id: 8,bg:getRandomColor()},
  ]);
  useEffect(() => {
    if (!data.length) {
      setData([
        {id: 1,bg:getRandomColor()},
        {id: 2,bg:getRandomColor()},
        {id: 3,bg:getRandomColor()},
        {id: 4,bg:getRandomColor()},
        {id: 5,bg:getRandomColor()},
        {
          id: 6,bg:getRandomColor()
        },
        {
          id: 7,bg:getRandomColor()
        },
        {
          id: 8,bg:getRandomColor()
        },
      ]);
    }
  }, [data]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      // console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setData(prepState => { console.log(prepState); return prepState.slice(1)});
   
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  return (
    <View style={{flex: 1,width:"95%",marginLeft:0,borderColor:"white",borderRadius:10,borderWidth:2}}>
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHanlders = isFirst ? panResponser.panHandlers : {};
          let zIndex = data.length - index; // Adjust zIndex to stack properly
          let translateY = isFirst ? 0 : (index-1) * 10; // Adjust translateY to stack and reveal cards
          let width=isFirst? "100%":("100"-(index*2))+"%"
          
          return (
            <Animated.View
            key={item.id}
            style={{
              position: 'relative',
              transform: [{ translateY }],
              zIndex, // Set zIndex
            }}
          >
            
            <Card
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              innerWidth={width}
              {...dragHanlders}
            />
            </Animated.View>
          );
        })
        .reverse()}

     
    </View>
  );
};

export default MatchSwipe;
