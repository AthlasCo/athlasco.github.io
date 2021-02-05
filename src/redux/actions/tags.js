// import firebase from 'firebase/app';
import { firebaseApp } from '../../firebase/Firebase';

export const TAG_TOGGLE_ADD_MODAL = 'TAG_TOGGLE_ADD_MODAL';
export const TAG_LIST_REQUEST = 'TAG_LIST_REQUEST';
export const TAG_ADD = 'TAG_ADD';
export const TAG_REMOVE = 'TAG_REMOVE';
export const TAG_UPDATE = 'TAG_UPDATE';
export const TAG_LIST_FAILURE = 'TAG_LIST_FAILURE';
export const TAG_LIST_UNSUBSCRIBE = 'TAG_LIST_UNSUBSCRIBE';
export const TAG_ADD_REQUEST = 'TAG_ADD_REQUEST';
export const TAG_ADD_FAILURE = 'TAG_ADD_FAILURE';

/** Firestore collection references */
const tagsCollection = firebaseApp.firestore().collection('tags');
/** ******************** */

/** Subscriptions for Firebase snapshots */
let tagListSubscription = null;
/** ******************** */

const toggleAddModalAction = (toggle) => ({
  type: TAG_TOGGLE_ADD_MODAL,
  toggle,
});

const requestTagListAction = () => ({
  type: TAG_LIST_REQUEST,
});

const addTagsAction = (tags) => ({
  type: TAG_ADD,
  tags,
});

const updateTagsAction = (tags) => ({
  type: TAG_UPDATE,
  tags,
});

const removeTagsAction = (tags) => ({
  type: TAG_REMOVE,
  tags,
});

const tagListErrorAction = (error) => ({
  type: TAG_LIST_FAILURE,
  error,
});

const tagListUnsubscribeAction = () => ({
  type: TAG_LIST_UNSUBSCRIBE,
});

const addTagRequestAction = () => ({
  type: TAG_ADD_REQUEST,
});

const addTagFailureAction = (error) => ({
  type: TAG_ADD_FAILURE,
  error,
});

export const setToggleAddModal = (toggle) => (dispatch) => {
  dispatch(toggleAddModalAction(toggle));
};

export const getTagList = () => (dispatch) => {
  dispatch(requestTagListAction());

  tagListSubscription = tagsCollection
    .orderBy('parent')
    .onSnapshot(
      (snapshot) => {
        const addTags = [];
        const updateTags = [];
        const removeTags = [];

        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // Add tag action
            addTags.push(change.doc);
          } else if (change.type === 'modified') {
            // Modify tag action
            updateTags.push(change.doc);
          } else if (change.type === 'removed') {
            // Remove tag action
            removeTags.push(change.doc);
          }
        });

        dispatch(addTagsAction(addTags));
        dispatch(updateTagsAction(updateTags));
        dispatch(removeTagsAction(removeTags));
      },
      (error) => {
        dispatch(tagListErrorAction(error));
      },
    );
};

export const unsubscribeGetTagList = () => (dispatch) => {
  if (tagListSubscription !== null) {
    tagListSubscription(); // Stop listening to changes
    dispatch(tagListUnsubscribeAction());
  }
};

export const addTag = (newTag) => (dispatch) => {
  dispatch(addTagRequestAction());

  tagsCollection
    .add({
      name: newTag.name,
      description: newTag.description,
      parent: newTag.parent,
      attributes: newTag.attributes,
    })
    .catch((error) => {
      dispatch(addTagFailureAction(error));
    });
};
