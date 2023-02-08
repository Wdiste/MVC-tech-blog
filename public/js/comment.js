const post_id = document.querySelector('#post-id').innerHTML;

const commentNewRender = async (event) => {
    document
      .querySelector('.new-comment-render')
      .classList.toggle("invisible");
    document
      .querySelector('.new-comment-form')
      .classList.remove("invisible");
  };

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

const postUpdateRender = async (event) => {
    document
      .querySelector('.post-render')
      .classList.toggle("invisible");
    document
      .querySelector('.post-update-form')
      .classList.remove("invisible");
  };

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
  
const commentUpdateRender = async (event) => {
    document
      .querySelector('.comment-render')
      .classList.toggle("invisible");
    document
      .querySelector('.comment-update-form')
      .classList.remove("invisible");
  };

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

document
  .querySelector('.new-comment-render')
  .addEventListener('click', commentNewRender);

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);

document
    .querySelector('.post-render')
    .addEventListener('click', postUpdateRender);
  
document
    .querySelector('.post-update')
    .addEventListener('click', updatePostHandler);

if(document.querySelector('.comment-delete')){
document
    .querySelector('.comment-render')
    .addEventListener('click', commentUpdateRender);
}

if(document.querySelector('.comment-update')){
document
    .querySelector('.comment-update')
    .addEventListener('click', updateCommentHandler);
}

if(document.querySelector('.comment-delete')){
  document
    .querySelector('.comment-delete')
    .addEventListener('click', delButtonHandler);
}