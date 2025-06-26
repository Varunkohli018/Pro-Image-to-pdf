const { jsPDF } = window.jspdf;
let selectedImages = [];

document.getElementById("imageInput").addEventListener("change", (e) => {
  selectedImages = Array.from(e.target.files);
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  selectedImages.forEach((imageFile) => {
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(imageFile);
    preview.appendChild(imgElement);
  });
});

document.getElementById("convertBtn").addEventListener("click", () => {
  if (selectedImages.length === 0) {
    alert("Please select image files first.");
    return;
  }

  const pdf = new jsPDF();

  let loadedCount = 0;

  selectedImages.forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        const width = pdf.internal.pageSize.getWidth();
        const height = (img.height * width) / img.width;

        if (index !== 0) {
          pdf.addPage();
        }

        pdf.addImage(img, "JPEG", 0, 0, width, height);
        loadedCount++;

        if (loadedCount === selectedImages.length) {
          pdf.save("converted.pdf");
        }
      };
    };

    reader.readAsDataURL(file);
  });
});
