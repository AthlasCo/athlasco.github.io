import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  List,
  withStyles,
} from '@material-ui/core';
// import {
//   ArrowRight,
//   ExpandLess,
//   ExpandMore,
// } from '@material-ui/icons';

import TagTreeNode from './TagTreeNode';

import tagTreeStyles from './tagTreeStyles';

const TagTree = (props) => {
  const {
    // tagList,
    rootTags,
  } = props;

  // const [rootTags, setRootTags] = useState([]);

  // useEffect(() => {
  //   const newRootTags = tagList.filter((tag) => tag.parent === false);
  //   newRootTags.forEach((tag) => {
  //     if (rootTags.filter((rootTag) => rootTag.id === tag.id).length === 0) {
  //       setRootTags(rootTags.concat(tag));
  //     }
  //   });
  // }, [tagList]);

  return (
    <div>
      <List>
        {rootTags.map((tag) => (
          <TagTreeNode key={tag.id} tag={tag} />
        ))}
      </List>
    </div>
  );
};

TagTree.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  tagList: PropTypes.array.isRequired,
  rootTags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tagList: state.tags.tagList,
  rootTags: state.tags.rootTags,
});

export default withStyles(
  tagTreeStyles,
)(connect(mapStateToProps)(TagTree));
