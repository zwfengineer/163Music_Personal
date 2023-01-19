var __renderjsModules={};

__renderjsModules.c52744d6 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });
  var stdin_default = {
    mounted() {
      this.init();
    },
    methods: {
      video() {
        let video = document.createElement("video");
        video.className = "video";
        video.src = this.option.src;
        video.controls = this.option.controls;
        video.id = this.option.id;
        video.ontimeupdate = this.timeupdate;
        video.onended = this.ended;
        return video;
      },
      init() {
        let container = this.$ownerInstance.$el.querySelector(".videoContainer");
        container.append(this.video());
        this.setcontext();
      },
      update(nv) {
        this.option = nv;
      },
      timeupdate(event) {
        this.$ownerInstance.callMethod("timeupdate", event);
      },
      ended(event) {
        this.$ownerInstance.callMethod("ended", event);
      },
      setcontext() {
        this.$ownerInstance.callMethod("setContext");
      }
    }
  };
  return __toCommonJS(stdin_exports);
})();
