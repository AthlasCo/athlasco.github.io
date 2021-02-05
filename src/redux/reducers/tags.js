/* eslint-disable import/prefer-default-export */
import {
  TAG_TOGGLE_ADD_MODAL,
  TAG_ADD,
} from '../actions';

import TagData from '../../data/TagData';

const createTagObject = (tag) => new TagData({
  id: tag.id,
  name: tag.data().name,
  description: tag.data().description,
  parent: tag.data().parent,
  attributes: tag.data().attributes,
});

const addTag = (pt, parentPath, newTag) => {
  const parentTag = pt;

  if (parentPath.length === 0) {
    parentTag.children.push(newTag);
    console.log(parentTag.children);
  } else {
    const tagId = parentPath.shift();
    const currIndex = parentTag.children.findIndex(
      (tag) => tag.id === tagId,
    );

    parentTag.children[currIndex] = addTag(
      parentTag.children[currIndex],
      parentPath,
      newTag,
    );
  }

  return parentTag;
};

const addTagToTree = (tagList, newTag) => {
  const modifiedTagList = tagList;

  // Separate parent path and remove empty elements
  const parentPath = newTag.parent.split('~').filter((val) => val !== '');

  // Find base root tag
  const parentTagId = parentPath.shift();
  const rootIndex = tagList.findIndex(
    (tag) => tag.id === parentTagId,
  );
  modifiedTagList[rootIndex] = addTag(modifiedTagList[rootIndex], parentPath, newTag);

  return modifiedTagList;
};

export const tagsReducer = (
  state = {
    tagList: [],
    rootTags: [],
    addModalToggle: false,
  },
  action,
) => {
  switch (action.type) {
    case TAG_TOGGLE_ADD_MODAL:
      return {
        ...state,
        addModalToggle: action.toggle,
      };
    case TAG_ADD: {
      const newTagList = state.tagList;
      let newRootTagList = state.rootTags;

      action.tags.forEach((tag) => {
        const newTag = createTagObject(tag);

        if (newTagList.filter((t) => t.equals(newTag)).length === 0) {
          newTagList.push(newTag);

          if (newTag.parent) {
            newRootTagList = addTagToTree(newRootTagList, newTag);
          } else {
            newRootTagList.push(newTag);
          }
        }
      });

      return {
        ...state,
        tagList: newTagList,
        rootTags: newRootTagList,
      };
    }
    default:
      return state;
  }
};
