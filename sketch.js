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

  // 計算影像顯示的寬高，為畫布的50%
  let videoWidth = width * 0.5;
  let videoHeight = height * 0.5;
  // 計算影像在畫布中央的x, y座標
  let x = (width - videoWidth) / 2;
  let y = (height - videoHeight) / 2;

  // 修正左右顛倒問題：使用 push/pop 確保翻轉只影響影像繪製
  push();
  translate(width, 0); // 將原點移動到畫布右側
  scale(-1, 1);        // 水平翻轉畫布
  // 因為畫布已翻轉，x 座標會從右側開始計算，由於影像置中，x 的數值維持不變即可
  image(video, x, y, videoWidth, videoHeight);
  pop();
}
