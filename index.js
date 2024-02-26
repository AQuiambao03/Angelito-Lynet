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