let video;

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  video = createCapture(VIDEO);
  video.size(width / 2, height / 2); // 設定影像的初始大小，雖然會在draw中重新計算，但這是個好的起點
  video.hide(); // 隱藏預設的HTML視訊元素
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
  pop();
}
