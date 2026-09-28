// Import the Node.js file system module to read files.
import fs from "fs";
// Import the Node.js path module to build file paths.
import path from "path";

// Export a function that reads and sorts all posts.
export function getSortedPostsData() {
  // Create the path to the JSON file containing the posts.
  const postsFile = path.join(process.cwd(), "data", "posts.json");
  // Read the JSON file as a UTF-8 string.
  const fileContents = fs.readFileSync(postsFile, "utf8");
  // Parse the JSON string into a JavaScript array.
  const allPostsData = JSON.parse(fileContents);
  // Sort the posts by date, placing the newest post first.
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

// Export a function that returns all post IDs for static generation.
export function getAllPostIds() {
  // Create the path to the JSON file containing the posts.
  const postsFile = path.join(process.cwd(), "data", "posts.json");
  // Read the JSON file as a UTF-8 string.
  const fileContents = fs.readFileSync(postsFile, "utf8");
  // Parse the JSON string into a JavaScript array.
  const allPostsData = JSON.parse(fileContents);
  // Convert each post into the params format expected by Next.js.
  return allPostsData.map((post) => {
    // Return an object containing the current post's ID.
    return {
      // Provide the dynamic route parameters for the post page.
      params: {
        // Set the route ID to the post's unique ID.
        id: post.id,
      },
    };
  });
}

// Export an asynchronous function to retrieve one post by ID.
export async function getPostData(id) {
  // Create the path to the JSON file containing the posts.
  const postsFile = path.join(process.cwd(), "data", "posts.json");
  // Read the JSON file as a UTF-8 string.
  const fileContents = fs.readFileSync(postsFile, "utf8");
  // Parse the JSON string into a JavaScript array.
  const allPostsData = JSON.parse(fileContents);
  // Find the post whose ID matches the requested ID.
  const postData = allPostsData.find((post) => post.id === id);
  // Return the matching post and all its properties.
  return postData;
}