const calculateCoordinates = (img, e) => {
  const imageRect = img.getBoundingClientRect();
  const { clientX, clientY } = e;

  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;
  const scaleX = naturalWidth / imageRect.width;
  const scaleY = naturalHeight / imageRect.height;

  const relativeX = clientX - imageRect.left;
  const relativeY = clientY - imageRect.top;

  const naturalX = relativeX * scaleX;
  const naturalY = relativeY * scaleY;

  return { naturalX, naturalY, relativeX, relativeY };
};

export default calculateCoordinates;
