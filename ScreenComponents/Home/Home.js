import EventBus from "../../app/EventBus.js";

export default {
    data: function () {
        return {
            notebooks: [],
            createdNotebook: null,
            editFormActive: false,
            createFormActive: false,
            notebookForEditing: {},
            showCompletedNotebooks: false,
            activeNotebook: {},
            post: {},
            postList: [],
        }
    },
    watch: {
    },
    computed: {
    },
    components: {
        // 'CreateForm': CreateForm,
        // 'EditForm': EditForm,
        // 'NotesListing':NotesListing,
    },
    methods: {
        async loadPosts(){
            let result = await fetch("./../../posts/postList.json")
            .then((response) => {
                return response.json();
            });

            for (let i = 0; i < result.length; i++){
                let post = await fetch(`./../../posts/${result[i].file}`)
                .then((response) => {
                    return response.json();
                });
                result[i]['post'] = post;
            }
            this.postList = result;
            console.log(this.postList);
        },
        openPost(postFile){
            EventBus.$emit('route', [
                'Post',
                {'filename': postFile }
            ]);
        }
    },
    created () {
        // this.loadNotebooks();
        this.loadPosts();
    },
    template: `
    <div>
        <link rel="stylesheet" href="./ScreenComponents/Home/home.css">
        
        <div class="">
            <div class="flex f-column f-alignitems-center mt-10 mb-30">
                <div class="blog-title mb-10"><h1>&lt;rui-leite /&gt;</h1></div>
                <div class="blog-subtitle mb-10"><h6>Blog e estudos</h6></div>
                <div>links</div>
            </div>
            
            <div class="flex f-row f-justify-center mt-30 f-sons-flex-1">
                <div class="blog-postList-max-width">
                    <div v-for="post in postList"
                        @click="openPost(post.file)"
                        class="flex f-column post-title post-title-link cursor-pointer pl-10 pr-10 mt-15 pt-10 pb-10"
                    >
                        <span>{{post.post.title}}</span>
                        <span class="mt-10 post-author-datetime">{{post.post.date}}</span>
                    </div>
                </div>
            </div>
            <notice-box></notice-box>
        </div>
    </div>
    `
};