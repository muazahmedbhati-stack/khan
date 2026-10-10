'use strict';
// Prices and categories are from the supplied printed Urdu menu.
const categories = [
  {name:'Handi',note:'Boneless handi · Half / Full',items:[
    ['Chicken Boneless Ginger Handi','چکن بون لیس ادرک ہانڈی',1150,2000],
    ['Chicken Achari Handi','چکن اچاری ہانڈی',1250,2200],
    ['Chicken Makhni Handi','چکن مکھنی ہانڈی',1300,2250],
    ['Chicken White Handi','چکن وائٹ ہانڈی',1300,2250],
    ['Special Chicken Handi · Desi Ghee','اسپیشل چکن ہانڈی (دیسی گھی)',1350,2400],
    ['Special Chicken Handi · Olive Oil','اسپیشل چکن ہانڈی (زیتون آئل)',1350,2400],
    ['Khan Special Chicken Handi · Cashew','خان اسپیشل چکن ہانڈی (کاجو پیسٹ)',1400,2450]]},
  {name:'Chinese',note:'Rice & Chinese gravy',items:[
    ['Chicken Masala Rice','چکن مصالحہ رائس',750],['Chicken Fried Rice','چکن فرائیڈ رائس',750],['Egg Fried Rice','ایگ فرائیڈ رائس',650],['Vegetable Fried Rice','ویجیٹیبل فرائیڈ رائس',550],
    ['Chicken Hot Chilli','چکن ہاٹ چلی',1100],['Chicken Manchurian','چکن منچورین',1000],['Chicken Sweet & Sour','چکن سویٹ اینڈ ساور',1150],['Chicken Black Pepper','چکن بلیک پیپر',900],['Chicken with Garlic Sauce','چکن ود گارلک ساس',900],['Chop Suey','چاپ سوئی',1100],['Pasta Alfredo','پاستا الفریڈو',900],['Special Chicken Chow Mein','اسپیشل چکن چاؤمین',1300],['Chicken Chow Mein','چکن چاؤمین',950],['Chicken Chilli Dry','چکن چلی ڈرائی',1000]]},
  {name:'Desi',note:'Desi favourites',items:[['Aloo Palak','آلو پالک',200],['Daal Chana','دال چنا',250],['Qeema Karela','قیمہ کریلا',450],['Daal Mash','دال ماش',300],['Murgh Channay','مرغ چنے',300],['Palak Paneer','پالک پنیر',300]]},
  {name:'Naan',note:'Tandoor specials',items:[['Desi Roti','دیسی روٹی',15],['Tandoori Roti','تندوری روٹی',20],['Special Roghni Naan','اسپیشل روغنی نان',80],['Roghni Naan','روغنی نان',60],['Garlic Naan','گارلک نان',60],['Kalonji Naan','کلونجی نان',60],['Paratha Naan','پراٹھا نان',60],['Roti per Head · Indoor','روٹی پر ہیڈ (ان ڈور)',80]]},
  {name:'Salads',note:'Something fresh on the side',items:[['Special Raita','اسپیشل رائتہ',130],['Mint & Green Raita','منٹ گرین رائتہ',130],['Fresh Salad','فریش سلاد',130],['Kachumber Salad','کچومر سلاد',180],['Russian Salad','رشین سلاد',320]]},
  {name:'Desserts',note:'A sweet finish',items:[['Fruit Trifle','فروٹ ٹرائفل',350],['Kheer Cup','کھیر کپ',220],['Gajar Halwa','گاجر حلوہ',300],['Gulab Jamun · 2 pieces','گلاب جامن',140]]},
  {name:'Drinks',note:'Chai, kahwa & cold drinks',items:[['Elaichi Chai','الائچی چائے',180],['Karak Chai','کڑک چائے',180],['Special Chai','اسپیشل چائے',200],['Zafrani Kahwa','زعفرانی قہوہ',180],['Peshawari Kahwa','پشاوری قہوہ',80],['Mineral Water · Small','منرل واٹر (چھوٹا)',80],['Mineral Water · Large','منرل واٹر (بڑا)',160],['Cold Drink · 1.5 litre','کولڈ ڈرنک',240],['Cold Drink · Can','کولڈ ڈرنک (کین)',150],['Cold Drink · Regular','کولڈ ڈرنک ریگولر',70]]}
];
let selected=0;
const tabs=document.querySelector('.tabs'),items=document.querySelector('#menu-items'),search=document.querySelector('#menu-search');
categories.forEach((category,index)=>{
  const button=document.createElement('button');button.type='button';button.textContent=category.name;button.setAttribute('aria-pressed',String(index===selected));
  button.addEventListener('click',()=>{selected=index;search.value='';render();});tabs.append(button);
});
function render(){
  [...tabs.children].forEach((button,index)=>button.setAttribute('aria-pressed',String(index===selected)));
  const query=search.value.trim().toLowerCase();
  document.querySelector('#category-note').textContent=query?'Searching all menu categories':categories[selected].note;
  const matches=(query?categories.flatMap(c=>c.items):categories[selected].items).filter(item=>item[0].toLowerCase().includes(query)||item[1].includes(query));
  items.replaceChildren();
  if(!matches.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='No dishes found. Try another craving.';items.append(empty);}
  matches.forEach(([name,urdu,half,full])=>{
    const row=document.createElement('article');row.className='menu-item';
    const description=document.createElement('div'),heading=document.createElement('h3'),translation=document.createElement('span'),price=document.createElement('div');
    heading.textContent=name;translation.className='urdu';translation.lang='ur';translation.dir='rtl';translation.textContent=urdu;
    description.append(heading,translation);price.className='menu-price';price.textContent=full?`${half.toLocaleString('en-PK')} / ${full.toLocaleString('en-PK')}`:`Rs ${half.toLocaleString('en-PK')}`;
    if(full){const label=document.createElement('small');label.textContent='Rs · Half / Full';price.append(label);}row.append(description,price);items.append(row);
  });
}
search.addEventListener('input',render);render();
document.querySelectorAll('[data-category]').forEach(link=>{
  link.addEventListener('click',()=>{selected=Number(link.dataset.category);search.value='';render();});
});
document.querySelector('#year').textContent=new Date().getFullYear();
const dialog=document.querySelector('#menu-dialog'),openButton=document.querySelector('#open-menu');
openButton.addEventListener('click',()=>{dialog.showModal();document.body.classList.add('dialog-open');});
document.querySelector('#close-menu').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');openButton.focus();});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reduced.matches){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));document.body.classList.add('motion-ready');
}
let ticking=false;
const header=document.querySelector('.header'),photo=document.querySelector('.hero-photo');
function updateScroll(){
  header.classList.toggle('scrolled',window.scrollY>20);
  const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
  document.querySelector('.scroll-progress').style.transform=`scaleX(${maxScroll>0?window.scrollY/maxScroll:0})`;
  if(!reduced.matches&&window.innerWidth>700&&window.scrollY<1100){photo.style.transform=`scale(${1+Math.min(window.scrollY*.000025,.025)})`;}
  else{photo.style.transform='';}
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});window.addEventListener('resize',updateScroll);reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));updateScroll();});updateScroll();
