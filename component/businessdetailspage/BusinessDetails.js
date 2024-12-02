import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import placesdata from '../placesdatapage/placesdata';

const BusinessDetails = ({ route, navigation }) => {
  const { place } = route.params || {};
  const placeDetails = placesdata[place?.name];

  if (!placeDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Place details not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Image with Overlayed Header */}
      <View style={styles.imageContainer}>
        <Image source={placeDetails.images[0]} style={styles.mainImage} />
        <View style={styles.headerOverlay}>
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Place Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{placeDetails.name}</Text>
        <Text style={styles.subtitle}>Manolo Fortich, Bukidnon</Text>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[...Array(placeDetails.rating)].map((_, i) => (
            <Ionicons key={i} name="star" size={20} color="gold" />
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="green" />
          <Text style={styles.locationDetail}>{placeDetails.location}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Overview */}
        <Text style={styles.overviewTitle}>OVERVIEW</Text>
        <Text style={styles.description}>{placeDetails.overview}</Text>

        {/* Read More Button */}
        <TouchableOpacity style={styles.readMoreButton}
          onPress={() =>
          navigation.navigate('ReadMore', {
            description: placeDetails.description,
            placeName: placeDetails.name,
            location: placeDetails.location,
            rating: placeDetails.rating,
            image: placeDetails.images[0], // Pass the image here
          })
        }
      >
        <Text style={styles.readMoreButtonText}>Read More</Text>
        </TouchableOpacity>



        {/* Action Buttons Section */}
        <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location-outline" size={30} color="black" />
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}
            onPress={() =>
               navigation.navigate('Guidelines', {
                guidelines: placeDetails.guidelines,
                placeName: placeDetails.name,
                location: placeDetails.location,
                rating: placeDetails.rating,
                image: placeDetails.images[0],
            })
          }
        >
          <Ionicons name="book-outline" size={30} color="black" />
          <Text style={styles.actionText}>Guidelines</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate('Prices', {
              placeDetails: placeDetails,
            })
          }
        >
            <FontAwesome5 name="percentage" size={30} color="black" />
            <Text style={styles.actionText}>Prices</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ContactUs', {
                contactInfo: {
                  contactNumber: placeDetails.contactNumber,
                  email: placeDetails.email,
                  address: placeDetails.address,
                  name: placeDetails.name,
                  image: placeDetails.images[0],
                  location: placeDetails.location,
                  rating: placeDetails.rating, // Include rating here
                },
              })
            }
            style={styles.actionButton}
          >
            <FontAwesome5 name="address-book" size={30} color="black" />
            <Text style={styles.actionText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Go There Now Button */}
        <TouchableOpacity style={styles.goThereButton}>
          <Text style={styles.goThereButtonText}>Go there now!</Text>
        </TouchableOpacity>

        {/* Photos Section */}
        <View style={styles.photosContainer}>
          <Text style={styles.photosTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {placeDetails.images.map((image, index) => (
              <Image key={index} source={image} style={styles.photo} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  iconButton: {
    padding: 5,
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: '100%',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 2,
    width: '100%',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDetail: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    marginVertical: 15,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 50,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  readMoreButton: {
    backgroundColor: '#32a852',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
    width: '80%',
    marginTop: 20,
  },
  readMoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    fontWeight: '500',
  },
  goThereButton: {
    backgroundColor: '#32a852',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
    width: '80%',
    marginTop: 20,
  },
  goThereButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photosContainer: {
    width: '100%',
    marginTop: 20,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photo: {
    width: 120,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 8,
  },
});

export default BusinessDetails;
