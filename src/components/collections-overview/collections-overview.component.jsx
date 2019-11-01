import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collections-overview.styles.scss';


const collectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </div>
);

const mapStateTpProps = createStructuredSelector({
  collections: selectCollections
});

export default connect(mapStateTpProps)(collectionsOverview);
