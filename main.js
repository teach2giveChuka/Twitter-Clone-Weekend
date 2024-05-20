let allPosts = document.querySelector('.allPosts');

// Function to create user info elements on load
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

    //comments
    let comments = document.createElement('div');
    comments.classList.add('comments');
    let commentIcon = document.createElement('ion-icon');
    commentIcon.setAttribute('name', 'chatbubble-ellipses-outline');
    comments.appendChild(commentIcon);
    let commentCount = document.createElement('p');
    commentCount.textContent = '200';
    comments.appendChild(commentCount);

    //retweets
    let retweets = document.createElement('div');
    retweets.classList.add('retweets');
    let retweetsIcon = document.createElement('ion-icon');
    retweetsIcon.setAttribute('name', 'repeat-outline');
    retweets.appendChild(retweetsIcon);
    let retweetCount = document.createElement('p');
    retweetCount.textContent = '200';
    retweets.appendChild(retweetCount);



    //likes
    let likes = document.createElement('div');
    likes.classList.add('likes');
    let likesIcon = document.createElement('ion-icon');
    likesIcon.setAttribute('name', 'heart');
    likes.appendChild(likesIcon);
    let likesCount = document.createElement('p');
    likesCount.textContent = '200'; // Set the actual comment count if available
    likes.appendChild(likesCount);
    // likes.appendChild(likesCount);


    reactions.appendChild(comments);
    reactions.appendChild(retweets);
    reactions.append(likes);


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
    photo.className = ('photoc');

    let img = document.createElement('img');
    img.src = './images/profile-picture.jfif';
    img.alt = '';
    photo.appendChild(img);

    let commentContent = document.createElement('div');
    commentContent.classList.add('commentContent');

    let nameDiv = document.createElement('div');
    nameDiv.classList.add('commentName');
    nameDiv.textContent = commentData.name;

    /////


    let shieldIcon = document.createElement('ion-icon');
    shieldIcon.setAttribute('name', 'shield-checkmark-outline');
    // userNameDiv.appendChild(shieldIcon);

    let twitterIcon = document.createElement('ion-icon');
    twitterIcon.setAttribute('name', 'logo-twitter');
    // userNameDiv.appendChild(twitterIcon);


    ////

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('commentBody');
    bodyDiv.textContent = commentData.body;
    let reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');

    //LIKE
    let likesDiv = document.createElement('div');
    likesDiv.classList.add('likes');
    likesDiv.className = 'likes';
    let likeIcon = document.createElement('ion-icon');
    likeIcon.setAttribute('name', 'heart');
    likesDiv.appendChild(likeIcon);
    let likesCount = document.createElement('p');
    likesCount.textContent = '0';
    likesDiv.appendChild(likesCount);



    //comments
    let commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    let commentIcon = document.createElement('ion-icon');
    commentIcon.setAttribute('name', 'chatbubble-ellipses-outline');
    commentsDiv.appendChild(commentIcon);
    let commentCount = document.createElement('p');
    commentCount.textContent = '0';
    commentsDiv.appendChild(commentCount);

    //retweets
    let retweets = document.createElement('div');
    retweets.classList.add('retweets');
    let retweetsIcon = document.createElement('ion-icon');
    retweetsIcon.setAttribute('name', 'repeat-outline');
    retweets.appendChild(retweetsIcon);
    let retweetCount = document.createElement('p');
    retweetCount.textContent = '0';
    retweets.appendChild(retweetCount);

    reactionsDiv.appendChild(commentsDiv);
    reactionsDiv.appendChild(retweets);
    reactionsDiv.appendChild(likesDiv);

    nameDiv.appendChild(shieldIcon);
    nameDiv.appendChild(twitterIcon);



    commentContent.appendChild(nameDiv);
    commentContent.appendChild(bodyDiv);
    commentContent.appendChild(reactionsDiv);

    comment.appendChild(photo);
    comment.appendChild(commentContent);

    return comment;
}

// Fetching user data and populate select dropdownlist //select element 
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
                    
                    allPosts.innerHTML = ''; // Clear previous posts

                    // Create post elements and append to allPosts container
                    postsData.forEach(post => {
                        let postElement = createPostElements(post, selectedUserData.name);
                        allPosts.appendChild(postElement);
                    });
                })
                .catch(error => console.error('Error fetching posts:', error));
        });

        ///////////////////////////////////
        //funtion to load user 01 posts on load by default

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${1}`)
                .then(result => result.json())
                .then(postsData => {
                    
                    allPosts.innerHTML = ''; // Clear previous posts

                    // Create post elements and append to allPosts container
                    postsData.forEach(post => {
                        let postElement = createPostElements(post, 'Leanne Graham');
                        allPosts.appendChild(postElement);
                    });
                })
                .catch(error => console.error('Error fetching posts:', error));
        ////////////////////////////
    });


// Generate comments section heading
function createCommentsHeading(postId) {
    let commentsHeading = document.querySelector('.commentsHeading');
    commentsHeading.innerHTML = '';
    let heading = document.createElement('p');
    heading.textContent = `post ${postId} comments`;
    heading.classList.add('commentsHeading');
    console.log('function called');
    console.log(postId);
    console.log(heading)
    // commentsSection.appendChild(heading);
    
        // heading.textContent = postId;
        commentsHeading.appendChild(heading);

    // return heading;
}


// Event listener for post click to fetch and display comments
document.addEventListener('DOMContentLoaded', () => {
    let allPosts = document.querySelector('.allPosts');

    allPosts.addEventListener('click', (event) => {
        let postElement = event.target.closest('.posts');
        if (!postElement) return; // Exit if the clicked element is not a post

        let postId = postElement.dataset.postId;
        createCommentsHeading(postId);

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(commentsData => {
                let allComments = document.querySelector('.allComments');
                allComments.innerHTML = ''; // Clearing previous comments

                commentsData.forEach(comment => {
                    let commentElement = createCommentElements(comment);
                    
                    allComments.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    });

    // ///////////////////////////////////////
    // loading comments on load in post id 1
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${1}`)
            .then(response => response.json())
            .then(commentsData => {
                let allComments = document.querySelector('.allComments');
                allComments.innerHTML = ''; // Clear previous comments

                console.log(commentsData);
                createCommentsHeading(1);

                commentsData.forEach(comment => {
                    let commentElement = createCommentElements(comment);
                    
                    allComments.appendChild(commentElement)
                });
            })
            .catch(error => console.error('Error fetching comments:', error));



});
