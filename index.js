//Get the button
let myButton = document.getElementById("btn-back-to-top");
let smallNavbar = document.getElementById("small-navbar");
// console.log(smallNavbar)

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = "block";
    smallNavbar.setAttribute("class", "navbar navbar-expand-lg navbar-dark d-lg-none");
  } 
  else {
    myButton.style.display = "none";
    smallNavbar.setAttribute("class", "navbar navbar-expand-lg navbar-dark d-lg-none fixed-top")
  }
}
// When the user clicks on the button, scroll to the top of the document
myButton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// List files
function readUrl(input) {

  let imgName = [];
  let imgData = [];

  const maxFiles = 10; // Maximum number of files allowed

  if (input.files.length > 10) {
    // Display Bootstrap modal
    $('#fileLimitModal').modal('show');
    input.value = ""; // Clear selected files
    return;
  }

  for (let i = 0; i < input.files.length; i++) {
    // console.log(input.files[i]);

    if (input.files && input.files[i]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        imgData.push(e.target.result);
        // console.log(imgData);
        imgName.push(input.files[i].name);
        (input.files.length > 1) 
          ?
          input.setAttribute("data-title", `${input.files.length} files added\n ${imgName.join(", ")}`) 
          :
          input.setAttribute("data-title", `${input.files.length} file added\n ${imgName.join(", ")}`);
        
        // console.log(e.target.result);
      }
      reader.readAsDataURL(input.files[i]);
    }
  }

  if(input.files.length > 0){
    document.getElementById("upload").disabled = false;
    document.getElementById("upload").setAttribute("class", "btn btn-outline-light btn-block")
  }

}

document.getElementById('uploadForm').addEventListener('submit', async function (e) {

  e.preventDefault();

  const fileInput = document.getElementById('inputFile'); 
  const files = fileInput.files;

  const formData = new FormData();

  for (const file of files) {
   formData.append('drive_files', file);
  }

  document.getElementById("upload").innerHTML = `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Uploading...`
   document.getElementById("upload").setAttribute("class", "btn btn-light btn-block")

  // console.log(formData);
  // console.log(files);

  fetch('https://wedding-file-upload.onrender.com/', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // console.log('Upload success:', data);
    if(data.message == "success"){
      document.getElementById("upload").innerHTML = "Maraming Salamat!"
      setTimeout(()=>{
        document.getElementById("upload").innerHTML = "Upload"
        document.getElementById("upload").disabled = true;
        document.getElementById("inputFile").setAttribute("data-title", "Drag and drop a file");
        document.getElementById("upload").setAttribute("class", "btn btn-outline-secondary btn-lg btn-block")
      }, 2000);
    }
  })
  .catch(error => {
    // console.error('Upload failed:', error);
    if(error){
      document.getElementById("upload").innerHTML = "Try Again Later!"
      setTimeout(()=>{
        document.getElementById("upload").innerHTML = "Upload"
        document.getElementById("upload").disabled = true;
        document.getElementById("inputFile").setAttribute("data-title", "Drag and drop a file");
        document.getElementById("upload").setAttribute("class", "btn btn-outline-secondary btn-block")
      }, 2000);
    }
  });

     
});

