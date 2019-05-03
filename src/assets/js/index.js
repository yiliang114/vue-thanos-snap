(function () {

  /**
   * Declare Variables
   */

  let IDS = []
  let MEMBERS = [1, 2, 3, 4, 5, 6, 7, 8]

  // 副本
  let REPEAT = 2;
  // 备用
  let SPARES = 32;

  /**
   * Declare Doms
   */

  let $snap = document.querySelector('#gauntlet-snap')
  let $reverse = document.querySelector('#gauntlet-reverse')

  /**
   * Click Gauntlet
   */

  $snap.onclick = () => {
    $reverse.style.display = 'none'
    playAudio('snap')
    // 响指的手套动画
    animateGauntlet('snap')

    setTimeout(() => {
      $snap.style.display = 'none'
      $reverse.style.display = 'block'

      makeRandom()

      let i = 0,
        l = IDS.length;
      let snapAction = function () {
        if (i < l) {
          let itm = document.getElementById(IDS[i])
          snapToDust(itm, function () {
            i++
            snapAction()
          })
        }
      }
      snapAction()
    }, 1500)
  }

  $reverse.onclick = () => {
    $snap.style.display = 'none'
    playAudio('reverse')
    animateGauntlet('reverse')

    setTimeout(() => {
      $reverse.style.display = 'none'
      $snap.style.display = 'block'

      for (var i = 0, l = IDS.length; i < l; i++) {
        let itm = document.getElementById(IDS[i])
        itm.style.visibility = 'visible'
        addClass(itm, 'time')
      }
    }, 2500)
  }

  /**
   * Play Audio Files
   */

  function playAudio(type) {
    switch (type) {
      case 'snap':
        document.querySelector('#audio-snap').play()
        break
      case 'reverse':
        document.querySelector('#audio-reverse').play()
        break
      default:
        return
    }
  }

  /**
   * The Infinity Gauntlet Animation
   * 手套动画
   */

  function animateGauntlet(type) {
    removeClass($snap, 'snaping')
    removeClass($reverse, 'reversing')

    if (type == 'snap') {
      addClass($snap, 'snaping')

    } else if (type == 'reverse') {
      addClass($reverse, 'reversing')

    }
  }

  /**
   * Generates the individual subsets of pixels that are animated to create the effect
   * 
   */

  function generateFrames($canvas, count = 32) {
    const {
      width,
      height
    } = $canvas;
    const ctx = $canvas.getContext("2d");
    const originalData = ctx.getImageData(0, 0, width, height);
    const imageDatas = [...Array(count)].map(
      (_, i) => ctx.createImageData(width, height)
    );

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        for (let i = 0; i < REPEAT; ++i) {
          const dataIndex = Math.floor(
            count * (Math.random() + 2 * x / width) / 3
          );
          const pixelIndex = (y * width + x) * 4;
          for (let offset = 0; offset < 4; ++offset) {
            imageDatas[dataIndex].data[pixelIndex + offset] = originalData.data[pixelIndex + offset];
          }
        }
      }
    }

    return imageDatas.map(data => {
      const $c = $canvas.cloneNode(true);
      $c.getContext("2d").putImageData(data, 0, 0);
      return $c;
    });
  }

  /**
   * Insert new element, hiding the old one
   */

  function replaceElementVisually($old, $new) {
    const $parent = $old.offsetParent;
    $new.style.top = `${$old.offsetTop}px`;
    $new.style.left = `${$old.offsetLeft}px`;
    $new.style.width = `${$old.offsetWidth}px`;
    $new.style.height = `${$old.offsetHeight}px`;
    $parent.appendChild($new);
    $old.style.visibility = "hidden";
  }

  /**
   * snapToDust
   * 消失动画
   */

  function snapToDust($elm, callback) {
    html2canvas($elm, {
      allowTaint: true,
    }).then($canvas => {

      // create a container
      const $container = document.createElement("div");
      $container.classList.add("dust-container");

      // frames for animation
      const $frames = generateFrames($canvas, SPARES);
      $frames.forEach(($frame, i) => {
        $frame.style.transitionDelay = `${1.35 * i / $frames.length}s`;
        $container.appendChild($frame);
      });

      // insert canvas into DOM over the element
      replaceElementVisually($elm, $container);

      // animate them
      $container.offsetLeft;
      $frames.forEach($frame => {
        const randomRadian = 2 * Math.PI * (Math.random() - 0.5);
        $frame.style.transform =
          `rotate(${15 * (Math.random() - 0.5)}deg) translate(${60 * Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px)
rotate(${15 * (Math.random() - 0.5)}deg)`;
        $frame.style.opacity = 0;
      });

      if (callback && typeof callback == 'function') {
        callback()
      }
    });
  }

  /**
   * Utils
   */

  function hasClass($ele, cls) {
    cls = cls || ''
    if (cls.replace(/\s/g, '').length == 0) {
      return false
    }
    return new RegExp(' ' + cls + ' ').test(' ' + $ele.className + ' ')
  }

  function addClass($ele, cls) {
    if (!hasClass($ele, cls)) {
      $ele.className = $ele.className == '' ? cls : $ele.className + ' ' + cls
    }
  }

  function removeClass($ele, cls) {
    if (hasClass($ele, cls)) {
      let newClass = ' ' + $ele.className.replace(/[\t\r\n]/g, '') + ' '
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ')
      }
      $ele.className = newClass.replace(/^\s+|\s+$/g, '')
    }
  }

  function makeRandom() {
    IDS = []
    let arr = new Array()
    for (var i = 0; i < MEMBERS.length; i++) {
      arr[i] = i + 1;
    }
    arr.sort(function () {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < Math.ceil(MEMBERS.length / 2); i++) {
      IDS.push(arr[i])
    }
  }

})()