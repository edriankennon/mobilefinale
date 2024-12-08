import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import placesData from '../placesdatapage/placesdata';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const FavoritesScreen = ({ navigation }) => {
  const places = Object.values(placesData);
  const firstFourPlaces = places.slice(0, 4); // Only get the first four places

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Places</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color="white" style={styles.icon} />
          <Ionicons name="filter" size={24} color="white" style={styles.icon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {firstFourPlaces.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('BusinessDetails', { place })}
          >
            <Image source={place.images[0]} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{place.name}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(place.rating)].map((_, idx) => (
                    <Ionicons key={idx} name="star" size={16} color="gold" style={styles.starIcon} />
                  ))}
                </View>
              </View>
              <Text style={styles.cardSubtitle}>{place.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Dynamic padding based on screen width
    paddingTop: height * 0.08, // Dynamic padding for top space
    paddingBottom: height * 0.03, // Dynamic bottom padding
    backgroundColor: '#32a852',
  },
  headerText: {
    fontSize: width * 0.06, // Scaled font size
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: width * 0.35, // Adjusted for better centering
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: width * 0.04, // Adjusted margin based on screen width
  },
  contentContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: height * 0.02, // Dynamic margin for cards
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: width * 0.25, // Dynamic image width based on screen width
    height: width * 0.25, // Dynamic image height
    margin: width * 0.04, // Margin around image
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    paddingVertical: height * 0.03, // Dynamic padding
    paddingRight: width * 0.04, // Adjusted padding for right side
    justifyContent: 'center',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: width * 0.05, // Scaled font size
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: width * 0.035, // Smaller subtitle font size
    color: 'gray',
    marginTop: height * 0.01, // Margin adjusted
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Align stars vertically with the title
    marginLeft: width * 0.02,  // Slight space between title and stars
    justifyContent: 'flex-start',  // Ensures stars are beside the title
  },
  starIcon: {
    marginRight: width * 0.01,  // Space between stars
  },
});

export default FavoritesScreen;
