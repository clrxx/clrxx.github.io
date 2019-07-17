<template>
  <div ref="vaptcha" style="width: 300px;height: 36px">
    <div class="vaptcha-init-main">
      <div class="vaptcha-init-loading">
        <a href="https://www.vaptcha.com/" target="_blank">
          <img src="https://cdn.vaptcha.com/vaptcha-loading.gif">
        </a>
        <span class="vaptcha-text">VAPTCHA启动中...</span>
      </div>
    </div>
  </div>
</template>

<script>
//ame的修改
const extend = function(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
};
export default {
  props: {
    type: {
      type: String,
      default: "click"
    },
    scene: {
      type: String,
      default: ""
    },
    vpStyle: {
      type: String,
      default: "dark"
    },
    color: {
      type: String,
      color: "#3C8AFF"
    },
    lang: {
      type: String,
      default: "zh-CN"
    }
  },
  mounted() {
    let vid = "5bc2fb22fc650e0fe49b4e5f";
    if (window.location.host.indexOf("myzuhao") >= 0) {
      vid = "5bc29c25fc650e0fe49b4b49";
    } else if (window.location.host.indexOf("mylezu") >= 0) {
      vid = "5c1cb298fc650f175ca92598";
    }
    // console.log(vid);
    var config = extend(
      {
        vid: vid,
        container: this.$refs.vaptcha,
        style: this.vpStyle
      },
      this.$props
    );
    this.loadV2Script().then(() => {
      window.vaptcha(config).then(obj => {
        this.$emit("input", obj);
        obj.render();
      });
    });
  },
  methods: {
    loadV2Script() {
      if (typeof window.vaptcha === "function") {
        //如果已经加载就直接放回
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          var script = document.createElement("script");
          script.src = "https://cdn.vaptcha.com/v2.js";
          script.async = true;
          script.onload = script.onreadystatechange = function() {
            if (
              !this.readyState ||
              this.readyState == "loaded" ||
              this.readyState == "complete"
            ) {
              resolve();
              script.onload = script.onreadystatechange = null;
            }
          };
          document.getElementsByTagName("head")[0].appendChild(script);
        });
      }
    }
  }
};
</script>

<style>
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}

.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
}

.vaptcha-init-loading > a img {
  vertical-align: middle;
}

.vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
}
</style>
