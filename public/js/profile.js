const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#posts-title').value.trim();
  const content = document.querySelector('#posts-content').value.trim();

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete posts');
    }
  }
};

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#comment-body"]').value.trim();

  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
      const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
              post_id,
              comment_text
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.reload();

      } else {
          alert(response.statusText);
          document.querySelector('#comment-form').style.display = "block";
      }
  }
}

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#content').value.trim();
  console.log(title);
  console.log(content);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }

}

document
  .querySelector('.new-posts-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.posts-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
