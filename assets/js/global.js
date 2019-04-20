$(document).ready(function() {
  const $coverBottom = $("#cover-bottom");
  const $file = $("#file");
  $file.change(function(e) {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      console.log("get file");
    } else {
        alert('Please drop text file')
    }
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
  console.log(e.dataTransfer.items);
  setCoverBottomImage("/assets/image/landing2.png");
}
function setCoverBottomImage(src) {
  $("#cover-bottom-image").attr("src", src);
}
