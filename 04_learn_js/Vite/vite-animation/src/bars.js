export function setBars(element, className, n) {
  // 要素を挿入
  if (element.children.length === 0) {
    for (let i = 0; i < n; i++) {
      element.insertAdjacentHTML('afterbegin', `<div class="${className}"></div>`);
    }
  }

  // 挿入する要素の幅と高さを設定
  const bars = element.querySelectorAll(`.${className}`);
  const bounds = element.getBoundingClientRect();
  const childSize = {w: bounds.width / n, h: bounds.height};
  bars.forEach((v, i) => {
    v.style['width'] = childSize.w + 'px';
    v.style['height'] = childSize.h + 'px';
    v.style['background-position-x'] = -(i * childSize.w) + 'px';
  });
}
