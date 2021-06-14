
// import Login from "./../ScreenComponents/Login.js";
// import NotebooksIndex from "./../ScreenComponents/Notebooks/Home.js";
// import NotesIndex from "./../ScreenComponents/Inbox/Home.js";
import Home from "../ScreenComponents/Home/Home.js";
import Post from "../ScreenComponents/Home/Post.js";

const page = '?page=';
const NotFound = { template: '<p>404 Page not found</p>' };
const HomeScreenComponent = {
    route: `/${page}home`,
    hash: '#home',
    name: 'home',
    component: Home
};

export default {
    'screenComponents': [
        {
            route: `/${page}post`,
            hash: '#post',
            name: 'Post',
            component: Post
        },
        HomeScreenComponent
    ],
    'NotFoundScreenComponent': {
        route: undefined,
        hash: '',
        name: 'NotFound',
        component: NotFound
    },
    'HomeScreenComponent': HomeScreenComponent 
};