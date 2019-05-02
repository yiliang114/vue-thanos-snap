<template>
  <div class="main">
    <div class="gauntlet">
      <div class="gauntlet-wrapper">
        <!-- <span>剩余英雄： {{residue}} 个</span> -->
        <div id="gauntlet-snap"
          v-if="showSnap"
          :class="snaping? 'snaping':''"
          class="gauntlet-item"
          @click="snapHandle"></div>
        <div id="gauntlet-reverse"
          v-if="showReverse"
          :class="reversing? 'reversing':''"
          class="gauntlet-item"
          @click="reverseHandle"></div>

      </div>
    </div>

    <Content :heroes="heroes" />
    <audio :src="require('../assets/audios/thanos_snap_sound.mp3')"
      preload
      ref="snap"></audio>
    <audio :src="require('../assets/audios/thanos_reverse_sound.mp3')"
      preload
      ref="reverse"></audio>
    <audio :src="require(`../assets/audios/thanos_dust_${item}.mp3`)"
      v-for="item in 6"
      :key="item"
      preload
      :id="`dust_${item}`"></audio>
  </div>
</template>

<script>
import Content from "./Content";
import html2canvas from "html2canvas";
export default {
  name: "Gauntlet",
  data() {
    return {
      showSnap: true,
      showReverse: false,
      snaping: false,
      reversing: false,

      heroesHided: [],
      residue: 0,
      heroes: [
        {
          id: 1,
          name: "Iron Man",
          src: require("../assets/avatar/1.jpg")
        },
        {
          id: 2,
          name: "Black Widow",
          src: require("../assets/avatar/2.jpg")
        },
        {
          id: 3,
          name: "Captain America",
          src: require("../assets/avatar/3.jpg")
        },
        {
          id: 4,
          name: "Spider Man",
          src: require("../assets/avatar/4.jpg")
        },
        {
          id: 5,
          name: "Thor",
          src: require("../assets/avatar/5.jpg")
        },
        {
          id: 6,
          name: "Hulk",
          src: require("../assets/avatar/6.jpg")
        },
        {
          id: 7,
          name: "Black Panther",
          src: require("../assets/avatar/7.jpg")
        },
        {
          id: 8,
          name: "Doctor Stranger",
          src: require("../assets/avatar/8.jpg")
        }
      ]
    };
  },
  methods: {
    sleep(delay) {
      return new Promise(resovle => {
        setTimeout(() => {
          resovle();
        }, delay || 1000);
      });
    },
    snapHandle() {
      this.snaping = true;
      this.playAudio("snap");

      // 随机消失
      setTimeout(async () => {
        this.showReverse = true;
        this.showSnap = false;

        // get half heroes randomly
        this.heroesHided = this.heroes
          .slice(0)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.ceil(this.heroes.length / 2));
        // from ashes to ashes
        for (let i = 0; i < this.heroesHided.length; i++) {
          let hero = this.heroesHided[i],
            itm = document.getElementById(hero.id);
          await this.sleep();
          // this.playAudio(i);
          await this.snapToDust(itm);
          // this.residue--;
        }

        this.snaping = false;
      }, 1500);
    },
    reverseHandle() {
      this.reversing = true;
      this.playAudio("reverse");

      // 随机消失
      setTimeout(() => {
        this.showSnap = true;
        this.showReverse = false;

        this.heroesHided.forEach(hero => {
          let itm = document.getElementById(hero.id);
          itm.style.visibility = "visible";
          // if-show
          this.addClass(itm, "time");
        });
        this.residue = this.heroes.length;
        this.snaping = false;
      }, 1500);
    },
    playAudio(target) {
      if (["snap", "reverse"].indexOf(target) > -1) {
        const dom = this.$refs[target];
        dom && dom.play();
      } else {
        let index = target || Math.floor(Math.random() * 6 + 1);
        const dom = document.getElementById(`dust_${index}`);
        dom && dom.play();
      }
    },
    generateFrames($canvas, count = 32) {
      const { width, height } = $canvas;
      const ctx = $canvas.getContext("2d");
      const originalData = ctx.getImageData(0, 0, width, height);
      const imageDatas = [...Array(count)].map((_, i) =>
        ctx.createImageData(width, height)
      );

      for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
          // REPEAT
          for (let i = 0; i < 2; ++i) {
            const dataIndex = Math.floor(
              (count * (Math.random() + (2 * x) / width)) / 3
            );
            const pixelIndex = (y * width + x) * 4;
            for (let offset = 0; offset < 4; ++offset) {
              imageDatas[dataIndex].data[pixelIndex + offset] =
                originalData.data[pixelIndex + offset];
            }
          }
        }
      }

      return imageDatas.map(data => {
        const $c = $canvas.cloneNode(true);
        $c.getContext("2d").putImageData(data, 0, 0);
        return $c;
      });
    },
    replaceElementVisually($old, $new) {
      this.playAudio();
      const $parent = $old.offsetParent;
      $new.style.top = `${$old.offsetTop}px`;
      $new.style.left = `${$old.offsetLeft}px`;
      $new.style.width = `${$old.offsetWidth}px`;
      $new.style.height = `${$old.offsetHeight}px`;
      $parent.appendChild($new);
      $old.style.visibility = "hidden";
    },
    snapToDust($elm) {
      return new Promise((resolve, reject) => {
        html2canvas($elm, {
          allowTaint: true
        }).then($canvas => {
          // create a container
          const $container = document.createElement("div");
          $container.classList.add("dust-container");

          // frames for animation
          const $frames = this.generateFrames($canvas);
          $frames.forEach(($frame, i) => {
            $frame.style.transitionDelay = `${(1.35 * i) / $frames.length}s`;
            $container.appendChild($frame);
          });

          // insert canvas into DOM over the element
          this.replaceElementVisually($elm, $container);

          // play dust audio
          let index = Math.floor(Math.random() * 6 + 1);
          // const dom = this.$refs[`dust_${index}`];
          // const dom = document.getElementById(`dust_${index}`);
          // dom && dom.play();

          // animate them
          $container.offsetLeft;
          $frames.forEach($frame => {
            const randomRadian = 2 * Math.PI * (Math.random() - 0.5);
            $frame.style.transform = `rotate(${15 *
              (Math.random() - 0.5)}deg) translate(${60 *
              Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px)
rotate(${15 * (Math.random() - 0.5)}deg)`;
            $frame.style.opacity = 0;
          });

          resolve();
        });
      });
    },
    addClass($ele, cls) {
      if (!this.hasClass($ele, cls)) {
        $ele.className =
          $ele.className == "" ? cls : $ele.className + " " + cls;
      }
    },
    hasClass($ele, cls) {
      cls = cls || "";
      if (cls.replace(/\s/g, "").length == 0) {
        return false;
      }
      return new RegExp(" " + cls + " ").test(" " + $ele.className + " ");
    }
  },
  components: {
    Content
  },
  mounted() {
    this.residue = this.heroes.length;
  }
};
</script>
