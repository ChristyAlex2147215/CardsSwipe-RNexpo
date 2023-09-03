import { View, Text, Image, Dimensions, Animated } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // Using Expo's LinearGradient

// Get the device's screen dimensions
const { height, width } = Dimensions.get('window');

const Card = ({ item, isFirst, swipe,innerWidth, ...rest}) => {
  // Define animations for card rotation and opacity based on swipe position
  const rotate = swipe.x.interpolate({
    inputRange: [-1000, 0, 1000],
    outputRange: ['-50deg', '0deg', '50deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Function to render the Tinder choice buttons (Nope and Like)
  // console.log("innerwidth is =>",item.id,innerWidth);
  const tinderSelection = useCallback(() => {
    return (
      <>
         {/* change the deg to rotate the text */}
        {/* positive Value here */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            opacity: nopeOpacity,
            transform: [{ rotate: '0deg' }],
          }}>
          <Image source={require("../images/fail-png.png")} style={{width:100,height:100}}/>
        </Animated.View>
        {/* change the deg to rotate the text */}
        {/* nagative Value here */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            opacity: likeOpacity,
            transform: [{ rotate: '0deg' }],
          }}>
          <Image source={require("../images/success-png.png")} style={{width:100,height:100}}/>
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
       
          height: height - 150,
          alignSelf: 'center',
          backgroundColor:item.bg,
          position: 'absolute',
          top: 40,
          width:innerWidth,
          borderRadius: 10,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
        },
      ]}
      {...rest}>
      {/* Display the card's image */}
    
      {/* Apply a linear gradient overlay */}
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          position: 'absolute',
        }}>
     
      </View>
      {/* Render Tinder choice buttons if it's the first card */}
      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

export default Card;
