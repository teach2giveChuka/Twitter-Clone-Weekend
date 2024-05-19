// Function to create user info elements
function createUserInfoElements(userData) {
    let userInfoDiv = document.querySelector('.userInfo');
    userInfoDiv.innerHTML = ''; // Clear previous user info

    let nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = userData.name;

    let userNameDiv = document.createElement('div');
    userNameDiv.classList.add('userName');
    userNameDiv.textContent = '@' + userData.username;

    let websiteDiv = document.createElement('div');
    websiteDiv.classList.add('website');
    websiteDiv.textContent = userData.website;

    let catchPhraseDiv = document.createElement('div');
    catchPhraseDiv.classList.add('catchPhrase');
    catchPhraseDiv.textContent = userData.company.catchPhrase;

    let cityDiv = document.createElement('div');
    cityDiv.classList.add('city');
    cityDiv.textContent = userData.address.city;

    userInfoDiv.appendChild(nameDiv);
    userInfoDiv.appendChild(userNameDiv);
    userInfoDiv.appendChild(websiteDiv);
    userInfoDiv.appendChild(catchPhraseDiv);
    userInfoDiv.appendChild(cityDiv);
}

// Function to create post elements
function createPostElements(postData, userName) {
    let post = document.createElement('div');
    post.classList.add('posts');
    post.dataset.postId = postData.id;

    let photo = document.createElement('div');
    photo.classList.add('photo');
    let img = document.createElement('img');
    img.src = './images/profile-picture.jfif';
    img.alt = '';
    photo.appendChild(img);

    let postContent = document.createElement('div');
    postContent.classList.add('postContent');

    let userNameDiv = document.createElement('div');
    userNameDiv.classList.add('userName');
    userNameDiv.textContent = userName;
    let shieldIcon = document.createElement('ion-icon');
    shieldIcon.setAttribute('name', 'shield-checkmark-outline');
    userNameDiv.appendChild(shieldIcon);
    let twitterIcon = document.createElement('ion-icon');
    twitterIcon.setAttribute('name', 'logo-twitter');
    userNameDiv.appendChild(twitterIcon);

    let posted = document.createElement('div');
    posted.classList.add('posted');
    let postText = document.createElement('p');
    postText.classList.add('post');
    postText.textContent = postData.body; // Display post body
    posted.appendChild(postText);

    let reactions = document.createElement('div');
    reactions.classList.add('reactions');
    let comments = document.createElement('div');
    comments.classList.add('comments');
    let commentIcon = document.createElement('ion-icon');
    commentIcon.setAttribute('name', 'chatbubble-ellipses-outline');
    comments.appendChild(commentIcon);
    let commentCount = document.createElement('p');
    commentCount.textContent = '200'; // Set the actual comment count if available
    comments.appendChild(commentCount);

    reactions.appendChild(comments);

    postContent.appendChild(userNameDiv);
    postContent.appendChild(posted);
    postContent.appendChild(reactions);

    post.appendChild(photo);
    post.appendChild(postContent);

    return post;
}

// Function to create comment elements
function createCommentElements(commentData) {
    let comment = document.createElement('div');
    comment.classList.add('comment');

    let photo = document.createElement('div');
    photo.classList.add('photo');
    let img = document.createElement('img');
    img.src = './images/profile-picture.jfif';
    img.alt = '';
    photo.appendChild(img);

    let commentContent = document.createElement('div');
    commentContent.classList.add('commentContent');

    let nameDiv = document.createElement('div');
    nameDiv.classList.add('commentName');
    nameDiv.textContent = commentData.name;

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('commentBody');
    bodyDiv.textContent = commentData.body;

    let reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');
    let likesDiv = document.createElement('div');
    likesDiv.classList.add('likes');
    let likeIcon = document.createElement('ion-icon');
    likeIcon.setAttribute('name', 'heart');
    likesDiv.appendChild(likeIcon);
    let likesCount = document.createElement('p');
    likesCount.textContent = '200'; // Set the actual like count if available
    likesDiv.appendChild(likesCount);

    reactionsDiv.appendChild(likesDiv);

    commentContent.appendChild(nameDiv);
    commentContent.appendChild(bodyDiv);
    commentContent.appendChild(reactionsDiv);

    comment.appendChild(photo);
    comment.appendChild(commentContent);

    return comment;
}

// Fetch user data and populate select dropdown
fetch('https://jsonplaceholder.typicode.com/users')
    .then(result => result.json())
    .then(userData => {
        let select = document.querySelector('.select');

        // Populate select dropdown with user names
        userData.forEach((user, index) => {
            let option = document.createElement('option');
            option.textContent = user.name;
            option.value = user.id; // Store user id as option value
            select.appendChild(option);
        });

        // Event listener for select dropdown change
        select.addEventListener('change', (event) => {
            let selectedUserId = event.target.value;
            let selectedUserData = userData.find(user => user.id === parseInt(selectedUserId));

            // Create user info elements
            createUserInfoElements(selectedUserData);

            // Fetch posts for selected user
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`)
                .then(result => result.json())
                .then(postsData => {
                    let allPosts = document.querySelector('.allPosts');
                    allPosts.innerHTML = ''; // Clear previous posts

                    // Create post elements and append to allPosts container
                    postsData.forEach(post => {
                        let postElement = createPostElements(post, selectedUserData.name);
                        allPosts.appendChild(postElement);
                    });
                })
                .catch(error => console.error('Error fetching posts:', error));
        });
    });


    // Generate comments section heading
function createCommentsHeading(postId) {
    let heading = document.createElement('div');
    heading.classList.add('commentsHeading');
    heading.textContent = `Post ${postId} Comments`;
    return heading;
}


// Event listener for post click to fetch and display comments
document.addEventListener('DOMContentLoaded', () => {
    let allPosts = document.querySelector('.allPosts');

    allPosts.addEventListener('click', (event) => {
        let postElement = event.target.closest('.posts');
        if (!postElement) return; // Exit if the clicked element is not a post

        let postId = postElement.dataset.postId;

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(commentsData => {
                let allComments = document.querySelector('.allComments');
                allComments.innerHTML = ''; // Clear previous comments

                commentsData.forEach(comment => {
                    let commentElement = createCommentElements(comment);
                    allComments.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    });
});
