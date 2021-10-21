const downloadCharacterSheet = () => {

  if (areFieldsEntered()) {

    const node = document.getElementById('id-card');

    html2canvas(node).then(canvas => {
      // document.body.appendChild(canvas)
      // var img    = canvas.toDataURL("image/png");
      // document.write('<img src="'+img+'"/>');
      var link = document.createElement('a');
      link.download = 'filename.jpg';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  else {
    alert("Please fill all details");
  }
};

const bindInputToElement = (inputEl, elementEl) => {
  inputEl.addEventListener('change', () => {
    elementEl.textContent = inputEl.value;
  });
};

document
  .getElementById('download-button')
  .addEventListener('click', downloadCharacterSheet);

document
  .querySelector('.id-card__subject-id')
  .textContent = md5('something').slice(0, 8);

// Bind name
const nameEl = document.getElementById('name');
bindInputToElement(
  nameEl,
  document.getElementById('id-card-name'));

nameEl.addEventListener('change', () => {
  document.querySelector('.id-card__subject-id').textContent = md5(nameEl.value).slice(0, 8);
});

// Bind employee id
bindInputToElement(
  document.getElementById('emp_id'),
  document.getElementById('id-card-emp-id'));

// Bind blood group
bindInputToElement(
  document.getElementById('blood_group'),
  document.getElementById('id-card-blood-group'));

// Bind blood group 2
bindInputToElement(
  document.getElementById('blood_group_2'),
  document.getElementById('id-card-blood-group-2'));  


// Bind mugshot
document.getElementById('mugshot').addEventListener('change', function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById('image-preview');
      img.src = e.target.result;
      const cropper = new Cropper(img, {
        data: {
          height: 320,
          width: 500,
        },
      });
      linkIdCardMugshot(cropper)
    };
    reader.readAsDataURL(this.files[0]);
  }
});

function linkIdCardMugshot(cropper) {
  const cropButton = document.getElementById('crop-btn');
  cropButton.addEventListener('click', () => {
    const e = cropper.getCroppedCanvas().toDataURL('image/jpeg')
    const img = document.getElementById('id-card-mugshot');
    img.src = e
  })
}

function areFieldsEntered() {
  if (document.getElementById("name").value == ""
    || document.getElementById("emp_id").value == ""
    || document.getElementById("blood_group").value == "")
  {
    return false;
  }
  return true
}