

function createPost() {
    const text = document.getElementById('postText').value;
    const imageInput = document.getElementById('postImage');
    const category = document.getElementById('postCategory').value;
    const postsContainer = document.getElementById('postsContainer');

    if(text.trim() === "" && imageInput.files.length === 0) {
        alert("Please add some text or select an image!");
        return;
    }

    if(category === "") {
        alert("Please select a category!");
        return;
    }

    // Create post element
    const post = document.createElement('div');
    post.className = 'post';
    post.dataset.category = category;

    // Post category
    const cat = document.createElement('strong');
    cat.textContent = `Category: ${category}`;
    post.appendChild(cat);

    if(text) {
        const p = document.createElement('p');
        p.textContent = text;
        post.appendChild(p);
    }

    if(imageInput.files.length > 0) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageInput.files[0]);
        post.appendChild(img);
    }

    // Comments section
    const commentsDiv = document.createElement('div');
    commentsDiv.className = 'comments';
    
    const commentList = document.createElement('div');
    commentList.className = 'comment-list';
    commentsDiv.appendChild(commentList);

    // Comment form
    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write a comment...';
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';

    commentButton.onclick = () => {
        if(commentInput.value.trim() === '') return;
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.textContent = commentInput.value;
        commentList.appendChild(comment);
        commentInput.value = '';
    };

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentsDiv.appendChild(commentForm);

    post.appendChild(commentsDiv);

    // Prepend post at the top
    postsContainer.insertBefore(post, postsContainer.firstChild);

    // Reset form
    document.getElementById('postText').value = '';
    imageInput.value = '';
    document.getElementById('postCategory').value = '';
}

// Filter posts by category
function filterPosts() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const posts = document.querySelectorAll('#postsContainer .post');
    posts.forEach(post => {
        if(selectedCategory === "" || post.dataset.category === selectedCategory) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

