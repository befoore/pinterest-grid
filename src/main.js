let container = document.getElementById('wrapper');
let items = document.getElementsByClassName('item');
let gridCols;
let vertSum = [];
let gridItems = [];

let positionItem = function(elem){
  let elemW = elem.offsetWidth;
  let gridSize = gridItems.length;
  gridCols = gridCols || ~~((container.offsetWidth-25) / elemW);
  
  if(gridSize < gridCols){
    elem.style.transform = 'translateX('+gridSize*elemW+'px) translateY(0)';
    vertSum.push(elem.offsetHeight);
  } else {
    let minVertValue = Math.min.apply(null, vertSum) || 0;
    let minVertKey = vertSum.indexOf(minVertValue) || 0;
    elem.style.transform = 'translateX('+minVertKey*elemW+'px) translateY('+minVertValue+'px)';
    vertSum[minVertKey] += elem.offsetHeight;
  }
}

let pushToGrid = function(elem){
  positionItem(elem);
  gridItems.push(elem);
}

let reRenderGrid = function(){
  let elemW = gridItems[0].offsetWidth || 0;
  gridCols = ~~((container.offsetWidth-25) / elemW);
  vertSum = [];
  for(let i=0;i<gridCols;i++) vertSum.push(0);

  for(let i=0;i<gridItems.length;i++){
    positionItem(gridItems[i]);
  }
}

window.addEventListener("resize", function(){
  let elemW = gridItems[0].offsetWidth || 0;
  if(gridCols != ~~((container.offsetWidth-25) / elemW)){
    reRenderGrid();
    resizeContainer();
  }
});

let resizeContainer = function(){
  let elemW = gridItems[0].offsetWidth || 0;
  let actualWidth = elemW*gridCols;
  let maxHeight = Math.max.apply(null, vertSum);

  container.getElementsByClassName('centerItems')[0].style.width = actualWidth+"px";
  container.getElementsByClassName('centerItems')[0].style.height = maxHeight+"px";
};

for(let i=0;i<items.length;i++){
  pushToGrid(items[i]);
}

resizeContainer();
