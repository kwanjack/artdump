import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Comments = new Mongo.Collection('comments');

Meteor.methods({
  'comment.insert'(text, postId) {
    Comments.insert({
      postId: postId,
      text: text,
      createdAt: new Date(),
      authorId: this.userId,
      authorUsername: Meteor.users.findOne(this.userId).username,
    });
  },
  'comment.delete'(commentId) {
    Comments.remove(
      { _id: commentId}
    );
  }
});