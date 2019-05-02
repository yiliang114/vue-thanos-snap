<template>
  <div class="main">
    <div class="gauntlet">
      <div class="gauntlet-wrapper">
        <div id="gauntlet-snap"
          v-show="showSnap"
          :class="snaping? 'snaping':''"
          class="gauntlet-item"
          @click="snapHandle"></div>
        <div id="gauntlet-reverse"
          v-show="showReverse"
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
import { heroes } from "@/config";
export default {
  name: "Gauntlet",
  data() {
    return {
      showSnap: true,
      showReverse: false,
      snaping: false,
      reversing: false,
      heroHidedIds: [],
      heroes
    };
  },
  methods: {
    scrollToAnchor(anchorName) {
      if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
          anchorElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    },
    sleep(delay) {
      return new Promise(resovle => {
        setTimeout(() => {
          resovle();
        }, delay || 1000);
      });
    },
    snapHandle() {
      // can not click until harf heroes becomes dust
      if (this.snaping || this.reversing) return;
      this.snaping = true;
      this.playAudio("snap");

      // select half heroes randomly
      setTimeout(async () => {
        this.showReverse = true;
        this.showSnap = false;

        // get half heroes randomly
        this.heroHidedIds = this.heroes
          .slice(0)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.ceil(this.heroes.length / 2))
          .map(hero => hero.id);

        // from ashes to ashes
        for (let i = 0; i < this.heroHidedIds.length; i++) {
          let heroId = this.heroHidedIds[i],
            itm = document.getElementById(heroId);

          this.scrollToAnchor(heroId);
          // add canvas and turn html hidden
          await this.snapToDust(itm);
          await this.sleep();
        }

        this.snaping = false;
      }, 1500);
    },
    reverseHandle() {
      if (this.snaping || this.reversing) return;
      this.reversing = true;
      this.playAudio("reverse");

      setTimeout(() => {
        this.showSnap = true;
        this.showReverse = false;

        this.heroHidedIds.forEach(heroId => {
          let itm = document.getElementById(heroId);
          itm.style.visibility = "visible";
          // if-show
          this.addClass(itm, "time");
        });
        this.reversing = false;
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
      // get a 2d rendering context from $canvas
      const ctx = $canvas.getContext("2d");
      // copy a rectangular area marked by 4 parameter
      const originalData = ctx.getImageData(0, 0, width, height);

      const imageDatas = [...Array(count)].map((_, i) =>
        // createImageData funciton is used to create a blank ImageData obj
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

      // return a array of canvas
      return imageDatas.map(data => {
        const $c = $canvas.cloneNode(true);
        // putImageData used to put a ImageData on a canvas
        $c.getContext("2d").putImageData(data, 0, 0);
        return $c;
      });
    },
    replaceElementVisually($old, $new) {
      // play audio when the hero becomes dust
      this.playAudio();
      // offsetParent could get all attrs
      const $parent = $old.offsetParent;
      $new.style.top = `${$old.offsetTop}px`;
      $new.style.left = `${$old.offsetLeft}px`;
      $new.style.width = `${$old.offsetWidth}px`;
      $new.style.height = `${$old.offsetHeight}px`;
      $parent.appendChild($new);
      $old.style.visibility = "hidden";
    },
    snapToDust($elm) {
      return new Promise(resolve => {
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
  }
};
</script>
