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
        currentScreenComponent: routing.NotFoundScreenComponent
    },
    computed: {
        ViewComponent () {
            return this.currentScreenComponent;
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
        routeTo (screenComponentName){
            console.log(screenComponentName)
            let fullScreenComponent = this.findFullScreenComponent(screenComponentName);
            if( (fullScreenComponent.needAuthentication === true) && (this.isAuthenticated() === false)) {
                fullScreenComponent = this.findFullScreenComponent('Login');
            }
            if(fullScreenComponent.name === 'NotFound'){
                notify.notify('Page Not Found','error');
                return;
            }
            this.currentScreenComponent = fullScreenComponent.component;
            // history.pushState({}, fullScreenComponent.name, fullScreenComponent.route);
            location.hash = fullScreenComponent.name;
        },
        defineStartScreen () {
            if(window.localStorage.sRegisterToken !== ''){
                let screenComponent = this.findFullScreenComponentByHash(location.hash);
                this.routeTo(screenComponent.name === 'NotFound' ? routing.HomeScreenComponent.name : screenComponent.name);
            } else {
                this.routeTo('Login');
            }
        },
    },
    created () {
        EventBus.$on('route',(data) => {
            this.routeTo(data);
        });
        EventBus.$on('action',(data) => {
            this.runAction(data);
        });
        this.defineStartScreen();
    },
    render: function (createElement) {
        return createElement(this.ViewComponent);
    }
});