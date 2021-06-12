
// import Login from "./../ScreenComponents/Login.js";
// import NotebooksIndex from "./../ScreenComponents/Notebooks/Home.js";
// import NotesIndex from "./../ScreenComponents/Inbox/Home.js";
import Home from "../ScreenComponents/Home/Home.js";

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
        // {
        //     route: '',
        //     hash: '#Login',
        //     name: 'Login',
        //     component: Login
        // },
        // {
        //     route: '/',
        //     hash: '#Login',
        //     name: 'Login',
        //     component: Login
        // },
        // {
        //     route: `/${page}notebooksIndex`,
        //     hash: '#notebooksIndex',
        //     name: 'notebooksIndex',
        //     component: NotebooksIndex
        // },
        // {
        //     route: `/${page}notesIndex`,
        //     hash: '#notesIndex',
        //     name: 'notesIndex',
        //     component: NotesIndex
        // },
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