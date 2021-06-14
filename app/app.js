import EventBus from "./EventBus.js";
import routing from "./routing.js";
import noticeBox from "./../Components/NoticeBox.js";
import notify from "./notify.js";

Vue.component('notice-box', noticeBox);
Vue.directive('focus', {
    // Quando o elemento vinculado é inserido no DOM...
    inserted: function (el) {
      // Coloque o foco no elemento
      el.focus()
    }
});

const vm = new Vue({
    el: "#app",
    data: {
        currentScreenComponent: routing.NotFoundScreenComponent,
        currentScreenComponentParameters: [],
        queryStringParams: []
    },
    computed: {
        ViewComponent () {
            return this.currentScreenComponent;
        },
        ViewComponentParameters () {
            return this.currentScreenComponentParameters;
        }
    },
    methods: {
        runAction (actionName) {
            if(actionName === 'logout') {
                this.logout();
            } else {
                console.error('unsuported action: ', actionName);
            }
        },
        findFullScreenComponentByHash(hash){
            let fullScreenComponent = routing.screenComponents.find( component => {
                return component.hash === hash
            });
            if(fullScreenComponent === undefined) fullScreenComponent = routing.NotFoundScreenComponent
            return fullScreenComponent;
        },
        findFullScreenComponent (screenComponentName) {
            let fullScreenComponent = routing.screenComponents.find( component => {
                return component.name === screenComponentName;
            });
            
            if(fullScreenComponent === undefined) fullScreenComponent = routing.NotFoundScreenComponent
            return fullScreenComponent;
        },
        isAuthenticated() {
            if(window.localStorage.sRegisterToken === '' ||
            window.localStorage.sRegisterToken === undefined){
                return false;
            }
            return true;
        },
        extractParametersFromScreenComponentData (data) {
            if(Array.isArray(data)) {
                return {'screenComponentName':data[0], 'parameters': data[1] };
            } else {
                return {'screenComponentName':data, 'parameters': [] };
            }
        },
        routeTo (data){
            const {screenComponentName, parameters} = this.extractParametersFromScreenComponentData(data);
            console.log('screenComponentName', screenComponentName)
            console.log('parameters', parameters)
            let fullScreenComponent = this.findFullScreenComponent(screenComponentName);
            if( (fullScreenComponent.needAuthentication === true) && (this.isAuthenticated() === false)) {
                fullScreenComponent = this.findFullScreenComponent('Login');
            }
            if(fullScreenComponent.name === 'NotFound'){
                notify.notify('Page Not Found','error');
                return;
            }
            this.currentScreenComponentParameters = parameters;
            this.currentScreenComponent = fullScreenComponent.component;
            // history.pushState({}, fullScreenComponent.name, fullScreenComponent.route);
            // location.hash = fullScreenComponent.name;
        },
        defineStartScreenNew () {
            if(window.location.pathname.includes('/#post')){
                //é um post
                this.routeTo(['Post', this.queryStringParams]);
            } else {
                this.defineStartScreenOld();
            }
        },
        defineStartScreenOld () {
            if(window.localStorage.sRegisterToken !== ''){
                let screenComponent = this.findFullScreenComponentByHash(location.hash);
                this.routeTo(screenComponent.name === 'NotFound' ? routing.HomeScreenComponent.name : screenComponent.name);
            } else {
                this.routeTo('Login');
            }
        },
        getQueryStringParams(){
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            this.queryStringParams = params;
            console.log('query String Params', this.queryStringParams);
            console.log('window location', window.location);
        },
    },
    created () {
        EventBus.$on('route',(data) => {
            this.routeTo(data);
        });
        EventBus.$on('action',(data) => {
            this.runAction(data);
        });
        this.getQueryStringParams();
        this.defineStartScreenNew();
    },
    render: function (createElement) {
        return createElement(
            this.ViewComponent,
            {
                props: {
                    parameters: this.ViewComponentParameters
                },
            }
        );
    }
});