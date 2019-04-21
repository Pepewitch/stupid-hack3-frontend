const BASE_URL = "https://birds-know.herokuapp.com/";

$(document).ready(function() {
  const $coverBottom = $("#cover-bottom");
  const $file = $("#file");
  $file.change(function(e) {
    const file = e.target.files[0];
    handleSelectFile(file);
  });
  $coverBottom.click(function() {
    $file.click();
  });
  const coverBottom = document.getElementById("cover-bottom-image");
  coverBottom.ondragenter = () =>
    setCoverBottomImage("/assets/image/landing2-drop.png");
  coverBottom.ondragleave = () =>
    setCoverBottomImage("/assets/image/landing2.png");
  coverBottom.ondragend = e => e.preventDefault();
  coverBottom.ondragover = e => e.preventDefault();
  coverBottom.ondrop = e => dropFile(e);
});
function dropFile(e) {
  e.preventDefault();
  const file =
    e.dataTransfer.files && e.dataTransfer.files[0]
      ? e.dataTransfer.files[0]
      : null;
  setCoverBottomImage("/assets/image/landing2.png");
  handleSelectFile(file);
}
function setCoverBottomImage(src) {
  $("#cover-bottom-image").attr("src", src);
}
function handleSelectFile(file) {
  if (file && file.type === "text/plain") {
    $("#cover-bottom").hide();
    $("#loading").css("display", "flex");
    setTimeout(() => {
      const form = new FormData();
      form.append("file", file);
      $.ajax({
        url: `${BASE_URL}/chat`,
        type: "POST",
        data: form,
        processData: false,
        contentType: false
      })
        .done(function(e) {
          $("#loading").hide();
          showOutput(e.score);
        })
        .fail(function() {
          console.log("An error occurred, the files couldn't be sent!");
          alert("Upload fail.");
          // location.reload();
        });
    }, 3000);
  } else {
    alert("Please drop text file");
  }
}

function showOutput(score) {
  const $output = $("#output");
  const $outputText = $("#output-text");
  let text;
  score = score * 2;
  if (score > 1) {
    score = 1;
  }
  if (score < 0) {
    score = 0;
  }
  if (score < 0.3) {
    text = [
      "แบบนี้นกแน่นอน ไม่ต้องง้องอนคุยต่อให้เสียเวลา ไปหาคนใหม่จะเกิดประโยชน์มากกว่า",
      "เขาไม่จริงจังกับคุณมากเท่าที่คุณจริงจังกับเขา ดูจากแชทก็รู้แล้วว่านกจะโยนมาถามนกทำไม",
      "เขาชัดเจนกับคุณมากๆ ว่าคุณเป็นได้แค่เพื่อนของเขา",
      "เขาตอบช้าและไม่อยากตอบ อย่าตื้อเขาเลย",
      "เขาดองแชทคุณ คุณควรไปเกิดใหม่เป็นอย่างอื่นที่ไม่ใช่นก"
    ];
  } else if (score < 0.5) {
    text = [
      "เขาจริงใจกับคุณ แต่ไม่จริงจัง ให้ความหวังและอาจจะจากไป ไม่เกินสามเดือนต้องเลิกลาแน่นอน",
      "เก็บความทรงจำดีๆที่มีต่อกันไว้แล้วรีบไปร่ำลากันก่อนออกหาล่าคนใหม่",
      "ดูจากแชทที่หนักขวาเกินไป คุณกำลังมีคู่แข่งหัวใจแน่นอน จะสมหวังหรือนอนร้องไห้ต้องรีบไขความลับวิธีทำแต้มเอาคะแนนหัวใจ",
      "เขาอยากรักษาคุณเอาไว้  ในฐานะเพื่อน"
    ];
  } else if (score < 0.7) {
    text = [
      "เขาหลงเสน่ห์คุณแล้ว การโต้ตอบกันระหว่างคุณกับเขานั้นสนุกสนานและเต็มไปด้วยความสุข",
      "ไม่หนักขวาไม่หนักซ้าย กำลังพอดี มีแนวโน้มจะได้สละโสด"
    ];
  } else if (score < 0.8) {
    text = ["ตอบเร็วไม่มีรีรอ ชัดเจนมากว่าเขาคิดถึงคุณตลอดเวลา ไม่นกแน่นอน"];
  } else {
    text = [
      "เขายกพื้นที่ทุกห้องหัวใจให้คุณไปแล้ว ยินดีด้วยกับชัยชนะ",
      "เขาได้ครอบครองหัวใจของเขาแล้ว",
      "เขาคิดถึงคุณทุกวินาที"
    ];
  }
  $outputText.html(
    `โอกาสนก : ${(100 - score * 100).toFixed(2)}%<br>${
      text[Math.floor(Math.random() * text.length)]
    }`
  );
  $output.css("display", "flex");
  $("#sponsor").css("display", "flex");
}
