function ribbonFalling() {

  var box = document.getElementById("box");
  var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink','grey','orange'];

  for (var i = 0; i < 1000; i++) {
    
    var div = document.createElement("div");
    div.classList.add("ribbon");
    box.appendChild(div);
  }

  var ribbon = document.querySelectorAll('.ribbon');

  for (var i = 0; i < ribbon.length; i++) {
    
    var size = Math.random() * 0.01 * [i];

    ribbon[i].style.width = 5 + size + 'px';
    ribbon[i].style.height = 16 + size + 'px';
    ribbon[i].style.left = Math.random() * innerWidth + 'px';

    var background = colors[Math.floor(Math.random() * colors.length)];
    ribbon[i].style.backgroundColor = background;

    box.children[i].style.transform = "rotate("+ size*[i] +"deg)";
  }
}
ribbonFalling();