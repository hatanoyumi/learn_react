import './style.css'
import logo from '../public/images/logo.svg'
import { setBars } from './bars';
import anime from 'animejs/lib/anime.es.js';

document.querySelector('#app').innerHTML = `
  <header class="header">
    <div class="container">
      <div class="flcon">
        <div class="logo"><img src="${logo}" alt="JavaScript" width="60"></div>
        <div class="title">
          <h1>ビルドツールを使ったサイト制作</h1>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div id="animation" class="animation">
      </div>
    </div>
  </main>
`

// ボックスを配置
const parent = document.querySelector('#animation');
const className = 'bar';
setBars(parent, className, 30);
addEventListener('resize', (e) => {
  setBars(parent, className, 30)
});

// アニメーション
anime({
  targets: parent.querySelectorAll(`.${className}`),
  scaleY: [1.3, 1],
  opacity: 1,
  duration: 2000,
  delay: anime.stagger(10),
});
