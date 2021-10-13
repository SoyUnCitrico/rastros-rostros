const dataButon = document.querySelector('#fetchData');

const getData = async() => {
  const response = await fetch('/photo');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('p');
    const image = document.createElement('img');
    image.src = item.image64;
    root.append(image);
    document.main.append(root);
  }
  console.log(data);
}

dataButon.addEventListener('click', getData())