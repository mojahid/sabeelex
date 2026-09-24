document.getElementById('year').textContent=new Date().getFullYear();
const b=document.querySelector('.menu'),n=document.querySelector('nav');
b.addEventListener('click',()=>n.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));

// Accessible featured-product carousel. No external slider library required.
(()=>{
  const root=document.querySelector('.hero-slider');
  if(!root)return;
  const slides=[...root.querySelectorAll('.hero-slide')];
  const dots=[...root.querySelectorAll('.slide-dot')];
  const prev=root.querySelector('.slide-prev'),next=root.querySelector('.slide-next');
  const pause=root.querySelector('.slide-pause'),announcement=root.querySelector('#slide-announcement');
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let index=0,timer=null,userPaused=motion.matches;
  const slideNames=['Al Mudhish milk powder','Baraka biscuits','Napta sesame oil'];
  function show(i,announce=true){
    index=(i+slides.length)%slides.length;
    slides.forEach((slide,j)=>{
      const active=j===index;
      slide.classList.toggle('is-active',active);
      slide.setAttribute('aria-hidden',String(!active));
      if(active)slide.removeAttribute('inert');else slide.setAttribute('inert','');
      dots[j].classList.toggle('is-active',active);
      dots[j].setAttribute('aria-current',String(active));
    });
    if(announce)announcement.textContent=`Featured product ${index+1} of ${slides.length}: ${slideNames[index]}`;
  }
  function stop(){if(timer!==null){clearInterval(timer);timer=null}}
  function start(){stop();if(!userPaused&&!document.hidden)timer=setInterval(()=>show(index+1,false),4500)}
  function refreshPause(){pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Resume automatic banner rotation':'Pause automatic banner rotation');pause.innerHTML=userPaused?'▶ <span>Play</span>':'Ⅱ <span>Pause</span>'}
  function go(i){show(i);start()}
  prev.addEventListener('click',()=>go(index-1));next.addEventListener('click',()=>go(index+1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
  pause.addEventListener('click',()=>{userPaused=!userPaused;refreshPause();start()});
  // Keep auto-rotation running while hovering or focusing banner controls.
  // The explicit Pause button is the only user control that stops rotation.
  root.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.key==='ArrowLeft'){e.preventDefault();go(index-1)}if(e.key==='ArrowRight'){e.preventDefault();go(index+1)}});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  motion.addEventListener('change',()=>{userPaused=motion.matches;refreshPause();start()});
  refreshPause();start();
})();
