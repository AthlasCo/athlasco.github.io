import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Dehaze,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';

const TagTreeNode = (props) => {
  const [open, setOpen] = useState(true);
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    if (props.tag.children.length > 0) {
      setHasChildren(true);
    } else {
      setHasChildren(false);
    }
  }, [props.tag.children]);

  const getIcon = () => {
    if (hasChildren) {
      if (open) {
        return <ExpandLess />;
      }

      return <ExpandMore />;
    }

    return <Dehaze />;
  };

  return (
    <div>
      <ListItem
        button
        key={props.tag.id}
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon>
          {getIcon()}
        </ListItemIcon>
        <ListItemText primary={props.tag.name} />
      </ListItem>
      <Collapse in={open} unmountOnExit>
        {props.tag.children.map((child) => <TagTreeNode key={child.id} tag={child} />)}
      </Collapse>
    </div>
  );
};

TagTreeNode.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default TagTreeNode;
