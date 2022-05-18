let textInput;
let inputChooseFile;
let spanChooseFile;
let btnAlphaOrder;
let btnFreqOrder;
let btnFreqImg;
let divTextOutlet;

let freq = {};
let keys= [];

let cnv;
let cw, ch;
let cx, cy;

let data;
let tokens;

function chooseFile(file) {
  textInput.html(file.data);
}
function init(){
  spanChooseFile = select('#spanChooseFile');
  let fileInput= createFileInput(chooseFile);
  fileInput.parent(spanChooseFile);
  
  
  textInput = select('#textInput');
  btnAlphaOrder = select('#btnAlphaOrder');
  btnFreqOrder = select('#btnFreqOrder');
  btnFreqImg = select('#btnFreqImg');
  divTextOutput = select('#divTextOutput');
  
  btnAlphaOrder.mousePressed(analyzeAlphaOrder);
  btnFreqOrder.mousePressed(analyzeFreqOrder);
  btnFreqImg.mousePressed(analyzeFreqImg);
  
  spanDrag = select('#spanDrag');
  spanDrag.dragOver(spanDragOver);
  spanDrag.dragLeave(spanDragLeave);
  spanDrag.drop(gotFile, spanDragLeave);
  
  cw = windowWidth;
  ch = windowHeight- 350;
  //  // cx = (windowWidth - cw) / 2;
  cx = 0;
  cy = 0;
}

function gotFile(file) {
  textInput.html(file.data);
}

function spanDragOver() {
  spanDrag.style('background-color', color(200,200,200));
}

function spanDragLeave() {
  spanDrag.style('background-color', color(255,255,255));
}

function preload() {
  init();
}

function windowResized() {
  //centerCanvas();
}

function centerCanvas() {
  //cnv.position(0, 0);
}


function setup() {
  // noCanvas();
  // createCanvas(400, 400);
  cnv = createCanvas(cw, ch);
  // cnv.position(10,10);
  background(0);
  // centerCanvas();
}




function prepareTokens(){
  if(data == null || data != textInput.value()) {
    
    console.log('data loaded.');
    data = textInput.value();
    tokens = splitTokens(data, " .;,\n");
    
    freq = {};
    keys = [];
    for(let i=0;i<tokens.length;i++) {
      // console.log(tokens[i]);

      if( freq[tokens[i]] == undefined ) {
        freq[tokens[i]] = 1;
        keys.push(tokens[i]);
      } 
      else {
        freq[tokens[i]] ++;
      }
    }    
  }
}

function printOut() {
  fill(255);
  
  let r=100;
  let g=100;
  let b=100;

  for(let i=0;i<keys.length;i++) {
    let word = keys[i];
    let f = freq[word];
    let str = word + ":" + f;
    let p = createP(str);
    // p.style('color', color(r,g,b));
    p.style('color', color(255,g,b));
    p.parent(divTextOutput);
  }  
}


  
function analyzeAlphaOrder() {
  cnv.hide();
  divTextOutput.html('');  
  
  prepareTokens();
  
  keys.sort();

  printOut();
}

function analyzeFreqOrder() {
  cnv.hide();
  divTextOutput.html('');  
  
  prepareTokens();

  keys.sort(compare);
  function compare(a,b) {
    let aa = freq[a];
    let bb = freq[b];
    return bb - aa;
  }
  
  printOut();
}


function analyzeFreqImg() {
  cnv.show();
  divTextOutput.html(''); 

  prepareTokens();
  
  keys.sort(compare);
  function compare(a,b) {
    let aa = freq[a];
    let bb = freq[b];
    return bb - aa;
  }
  
  maxFreq = freq[keys[0]];
  targetSize = 80;
  let multiple = floor(targetSize / maxFreq);
  console.log('maxFreq:', maxFreq, 'multiple:', multiple);
  
  //cnv.parent(divTextOutput);

  background(0);
  
  for(let i=0;i<keys.length;i++) {
    let word = keys[i];
    let f = freq[keys[i]];
    let size = f * multiple;
    
    let x = random(cw);
    let y = random(ch);
    let c = color(random(255), random(255), random(255));
    fill(c);
    textSize(size);
    text(keys[i], x, y);
    // console.log(keys[i] + ':' + freq[keys[i]]);
  }      
}
