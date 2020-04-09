async function load (postFile){
    post = await fetch(`posts/${postFile}`)
    .then((response)=> response.json());
    console.log(post);
}

function renderPost(){
    let postBody = '';
    for (let index = 0; index < post.body.length; index++) {
        const element = post.body[index];
        postBody += `<p>${element}</p>\n`;
    }
    document.getElementById('postTitle').innerHTML = post.title;
    document.getElementById('postSubtitle').innerHTML = post.postSubtitle;
    document.getElementById('postAuthorAndDate').innerHTML = `${post.author}  ${post.date}`;
    document.getElementById('postBody').innerHTML = postBody;
}
async function windowOnload(){
    await load('generic-post.json');
    await renderPost();
}

let post;

window.onload = function () {
    windowOnload(); //this is async
};

