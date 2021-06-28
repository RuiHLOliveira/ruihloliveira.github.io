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
        closePost () {
            this.$emit('closePost');
        },
        processCode (paragraph) {
            paragraph = paragraph.replace("<code>","");
            paragraph = paragraph.replace("</code>","");
            return paragraph;
        }
    },
    created () {
        console.log('inner post', this.post);
    },
    template: `
    <div class="">
        <transition name="fadeInDown">
            <div v-if="post.title">
                <div class="flex f-column f-alignitems-center">
                    <div class="post-title mt-5 mb-5"><span v-html="post.title"></span></div>
                    <div class="post-subtitle mt-5 mb-5 text-center"><span v-html="post.subtitle"></span></div>
                    <div class="post-date mt-5 mb-5"><span v-html="post.date" ></span></div>
                </div>
                <div class="mt-15 mb-15 flex f-row f-justify-end"><button class="btn btn-black" type="button" @click="closePost()">Voltar</button></div>
                <div class="post-body">
                    <p v-for="paragraph in post.body" >
                        <span v-if="paragraph.includes('<code>')" class="code-container">{{processCode(paragraph)}}</span>
                        <span v-else v-html="paragraph"></span>
                    </p>
                </div>
                <div class="mt-15 mb-15 flex f-row f-justify-end"><button class="btn btn-black" type="button" @click="closePost()">Voltar</button></div>
            </div>
        </transition>
    </div>
    `
};