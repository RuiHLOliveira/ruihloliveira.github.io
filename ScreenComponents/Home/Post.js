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
        closePost () {
            this.$emit('closePost');
        }
    },
    created () {
        console.log('inner post', this.post);
        // this.loadNotebooks();
        // this.loadPosts();
    },
    template: `
    <div class="">
        <div v-if="post.title">
            <div class="flex f-column f-alignitems-center">
                <div class="post-title"><span v-html="post.title"></span></div>
                <div class="post-subtitle"><span v-html="post.subtitle"></span></div>
                <div class="post-authordate"><span v-html="post.author"></span> @ <span v-html="post.date" ></span></div>
            </div>
            
            <div class="mt-15 mb-15 flex f-row f-justify-end"><button class="btn btn-black" type="button" @click="closePost()">Close Post</button></div>
            
            <div class="post-body">
                <p v-for="paragraph in post.body" v-html="paragraph"></p>
            </div>
            
            <div class="mt-15 mb-15 flex f-row f-justify-end"><button class="btn btn-black" type="button" @click="closePost()">Close Post</button></div>
            
        </div>
    </div>
    `
};