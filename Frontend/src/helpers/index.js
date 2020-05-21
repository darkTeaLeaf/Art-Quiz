// Fisher-Yates Algorithm for shuffling the array randomly
export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const toFormData = (data) => {
  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}