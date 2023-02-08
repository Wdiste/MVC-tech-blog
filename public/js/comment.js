const post_id = document.querySelector('#post-id').innerHTML;

// button to reveal the form for a new comment
const commentNewRender = async (event) => {
    document
      .querySelector('.new-comment-render')
      .classList.toggle("invisible");
    document
      .querySelector('.new-comment-form')
      .classList.remove("invisible");
  };

  // adds a new comment from new comment form data
const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const newComment = {
        content: document.querySelector('#new-comment-content').value.trim(),
        post_id: post_id,
    };
    
    if (newComment) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify( newComment ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (await response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  // button to reveal the form for updating a post
const postUpdateRender = async (event) => {
    document
      .querySelector('.post-render')
      .classList.toggle("invisible");
    document
      .querySelector('.post-update-form')
      .classList.remove("invisible");
  };

  // updates a post based on update post form
const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
  
  try{
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        
        alert('Failed to update post');
      }}
    }
    catch (err) {console.log(err)};
  };};
  
  // deletes a comment specified by the button's parent
const delButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');


      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    };
  };
  
  // button to reveal the form for updating a comment
const commentUpdateRender = async (event) => {
    document
      .querySelector('.comment-render')
      .classList.toggle("invisible");
    document
      .querySelector('.comment-update-form')
      .classList.remove("invisible");
  };

  // updates a comment based on update comment form
const updateCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-update-content').value.trim();  
  if (event.target.hasAttribute('data-id')) {
    const user_id = event.target.getAttribute('data-id');
  
    console.log('inside theupdateCommentHandler ', "content ", content, "user_id ", user_id, "post_id ", post_id)
  try{
    if (content) {
      const response = await fetch(`/api/comment/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify({ content, post_id, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        
        alert('Failed to update post');
      }}
    }
    catch (err) {console.log(err)};
  };};

  // ==========  set up event listeners =========================

  // show new comment form
document
  .querySelector('.new-comment-render')
  .addEventListener('click', commentNewRender);

  // submit new comment
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);

    // show update post form
document
    .querySelector('.post-render')
    .addEventListener('click', postUpdateRender);
  
    // update this post
document
    .querySelector('.post-update')
    .addEventListener('click', updatePostHandler);

    // if the render button exists (user owns the comment), look for button to show update comment form
if(document.querySelector('.comment-render')){
document
    .querySelector('.comment-render')
    .addEventListener('click', commentUpdateRender);
}

    // if the update button exists (user owns the comment), look for button to  update comment
if(document.querySelector('.comment-update')){
document
    .querySelector('.comment-update')
    .addEventListener('click', updateCommentHandler);
}

    // if the delete button exists (user owns the comment), look for button to delete comment

if(document.querySelector('.comment-delete')){
  document
    .querySelector('.comment-delete')
    .addEventListener('click', delButtonHandler);
}