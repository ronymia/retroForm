// Show loading indicator
function showLoading(id) {
  document.getElementById(id).classList.remove("hidden");
}

// Hide loading indicator
function hideLoading(id) {
  document.getElementById(id).classList.add("hidden");
}

// Fetching latest posts
async function fetchLatestPosts() {
  showLoading("loading-latest"); // Show loading indicator
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await response.json();
    displayLatestPosts(data);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
  } finally {
    hideLoading("loading-latest"); // Hide loading indicator
  }
}

// Display latest posts in the HTML
function displayLatestPosts(posts) {
  const latestPostsContainer = document.getElementById("latest-posts");
  latestPostsContainer.innerHTML = ""; // Clear previous posts
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "bg-white p-4 rounded shadow";
    postDiv.innerHTML = `
            <h4 class="font-bold">${post?.title}</h4>
            <p>${post?.description}</p>
            <p class="text-gray-500">Author: ${post?.author?.name}</p>
        `;
    latestPostsContainer.appendChild(postDiv);
  });
}

// Fetching all posts for discussion section
async function fetchAllPosts() {
  showLoading("loading-discussions"); // Show loading indicator
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await response.json();
    displayAllPosts(data);
  } catch (error) {
    console.error("Error fetching discussions:", error);
  } finally {
    hideLoading("loading-discussions"); // Hide loading indicator
  }
}

// Display all discussions in the HTML
function displayAllPosts(data) {
  const discussionsContainer = document.getElementById("discussions");
  discussionsContainer.innerHTML = ""; // Clear previous discussions
  data?.posts.forEach((post) => {
    console.log({ post });

    const postDiv = document.createElement("div");
    postDiv.className = "bg-white p-4 rounded shadow";
    postDiv.innerHTML = `
            <h4 class="font-bold">${post?.title}</h4>
            <p>${post?.description}</p>
            <p class="text-gray-500">Author: ${post?.author?.name}</p>
        `;
    discussionsContainer.appendChild(postDiv);
  });
}

// Fetching posts by category
async function fetchPostsByCategory(category) {
  showLoading("loading-discussions"); // Show loading indicator
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
    const data = await response.json();
    displayAllPosts(data.posts); // Use the same display function
  } catch (error) {
    console.error("Error fetching posts by category:", error);
  } finally {
    hideLoading("loading-discussions"); // Hide loading indicator
  }
}

// Event listener for search functionality
// document.getElementById("search-btn").addEventListener("click", () => {
//   const category = document.getElementById("search-input").value.trim(); // Ensure no leading/trailing spaces
//   if (category) {
//     fetchPostsByCategory(category);
//   }
// });

// Initial fetch for latest posts and all posts on page load
window.onload = () => {
  fetchLatestPosts();
  fetchAllPosts();
};
