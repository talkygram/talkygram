// Get the container element
const postContainer = document.getElementById('post-container');

// Get the data from the JSON
let data = {
    "posts": []
};

// Load the posts from the data object
loadPosts(data);

// Create a new post
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

// Add a post to the container
function addPostToContainer(post) {
    const postHTML = createPostHTML(post);
    postContainer.insertAdjacentHTML('afterbegin', postHTML);
}

// Create the HTML for a post
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

// Toggle the visibility of the interactions when the text is clicked
function toggleInteractions(textElement) {
    const comments = textElement.querySelector('.post-comments');
    const interactions = textElement.querySelector('.post-interactions');
    comments.classList.toggle('show');
    interactions.classList.toggle('show');
}

// Add a comment to a post
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

// Add an interaction to a post
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

// Generate a unique ID for a post
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Get the index of a post in the data object
function getPostIndex(postElement) {
    const postId = postElement.dataset.id;
    return data.posts.findIndex(post => post.id === postId);
}

// Load the posts from the data object
function loadPosts(data) {
    data.posts.forEach(post => {
        addPostToContainer(post);
    });
}

// Update the data object
function updateData(data) {
    // TODO: Implement data storage (e.g. saving to a JSON file)
}

// Get the current date (in the format "M/D/YYYY")
function getCurrentDate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
}

// Get the current time (in the format "HHMM")
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}${minutes}`;
}

// Handle the form submission to create a new post
const createPostForm = document.getElementById('create-post-form');
createPostForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameInput = createPostForm.querySelector('input[name="username"]');
    const locationInput = createPostForm.querySelector('input[name="location"]');
    const textInput = createPostForm.querySelector('textarea[name="text"]');
    const hashtagsInput = createPostForm.querySelector('input[name="hashtags"]');
    const username = usernameInput.value.trim() || 'guest';
    const location = locationInput.value.trim() || 'Unknown';
    const text = textInput.value.trim();
    const hashtags = hashtagsInput.value.split(',').map(tag => tag.trim());
    if (text) {
        createPost(username, location, text, hashtags);
        usernameInput.value = '';
        locationInput.value = '';
        textInput.value = '';
        hashtagsInput.value = '';
    }
});

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