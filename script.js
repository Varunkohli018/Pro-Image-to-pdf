const { jsPDF } = window.jspdf;
let images = [];

document.getElementById("imageInput").addEventListener("change", e => {
  images = [...e.target.files];
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  images.forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
  console.log("Selected images:", images);
});

document.getElementById("convertBtn").addEventListener("click", () => {
  if (images.length === 0) {
    alert("Please select at least one image.");
    return;
  }
  console.log("Starting PDF creation with", images.length, "images.");

  const pdf = new jsPDF();
  let processed = 0;

  images.forEach((file, idx) => {
    const reader = new FileReader();

    reader.onload = ev => {
      const img = new Image();
      img.src = ev.target.result;

      img.onerror = () => {
        console.error("Failed to load image:", file.name);
        alert(`Error loading image: ${file.name}`);
      };

      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (img.height * pageWidth) / img.width;
        if (idx > 0) pdf.addPage();

        try {
          pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
        } catch (err) {
          console.error("Error adding image to PDF:", err);
          alert("Error adding image to PDF. Check console.");
        }

        processed++;
        console.log(`Processed ${processed}/${images.length}`);

        if (processed === images.length) {
          try {
            pdf.save("converted.pdf");
            console.log("PDF saved successfully.");
          } catch (err) {
            console.error("Error saving PDF:", err);
            alert("Failed to save PDF. Check console.");
          }
        }
      };
    };

    reader.onerror = () => {
      console.error("FileReader error on:", file.name);
      alert(`Cannot read file: ${file.name}`);
    };

    reader.readAsDataURL(file);
  });
});const { jsPDF } = window.jspdf;
let images = [];

document.getElementById("imageInput").addEventListener("change", e => {
  images = [...e.target.files];
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  images.forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
  console.log("Selected images:", images);
});

document.getElementById("convertBtn").addEventListener("click", () => {
  if (images.length === 0) {
    alert("Please select at least one image.");
    return;
  }
  console.log("Starting PDF creation with", images.length, "images.");

  const pdf = new jsPDF();
  let processed = 0;

  images.forEach((file, idx) => {
    const reader = new FileReader();

    reader.onload = ev => {
      const img = new Image();
      img.src = ev.target.result;

      img.onerror = () => {
        console.error("Failed to load image:", file.name);
        alert(`Error loading image: ${file.name}`);
      };

      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (img.height * pageWidth) / img.width;
        if (idx > 0) pdf.addPage();

        try {
          pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
        } catch (err) {
          console.error("Error adding image to PDF:", err);
          alert("Error adding image to PDF. Check console.");
        }

        processed++;
        console.log(`Processed ${processed}/${images.length}`);

        if (processed === images.length) {
          try {
            pdf.save("converted.pdf");
            console.log("PDF saved successfully.");
          } catch (err) {
            console.error("Error saving PDF:", err);
            alert("Failed to save PDF. Check console.");
          }
        }
      };
    };

    reader.onerror = () => {
      console.error("FileReader error on:", file.name);
      alert(`Cannot read file: ${file.name}`);
    };

    reader.readAsDataURL(file);
  });
});
