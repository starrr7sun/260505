let video;
let faceMesh;
let faces = [];

function gotFaces(results) {
  faces = results;
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  video = createCapture(VIDEO);
  video.size(640, 480); // 設定固定擷取解析度以提高辨識穩定性
  video.hide(); // 隱藏預設的HTML視訊元素

  // 初始化 FaceMesh 臉部辨識模型
  faceMesh = ml5.faceMesh(video, { flipHorizontal: false });
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background('#e7c6ff'); // 設定畫布背景顏色為e7c6ff

  // 顯示文字：教科123456789
  fill(0); // 設定文字顏色（黑色）
  textSize(windowHeight * 0.05); // 根據視窗高度動態調整字體大小
  textAlign(CENTER, CENTER);
  text("教科123456789", width / 2, height * 0.15); // 顯示在畫布水平中央，垂直位置約在上方 15% 處

  // 計算影像顯示的寬高，為畫布的50%
  let videoWidth = width * 0.5;
  let videoHeight = height * 0.5;

  // 修正鏡像問題：將畫布原點移至中心並進行水平翻轉
  push();
  translate(width / 2, height / 2); // 移動到畫布正中央
  scale(-1, 1);                     // 水平翻轉 (達成鏡像效果)
  imageMode(CENTER);                // 設定影像繪製模式為中心點對齊
  image(video, 0, 0, videoWidth, videoHeight); // 在新的中心原點繪製影像

  // 繪製指定的臉部特徵點連線
  if (faces.length > 0 && video.width > 0) {
    let face = faces[0];
    let indices = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
    
    stroke(255, 0, 0); // 線條採用紅色
    strokeWeight(15);  // 線條粗細為15
    noFill();          // 確保連線不會產生填充色

    for (let i = 0; i < indices.length - 1; i++) {
      let p1 = face.keypoints[indices[i]];
      let p2 = face.keypoints[indices[i + 1]];
      
      // 將原始影片的座標映射到畫布中央顯示影像的座標範圍 (-videoWidth/2 到 videoWidth/2)
      let x1 = map(p1.x, 0, video.width, -videoWidth / 2, videoWidth / 2);
      let y1 = map(p1.y, 0, video.height, -videoHeight / 2, videoHeight / 2);
      let x2 = map(p2.x, 0, video.width, -videoWidth / 2, videoWidth / 2);
      let y2 = map(p2.y, 0, video.height, -videoHeight / 2, videoHeight / 2);
      
      line(x1, y1, x2, y2);
    }
  }
  pop();
}
