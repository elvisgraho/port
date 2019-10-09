export default function animation(canvas) {
  let context = canvas.getContext('2d');
  console.log(context);
  context.fillRect(0, 0, canvas.width, canvas.height);
}