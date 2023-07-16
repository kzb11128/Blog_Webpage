const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector("#create-comment-input").value.trim();
    const here = document.location.href;
    const parsehttp = here.split("/");
    const post_id = parsehttp[parsehttp.length - 1];

    if(description){
        const response = await fetch("../api/comment", {
            method: "POST",
            body: JSON.stringify({description, post_id}),
            headers: { "Content-Type": "application/json"},
        });

        if(response.ok){
            document.location.replace(here);
        }else{
            alert(response.statusText);
        }
    }
}

const createCommentForm = document.querySelector(".createComment-form");
createCommentForm.addEventListener("submit", createCommentFormHandler);