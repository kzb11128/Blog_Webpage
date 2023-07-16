const createPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-title-input").value.trim();
    const description = document.querySelector("#post-description-input").value.trim();

    if(title && description) {
        const response = await fetch("api/post", {
            method: "POST",
            body: JSON.stringify({ title, description}),
            headers: { "Content-Type": "application/json"},
        });

        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert(response.statusText);
        }
    }
}

const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const newTitle = document.querySelector("#post-title-input").value.trim();
    const newDescription = document.querySelector("#post-description-input").value.trim();
    const parsehttp = (document.location.href).split("/");
    const id = parsehttp[parsehttp.length - 1];

    const fetchPath = "../api/post/" + id;

    if(newTitle && newDescription){
        const response = await fetch(fetchPath, {
            method: "PUT",
            params: JSON.stringify({id}),
            body: JSON.stringify({newTitle, newDescription}),
            headers: {"Content-Type": "application/json"},
        });

        if(response.ok){
            document.location.replace("/dashboard");
        }else{
            alert(response.statusText);
        }
    }
    
}

const updatePostForm = document.querySelector(".updatePost-form")
const newPostForm = document.querySelector(".newPost-form")

if(newPostForm){
    newPostForm.addEventListener("submit", createPostFormHandler);
}

if(updatePostForm){
    updatePostForm.addEventListener("submit", updatePostFormHandler);
}

async function deletePost(){
    const parsehttp = (document.location.href).split("/");
    const id = parsehttp[parsehttp.length - 1];
    const fetchPath = "../api/post/" + id;
    const response = await fetch(fetchPath, {
        method: "DELETE",
        params: JSON.stringify({id}),
        headers: {"Content-Type": "application/json"},
    });

    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert(response.statusText);
    }
}