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
  const file = e.dataTransfer.items
    ? e.dataTransfer.items[0]
    : e.dataTransfer.files
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
    const form = new FormData();
    form.append("file", file);
    $.ajax({
      url: "http://localhost:5000/chat",
      type: "POST",
      data: form,
      processData: false,
      contentType: false
    })
    .done(function(e) {
      // TODO: Show output base on return value
        console.log(e);
        $("#loading").hide();
      })
      .fail(function() {
        console.log("An error occurred, the files couldn't be sent!");
        alert("Upload fail.");
        location.reload();
      });
    $.ajax({});
  } else {
    alert("Please drop text file");
  }
}
