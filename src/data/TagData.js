/* eslint-disable lines-between-class-members */
import Record from 'dataclass';

export default class TagData extends Record {
  id: string = '';
  name: string = '';
  description: string = '';
  parent: string = null;
  children: Array = [];
  attributes: Array = [];

  equals(other: TagData) {
    return this.id === other.id
      && this.name === other.name
      && this.description === other.description
      && this.parent === other.parent
      && this.attributes === other.attributes;
  }

  getChild(id: string) {
    const childIndex = this.children.findIndex((child) => child.id === id);

    return this.children[childIndex];
  }

  addChild(newTag: TagData) {
    return this.copy({
      children: this.children.concat(newTag),
    });
  }
}
