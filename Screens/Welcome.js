import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const Home = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState('');
  const [featured, setFeatured] = React.useState([
    {
      id: 0,
      name: 'Jacket 4',

      bgColor: '#D09040',
      price: '$250',
      type: 'Featured',
      sizes: [6, 7, 8, 9, 10, 16],
    },
    {
      id: 1,
      name: 'Jacket 1',

      bgColor: '#D3D1C8',
      type: 'Featured',
      price: '$150',
      sizes: [6, 7, 8, 9, 10, 12],
    },
    {
      id: 2,
      name: 'Jacket 2',

      type: 'Featured',
      bgColor: '#303946',
      price: '$160',
      sizes: [6, 7, 8, 9, 10],
    },
  ]);
  const [recentSearches, setRecentSearch] = React.useState([
    {
      id: 0,
      name: 'Jacket 4',

      bgColor: '#D09040',
      price: '$250',
      type: 'Featured',
      sizes: [6, 7, 8, 9, 10, 16],
    },
    {
      id: 1,
      name: 'Sweater 3',

      type: 'Featured',
      bgColor: '#0F5144',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 16, 18],
    },
    {
      id: 2,
      name: 'Sweater 5',

      type: 'Featured',
      bgColor: '#888983',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 18],
    },
    {
      id: 7,
      name: 'Jacket 1',

      bgColor: '#D3D1C8',
      type: 'Featured',
      price: '$150',
      sizes: [6, 7, 8, 9, 10, 12],
    },
    {
      id: 8,
      name: 'Jacket 2',

      type: 'Featured',
      bgColor: '#303946',
      price: '$160',
      sizes: [6, 7, 8, 9, 10],
    },
    {
      id: 3,
      name: 'Hat 1',

      type: 'Featured',
      bgColor: '#26232A',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 16],
    },
    {
      id: 4,
      name: 'Shirt 1',

      type: 'Featured',
      bgColor: '#575569',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 16],
    },
    {
      id: 5,
      name: 'Shirt 2',

      type: 'Featured',
      bgColor: '#2B3A6B',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 16],
    },
    {
      id: 6,
      name: 'Shoe 1',

      type: 'Featured',
      bgColor: '#9E7348',
      price: '$100',
      sizes: [6, 7, 8, 9, 10, 12],
    },
  ]);
  function renderFeaturedItems (item) {
    return (
      <TouchableOpacity
        style={{
          height: 300,
          width: 200,
          justifyContent: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => {
          setSelectedItem(item);
          //setShowAddToCartModal(true);
        }}
      >
        <Text style={{ color: 'white' }}>{item.type}</Text>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',

              borderRadius: 10,
              marginRight: SIZES.padding,
              backgroundColor: item.bgColor,
            },
            style.featuredShadow,
          ]}
        >
          <View style={style.featuredDetails}>
            <Text style={{ marginTop: 15 }}>{item.name}</Text>
            <Text style={{ color: 'white' }}>{item.price}</Text>
          </View>
        </View>
        <Image
          //source={item.img}
          resizeMode='cover'
          style={{
            position: 'absolute',
            top: 25,
            right: 20,
            width: '90%',
            height: 200,
          }}
        />
      </TouchableOpacity>
    );
  }
  // paste recent searches code

  // paste renderSizes
  return (
    <View style={style.container}>
      <Text style={{}}>FEATURED</Text>
      {/* Featured */}
      <View style={{ height: 260 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featured}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => renderFeaturedItems(item, index)}
        />
      </View>
      {/* Recent Searches */}

      {/* Modal */}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eaturedShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  featuredDetails: {
    position: 'absolute',
    top: 160,
    left: 30,
    flexDirection: 'column',
    marginLeft: 25,
    marginBottom: 8,
  },
});

export default Home;
