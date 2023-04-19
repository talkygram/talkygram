// Get the container element
const postContainer = document.getElementById('post-container');

// Get the data from the JSON
let data = {
    "posts": []
};

// Load the posts from the data object
loadPosts(data);

/**
* createPost() creates a new post, adds it to a data store, updates the data store, and adds the post to the user interface for display
* @param {[string]} username - The username of the user who created the post.
* @param {[string]} location - Represents the location of the post.
* @param {[string]} text - Represents the tect content of the post.
* @param {[array]} hashtags - An array storing each hashtag (string) associated with the post.
*/
function createPost(username, location, text, hashtags) {
    const newPost = {
        "id": generateId(),
        "username": username,
        "location": location,
        "text": text,
        "hashtags": hashtags,
        "comments": [],
        "interactions": { "likes": 0, "shared": 0 },
        "reposts": 0,
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "verified": false
    };
    data.posts.push(newPost);
    updateData(data);
    addPostToContainer(newPost);
}

/**
 * addPostToContainer() adds a post to the user interface by creating the HTML for the post and inserting it into the postContainer element
 * @param {object} post - The post object to be added to the user interface
 */
function addPostToContainer(post) {
    const postHTML = createPostHTML(post);
    postContainer.insertAdjacentHTML('afterbegin', postHTML);
}

/**
 * createPostHTML() takes a post object and returns an HTML representation of the post
 * @param {object} post The post object to be added to the user interface
 * @returns The HTML representation of the post
 */
function createPostHTML(post) {
    return `
    <div class="post" data-id="${post.id}">
      <div class="post-header">
        <div class="post-username">${post.username}</div>
        <div class="post-location">${post.location}</div>
      </div>
      <div class="post-content">
        <div class="post-text" onclick="toggleInteractions(this)">
          ${post.text}
          <div class="post-comments">
            ${post.comments.map(comment => `
              <div class="post-comment">${comment}</div>
            `).join('')}
            <form onsubmit="return addComment(this)">
              <input type="text" name="comment" placeholder="Add a comment">
              <button type="submit">Post</button>
            </form>
          </div>
          <div class="post-interactions">
            <div class="post-likes">${post.interactions.likes} likes</div>
            <div class="post-shares">${post.interactions.shared} shares</div>
            <form onsubmit="return addInteraction(this)">
              <button type="submit">Like</button>
              <button type="submit">Share</button>
            </form>
          </div>
        </div>
      </div>
      <div class="post-footer">
        <div class="post-reposts">${post.reposts} Reposts</div>
        <div class="post-date">${post.date} at ${post.time}</div>
        <div class="post-hashtags">${post.hashtags.map(hashtag => `
          <a href="#" class="post-hashtag">#${hashtag}</a>
        `).join('')}</div>
        <div class="post-verified">
          ${post.verified ? '<i class="fas fa-check-circle"></i> Verified' : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * toggleInteractions() allows users to toggle the visibility of the comments and interactions for a post
 * @param {object} textElement 
 */
function toggleInteractions(textElement) {
    const comments = textElement.querySelector('.post-comments');
    const interactions = textElement.querySelector('.post-interactions');
    comments.classList.toggle('show');
    interactions.classList.toggle('show');
}

/**
 * addComment() allows users to add new comments to a post by filling out/submitting a form and udpating the posts's comment section with a new comment
 * @param {object} form - The form DOM element containing the comment input and submit button
 * @returns - A boolean value indicating whether or not the form should be submitted
 */
function addComment(form) {
    const post = form.closest('.post');
    const commentInput = form.querySelector('input[name="comment"]');
    const comment = commentInput.value.trim();
    if (comment) {
        const comments = post.querySelector('.post-comments');
        const newComment = `<div class="post-comment"><strong>guest:</strong> ${comment}</div>`;
        comments.insertAdjacentHTML('beforeend', newComment);
        const postIndex = getPostIndex(post);
        if (postIndex !== -1) {
            data.posts[postIndex].comments.push(comment);
            updateData(data);
        }
    }
    commentInput.value = '';
    return false;
}

/**
 * addInteraction() allows users to like or share a post by clicking a button and updating the post's interactions section with the new number of likes/shares
 * @param {object} form - The form DOM element containing the like/share buttons
 * @returns - A boolean value indicating whether or not the form should be submitted
 */
function addInteraction(form) {
    const post = form.closest('.post');
    const button = form.querySelector('button[type="submit"]');
    const interactionType = button.textContent.toLowerCase();
    const postIndex = getPostIndex(post);
    if (postIndex !== -1) {
        data.posts[postIndex].interactions[interactionType]++;
        updateData(data);
        const interactions = post.querySelector('.post-interactions');
        const likes = interactions.querySelector('.post-likes');
        const shares = interactions.querySelector('.post-shares');
        likes.textContent = `${data.posts[postIndex].interactions.likes} likes`;
        shares.textContent = `${data.posts[postIndex].interactions.shared} shares`;
    }
    return false;
}

/**
 * generateId() generates a random ID string that can be used to identify a post or data object
 */
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * getPostIndex() returns the index of the post in the `data.posts` array whose ID matches the ID of the post element
 * @param {object} postElement 
 * @returns - The index of the first element in `data.posts` whose ID matches the ID of the post element
 */
function getPostIndex(postElement) {
    const postId = postElement.dataset.id;
    return data.posts.findIndex(post => post.id === postId);
}

/**
 * loadPosts() loads the posts from the data object into the user interface
 * @param {object} data - The data object containing the posts to be loaded into the user interface
 */
function loadPosts(data) {
    data.posts.forEach(post => {
        addPostToContainer(post);
    });
}

// Update the data object
function updateData(data) {
    // TODO: Implement data storage (e.g. saving to a JSON file)
}

/**
 * getCurrentDate() returns the current date in the format "MM/DD/YYYY"
 * @returns - The current date in the format "MM/DD/YYYY"
 */
function getCurrentDate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
}

/**
 * getCurrentTime() returns the current time in the format "HHMM" using a 24-hour clock
 * @returns - The current time in the format "HHMM"
 */
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}${minutes}`;
}

// Handle the form submission to add a comment
postContainer.addEventListener('submit', (event) => {
  if (event.target.matches('.post-comments form')) {
      event.preventDefault();
      addComment(event.target);
  }
});

// Handle the form submission to add an interaction
postContainer.addEventListener('submit', (event) => {
  if (event.target.matches('.post-interactions form')) {
      event.preventDefault();
      addInteraction(event.target);
  }
});

// Handle the click event to toggle the visibility of the interactions
postContainer.addEventListener('click', (event) => {
  if (event.target.matches('.post-text')) {
      toggleInteractions(event.target);
  }
});

// Handle the form submission to create a new post
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const textInput = postForm.querySelector('textarea[name="text"]');
  const text = textInput.value.trim();
  if (text) {
    createPost('guest', 'Unknown', text, []);
    textInput.value = '';
  }
});