import { loadModel } from "./model-loader.js";

document.getElementById('folderInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const modelMenu = document.getElementById('model-menu-list');
    modelMenu.innerHTML = ''; // Clear previous entries

    const fileMap = {}; // Store files for quick lookup (e.g., to find images)

    // Store all files in a map for easy access
    Array.from(files).forEach(file => {
        fileMap[file.name] = file;
    });

    // Iterate through files and display .obj models
    Object.keys(fileMap).forEach(fileName => {
        if (fileName.endsWith('.obj')) {
            let modelItem = document.createElement('div');
            modelItem.className = 'model-item';

            // MALHA
            let menuCanvas = document.createElement('canvas');
            loadModel(menuCanvas, fileMap[fileName].webkitRelativePath);
            modelItem.appendChild(menuCanvas);

            let text = document.createElement('p');
            text.textContent = fileName;
            modelItem.appendChild(text);

            // Carregar malha na cena
            let sceneCanvas = document.querySelector("#scene-canvas");
            modelItem.onclick = () => loadModel(sceneCanvas, fileMap[fileName].webkitRelativePath);
            modelMenu.appendChild(modelItem);
        }
    });
});
