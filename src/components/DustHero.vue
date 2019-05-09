<template>
  <div class="dust-container"
    ref="container">
    <canvas v-for="frame in framesLength"
      width="450"
      height="520"
      :class="{
        'dust': showDust
      }"
      :key="frame"></canvas>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "DustList",
  props: {
    heroId: Number
  },
  data() {
    return {
      framesLength: 32,
      showDust: false
    };
  },
  methods: {
    generateFrames($canvas) {
      const { width, height } = $canvas;
      // get a 2d rendering context from $canvas
      const ctx = $canvas.getContext("2d");
      // copy a rectangular area marked by 4 parameter. A ImageData obj has three property, height,width and data.
      const originalData = ctx.getImageData(0, 0, width, height);
      const imageDatas = [...Array(this.framesLength)].map(() =>
        // createImageData funciton is used to create a blank ImageData obj
        ctx.createImageData(width, height)
      );
      // pixel level
      for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
          // show block pixel or original pixel
          // 这里的 i 决定像素密度（相当于把每一个像素分布到几个 canvas 上）
          for (let i = 0; i < 2; ++i) {
            // 随机选中两个 canvas 赋值当前像素
            const dataIndex = Math.floor(
              (this.framesLength * (Math.random() + (2 * x) / width)) / 3
            );
            // 第 i 个像素下标
            const pixelIndex = (y * width + x) * 4;
            for (let offset = 0; offset < 4; ++offset) {
              imageDatas[dataIndex].data[pixelIndex + offset] =
                // 第 i 个像素
                originalData.data[pixelIndex + offset];
            }
          }
        }
      }

      // draw on canvas list
      imageDatas.map((data, index) => {
        const $c = this.$refs.container.children[index];
        // putImageData used to put a ImageData on a canvas
        $c.getContext("2d").putImageData(data, 0, 0);
      });
    },
    async drawCanvas(elm) {
      try {
        const $canvas = await html2canvas(elm, {
          allowTaint: true
        });
        // frames for animation
        this.generateFrames($canvas);

        // add class to trigger transition
        this.$nextTick(() => {
          this.showDust = true;
          this.$emit("hide-hero", this.heroId);
        });
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    }
  },
  mounted() {
    const dom = document.querySelector(".content"),
      elm = dom && dom.children[this.heroId - 1];
    this.drawCanvas(elm);
  }
};
</script>

<style lang='scss'>
$framesLength: 32;
// canvas default style. like width height and so on
.dust-container {
  position: absolute;
  pointer-events: none;
  canvas {
    width: 225px;
    height: 260px;
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 1s ease-out, opacity 1s ease-out;
    opacity: 1;
    transform: rotate(0deg) translate(0px, 0px) rotate(0deg);
  }
  canvas.dust {
    @for $i from 0 to $framesLength {
      &:nth-child(#{$i + 1}) {
        // vue cli@3 enable postcss autoprefixer default.
        // division need a bracket and unit
        transition-delay: (1.35s / $framesLength) * ($i + 1);
        transform: rotate(15deg * (random() - 0.5))
          translate(60px * (random() - 1), 30px * (random() - 1));
        opacity: 0;
      }
    }
  }
}
</style>
