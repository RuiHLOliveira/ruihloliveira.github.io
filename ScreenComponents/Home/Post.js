export default {
    data: function () {
        return {
            filename: '',
        }
    },
    props: [
        'post'
    ],
    watch: {
    },
    computed: {
    },
    components: {
    },
    methods: {
        // async loadPosts(){
        //     let result = await fetch(`./../../posts/${this.parameters.p}`)
        //     .then((response) => {
        //         return response.json();
        //     });
        //     console.log('result',result);
        //     this.post = result;
        // }
    },
    created () {
        console.log('inner post', this.post);
        // this.loadNotebooks();
        // this.loadPosts();
    },
    template: `
    <div>
        <link rel="stylesheet" href="./ScreenComponents/Home/home.css">
        
        <div v-if="post.title" class="mainContainer">
            <div class="flex f-column f-alignitems-center mt-2 mb-2 ml-2 mr-2">
                <div class="post-title"><span v-html="post.title"></span></div>
                <div class="post-subtitle"><span v-html="post.subtitle"></span></div>
                <div class="post-authordate"><span v-html="post.author"></span> @ <span v-html="post.date" ></span></div>
                <div class="post-body">
                    <p v-for="paragraph in post.body" v-html="paragraph"></p>
                </div>
            </div>
            <notice-box></notice-box>
        </div>
    </div>
    `
};