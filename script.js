const { jsPDF } = window.jspdf;
let imageFiles = [];

document.getElementById("imageInput").addEventListener("change", function (e) {
  imageFiles = Array.from(e.target.files);
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  imageFiles.forEach((file) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
});

document.getElementById("convertBtn").addEventListener("click", function () {
  if (imageFiles.length === 0) {
    alert("Please select image files first.");
    return;
  }

  const pdf = new jsPDF();
  let processed = 0;

  imageFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (img.height * pageWidth) / img.width;

        if (index !== 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);

        processed++;
        if (processed === imageFiles.length) {
          pdf.save("converted.pdf");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});const { jsPDF } = window.jspdf;
let imageFiles = [];

document.getElementById("imageInput").addEventListener("change", function (e) {
  imageFiles = Array.from(e.target.files);
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  imageFiles.forEach((file) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
});

document.getElementById("convertBtn").addEventListener("click", function () {
  if (imageFiles.length === 0) {
    alert("Please select image files first.");
    return;
  }

  const pdf = new jsPDF();
  let processed = 0;

  imageFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (img.height * pageWidth) / img.width;

        if (index !== 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);

        processed++;
        if (processed === imageFiles.length) {
          pdf.save("converted.pdf");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});
