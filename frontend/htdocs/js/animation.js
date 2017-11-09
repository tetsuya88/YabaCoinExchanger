(function() {
  var ripple, ripples, RippleEffect,loc, cover, coversize, style, x, y, i, num;

  //クラス名rippleの要素を取得
  ripples = document.querySelectorAll('.ripple');

  //位置を取得
  RippleEffect = function(e) {
  ripple = this;//クリックされたボタンを取得
 	cover = document.createElement('span');//span作る
 	coversize = ripple.offsetWidth;//要素の幅を取得
  loc = ripple.getBoundingClientRect();//絶対座標の取得
  x = e.pageX - loc.left - window.pageXOffset - (coversize / 2);
  y = e.pageY - loc.top - window.pageYOffset - (coversize / 2);
  pos = 'top:' + y + 'px; left:' + x + 'px; height:' + coversize + 'px; width:' + coversize + 'px;';

  //spanを追加
  ripple.appendChild(cover);
  cover.setAttribute('style', pos);
  cover.setAttribute('class', 'rp-effect');//クラス名追加

  //しばらくしたらspanを削除
  setTimeout(function() {
    var list = document.getElementsByClassName( "rp-effect" );
    for(var i =list.length-1;i>=0; i--){//末尾から順にすべて削除
    	list[i].parentNode.removeChild(list[i]);
  }}, 2000)};
  for (i = 0, num = ripples.length; i < num; i++) {
    ripple = ripples[i];
    ripple.addEventListener('mousedown', RippleEffect);
  }
}());

var topView = document.getElementsByClassName('top')[0];
var startButton = document.getElementsByClassName('startButton')[0];
var mainView = document.getElementsByClassName('main')[0];
var submitButton = document.getElementsByClassName('submitButton')[0];

startButton.addEventListener("click", function (e) {
  mainView.classList.remove('closeMain');
  submitButton.classList.remove('submitButtonDisappear');
  topView.classList.add('closeTop');
});

submitButton.addEventListener("click",function(e){
  topView.classList.remove('closeTop');
  submitButton.classList.add('submitButtonDisappear');
  mainView.classList.add('closeMain');

});
