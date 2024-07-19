export function appendToBody(el) {
    el.className = "aa";
    document.body.appendChild(el);
}

export function appendToID(el, id) {
    const parentElement = document.getElementById(id);
    if (parentElement) {
        parentElement.innerHTML = ''; // Clear the existing contents
        parentElement.appendChild(el); // Append the new element
    } else {
        console.error('Element with id ' + id + ' not found.');
    }
}

// randomly generate id that would have no overlap with existing ids 
export function GenerateID(){
    let id = Math.floor(Math.random() * 1000000);
   
    while(document.getElementById(id)){
        id = Math.floor(Math.random() * 1000000);
    }
    console.log("curent id generated is ",id);
return id; 
}