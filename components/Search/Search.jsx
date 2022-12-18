import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = ({ placeholder, searchQuery, setSearchQuery }) => {
    return (
      <Searchbar
        placeholder={placeholder}
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
      />
    );
}

export default Search;