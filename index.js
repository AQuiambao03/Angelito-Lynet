//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// List files
function readUrl(input) {

  let imgName = [];
  let imgData = [];

  for (let i = 0; i < input.files.length; i++) {
    // console.log(input.files[i]);

    if (input.files && input.files[i]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        imgData.push(e.target.result);
        // console.log(imgData);
        imgName.push(input.files[i].name);
        input.setAttribute("data-title", imgName.join(", "));
        // console.log(e.target.result);
      }
      reader.readAsDataURL(input.files[i]);
    }
  }

}