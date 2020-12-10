import React from 'react';
import { Box, Button, Text } from '../../components/atoms';
import { FavouritesProps } from '../../navigation/Profile';

const Favourites = ({ navigation }: FavouritesProps) => {
  return (
    <Box>
      <Text>Favourites</Text>
      <Button
        onPress={() => navigation.navigate('Product', { id: 'ProductId' })}
        label="Go to Product"
      />
    </Box>
  );
};

export default Favourites;
