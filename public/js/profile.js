// button to reveal the form for a new post
const postNewRender = async (event) => {
    document
      .querySelector('.new-post-render')
      .classList.toggle("invisible");
    document
      .querySelector('.new-post-form')
      .classList.remove("invisible");
  };

const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
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
      document.location.replace('/dashboard');
    } else {
      
      alert('Failed to update post');
    }}
  }
  catch (err) {console.log(err)};
};};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }};

    // show new post form
document
  .querySelector('.new-post-render')
  .addEventListener('click', postNewRender);

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);

if(document.querySelector('.post-delete')){
  document
   .querySelector('.post-delete')
   .addEventListener('click', delButtonHandler);
}