const post_id = document.querySelector('#post-id').innerHTML;

const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const newComment = {
        content: document.querySelector('#comment-content').value.trim(),
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

const updateRender = async (event) => {
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
  
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);

document
    .querySelector('.post-render')
    .addEventListener('click', updateRender);
  
document
    .querySelector('.post-update')
    .addEventListener('click', updatePostHandler);

if(document.querySelector('.comment-delete')){
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
}