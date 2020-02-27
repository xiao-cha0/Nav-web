const $siteList = $('.siteList');
const $lastLi  = $siteList.find('li.last');
const x= localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {logo: 'G', url:'https://github.com'},
    {logo: 'J', url: 'https://juejin.im'},
    {logo: 'Z', url: 'https://www.zhihu.com'}
  ];
const simplifyUrl = (url)=>{
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '');//删除 / 开头的内容
};
let render = ()=>{
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach((node,index)=>{
    const $li = $(`<li>
      <div class="site">
        <div class="logo">
          ${node.logo}
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
         <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
       </div>
      </div>
</li>`).insertBefore($lastLi);
    $li.on('click',()=>{
      window.open(node.url)
    });
    $li.on('click','.close',(e)=>{
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index,1);
      render()
    })
  });
};
render();
$('.addButton')
  .on('click',()=>{
  let url =  window.prompt("请问你要添加的网址是？");
  if (url.indexOf('http')!==0){
    url = 'https://' + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: 'text',
    url: url,
  });
  render()
  });
window.onbeforeunload = () =>{
  const string = JSON.stringify(hashMap);
 localStorage.setItem('x',string)
};
$(document).on('keypress',(e)=>{//keypress就是键盘按下事件
  const {key} = e;
  for(let i = 0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase() === key){//toLowerCase()是把大写变成小写
      window.open(hashMap[i].url)
    }
  }
});