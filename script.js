const { jsPDF } = window.jspdf;
let images = [];

document.getElementById("imageInput").onchange = e => {
  images = [...e.target.files];
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  images.forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
};

document.getElementById("convertBtn").onclick = () => {
  if (images.length === 0) { alert("Select images first"); return; }
  const pdf = new jsPDF();
  let done = 0;
  images.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.src = ev.target.result;
      img.onload = () => {
        const w = pdf.internal.pageSize.getWidth();
        const h = (img.height * w) / img.width;
        if (i > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, w, h);
        done++;
        if (done === images.length) pdf.save("converted.pdf");
      };
    };
    reader.readAsDataURL(file);
  });
};
