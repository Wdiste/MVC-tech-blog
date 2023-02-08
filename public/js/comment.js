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
  
if(document.querySelector('.comment-delete')){
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
}