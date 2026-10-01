// Import the Firebase app initialization function.
import { initializeApp } from "firebase/app";

// Import the Firestore functions needed to read our database.
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// Create the Firebase configuration using values stored in the environment file.
const firebaseConfig = {
  // Store the Firebase API key.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // Store the Firebase authentication domain.
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // Store the Firebase project ID.
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // Store the Firebase Storage bucket.
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // Store the Firebase messaging sender ID.
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // Store the Firebase application ID.
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize the Firebase application.
const app = initializeApp(firebaseConfig);

// Connect to the Firestore database.
const db = getFirestore(app);

// Export a function that retrieves and sorts all posts from Firestore.
export async function getSortedPostsData() {
  // Get a reference to the posts collection.
  const postsCollection = collection(db, "posts");
  // Retrieve all documents from the posts collection.
  const postsSnapshot = await getDocs(postsCollection);
  // Convert each Firestore document into a JavaScript object.
 // Convert each Firestore document into a JavaScript object.
const allPostsData = postsSnapshot.docs.map((document) => {
  // Create a post object using the Firestore document fields.
  const postData = Object.assign({}, document.data());
  // Add the Firestore document ID to the post object.
  postData.id = document.id;
  // Return the completed post object.
  return postData;
});

  // Sort the posts by date with the newest post first.
  return allPostsData.sort((a, b) => {
    // Return a positive value when post a is older than post b.
    if (a.date < b.date) {
      // Place post b before post a.
      return 1;
    }
    // Place post a before post b in all other cases.
    return -1;
  });
}

// Export a function that retrieves all post IDs for static generation.
export async function getAllPostIds() {
  // Get a reference to the posts collection.
  const postsCollection = collection(db, "posts");
  // Retrieve all documents from the posts collection.
  const postsSnapshot = await getDocs(postsCollection);
  // Convert each document into the params format required by Next.js.
  return postsSnapshot.docs.map((document) => ({
    // Provide the dynamic route parameters for the post page.
    params: {
      // Use the Firestore document ID as the route ID.
      id: document.id,
    },
  }));
}

// Export an asynchronous function that retrieves one post by ID.
export async function getPostData(id) {
  // Create a reference to the requested post document.
  const postReference = doc(db, "posts", id);
  // Retrieve the requested post document from Firestore.
  const postSnapshot = await getDoc(postReference);
  // Return the post data when the document exists.
  return postSnapshot.exists() ? postSnapshot.data() : null;
}