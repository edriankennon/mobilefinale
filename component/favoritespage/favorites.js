import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import placesData from '../placesdatapage/placesdata';

const FavoritesScreen = ({ navigation }) => {
  const places = Object.values(placesData);

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
        {places.map((place, index) => (
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
                    <Ionicons key={idx} name="star" size={16} color="gold" />
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
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#32a852',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 30,
    paddingLeft: 145,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 20,
    paddingRight: 15,
    justifyContent: 'center',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default FavoritesScreen;
