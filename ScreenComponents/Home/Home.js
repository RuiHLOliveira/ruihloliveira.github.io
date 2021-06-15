import EventBus from "../../app/EventBus.js";
import Post from "./Post.js";

export default {
    data: function () {
        return {
            menuLinks: [],
            postList: [],
            post: {},
            postFile: '',
        }
    },
    watch: {
    },
    computed: {
    },
    components: {
        'Post': Post,
        // 'EditForm': EditForm,
        // 'NotesListing':NotesListing,
    },
    methods: {
        async loadLinks(){
            let result = await fetch("./../../links/menuLinks.json")
            .then((response) => {
                return response.json();
            });

            this.menuLinks = result;
        },
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
        },
        openPost(postFile){ //file e post
            const post = this.postList.find(function (element) {
                return postFile === element.file;
            })
            this.post = post.post;
            this.postFile = post.file;
        },
        closePost(event) {
            this.post = {};
            this.postFile = '';
        }
    },
    created () {
        this.loadLinks()
        this.loadPosts();
    },
    template: `
    <div class="mainContainer flex f-row f-justify-center f-alignitems-stretch f-sons-flex-1">
        <link rel="stylesheet" href="./ScreenComponents/Home/home.css">
        
        <div class="mainContainerDecoration blog-postList-max-width">
        
            <!-- HEADER -->
            <div class="flex f-column f-alignitems-stretch mt-10 mb-30">
                <div class="text-center blog-title mb-20"><h1>&lt;rui-leite /&gt;</h1></div>
                <div class="text-center blog-subtitle mb-15"><h6>Blog e estudos</h6></div>
                <div class="mt-15 blog-link-list flex f-row f-wrap-wrap f-justify-spaceAround">
                    <div class="blog-link"
                        v-for="link in menuLinks"
                    >
                        <a v-if="link.type == 1" href="#" @click="openPost(link.url)">{{link.name}}</a>
                        <a v-if="link.type == 2" :href="link.url" target="_blank">{{link.name}}</a>
                    </div>
                </div>
            </div>
            
            <!-- POST VIEWER -->
            <div class="flex f-row f-justify-center mt-30 f-sons-flex-1">
                <Post class=""
                    v-bind:post="post"
                    v-bind:file="postFile"
                    v-on:closePost="closePost($event)"
                ></Post>
            </div>
            
            <!-- POST LIST -->
            <div class="flex f-row f-justify-center mt-30 f-sons-flex-1">
                <div class="">
                    <h2 class="postList-title">Posts</h2><hr>
                    <div v-for="post in postList"
                        @click="openPost(post.file)"
                        class="flex f-column postList-title-link cursor-pointer pl-10 pr-10 mt-15 pt-10 pb-10"
                    >
                        <span class="postList-title">{{post.post.title}}</span>
                        <span class="mt-5 postList-author-datetime">{{post.post.date}}</span>
                    </div>
                </div>
            </div>
            
            <!-- FOOTER -->
            <div class="flex f-column f-alignitems-center mt-30">
                <div class="blog-footer">Feito com amor pelo PHP mais cansado da galacta "menor que três"</div>
            </div>
            
            <notice-box></notice-box>
        </div>
    </div>
    `
};