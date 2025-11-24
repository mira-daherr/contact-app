import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.https.onCall((data, context) => {//the function angular can call it.
  console.log("Hello world"); //write a message in firebase logs.
  return { message: "Hello from Firebase!" };  //return a msg for frontend
});
///////////////////////this is the code in firebase