# Whiteboard project management

### This is the skeleton of an upcoming real-time application which will have the following user stories:

___

* only authenticated users should be able to use the program

* users should be able to create and join 'groups' where they are able to do the following:

 * create and join projects which has its own workplace

 * create private chat rooms

* on a workplace users should be able to put 'stickers' on the wall which can contain:
  text
  picture
  drawing
  YouTube video
  google maps

* stickers can than have connection between each other representing a unidirectional graph

* users are responsible for their own content, others cannot modify it, only workplace owners has admin rights

* in a workplace users can use a wall like forum which can serve as place to discuss things

* in case a new content added or something is modified they are immediately notified

___

### Nothing has been implemented yet only the basic building blocks.


#### Its tech stack:

* **Backend** : express, passport, google oauth and local strategy, express-session and socket io.

* **Frontend** : react, redux, immutable, redux-saga, semantic ui, redux-form, redux-router.

* **Building** : webpack, eslint, babel, jest, travis.
