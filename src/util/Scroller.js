import easeInOutQuad from './Easing';

function scrollToPosition(position, duration, callback = null) {
  const start = window.scrollY || window.pageYOffset;
  const to = position;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = function () {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);

    window.scrollTo(0, val);

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      if (callback) {
        callback();
      }
    }
  };

  if (duration > 0) {
    animateScroll();
  } else {
    window.scrollTo(0, to);
    if (callback) {
      callback();
    }
  }
}

/**
 * Scroll an element using a default easeInOut easing animation
 * @param {Object} anchor DOM element to scroll to
 * @param {Number} duration Duration of the animation effect
 */
function scrollTo(anchor, duration, callback = () => {}, offset = 0) {
  const to = Math.max(anchor.offsetTop - offset, 0);
  scrollToPosition(to, duration, callback);
}

/**
 * Scroll an element using a default easeInOut easing animation
 * @param {Object} anchor DOM element to scroll to
 * @param {Number} duration Duration of the animation effect
 */
export function scrollBodyTo(anchor, duration = 600, callback = () => {}, offset = 0) {
  scrollTo(anchor, duration, callback, offset);
}

export function scrollToTop(duration = 600) {
  scrollToPosition(0, duration);
}
