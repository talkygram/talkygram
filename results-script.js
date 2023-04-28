// Get the container element
const postContainer = document.getElementById('post-container');

data = {
    "posts": [
        {
            "username": "BigDogg",
            "links": [],
            "text": {
                "Hello people of earth!": {
                    "comments": ["hi", "laaammmmmmeeeee!!!"],
                    "emotions": 0
                },
                "I am speaking to you from my secret base on the MOON!!!": {
                    "comments": ["Ya you're capping about that my boi"],
                    "emotions": 0
                }
            },
            "date": "4/7/2023",
            "time": "1873",
            "hashtags": ["space"],
            "mentions": [],
            "verified": 1
        },
        {
            "username": "ChickenMan",
            "links": [],
            "text": {
                "bababababababababababa": {
                    "comments": ["You stole this from batman", "Lol"],
                    "emotions": 0
                },
                "ChickenMan!!!": {
                    "comments": ["Are you more chicken or more man?"],
                    "emotions": 0
                }
            },
            "date": "01/3/2012",
            "time": "1093",
            "hashtags": ["chicken"],
            "mentions": [],
            "verified": 1
        },
        {
            "username": "SmallDogg",
            "links": [],
            "text": {
                "I like cheese and rice!": {
                    "comments": ["Me toooo", "Cheese is so good!!!"],
                    "emotions": 0
                },
                "But only provalone and uncooked white rice": {
                    "comments": ["What", "You're weird dude"],
                    "emotions": 0
                },
                "And thats why Im awesome": {
                    "comments": ["Naw you're super dope", "You're right"],
                    "emotions": 0
                }
            },
            "date": "5/31/2023",
            "time": "1943",
            "hashtags": ["cheese", "rice"],
            "mentions": [],
            "verified": 0
        }
    ]
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
 * getTagsAndLinks(text) uses an api to extract the best hashtags from a string of text
 * @param {string} text - The text to extract hashtags, links,  from
 * @returns {string[]} - An array of hashtags in the format "#hashtag"
 */
function getTagsAndLinks(text) {
    //This still needs to be done
    hashtags = ["#hashtag", "#hashtag2", "#hashtag3"];
    links = ["space.com", "google.com", "youtube.com"];
    return hashtags, links; 
}

/**
 * loadPosts() loads the posts from the data object into the user interface
 * @param {object} data - The data object containing the posts to be loaded into the user interface
 */
function loadPosts(data) {
    data.posts.forEach(post => {
        const postHTML = createPostHTML(post);
        postContainer.insertAdjacentHTML('afterbegin', postHTML);

        // Loop through each sentence in the post and add the comments
        const postElement = postContainer.querySelector(`[data-id="${post.id}"]`);
        Object.keys(post.text).forEach((text, index) => {
            const sentence = postElement.querySelector(`.post-text[data-index="${index}"]`);
            if (sentence) {
                const comments = post.text[text].comments;
                const commentsHTML = comments.map(comment => `
                    <div class="post-comment"><strong>guest:</strong> ${comment}</div>
                `).join('');
                const commentsSection = sentence.querySelector('.post-comments');
                commentsSection.innerHTML = commentsHTML;
            }
        });
    });
}

/**
 * toggleInteractions() toggles the visibility of the comments and interactions sections of a post, and adds/removes the 'clicked' (each line of text has its own comments and interactions and is the postText) class to/from the post text, which triggers a visual change in the UI.
 * @param {object} postText - The post text element that was clicked to trigger the function
 */
function toggleInteractions(postText) {
    const postTextParent = postText.closest('.post'); // Get the closest ancestor element with the 'post' class
    const sentenceIndex = postText.dataset.index; // Get the 'index' data attribute value of the post text element
    const sentenceComments = postTextParent.querySelector(`[data-index="${sentenceIndex}"] .post-comments`); // Find the comments section of the post using the 'index' value
    const sentenceInteractions = postTextParent.querySelector(`[data-index="${sentenceIndex}"] .post-interactions`); // Find the interactions section of the post using the 'index' value
    sentenceComments.classList.toggle('hidden'); // Toggle the visibility of the comments section by adding/removing the 'hidden' class
    sentenceInteractions.classList.toggle('hidden'); // Toggle the visibility of the interactions section by adding/removing the 'hidden' class
    postText.classList.toggle('clicked'); // Toggle the 'clicked' class of the post text element to trigger a visual change in the UI
}

// Update the data object
function updateData(post) {
    //This still needs to be done
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

// Handle the click event to toggle the visibility of the interactions
postContainer.addEventListener('click', (event) => {
    const postText = event.target.closest('.post-text');
    const hasPostTextClass = postText?.classList.contains('post-text');
    if (hasPostTextClass) {
        toggleInteractions(postText);
    }
});

/**
createPost() creates a new post, adds it to a data store, updates the data store, and adds the post to the user interface for display
@param {[string]} username - The username of the user who created the post.
@param {[object]} text - An object containing the text content of the post, with each key representing a separate line of text and each value containing an object with a "comments" array and an "emotions" integer.
@param {[boolean]} verified - A boolean value indicating whether or not the user who created the post is verified.
*/
function createPost(username, text, verified) {
    hashtags, links = getTagsAndLinks(text);
    const newPost = {
        "id": generateId(),
        "username": username,
        "links": links,
        "text": text,
        "emotions": 0,
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "hashtags": hashtags,
        "mentions": [],
        "verified": verified
    };
    data.posts.push(newPost);
    updateData(data);
    addPostToContainer(newPost);
}

/**
addPostToContainer() adds a post to the user interface by creating the HTML for the post and inserting it into the postContainer element
@param {object} post - The post object to be added to the user interface
*/
function addPostToContainer(post) {
    const postHTML = createPostHTML(post);
    postContainer.insertAdjacentHTML('afterbegin', postHTML);
}

/**
createPostHTML() takes a post object and returns an HTML representation of the post
@param {object} post The post object to be added to the user interface
@returns The HTML representation of the post
*/
function createPostHTML(post) {
    let postHTML = `
    <div class="post" data-id="${post.id}">
      <div class="post-header">
        <div class="post-username">${post.username}</div>
        ${post.verified ? '<div class="post-verified"><i class="fas fa-check-circle"></i> Verified</div>' : ''}
      </div>
      <div class="post-content">
  `;

    Object.keys(post.text).forEach((text, index) => {
        postHTML += `
        <div class="post-text${index !== 0 ? ' hidden' : ''}" data-index="${index}" onclick="toggleInteractions(this)">
        ${text}
        <div class="post-comments">
          ${post.text[text].comments.map(comment => `
            <div class="post-comment"><strong>guest:</strong> ${comment}</div>
          `).join('')}
        </div>
        <div class="post-comment-form">
          <form onsubmit="return addComment(this)">
            <input type="text" name="comment" placeholder="Add a comment">
            <div class="form-button-container">
                <button type="submit">Post</button>
            </div>
          </form>
        </div>
        <div class="post-interactions">
          <div class="post-emotions">${post.text[text].emotions} emotions</div>
          <form onsubmit="return addInteraction(this)">
            <button type="submit">Emotion</button>
            <button type="submit">Share</button>
          </form>
        </div>
      </div>
    `;
    });

    postHTML += `
      <div class="post-footer">
        <button type="submit">Share</button>
        <div class="post-date">${post.time} ${post.date}</div>
        <div class="post-hashtags">${post.hashtags}</div>
      </div>
    </div>
  `;
    /* this was in hashtag location above and could be useful later
 post.hashtags.map(hashtag => `
      <a href="#" class="post-hashtag">#${hashtag}</a>
    `).join('')
  */
    return postHTML;
}

/**
 * addComment() allows users to add new comments to a post by filling out/submitting a form and updating the posts's comment section with a new comment
 * @param {object} form - The form DOM element containing the comment input and submit button
 * @returns - A boolean value indicating whether or not the form should be submitted
 */
function addComment(form) {
    const post = form.closest('.post');
    const commentInput = form.querySelector('input[name="comment"]');
    const comment = commentInput.value.trim();
    if (comment) {
        const sentence = form.closest('.post-text');
        const sentenceIndex = sentence.dataset.index;
        const comments = sentence.querySelector('.post-comments');
        const newComment = `<div class="post-comment"><strong>guest:</strong> ${comment}</div>`;
        comments.insertAdjacentHTML('beforeend', newComment);
        const postIndex = getPostIndex(post);
        if (postIndex !== -1) {
            const sentenceText = Object.keys(data.posts[postIndex].text)[sentenceIndex];
            data.posts[postIndex].text[sentenceText].comments.push(comment);
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
    }
    return false;
}

loadPosts(data);

// Event listeners for display toggling
// An event listener that will hide existing posts and only display the "Text: enter your post" container.
const toggleCreatePost = document.getElementById("new-post-button");
toggleCreatePost.addEventListener('click', (event) => {
    const postContainer = document.getElementById("post-container");
    const newPostContainer = document.getElementById("new-post-container");
    postContainer.style.display = "none";
    newPostContainer.style.display = "block";
});

// An event listener that will hide the new post container and only display the existing posts.
const exitCreatePost = document.getElementById("post-button");
exitCreatePost.addEventListener('click', (event) => {
    const postContainer = document.getElementById("post-container");
    const newPostContainer = document.getElementById("new-post-container");
    postContainer.style.display = "block";
    newPostContainer.style.display = "none";
});

// An event listener that will hide the new post container and only display the existing posts.
const exitCreatePost2 = document.getElementById("close-button");
exitCreatePost2.addEventListener('click', (event) => {
    const postContainer = document.getElementById("post-container");
    const newPostContainer = document.getElementById("new-post-container");
    postContainer.style.display = "block";
    newPostContainer.style.display = "none";
});