import { Mongo } from 'meteor/mongo';
 
export const Posts = new Mongo.Collection('posts');
Meteor.methods({
  'post.delete'(postId) {
    Posts.remove(
      { _id: postId}
    );
  }
});